import React, { useState, useRef, useEffect, useCallback, ReactNode, cloneElement, isValidElement } from 'react';
import { createPortal } from 'react-dom';
import './popover.css';

export type PopoverPlacement = 
  | 'top' | 'top-start' | 'top-end'
  | 'bottom' | 'bottom-start' | 'bottom-end'
  | 'left' | 'left-start' | 'left-end'
  | 'right' | 'right-start' | 'right-end';

export type PopoverTrigger = 'hover' | 'click' | 'focus' | 'contextmenu' | 'manual';

export interface PopoverProps {
  // Content
  content: ReactNode;
  title?: ReactNode;
  children: ReactNode;
  
  // Behavior
  trigger?: PopoverTrigger | PopoverTrigger[];
  placement?: PopoverPlacement;
  visible?: boolean;
  defaultVisible?: boolean;
  disabled?: boolean;
  
  // Styling
  className?: string;
  overlayClassName?: string;
  arrowPointAtCenter?: boolean;
  
  // Timing
  mouseEnterDelay?: number;
  mouseLeaveDelay?: number;
  
  // Callbacks
  onVisibleChange?: (visible: boolean) => void;
  
  // Portal
  getPopupContainer?: () => HTMLElement;
  
  // Advanced
  destroyTooltipOnHide?: boolean;
  autoAdjustOverflow?: boolean;
  
  // Accessibility
  'aria-label'?: string;
  id?: string;
}

// Hook para posicionamiento inteligente
const usePopoverPosition = (
  triggerRef: React.RefObject<HTMLElement | null>,
  popoverRef: React.RefObject<HTMLDivElement | null>,
  placement: PopoverPlacement,
  visible: boolean,
  autoAdjustOverflow: boolean = true
) => {
  const [position, setPosition] = useState<React.CSSProperties>({});
  const [actualPlacement, setActualPlacement] = useState<PopoverPlacement>(placement);

  const calculatePosition = useCallback(() => {
    if (!triggerRef.current || !popoverRef.current || !visible) return;

    const trigger = triggerRef.current.getBoundingClientRect();
    const popover = popoverRef.current.getBoundingClientRect();
    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    const spacing = 8; // Espacio entre trigger y popover
    const arrowSize = 8;

    // Calcular posición base según placement
    let top = 0;
    let left = 0;
    let currentPlacement = placement;

    const calculateForPlacement = (targetPlacement: PopoverPlacement) => {
      const [mainSide, alignment] = targetPlacement.split('-') as [string, string?];
      
      switch (mainSide) {
        case 'top':
          top = trigger.top - popover.height - spacing - arrowSize;
          left = alignment === 'start' ? trigger.left :
                alignment === 'end' ? trigger.right - popover.width :
                trigger.left + trigger.width / 2 - popover.width / 2;
          break;
        case 'bottom':
          top = trigger.bottom + spacing + arrowSize;
          left = alignment === 'start' ? trigger.left :
                alignment === 'end' ? trigger.right - popover.width :
                trigger.left + trigger.width / 2 - popover.width / 2;
          break;
        case 'left':
          left = trigger.left - popover.width - spacing - arrowSize;
          top = alignment === 'start' ? trigger.top :
               alignment === 'end' ? trigger.bottom - popover.height :
               trigger.top + trigger.height / 2 - popover.height / 2;
          break;
        case 'right':
          left = trigger.right + spacing + arrowSize;
          top = alignment === 'start' ? trigger.top :
               alignment === 'end' ? trigger.bottom - popover.height :
               trigger.top + trigger.height / 2 - popover.height / 2;
          break;
      }

      return { top, left };
    };

    const { top: calcTop, left: calcLeft } = calculateForPlacement(placement);
    top = calcTop;
    left = calcLeft;

    // Auto-adjust para evitar overflow
    if (autoAdjustOverflow) {
      const wouldOverflow = {
        top: top < spacing,
        bottom: top + popover.height > viewport.height - spacing,
        left: left < spacing,
        right: left + popover.width > viewport.width - spacing,
      };

      // Intentar placement alternativo si hay overflow
      if (wouldOverflow.top || wouldOverflow.bottom || wouldOverflow.left || wouldOverflow.right) {
        const alternativePlacements: PopoverPlacement[] = [];
        
        if (placement.startsWith('top')) {
          alternativePlacements.push('bottom', 'bottom-start', 'bottom-end');
        } else if (placement.startsWith('bottom')) {
          alternativePlacements.push('top', 'top-start', 'top-end');
        } else if (placement.startsWith('left')) {
          alternativePlacements.push('right', 'right-start', 'right-end');
        } else if (placement.startsWith('right')) {
          alternativePlacements.push('left', 'left-start', 'left-end');
        }

        for (const altPlacement of alternativePlacements) {
          const { top: altTop, left: altLeft } = calculateForPlacement(altPlacement);
          const altWouldOverflow = {
            top: altTop < spacing,
            bottom: altTop + popover.height > viewport.height - spacing,
            left: altLeft < spacing,
            right: altLeft + popover.width > viewport.width - spacing,
          };

          if (!altWouldOverflow.top && !altWouldOverflow.bottom && 
              !altWouldOverflow.left && !altWouldOverflow.right) {
            top = altTop;
            left = altLeft;
            currentPlacement = altPlacement;
            break;
          }
        }
      }

      // Ajuste fino para mantener dentro del viewport
      if (left < spacing) left = spacing;
      if (left + popover.width > viewport.width - spacing) {
        left = viewport.width - popover.width - spacing;
      }
      if (top < spacing) top = spacing;
      if (top + popover.height > viewport.height - spacing) {
        top = viewport.height - popover.height - spacing;
      }
    }

    setPosition({
      position: 'fixed',
      top: Math.round(top),
      left: Math.round(left),
      zIndex: 1050,
    });
    setActualPlacement(currentPlacement);
  }, [triggerRef, popoverRef, placement, visible, autoAdjustOverflow]);

  useEffect(() => {
    if (visible) {
      // Pequeño delay para asegurar que el DOM esté renderizado
      const timer = setTimeout(calculatePosition, 0);
      return () => clearTimeout(timer);
    }
  }, [visible, calculatePosition]);

  useEffect(() => {
    if (visible) {
      window.addEventListener('scroll', calculatePosition, true);
      window.addEventListener('resize', calculatePosition);
      return () => {
        window.removeEventListener('scroll', calculatePosition, true);
        window.removeEventListener('resize', calculatePosition);
      };
    }
  }, [visible, calculatePosition]);

  return { position, actualPlacement };
};

// Hook para manejar clicks fuera
const useClickOutside = (
  triggerRef: React.RefObject<HTMLElement | null>,
  popoverRef: React.RefObject<HTMLDivElement | null>,
  handler: () => void,
  enabled: boolean
) => {
  useEffect(() => {
    if (!enabled) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      
      if (triggerRef.current?.contains(target) || popoverRef.current?.contains(target)) {
        return;
      }
      
      handler();
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [triggerRef, popoverRef, handler, enabled]);
};

export const Popover: React.FC<PopoverProps> = ({
  content,
  title,
  children,
  trigger = 'hover',
  placement = 'top',
  visible: controlledVisible,
  defaultVisible = false,
  disabled = false,
  className = '',
  overlayClassName = '',
  arrowPointAtCenter = false,
  mouseEnterDelay = 100,
  mouseLeaveDelay = 100,
  onVisibleChange,
  getPopupContainer,
  destroyTooltipOnHide = false,
  autoAdjustOverflow = true,
  'aria-label': ariaLabel,
  id,
}) => {
  const [internalVisible, setInternalVisible] = useState(defaultVisible);
  const triggerRef = useRef<HTMLElement | null>(null);
  const popoverRef = useRef<HTMLDivElement | null>(null);
  const enterTimerRef = useRef<number | null>(null);
  const leaveTimerRef = useRef<number | null>(null);

  const isVisible = controlledVisible !== undefined ? controlledVisible : internalVisible;
  const triggers = Array.isArray(trigger) ? trigger : [trigger];

  const { position, actualPlacement } = usePopoverPosition(
    triggerRef,
    popoverRef,
    placement,
    isVisible,
    autoAdjustOverflow
  );

  const handleVisibleChange = useCallback((newVisible: boolean) => {
    if (disabled) return;
    
    if (controlledVisible === undefined) {
      setInternalVisible(newVisible);
    }
    onVisibleChange?.(newVisible);
  }, [disabled, controlledVisible, onVisibleChange]);

  const showPopover = useCallback(() => {
    if (enterTimerRef.current) {
      clearTimeout(enterTimerRef.current);
    }
    if (leaveTimerRef.current) {
      clearTimeout(leaveTimerRef.current);
    }
    
    if (!isVisible) {
      enterTimerRef.current = setTimeout(() => {
        handleVisibleChange(true);
      }, mouseEnterDelay);
    }
  }, [isVisible, handleVisibleChange, mouseEnterDelay]);

  const hidePopover = useCallback(() => {
    if (enterTimerRef.current) {
      clearTimeout(enterTimerRef.current);
    }
    if (leaveTimerRef.current) {
      clearTimeout(leaveTimerRef.current);
    }
    
    if (isVisible) {
      leaveTimerRef.current = setTimeout(() => {
        handleVisibleChange(false);
      }, mouseLeaveDelay);
    }
  }, [isVisible, handleVisibleChange, mouseLeaveDelay]);

  const togglePopover = useCallback(() => {
    handleVisibleChange(!isVisible);
  }, [isVisible, handleVisibleChange]);

  // Manejar clicks fuera para cerrar
  useClickOutside(
    triggerRef,
    popoverRef,
    () => handleVisibleChange(false),
    isVisible && triggers.includes('click')
  );

  // Event handlers
  const eventHandlers: Record<string, any> = {};

  if (triggers.includes('hover')) {
    eventHandlers.onMouseEnter = showPopover;
    eventHandlers.onMouseLeave = hidePopover;
  }

  if (triggers.includes('click')) {
    eventHandlers.onClick = togglePopover;
  }

  if (triggers.includes('focus')) {
    eventHandlers.onFocus = showPopover;
    eventHandlers.onBlur = hidePopover;
  }

  if (triggers.includes('contextmenu')) {
    eventHandlers.onContextMenu = (e: React.MouseEvent) => {
      e.preventDefault();
      togglePopover();
    };
  }

  // Limpiar timers al desmontar
  useEffect(() => {
    return () => {
      if (enterTimerRef.current) clearTimeout(enterTimerRef.current);
      if (leaveTimerRef.current) clearTimeout(leaveTimerRef.current);
    };
  }, []);

  // Clonar el trigger element para agregar ref y event handlers
  const triggerElement = isValidElement(children) ? (
    cloneElement(children as React.ReactElement<any>, {
      ref: (node: HTMLElement | null) => {
        triggerRef.current = node;
        // Preservar ref original si existe
        const originalRef = (children as any).ref;
        if (typeof originalRef === 'function') {
          originalRef(node);
        } else if (originalRef && typeof originalRef === 'object') {
          originalRef.current = node;
        }
      },
      ...eventHandlers,
    })
  ) : (
    <span ref={triggerRef} {...eventHandlers}>
      {children}
    </span>
  );

  // Renderizar popover
  const popoverContent = (isVisible || !destroyTooltipOnHide) && (
    <div
      ref={popoverRef}
      className={`duino-popover ${overlayClassName}`}
      style={{
        ...position,
        visibility: isVisible ? 'visible' : 'hidden',
        opacity: isVisible ? 1 : 0,
      }}
      role="tooltip"
      aria-label={ariaLabel}
      id={id}
    >
      <div className={`duino-popover__content duino-popover__content--${actualPlacement}`}>
        <div className="duino-popover__arrow" />
        
        <div className="duino-popover__inner">
          {title && (
            <div className="duino-popover__title">
              {title}
            </div>
          )}
          <div className="duino-popover__body">
            {content}
          </div>
        </div>
      </div>

      {/* Event handlers para mantener popover abierto en hover */}
      {triggers.includes('hover') && (
        <div
          className="duino-popover__hover-bridge"
          onMouseEnter={showPopover}
          onMouseLeave={hidePopover}
        />
      )}
    </div>
  );

  return (
    <>
      {triggerElement}
      {getPopupContainer 
        ? createPortal(popoverContent, getPopupContainer())
        : createPortal(popoverContent, document.body)
      }
    </>
  );
};

Popover.displayName = 'Popover';
