import React, { ReactNode } from 'react';
import './spin.css';

export type SpinSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type SpinType = 'circle' | 'dots' | 'pulse' | 'bars' | 'ring' | 'wave';

export interface SpinProps {
  // Basic props
  spinning?: boolean;
  size?: SpinSize;
  type?: SpinType;
  
  // Content
  children?: ReactNode;
  tip?: ReactNode;
  
  // Styling
  className?: string;
  style?: React.CSSProperties;
  
  // Wrapper when used with children
  wrapperClassName?: string;
  
  // Custom
  indicator?: ReactNode;
  delay?: number;
  
  // Accessibility
  'aria-label'?: string;
  id?: string;
}

// Componentes de spinner individuales
const CircleSpinner: React.FC<{ size: SpinSize }> = ({ size }) => (
  <svg className={`duino-spin__svg duino-spin__svg--${size}`} viewBox="0 0 24 24">
    <circle
      className="duino-spin__circle"
      cx="12"
      cy="12"
      r="10"
      fill="none"
      strokeWidth="2"
    />
  </svg>
);

const DotsSpinner: React.FC<{ size: SpinSize }> = ({ size }) => (
  <div className={`duino-spin__dots duino-spin__dots--${size}`}>
    <div className="duino-spin__dot duino-spin__dot--1" />
    <div className="duino-spin__dot duino-spin__dot--2" />
    <div className="duino-spin__dot duino-spin__dot--3" />
  </div>
);

const PulseSpinner: React.FC<{ size: SpinSize }> = ({ size }) => (
  <div className={`duino-spin__pulse duino-spin__pulse--${size}`}>
    <div className="duino-spin__pulse-ring duino-spin__pulse-ring--1" />
    <div className="duino-spin__pulse-ring duino-spin__pulse-ring--2" />
    <div className="duino-spin__pulse-ring duino-spin__pulse-ring--3" />
  </div>
);

const BarsSpinner: React.FC<{ size: SpinSize }> = ({ size }) => (
  <div className={`duino-spin__bars duino-spin__bars--${size}`}>
    <div className="duino-spin__bar duino-spin__bar--1" />
    <div className="duino-spin__bar duino-spin__bar--2" />
    <div className="duino-spin__bar duino-spin__bar--3" />
    <div className="duino-spin__bar duino-spin__bar--4" />
    <div className="duino-spin__bar duino-spin__bar--5" />
  </div>
);

const RingSpinner: React.FC<{ size: SpinSize }> = ({ size }) => (
  <div className={`duino-spin__ring duino-spin__ring--${size}`}>
    <div className="duino-spin__ring-segment duino-spin__ring-segment--1" />
    <div className="duino-spin__ring-segment duino-spin__ring-segment--2" />
    <div className="duino-spin__ring-segment duino-spin__ring-segment--3" />
    <div className="duino-spin__ring-segment duino-spin__ring-segment--4" />
  </div>
);

const WaveSpinner: React.FC<{ size: SpinSize }> = ({ size }) => (
  <div className={`duino-spin__wave duino-spin__wave--${size}`}>
    <div className="duino-spin__wave-bar duino-spin__wave-bar--1" />
    <div className="duino-spin__wave-bar duino-spin__wave-bar--2" />
    <div className="duino-spin__wave-bar duino-spin__wave-bar--3" />
    <div className="duino-spin__wave-bar duino-spin__wave-bar--4" />
    <div className="duino-spin__wave-bar duino-spin__wave-bar--5" />
  </div>
);

export const Spin: React.FC<SpinProps> = ({
  spinning = true,
  size = 'md',
  type = 'circle',
  children,
  tip,
  className = '',
  style,
  wrapperClassName = '',
  indicator,
  delay = 0,
  'aria-label': ariaLabel = 'Cargando...',
  id,
}) => {
  const [showSpinner, setShowSpinner] = React.useState(delay === 0);

  // Manejar delay
  React.useEffect(() => {
    if (delay > 0 && spinning) {
      const timer = setTimeout(() => setShowSpinner(true), delay);
      return () => clearTimeout(timer);
    } else {
      setShowSpinner(spinning);
    }
  }, [spinning, delay]);

  // Renderizar el spinner apropiado
  const renderSpinner = () => {
    if (indicator) {
      return indicator;
    }

    switch (type) {
      case 'dots':
        return <DotsSpinner size={size} />;
      case 'pulse':
        return <PulseSpinner size={size} />;
      case 'bars':
        return <BarsSpinner size={size} />;
      case 'ring':
        return <RingSpinner size={size} />;
      case 'wave':
        return <WaveSpinner size={size} />;
      case 'circle':
      default:
        return <CircleSpinner size={size} />;
    }
  };

  const spinClasses = [
    'duino-spin',
    `duino-spin--${size}`,
    `duino-spin--${type}`,
    showSpinner && spinning && 'duino-spin--spinning',
    className
  ].filter(Boolean).join(' ');

  // Si no hay children, renderizar solo el spinner
  if (!children) {
    return (
      <div
        className={spinClasses}
        style={style}
        role="status"
        aria-label={ariaLabel}
        aria-live="polite"
        id={id}
      >
        {showSpinner && spinning && (
          <>
            {renderSpinner()}
            {tip && <div className="duino-spin__tip">{tip}</div>}
          </>
        )}
      </div>
    );
  }

  // Si hay children, envolver el contenido
  const wrapperClasses = [
    'duino-spin-wrapper',
    showSpinner && spinning && 'duino-spin-wrapper--spinning',
    wrapperClassName
  ].filter(Boolean).join(' ');

  return (
    <div className={wrapperClasses} style={style}>
      {showSpinner && spinning && (
        <div className="duino-spin-overlay">
          <div className={spinClasses} role="status" aria-label={ariaLabel} id={id}>
            {renderSpinner()}
            {tip && <div className="duino-spin__tip">{tip}</div>}
          </div>
        </div>
      )}
      <div className={showSpinner && spinning ? 'duino-spin-content--blurred' : 'duino-spin-content'}>
        {children}
      </div>
    </div>
  );
};

Spin.displayName = 'Spin';
