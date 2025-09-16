import React, { useState, useRef, useEffect, ReactNode } from 'react';
import { Spin } from '../Spin/Spin';
import './image.css';

export type ImageFit = 'fill' | 'contain' | 'cover' | 'none' | 'scale-down';
export type ImageShape = 'square' | 'circle' | 'rounded';

export interface ImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'onLoad' | 'onError'> {
  // Basic props
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  
  // Behavior
  lazy?: boolean;
  preview?: boolean;
  fallback?: ReactNode;
  placeholder?: ReactNode;
  
  // Styling
  fit?: ImageFit;
  shape?: ImageShape;
  bordered?: boolean;
  shadow?: boolean;
  
  // States
  loading?: ReactNode;
  error?: ReactNode;
  
  // Callbacks
  onLoad?: (event: React.SyntheticEvent<HTMLImageElement>) => void;
  onError?: (event: React.SyntheticEvent<HTMLImageElement>) => void;
  onPreview?: () => void;
  
  // Advanced
  rootMargin?: string;
  threshold?: number;
  
  // Accessibility
  caption?: ReactNode;
}

// Hook para Intersection Observer (lazy loading)
const useIntersectionObserver = (
  elementRef: React.RefObject<HTMLElement>,
  options: IntersectionObserverInit
) => {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    observer.observe(element);

    return () => {
      observer.unobserve(element);
      observer.disconnect();
    };
  }, [elementRef, options]);

  return isIntersecting;
};

export const Image: React.FC<ImageProps> = ({
  src,
  alt,
  width,
  height,
  lazy = true,
  preview = false,
  fallback,
  placeholder,
  fit = 'cover',
  shape = 'rounded',
  bordered = false,
  shadow = false,
  loading: customLoading,
  error: customError,
  onLoad,
  onError,
  onPreview,
  rootMargin = '50px',
  threshold = 0.1,
  caption,
  className = '',
  style,
  ...rest
}) => {
  const [imageState, setImageState] = useState<'loading' | 'loaded' | 'error'>('loading');
  const [showPreview, setShowPreview] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  // Lazy loading
  const isInView = useIntersectionObserver(imageRef, {
    rootMargin,
    threshold,
  });

  const shouldLoad = !lazy || isInView;

  // Manejar carga de imagen
  const handleLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
    setImageState('loaded');
    onLoad?.(event);
  };

  const handleError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    setImageState('error');
    onError?.(event);
  };

  // Manejar preview
  const handlePreviewClick = () => {
    if (preview && imageState === 'loaded') {
      setShowPreview(true);
      onPreview?.();
    }
  };

  // Cerrar preview con Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showPreview) {
        setShowPreview(false);
      }
    };

    if (showPreview) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [showPreview]);

  // Construir clases CSS
  const imageClasses = [
    'duino-image',
    `duino-image--${fit}`,
    `duino-image--${shape}`,
    bordered && 'duino-image--bordered',
    shadow && 'duino-image--shadow',
    preview && imageState === 'loaded' && 'duino-image--preview',
    className
  ].filter(Boolean).join(' ');

  // Renderizar contenido de carga
  const renderLoadingContent = () => {
    if (customLoading) {
      return customLoading;
    }

    return (
      <div className="duino-image__loading">
        <Spin size="sm" type="circle" />
      </div>
    );
  };

  // Renderizar contenido de error
  const renderErrorContent = () => {
    if (customError) {
      return customError;
    }

    if (fallback) {
      return fallback;
    }

    return (
      <div className="duino-image__error">
        <svg className="duino-image__error-icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
        </svg>
        <span className="duino-image__error-text">Error al cargar imagen</span>
      </div>
    );
  };

  // Renderizar placeholder
  const renderPlaceholder = () => {
    if (placeholder) {
      return placeholder;
    }

    return (
      <div className="duino-image__placeholder">
        <svg className="duino-image__placeholder-icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
        </svg>
      </div>
    );
  };

  return (
    <>
      <div
        ref={imageRef}
        className={imageClasses}
        style={{
          width,
          height,
          ...style,
        }}
        onClick={handlePreviewClick}
      >
        {!shouldLoad && renderPlaceholder()}
        
        {shouldLoad && (
          <>
            {imageState === 'loading' && renderLoadingContent()}
            {imageState === 'error' && renderErrorContent()}
            
            <img
              ref={imgRef}
              src={src}
              alt={alt}
              className={`duino-image__img duino-image__img--${imageState}`}
              onLoad={handleLoad}
              onError={handleError}
              {...rest}
            />

            {preview && imageState === 'loaded' && (
              <div className="duino-image__preview-overlay">
                <svg className="duino-image__preview-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                </svg>
              </div>
            )}
          </>
        )}

        {caption && (
          <div className="duino-image__caption">
            {caption}
          </div>
        )}
      </div>

      {/* Modal de preview */}
      {showPreview && (
        <div 
          className="duino-image__preview-modal"
          onClick={() => setShowPreview(false)}
        >
          <div className="duino-image__preview-content">
            <button
              className="duino-image__preview-close"
              onClick={() => setShowPreview(false)}
              aria-label="Cerrar preview"
            >
              ×
            </button>
            <img
              src={src}
              alt={alt}
              className="duino-image__preview-img"
            />
            {caption && (
              <div className="duino-image__preview-caption">
                {caption}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

Image.displayName = 'Image';
