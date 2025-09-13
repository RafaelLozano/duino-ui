import React, { useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";
import "./modal.css";

export type ModalProps = {
  open: boolean;
  title?: React.ReactNode;
  children?: React.ReactNode;
  onOk?: () => void;
  onCancel?: () => void;
  okText?: string;
  cancelText?: string;
  maskClosable?: boolean;
  centered?: boolean;
  width?: number | string;
  destroyOnClose?: boolean;
  footer?: React.ReactNode | null; // null para ocultar footer
  className?: string;
};

export const Modal: React.FC<ModalProps> = ({
  open,
  title,
  children,
  onOk,
  onCancel,
  okText = "OK",
  cancelText = "Cancel",
  maskClosable = true,
  centered = true,
  width = 520,
  destroyOnClose = false,
  footer,
  className = "",
}) => {
  const titleId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  // Bloqueo de scroll del body y manejo del foco
  useEffect(() => {
    if (open) {
      previouslyFocused.current = document.activeElement as HTMLElement;
      document.body.classList.add("is-modal-open");
      // Enfocar el contenedor para navegación por teclado
      setTimeout(() => {
        containerRef.current?.focus();
      }, 0);
    } else {
      document.body.classList.remove("is-modal-open");
      previouslyFocused.current?.focus?.();
    }
    return () => {
      document.body.classList.remove("is-modal-open");
    };
  }, [open]);

  // Cerrar con ESC
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel?.();
      if (e.key === "Tab") {
        // minitrap de foco: mantener el tab dentro del modal
        const focusables = containerRef.current?.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusables || focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const active = document.activeElement as HTMLElement;

        if (e.shiftKey && active === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onCancel]);

  if (!open && destroyOnClose) return null;

  const handleMaskClick = (e: React.MouseEvent) => {
    if (!maskClosable) return;
    if (e.target === e.currentTarget) onCancel?.();
  };

  const styleWidth =
    typeof width === "number" ? `${width}px` : width ?? undefined;

  const modal = (
    <div
      className={`duino-modal ${open ? "duino-modal--open" : ""} ${centered ? "duino-modal--centered" : ""}`}
      onMouseDown={handleMaskClick}
    >
      <div className="duino-modal__mask" />
      <div
        className={`duino-modal__container ${className}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        tabIndex={-1}
        ref={containerRef}
        style={{ width: styleWidth }}
        onMouseDown={(e) => {
          // Evita que el click interior dispare el maskClosable
          e.stopPropagation();
        }}
      >
        <div className="duino-modal__header">
          {title && (
            <h2 id={titleId} className="duino-modal__title">
              {title}
            </h2>
          )}
          <button
            type="button"
            className="duino-modal__close"
            aria-label="Close"
            onClick={onCancel}
          >
            ×
          </button>
        </div>

        <div className="duino-modal__body">{open || !destroyOnClose ? children : null}</div>

        {footer !== null && (
          <div className="duino-modal__footer">
            {footer ?? (
              <>
                <button
                  type="button"
                  className="duino-btn duino-btn--ghost"
                  onClick={onCancel}
                >
                  {cancelText}
                </button>
                <button
                  type="button"
                  className="duino-btn duino-btn--primary"
                  onClick={onOk}
                >
                  {okText}
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );

  return createPortal(modal, document.body);
};
