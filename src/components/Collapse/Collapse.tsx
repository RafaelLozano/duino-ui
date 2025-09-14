import React, { useState, useRef, useEffect, ReactNode } from 'react';
import './collapse.css';

export type CollapseSize = 'sm' | 'md' | 'lg';
export type CollapseVariant = 'default' | 'ghost' | 'bordered';

export interface CollapseItem {
  key: string | number;
  label: ReactNode;
  children: ReactNode;
  disabled?: boolean;
  extra?: ReactNode;
  showArrow?: boolean;
  className?: string;
}

export interface CollapseProps {
  // Content
  items?: CollapseItem[];
  children?: ReactNode;
  
  // Behavior
  activeKey?: string | number | (string | number)[];
  defaultActiveKey?: string | number | (string | number)[];
  accordion?: boolean;
  collapsible?: 'header' | 'icon' | 'disabled';
  destroyInactivePanel?: boolean;
  
  // Styling
  size?: CollapseSize;
  variant?: CollapseVariant;
  bordered?: boolean;
  ghost?: boolean;
  className?: string;
  
  // Callbacks
  onChange?: (key: string | number | (string | number)[]) => void;
  
  // Custom
  expandIcon?: (props: { isActive: boolean; disabled: boolean }) => ReactNode;
  expandIconPosition?: 'start' | 'end';
}

// Componente individual de panel
interface CollapsePanelProps {
  header: ReactNode;
  children: ReactNode;
  key?: string | number;
  disabled?: boolean;
  extra?: ReactNode;
  showArrow?: boolean;
  className?: string;
  isActive?: boolean;
  onToggle?: () => void;
  size?: CollapseSize;
  variant?: CollapseVariant;
  expandIcon?: (props: { isActive: boolean; disabled: boolean }) => ReactNode;
  expandIconPosition?: 'start' | 'end';
  collapsible?: 'header' | 'icon' | 'disabled';
}

// Hook para animaciones de altura
const useCollapseAnimation = (isOpen: boolean, contentRef: React.RefObject<HTMLDivElement | null>) => {
  const [height, setHeight] = useState<string>('0px');
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (!contentRef.current) return;

    const element = contentRef.current;
    
    if (isOpen) {
      setIsAnimating(true);
      // Medir altura real del contenido
      element.style.height = 'auto';
      const scrollHeight = element.scrollHeight;
      element.style.height = '0px';
      
      // Forzar reflow y animar
      requestAnimationFrame(() => {
        setHeight(`${scrollHeight}px`);
      });
    } else {
      setIsAnimating(true);
      setHeight('0px');
    }

    // Limpiar después de la animación
    const timer = setTimeout(() => {
      setIsAnimating(false);
      if (isOpen) {
        setHeight('auto');
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [isOpen]);

  return { height, isAnimating };
};

// Componente CollapsePanel
export const CollapsePanel: React.FC<CollapsePanelProps> = ({
  header,
  children,
  disabled = false,
  extra,
  showArrow = true,
  className = '',
  isActive = false,
  onToggle,
  size = 'md',
  variant = 'default',
  expandIcon,
  expandIconPosition = 'end',
  collapsible = 'header',
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const { height, isAnimating } = useCollapseAnimation(isActive, contentRef);

  const handleHeaderClick = () => {
    if (disabled || collapsible === 'disabled') return;
    onToggle?.();
  };

  const handleIconClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (disabled || collapsible === 'disabled') return;
    if (collapsible === 'icon') {
      onToggle?.();
    }
  };

  // Renderizar icono de expansión
  const renderExpandIcon = () => {
    if (!showArrow) return null;

    if (expandIcon) {
      return expandIcon({ isActive, disabled });
    }

    return (
      <svg 
        className="duino-collapse__arrow" 
        viewBox="0 0 12 12" 
        fill="currentColor"
      >
        <path d="M6 8.825L1.175 4L2.35 2.825L6 6.475L9.65 2.825L10.825 4L6 8.825Z" />
      </svg>
    );
  };

  const panelClasses = [
    'duino-collapse__panel',
    `duino-collapse__panel--${size}`,
    `duino-collapse__panel--${variant}`,
    isActive && 'duino-collapse__panel--active',
    disabled && 'duino-collapse__panel--disabled',
    isAnimating && 'duino-collapse__panel--animating',
    className
  ].filter(Boolean).join(' ');

  const headerClasses = [
    'duino-collapse__header',
    collapsible !== 'disabled' && !disabled && 'duino-collapse__header--clickable'
  ].filter(Boolean).join(' ');

  return (
    <div className={panelClasses}>
      <div 
        className={headerClasses}
        onClick={collapsible === 'header' ? handleHeaderClick : undefined}
        role="button"
        tabIndex={disabled || collapsible === 'disabled' ? -1 : 0}
        aria-expanded={isActive ? "true" : "false"}
        aria-disabled={disabled ? "true" : "false"}
        onKeyDown={(e) => {
          if ((e.key === 'Enter' || e.key === ' ') && collapsible === 'header') {
            e.preventDefault();
            handleHeaderClick();
          }
        }}
      >
        {expandIconPosition === 'start' && (
          <div 
            className="duino-collapse__icon duino-collapse__icon--start"
            onClick={collapsible === 'icon' ? handleIconClick : undefined}
          >
            {renderExpandIcon()}
          </div>
        )}
        
        <div className="duino-collapse__header-content">
          {header}
        </div>
        
        {extra && (
          <div className="duino-collapse__extra">
            {extra}
          </div>
        )}
        
        {expandIconPosition === 'end' && (
          <div 
            className="duino-collapse__icon duino-collapse__icon--end"
            onClick={collapsible === 'icon' ? handleIconClick : undefined}
          >
            {renderExpandIcon()}
          </div>
        )}
      </div>
      
      <div 
        className="duino-collapse__content"
        style={{ height }}
        ref={contentRef}
      >
        <div className="duino-collapse__body">
          {(isActive || !isAnimating) && children}
        </div>
      </div>
    </div>
  );
};

// Componente principal Collapse
export const Collapse: React.FC<CollapseProps> = ({
  items,
  children,
  activeKey: controlledActiveKey,
  defaultActiveKey,
  accordion = false,
  collapsible = 'header',
  destroyInactivePanel = false,
  size = 'md',
  variant = 'default',
  bordered = false,
  ghost = false,
  className = '',
  onChange,
  expandIcon,
  expandIconPosition = 'end',
}) => {
  const [internalActiveKey, setInternalActiveKey] = useState<string | number | (string | number)[]>(
    controlledActiveKey !== undefined 
      ? controlledActiveKey 
      : defaultActiveKey || (accordion ? '' : [])
  );

  const currentActiveKey = controlledActiveKey !== undefined ? controlledActiveKey : internalActiveKey;

  const handlePanelToggle = (key: string | number) => {
    let newActiveKey: string | number | (string | number)[];

    if (accordion) {
      // Modo acordeón: solo un panel abierto
      newActiveKey = currentActiveKey === key ? '' : key;
    } else {
      // Modo múltiple: varios paneles abiertos
      const currentArray = Array.isArray(currentActiveKey) ? currentActiveKey : [];
      if (currentArray.includes(key)) {
        newActiveKey = currentArray.filter(k => k !== key);
      } else {
        newActiveKey = [...currentArray, key];
      }
    }

    if (controlledActiveKey === undefined) {
      setInternalActiveKey(newActiveKey);
    }

    onChange?.(newActiveKey);
  };

  const isKeyActive = (key: string | number): boolean => {
    if (accordion) {
      return currentActiveKey === key;
    } else {
      return Array.isArray(currentActiveKey) && currentActiveKey.includes(key);
    }
  };

  const collapseClasses = [
    'duino-collapse',
    `duino-collapse--${size}`,
    `duino-collapse--${variant}`,
    bordered && 'duino-collapse--bordered',
    ghost && 'duino-collapse--ghost',
    accordion && 'duino-collapse--accordion',
    className
  ].filter(Boolean).join(' ');

  // Si se usan items prop
  if (items && items.length > 0) {
    return (
      <div className={collapseClasses}>
        {items.map((item) => (
          <CollapsePanel
            key={item.key}
            header={item.label}
            disabled={item.disabled}
            extra={item.extra}
            showArrow={item.showArrow}
            className={item.className}
            isActive={isKeyActive(item.key)}
            onToggle={() => handlePanelToggle(item.key)}
            size={size}
            variant={variant}
            expandIcon={expandIcon}
            expandIconPosition={expandIconPosition}
            collapsible={collapsible}
          >
            {(isKeyActive(item.key) || !destroyInactivePanel) && item.children}
          </CollapsePanel>
        ))}
      </div>
    );
  }

  // Si se usan children directos (CollapsePanel components)
  return (
    <div className={collapseClasses}>
      {React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) return child;
        
        const key = child.key || index;
        return React.cloneElement(child as React.ReactElement<CollapsePanelProps>, {
          isActive: isKeyActive(String(key)),
          onToggle: () => handlePanelToggle(String(key)),
          size,
          variant,
          expandIcon,
          expandIconPosition,
          collapsible,
        });
      })}
    </div>
  );
};

// Exportar tipos adicionales
export type { CollapsePanelProps };

Collapse.displayName = 'Collapse';
CollapsePanel.displayName = 'CollapsePanel';
