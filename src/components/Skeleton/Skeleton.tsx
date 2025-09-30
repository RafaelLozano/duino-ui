import React from "react";
import "./skeleton.css";

export type SkeletonVariant = "text" | "circular" | "rectangular" | "rounded";
export type SkeletonAnimation = "pulse" | "wave" | "none";

export interface SkeletonProps {
  /** Variante de la forma del skeleton */
  variant?: SkeletonVariant;
  /** Tipo de animación */
  animation?: SkeletonAnimation;
  /** Ancho del skeleton */
  width?: string | number;
  /** Alto del skeleton */
  height?: string | number;
  /** Número de líneas para el variant text */
  lines?: number;
  /** Si está activo el skeleton (para modo condicional) */
  active?: boolean;
  /** Contenido a mostrar cuando no está activo */
  children?: React.ReactNode;
  /** Clase CSS adicional */
  className?: string;
  /** Estilos inline */
  style?: React.CSSProperties;
}

// Componente para líneas de texto individuales
const SkeletonLine: React.FC<{
  width?: string | number;
  height?: string | number;
  animation?: SkeletonAnimation;
  isLast?: boolean;
}> = ({ width, height = "1em", animation = "pulse", isLast = false }) => {
  const baseClass = "duino-skeleton";
  
  const style: React.CSSProperties = {
    width: isLast && width === undefined ? "60%" : width,
    height,
  };

  return (
    <span
      className={`${baseClass}__line ${baseClass}--${animation}`}
      style={style}
    />
  );
};

// Componente Avatar skeleton
export const SkeletonAvatar: React.FC<{
  size?: number | string;
  shape?: "circle" | "square";
  animation?: SkeletonAnimation;
  className?: string;
}> = ({ 
  size = 40, 
  shape = "circle", 
  animation = "pulse",
  className = ""
}) => {
  const baseClass = "duino-skeleton";
  const classes = [
    baseClass,
    `${baseClass}--avatar`,
    `${baseClass}--${shape}`,
    `${baseClass}--${animation}`,
    className
  ].filter(Boolean).join(" ");

  const style: React.CSSProperties = {
    width: size,
    height: size,
  };

  return <div className={classes} style={style} />;
};

// Componente Button skeleton
export const SkeletonButton: React.FC<{
  size?: "sm" | "md" | "lg";
  shape?: "default" | "round" | "circle";
  animation?: SkeletonAnimation;
  block?: boolean;
  className?: string;
}> = ({ 
  size = "md", 
  shape = "default",
  animation = "pulse",
  block = false,
  className = ""
}) => {
  const baseClass = "duino-skeleton";
  const classes = [
    baseClass,
    `${baseClass}--button`,
    `${baseClass}--${size}`,
    `${baseClass}--${shape}`,
    `${baseClass}--${animation}`,
    block && `${baseClass}--block`,
    className
  ].filter(Boolean).join(" ");

  return <div className={classes} />;
};

// Componente Input skeleton
export const SkeletonInput: React.FC<{
  size?: "sm" | "md" | "lg";
  animation?: SkeletonAnimation;
  block?: boolean;
  className?: string;
}> = ({ 
  size = "md",
  animation = "pulse",
  block = false,
  className = ""
}) => {
  const baseClass = "duino-skeleton";
  const classes = [
    baseClass,
    `${baseClass}--input`,
    `${baseClass}--${size}`,
    `${baseClass}--${animation}`,
    block && `${baseClass}--block`,
    className
  ].filter(Boolean).join(" ");

  return <div className={classes} />;
};

// Componente Image skeleton
export const SkeletonImage: React.FC<{
  width?: string | number;
  height?: string | number;
  animation?: SkeletonAnimation;
  className?: string;
}> = ({ 
  width = "100%", 
  height = 200,
  animation = "pulse",
  className = ""
}) => {
  const baseClass = "duino-skeleton";
  const classes = [
    baseClass,
    `${baseClass}--image`,
    `${baseClass}--${animation}`,
    className
  ].filter(Boolean).join(" ");

  const style: React.CSSProperties = {
    width,
    height,
  };

  return <div className={classes} style={style} />;
};

export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  (
    {
      variant = "text",
      animation = "pulse",
      width,
      height,
      lines = 3,
      active = true,
      children,
      className = "",
      style,
      ...rest
    },
    ref
  ) => {
    // Si no está activo, mostrar el contenido real
    if (!active && children) {
      return <>{children}</>;
    }

    const baseClass = "duino-skeleton";

    // Para variant text con múltiples líneas
    if (variant === "text" && lines > 1) {
      return (
        <div 
          ref={ref}
          className={`${baseClass}__container ${className}`}
          style={style}
          {...rest}
        >
          {Array.from({ length: lines }, (_, index) => (
            <SkeletonLine
              key={index}
              width={width}
              height={height}
              animation={animation}
              isLast={index === lines - 1}
            />
          ))}
        </div>
      );
    }

    // Para otros variants
    const classes = [
      baseClass,
      `${baseClass}--${variant}`,
      `${baseClass}--${animation}`,
      className
    ].filter(Boolean).join(" ");

    const skeletonStyle: React.CSSProperties = {
      width,
      height,
      ...style,
    };

    return (
      <div 
        ref={ref}
        className={classes}
        style={skeletonStyle}
        {...rest}
      />
    );
  }
);

Skeleton.displayName = "Skeleton";
