import React, { useState, useRef, ReactNode, forwardRef } from 'react';
import { Spin } from '../Spin/Spin';
import './input.css';

export type InputSize = 'sm' | 'md' | 'lg';
export type InputVariant = 'default' | 'filled' | 'borderless';
export type InputType = 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix'> {
  // Basic props
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  type?: InputType;
  
  // Styling
  size?: InputSize;
  variant?: InputVariant;
  
  // States
  loading?: boolean;
  error?: boolean | string;
  success?: boolean;
  
  // Content
  prefix?: ReactNode;
  suffix?: ReactNode;
  addonBefore?: ReactNode;
  addonAfter?: ReactNode;
  
  // Special features
  allowClear?: boolean;
  showCount?: boolean;
  maxLength?: number;
  
  // Callbacks
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPressEnter?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onClear?: () => void;
  
  // Styling
  className?: string;
  inputClassName?: string;
  
  // Labels and help
  label?: ReactNode;
  helperText?: ReactNode;
  required?: boolean;
}

export interface TextAreaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
  // Basic props
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  
  // Styling
  size?: InputSize;
  variant?: InputVariant;
  
  // States
  loading?: boolean;
  error?: boolean | string;
  success?: boolean;
  
  // Special features
  allowClear?: boolean;
  showCount?: boolean;
  maxLength?: number;
  autoSize?: boolean | { minRows?: number; maxRows?: number };
  
  // Callbacks
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onClear?: () => void;
  
  // Styling
  className?: string;
  textareaClassName?: string;
  
  // Labels and help
  label?: ReactNode;
  helperText?: ReactNode;
  required?: boolean;
}

// Hook para auto-resize de textarea
const useAutoSize = (
  textareaRef: React.RefObject<HTMLTextAreaElement>,
  autoSize: boolean | { minRows?: number; maxRows?: number },
  value: string
) => {
  React.useEffect(() => {
    if (!autoSize || !textareaRef.current) return;

    const textarea = textareaRef.current;
    const { minRows = 2, maxRows = 6 } = typeof autoSize === 'object' ? autoSize : {};

    // Reset height to calculate new height
    textarea.style.height = 'auto';
    
    // Calculate new height
    const lineHeight = parseInt(getComputedStyle(textarea).lineHeight) || 20;
    const minHeight = lineHeight * minRows;
    const maxHeight = lineHeight * maxRows;
    const scrollHeight = textarea.scrollHeight;
    
    const newHeight = Math.min(Math.max(scrollHeight, minHeight), maxHeight);
    textarea.style.height = `${newHeight}px`;
  }, [autoSize, value, textareaRef]);
};

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  value,
  defaultValue,
  placeholder,
  disabled = false,
  readOnly = false,
  type = 'text',
  size = 'md',
  variant = 'default',
  loading = false,
  error = false,
  success = false,
  prefix,
  suffix,
  addonBefore,
  addonAfter,
  allowClear = false,
  showCount = false,
  maxLength,
  onChange,
  onPressEnter,
  onClear,
  className = '',
  inputClassName = '',
  label,
  helperText,
  required = false,
  id,
  ...rest
}, ref) => {
  const [internalValue, setInternalValue] = useState(defaultValue || '');
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState(false);
  
  const currentValue = value !== undefined ? value : internalValue;
  const inputRef = useRef<HTMLInputElement>(null);

  // Combinar refs
  React.useImperativeHandle(ref, () => inputRef.current!);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (value === undefined) {
      setInternalValue(e.target.value);
    }
    onChange?.(e);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onPressEnter?.(e);
    }
    rest.onKeyDown?.(e);
  };

  const handleClear = () => {
    const syntheticEvent = {
      target: { value: '' },
      currentTarget: { value: '' },
    } as React.ChangeEvent<HTMLInputElement>;

    if (value === undefined) {
      setInternalValue('');
    }
    
    onChange?.(syntheticEvent);
    onClear?.();
    inputRef.current?.focus();
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Construir clases CSS
  const wrapperClasses = [
    'duino-input-wrapper',
    label && 'duino-input-wrapper--with-label',
    className
  ].filter(Boolean).join(' ');

  const inputGroupClasses = [
    'duino-input',
    `duino-input--${size}`,
    `duino-input--${variant}`,
    focused && 'duino-input--focused',
    disabled && 'duino-input--disabled',
    readOnly && 'duino-input--readonly',
    error && 'duino-input--error',
    success && 'duino-input--success',
    loading && 'duino-input--loading',
    (prefix || suffix || loading || (allowClear && currentValue)) && 'duino-input--with-addons'
  ].filter(Boolean).join(' ');

  const inputElementClasses = [
    'duino-input__element',
    inputClassName
  ].filter(Boolean).join(' ');

  // Determinar tipo de input actual
  const actualType = type === 'password' && showPassword ? 'text' : type;

  return (
    <div className={wrapperClasses}>
      {label && (
        <label className="duino-input__label" htmlFor={id}>
          {label}
          {required && <span className="duino-input__required">*</span>}
        </label>
      )}

      {addonBefore && (
        <div className="duino-input__addon duino-input__addon--before">
          {addonBefore}
        </div>
      )}

      <div className={inputGroupClasses}>
        {prefix && (
          <div className="duino-input__prefix">
            {prefix}
          </div>
        )}

        <input
          ref={inputRef}
          type={actualType}
          value={currentValue}
          defaultValue={undefined}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          maxLength={maxLength}
          className={inputElementClasses}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={(e) => {
            setFocused(true);
            rest.onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            rest.onBlur?.(e);
          }}
          id={id}
          {...rest}
        />

        <div className="duino-input__suffix">
          {loading && (
            <div className="duino-input__loading">
              <Spin size="xs" type="circle" />
            </div>
          )}

          {type === 'password' && (
            <button
              type="button"
              className="duino-input__password-toggle"
              onClick={togglePasswordVisibility}
              tabIndex={-1}
              aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
            >
              {showPassword ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                  <line x1="1" y1="1" x2="23" y2="23"/>
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
              )}
            </button>
          )}

          {allowClear && currentValue && !disabled && !readOnly && (
            <button
              type="button"
              className="duino-input__clear"
              onClick={handleClear}
              tabIndex={-1}
              aria-label="Limpiar input"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              </svg>
            </button>
          )}

          {suffix}
        </div>

        {showCount && maxLength && (
          <div className="duino-input__count">
            {currentValue.length} / {maxLength}
          </div>
        )}
      </div>

      {addonAfter && (
        <div className="duino-input__addon duino-input__addon--after">
          {addonAfter}
        </div>
      )}

      {(helperText || error) && (
        <div className="duino-input__help">
          {error && typeof error === 'string' ? (
            <div className="duino-input__error-text">{error}</div>
          ) : helperText ? (
            <div className="duino-input__helper-text">{helperText}</div>
          ) : null}
        </div>
      )}
    </div>
  );
});

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(({
  value,
  defaultValue,
  placeholder,
  disabled = false,
  readOnly = false,
  size = 'md',
  variant = 'default',
  loading = false,
  error = false,
  success = false,
  allowClear = false,
  showCount = false,
  maxLength,
  autoSize = false,
  onChange,
  onClear,
  className = '',
  textareaClassName = '',
  label,
  helperText,
  required = false,
  id,
  rows = 4,
  ...rest
}, ref) => {
  const [internalValue, setInternalValue] = useState(defaultValue || '');
  const [focused, setFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const currentValue = value !== undefined ? value : internalValue;

  // Combinar refs
  React.useImperativeHandle(ref, () => textareaRef.current!);

  // Auto-resize
  useAutoSize(textareaRef, autoSize, currentValue);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (value === undefined) {
      setInternalValue(e.target.value);
    }
    onChange?.(e);
  };

  const handleClear = () => {
    const syntheticEvent = {
      target: { value: '' },
      currentTarget: { value: '' },
    } as React.ChangeEvent<HTMLTextAreaElement>;

    if (value === undefined) {
      setInternalValue('');
    }
    
    onChange?.(syntheticEvent);
    onClear?.();
    textareaRef.current?.focus();
  };

  // Construir clases CSS
  const wrapperClasses = [
    'duino-input-wrapper',
    'duino-textarea-wrapper',
    label && 'duino-input-wrapper--with-label',
    className
  ].filter(Boolean).join(' ');

  const textareaGroupClasses = [
    'duino-input',
    'duino-textarea',
    `duino-input--${size}`,
    `duino-input--${variant}`,
    focused && 'duino-input--focused',
    disabled && 'duino-input--disabled',
    readOnly && 'duino-input--readonly',
    error && 'duino-input--error',
    success && 'duino-input--success',
    loading && 'duino-input--loading',
    (loading || (allowClear && currentValue)) && 'duino-input--with-addons'
  ].filter(Boolean).join(' ');

  const textareaElementClasses = [
    'duino-input__element',
    'duino-textarea__element',
    textareaClassName
  ].filter(Boolean).join(' ');

  return (
    <div className={wrapperClasses}>
      {label && (
        <label className="duino-input__label" htmlFor={id}>
          {label}
          {required && <span className="duino-input__required">*</span>}
        </label>
      )}

      <div className={textareaGroupClasses}>
        <textarea
          ref={textareaRef}
          value={currentValue}
          defaultValue={undefined}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          maxLength={maxLength}
          rows={rows}
          className={textareaElementClasses}
          onChange={handleChange}
          onFocus={(e) => {
            setFocused(true);
            rest.onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            rest.onBlur?.(e);
          }}
          id={id}
          {...rest}
        />

        <div className="duino-input__suffix">
          {loading && (
            <div className="duino-input__loading">
              <Spin size="xs" type="circle" />
            </div>
          )}

          {allowClear && currentValue && !disabled && !readOnly && (
            <button
              type="button"
              className="duino-input__clear"
              onClick={handleClear}
              tabIndex={-1}
              aria-label="Limpiar textarea"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              </svg>
            </button>
          )}
        </div>

        {showCount && maxLength && (
          <div className="duino-input__count">
            {currentValue.length} / {maxLength}
          </div>
        )}
      </div>

      {(helperText || error) && (
        <div className="duino-input__help">
          {error && typeof error === 'string' ? (
            <div className="duino-input__error-text">{error}</div>
          ) : helperText ? (
            <div className="duino-input__helper-text">{helperText}</div>
          ) : null}
        </div>
      )}
    </div>
  );
});

// Componente de grupo de inputs
export interface InputGroupProps {
  children: ReactNode;
  className?: string;
  size?: InputSize;
  compact?: boolean;
}

export const InputGroup: React.FC<InputGroupProps> = ({
  children,
  className = '',
  size = 'md',
  compact = false,
}) => {
  const groupClasses = [
    'duino-input-group',
    `duino-input-group--${size}`,
    compact && 'duino-input-group--compact',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={groupClasses}>
      {React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) return child;
        
        return React.cloneElement(child as React.ReactElement<any>, {
          size,
          className: `${child.props.className || ''} duino-input-group__item`.trim(),
        });
      })}
    </div>
  );
};

// Componente Search
export interface SearchProps extends Omit<InputProps, 'type' | 'suffix'> {
  onSearch?: (value: string) => void;
  enterButton?: boolean | ReactNode;
  loading?: boolean;
}

export const Search: React.FC<SearchProps> = ({
  onSearch,
  enterButton = false,
  loading = false,
  ...inputProps
}) => {
  const handleSearch = () => {
    const value = typeof inputProps.value === 'string' ? inputProps.value : '';
    onSearch?.(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
    inputProps.onPressEnter?.(e);
  };

  const searchIcon = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="8"/>
      <path d="m21 21-4.35-4.35"/>
    </svg>
  );

  const suffix = (
    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
      {enterButton ? (
        typeof enterButton === 'boolean' ? (
          <button
            type="button"
            className="duino-input__search-btn"
            onClick={handleSearch}
            disabled={loading}
            aria-label="Buscar"
          >
            {loading ? <Spin size="xs" type="circle" /> : searchIcon}
          </button>
        ) : (
          <div onClick={handleSearch}>
            {enterButton}
          </div>
        )
      ) : (
        <div className="duino-input__search-icon">
          {loading ? <Spin size="xs" type="circle" /> : searchIcon}
        </div>
      )}
    </div>
  );

  return (
    <Input
      {...inputProps}
      type="search"
      suffix={suffix}
      onPressEnter={handleKeyDown}
    />
  );
};

Input.displayName = 'Input';
TextArea.displayName = 'TextArea';
InputGroup.displayName = 'InputGroup';
Search.displayName = 'Search';
