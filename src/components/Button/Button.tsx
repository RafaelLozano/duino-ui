import React from "react";
import "./button.css";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger" | "text";
export type ButtonSize = "sm" | "md" | "lg";
export type ButtonShape = "default" | "round" | "circle";

export interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  shape?: ButtonShape;
  block?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "start" | "end";
  /** Etiqueta accesible para el spinner de loading */
  loadingText?: string;
  /** Hace el botón peligroso (confirmación requerida) */
  danger?: boolean;
  /** URL para convertir el botón en un enlace */
  href?: string;
  /** Target para enlaces */
  target?: string;
  /** Props adicionales para el botón */
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  /** Props HTML adicionales */
  [key: string]: any;
}

export const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      shape = "default",
      block = false,
      loading = false,
      icon,
      iconPosition = "start",
      loadingText = "Cargando...",
      danger = false,
      href,
      target,
      className = "",
      children,
      disabled,
      onClick,
      ...rest
    },
    ref
  ) => {
    // Determinar la variante final considerando danger
    const finalVariant = danger && variant !== "text" ? "danger" : variant;
    
    // Construir clases usando BEM
    const baseClass = "duino-btn";
    const classes = [
      baseClass,
      `${baseClass}--${finalVariant}`,
      `${baseClass}--${size}`,
      shape !== "default" && `${baseClass}--${shape}`,
      block && `${baseClass}--block`,
      loading && `${baseClass}--loading`,
      (disabled || loading) && `${baseClass}--disabled`,
      !children && icon && `${baseClass}--icon-only`,
      className
    ]
      .filter(Boolean)
      .join(" ");

    // Contenido del botón
    const content = (
      <>
        {loading && (
          <span 
            className={`${baseClass}__loading`}
            role="status" 
            aria-label={loadingText}
          >
            <svg className={`${baseClass}__spinner`} viewBox="0 0 24 24">
              <circle
                className={`${baseClass}__spinner-circle`}
                cx="12"
                cy="12"
                r="10"
                fill="none"
                strokeWidth="2"
              />
            </svg>
          </span>
        )}
        
        {icon && iconPosition === "start" && !loading && (
          <span className={`${baseClass}__icon ${baseClass}__icon--start`}>
            {icon}
          </span>
        )}
        
        {children && (
          <span className={`${baseClass}__text`}>
            {children}
          </span>
        )}
        
        {icon && iconPosition === "end" && !loading && (
          <span className={`${baseClass}__icon ${baseClass}__icon--end`}>
            {icon}
          </span>
        )}
      </>
    );

    // Si es un enlace, renderizar como <a>
    if (href) {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={disabled || loading ? undefined : href}
          target={target}
          className={classes}
          {...(disabled || loading ? { "aria-disabled": "true" } : {})}
          onClick={disabled || loading ? (e) => e.preventDefault() : onClick}
          {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {content}
        </a>
      );
    }

    // Renderizar como botón normal
    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type="button"
        className={classes}
        disabled={disabled || loading}
        onClick={onClick}
        {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = "Button";
