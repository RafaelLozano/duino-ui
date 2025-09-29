import React from "react";
import "./card.css";

export type CardSize = "sm" | "md" | "lg";

export interface CardProps {
  /** Título de la tarjeta */
  title?: React.ReactNode;
  /** Contenido extra en la esquina superior derecha */
  extra?: React.ReactNode;
  /** Imagen de portada */
  cover?: React.ReactNode;
  /** Lista de acciones en la parte inferior */
  actions?: React.ReactNode[];
  /** Si mostrar el borde */
  bordered?: boolean;
  /** Si la tarjeta puede hacer hover */
  hoverable?: boolean;
  /** Tamaño de la tarjeta */
  size?: CardSize;
  /** Contenido del cuerpo de la tarjeta */
  children?: React.ReactNode;
  /** Clase CSS adicional */
  className?: string;
  /** Estilos inline */
  style?: React.CSSProperties;
  /** Si mostrar loading */
  loading?: boolean;
  /** Tipo de tarjeta (inner para tarjetas anidadas) */
  type?: "default" | "inner";
  /** Callback al hacer click */
  onClick?: () => void;
  /** Props HTML adicionales */
  [key: string]: any;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      title,
      extra,
      cover,
      actions,
      bordered = true,
      hoverable = false,
      size = "md",
      children,
      className = "",
      style,
      loading = false,
      type = "default",
      onClick,
      ...rest
    },
    ref
  ) => {
    // Construir clases usando BEM
    const baseClass = "duino-card";
    const classes = [
      baseClass,
      `${baseClass}--${size}`,
      `${baseClass}--${type}`,
      bordered && `${baseClass}--bordered`,
      hoverable && `${baseClass}--hoverable`,
      loading && `${baseClass}--loading`,
      onClick && `${baseClass}--clickable`,
      className
    ]
      .filter(Boolean)
      .join(" ");

    // Renderizar skeleton si está loading
    if (loading) {
      return (
        <div ref={ref} className={classes} style={style} {...rest}>
          {cover && (
            <div className={`${baseClass}__cover`}>
              <div className={`${baseClass}__skeleton ${baseClass}__skeleton--cover`} />
            </div>
          )}
          {(title || extra) && (
            <div className={`${baseClass}__header`}>
              <div className={`${baseClass}__skeleton ${baseClass}__skeleton--title`} />
            </div>
          )}
          <div className={`${baseClass}__body`}>
            <div className={`${baseClass}__skeleton ${baseClass}__skeleton--line`} />
            <div className={`${baseClass}__skeleton ${baseClass}__skeleton--line`} />
            <div className={`${baseClass}__skeleton ${baseClass}__skeleton--line ${baseClass}__skeleton--line-short`} />
          </div>
        </div>
      );
    }

    return (
      <div 
        ref={ref} 
        className={classes} 
        style={style}
        onClick={onClick}
        {...rest}
      >
        {/* Cover */}
        {cover && (
          <div className={`${baseClass}__cover`}>
            {cover}
          </div>
        )}

        {/* Header */}
        {(title || extra) && (
          <div className={`${baseClass}__header`}>
            {title && (
              <div className={`${baseClass}__title`}>
                {title}
              </div>
            )}
            {extra && (
              <div className={`${baseClass}__extra`}>
                {extra}
              </div>
            )}
          </div>
        )}

        {/* Body */}
        {children && (
          <div className={`${baseClass}__body`}>
            {children}
          </div>
        )}

        {/* Actions */}
        {actions && actions.length > 0 && (
          <ul className={`${baseClass}__actions`}>
            {actions.map((action: React.ReactNode, index: number) => (
              <li key={index} className={`${baseClass}__action`}>
                {action}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
);

Card.displayName = "Card";
