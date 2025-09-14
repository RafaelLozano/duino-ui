import React, { useState, useRef, useEffect, useMemo, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import './select.css';

export type SelectSize = 'sm' | 'md' | 'lg';
export type SelectVariant = 'default' | 'filled' | 'borderless';

export interface SelectOption {
  value: string | number;
  label: ReactNode;
  disabled?: boolean;
  group?: string;
  icon?: ReactNode;
  description?: string;
}

export interface SelectProps {
  // Basic props
  value?: string | number | (string | number)[];
  defaultValue?: string | number | (string | number)[];
  placeholder?: string;
  disabled?: boolean;
  loading?: boolean;
  clearable?: boolean;
  
  // Options
  options: SelectOption[];
  
  // Multiple selection
  multiple?: boolean;
  maxTagCount?: number;
  maxTagPlaceholder?: (omittedValues: (string | number)[]) => ReactNode;
  
  // Search
  searchable?: boolean;
  searchPlaceholder?: string;
  notFoundContent?: ReactNode;
  filterOption?: (input: string, option: SelectOption) => boolean;
  
  // Styling
  size?: SelectSize;
  variant?: SelectVariant;
  className?: string;
  dropdownClassName?: string;
  
  // States
  error?: boolean;
  success?: boolean;
  
  // Callbacks
  onChange?: (value: string | number | (string | number)[], option: SelectOption | SelectOption[]) => void;
  onSearch?: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onDropdownVisibleChange?: (visible: boolean) => void;
  
  // Dropdown
  dropdownMaxHeight?: number;
  dropdownMatchSelectWidth?: boolean;
  getPopupContainer?: () => HTMLElement;
  
  // Labels and accessibility
  'aria-label'?: string;
  'aria-labelledby'?: string;
  id?: string;
}

// Hook para manejar clicks fuera del componente
const useClickOutside = (ref: React.RefObject<HTMLElement | null>, handler: () => void) => {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler();
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
};

export const Select: React.FC<SelectProps> = ({
  value: controlledValue,
  defaultValue,
  placeholder = 'Seleccionar...',
  disabled = false,
  loading = false,
  clearable = false,
  options = [],
  multiple = false,
  maxTagCount = 3,
  maxTagPlaceholder = (omitted) => `+${omitted.length} más`,
  searchable = false,
  searchPlaceholder = 'Buscar...',
  notFoundContent = 'No se encontraron opciones',
  filterOption,
  size = 'md',
  variant = 'default',
  className = '',
  dropdownClassName = '',
  error = false,
  success = false,
  onChange,
  onSearch,
  onFocus,
  onBlur,
  onDropdownVisibleChange,
  dropdownMaxHeight = 300,
  dropdownMatchSelectWidth = true,
  getPopupContainer,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  id,
}) => {
  const [internalValue, setInternalValue] = useState<string | number | (string | number)[]>(
    controlledValue !== undefined ? controlledValue : defaultValue || (multiple ? [] : '')
  );
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [focusedIndex, setFocusedIndex] = useState(-1);

  const selectRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Valor actual (controlado o no controlado)
  const currentValue = controlledValue !== undefined ? controlledValue : internalValue;

  // Cerrar dropdown al hacer click fuera
  useClickOutside(selectRef, () => {
    if (isOpen) {
      setIsOpen(false);
      onDropdownVisibleChange?.(false);
    }
  });

  // Filtrar opciones basado en la búsqueda
  const filteredOptions = useMemo(() => {
    if (!searchable || !searchValue) return options;
    
    const defaultFilter = (input: string, option: SelectOption) => {
      const label = typeof option.label === 'string' ? option.label : String(option.value);
      return label.toLowerCase().includes(input.toLowerCase());
    };
    
    const filter = filterOption || defaultFilter;
    return options.filter(option => filter(searchValue, option));
  }, [options, searchValue, searchable, filterOption]);

  // Agrupar opciones
  const groupedOptions = useMemo(() => {
    const groups: { [key: string]: SelectOption[] } = {};
    const ungrouped: SelectOption[] = [];

    filteredOptions.forEach(option => {
      if (option.group) {
        if (!groups[option.group]) {
          groups[option.group] = [];
        }
        groups[option.group].push(option);
      } else {
        ungrouped.push(option);
      }
    });

    return { groups, ungrouped };
  }, [filteredOptions]);

  // Obtener opciones seleccionadas
  const selectedOptions = useMemo(() => {
    if (multiple && Array.isArray(currentValue)) {
      return options.filter(option => currentValue.includes(option.value));
    } else if (!multiple && currentValue !== '' && currentValue !== undefined) {
      return options.filter(option => option.value === currentValue);
    }
    return [];
  }, [currentValue, options, multiple]);

  // Manejar selección de opción
  const handleOptionClick = (option: SelectOption) => {
    if (option.disabled) return;

    let newValue: string | number | (string | number)[];
    let selectedOption: SelectOption | SelectOption[];

    if (multiple) {
      const currentArray = Array.isArray(currentValue) ? currentValue : [];
      if (currentArray.includes(option.value)) {
        newValue = currentArray.filter(v => v !== option.value);
      } else {
        newValue = [...currentArray, option.value];
      }
      selectedOption = options.filter(opt => (newValue as (string | number)[]).includes(opt.value));
    } else {
      newValue = option.value;
      selectedOption = option;
      setIsOpen(false);
      onDropdownVisibleChange?.(false);
    }

    if (controlledValue === undefined) {
      setInternalValue(newValue);
    }

    onChange?.(newValue, selectedOption);
  };

  // Manejar eliminación de tags
  const handleTagRemove = (optionValue: string | number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!multiple || !Array.isArray(currentValue)) return;

    const newValue = currentValue.filter(v => v !== optionValue);
    const selectedOption = options.filter(opt => newValue.includes(opt.value));

    if (controlledValue === undefined) {
      setInternalValue(newValue);
    }

    onChange?.(newValue, selectedOption);
  };

  // Manejar limpieza
  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newValue = multiple ? [] : '';
    
    if (controlledValue === undefined) {
      setInternalValue(newValue);
    }

    onChange?.(newValue, multiple ? [] : {} as SelectOption);
  };

  // Manejar búsqueda
  const handleSearch = (value: string) => {
    setSearchValue(value);
    setFocusedIndex(-1);
    onSearch?.(value);
  };

  // Manejar teclas
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;

    switch (e.key) {
      case 'Enter':
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
          onDropdownVisibleChange?.(true);
        } else if (focusedIndex >= 0 && filteredOptions[focusedIndex]) {
          handleOptionClick(filteredOptions[focusedIndex]);
        }
        break;
      case 'Escape':
        if (isOpen) {
          setIsOpen(false);
          onDropdownVisibleChange?.(false);
        }
        break;
      case 'ArrowDown':
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
          onDropdownVisibleChange?.(true);
        } else {
          setFocusedIndex(prev => 
            prev < filteredOptions.length - 1 ? prev + 1 : 0
          );
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (isOpen) {
          setFocusedIndex(prev => 
            prev > 0 ? prev - 1 : filteredOptions.length - 1
          );
        }
        break;
    }
  };

  // Renderizar tags para selección múltiple
  const renderTags = () => {
    if (!multiple || !Array.isArray(currentValue) || currentValue.length === 0) {
      return null;
    }

    const visibleTags = selectedOptions.slice(0, maxTagCount);
    const hiddenTags = selectedOptions.slice(maxTagCount);

    return (
      <div className="duino-select__tags">
        {visibleTags.map(option => (
          <span key={option.value} className="duino-select__tag">
            <span className="duino-select__tag-content">{option.label}</span>
            <button
              type="button"
              className="duino-select__tag-close"
              onClick={(e) => handleTagRemove(option.value, e)}
              aria-label={`Remover ${option.label}`}
            >
              ×
            </button>
          </span>
        ))}
        {hiddenTags.length > 0 && (
          <span className="duino-select__tag duino-select__tag--more">
            {maxTagPlaceholder(hiddenTags.map(opt => opt.value))}
          </span>
        )}
      </div>
    );
  };

  // Renderizar el contenido del selector
  const renderSelectorContent = () => {
    if (multiple && Array.isArray(currentValue) && currentValue.length > 0) {
      return renderTags();
    }

    if (!multiple && currentValue !== '' && currentValue !== undefined) {
      const selected = selectedOptions[0];
      return selected ? (
        <div className="duino-select__single-value">
          {selected.icon && <span className="duino-select__option-icon">{selected.icon}</span>}
          <span>{selected.label}</span>
        </div>
      ) : null;
    }

    return <span className="duino-select__placeholder">{placeholder}</span>;
  };

  // Construir clases CSS
  const selectClasses = [
    'duino-select',
    `duino-select--${size}`,
    `duino-select--${variant}`,
    isOpen && 'duino-select--open',
    disabled && 'duino-select--disabled',
    error && 'duino-select--error',
    success && 'duino-select--success',
    loading && 'duino-select--loading',
    multiple && 'duino-select--multiple',
    className
  ].filter(Boolean).join(' ');

  const dropdownClasses = [
    'duino-select__dropdown',
    dropdownClassName
  ].filter(Boolean).join(' ');

  // Posición del dropdown
  const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({});

  useEffect(() => {
    if (isOpen && selectRef.current) {
      const rect = selectRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const spaceBelow = viewportHeight - rect.bottom;
      const spaceAbove = rect.top;
      
      const dropdownHeight = Math.min(dropdownMaxHeight, 300);
      const showAbove = spaceBelow < dropdownHeight && spaceAbove > spaceBelow;

      setDropdownStyle({
        position: 'fixed',
        left: rect.left,
        width: dropdownMatchSelectWidth ? rect.width : 'auto',
        minWidth: dropdownMatchSelectWidth ? rect.width : 200,
        maxHeight: dropdownMaxHeight,
        zIndex: 1050,
        ...(showAbove ? {
          bottom: viewportHeight - rect.top,
        } : {
          top: rect.bottom,
        })
      });
    }
  }, [isOpen, dropdownMaxHeight, dropdownMatchSelectWidth]);

  // Enfocar input de búsqueda cuando se abre
  useEffect(() => {
    if (isOpen && searchable && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen, searchable]);

  const dropdownContent = isOpen && (
    <div
      ref={dropdownRef}
      className={dropdownClasses}
      style={dropdownStyle}
      id={`${id || 'select'}-dropdown`}
      role="listbox"
    >
      {searchable && (
        <div className="duino-select__search">
          <input
            ref={searchInputRef}
            type="text"
            className="duino-select__search-input"
            placeholder={searchPlaceholder}
            value={searchValue}
            onChange={(e) => handleSearch(e.target.value)}
            aria-label="Buscar opciones"
          />
        </div>
      )}

      <div className="duino-select__options">
        {filteredOptions.length === 0 ? (
          <div className="duino-select__empty">
            {notFoundContent}
          </div>
        ) : (
          <>
            {/* Opciones sin grupo */}
            {groupedOptions.ungrouped.map((option, index) => {
              const isSelected = multiple 
                ? Array.isArray(currentValue) && currentValue.includes(option.value)
                : currentValue === option.value;
              const isFocused = index === focusedIndex;

              return (
                <div
                  key={option.value}
                  className={`duino-select__option ${isSelected ? 'duino-select__option--selected' : ''} ${isFocused ? 'duino-select__option--focused' : ''} ${option.disabled ? 'duino-select__option--disabled' : ''}`}
                  onClick={() => handleOptionClick(option)}
                >
                  {multiple && (
                    <input
                      type="checkbox"
                      checked={isSelected}
                      readOnly
                      className="duino-select__checkbox"
                    />
                  )}
                  {option.icon && <span className="duino-select__option-icon">{option.icon}</span>}
                  <div className="duino-select__option-content">
                    <span className="duino-select__option-label">{option.label}</span>
                    {option.description && (
                      <span className="duino-select__option-description">{option.description}</span>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Opciones agrupadas */}
            {Object.entries(groupedOptions.groups).map(([groupName, groupOptions]) => (
              <div key={groupName} className="duino-select__group">
                <div className="duino-select__group-title">{groupName}</div>
                {groupOptions.map((option, index) => {
                  const globalIndex = groupedOptions.ungrouped.length + 
                    Object.entries(groupedOptions.groups)
                      .slice(0, Object.keys(groupedOptions.groups).indexOf(groupName))
                      .reduce((acc, [, opts]) => acc + opts.length, 0) + index;
                  
                  const isSelected = multiple 
                    ? Array.isArray(currentValue) && currentValue.includes(option.value)
                    : currentValue === option.value;
                  const isFocused = globalIndex === focusedIndex;

                  return (
                    <div
                      key={option.value}
                      className={`duino-select__option ${isSelected ? 'duino-select__option--selected' : ''} ${isFocused ? 'duino-select__option--focused' : ''} ${option.disabled ? 'duino-select__option--disabled' : ''}`}
                      onClick={() => handleOptionClick(option)}
                    >
                      {multiple && (
                        <input
                          type="checkbox"
                          checked={isSelected}
                          readOnly
                          className="duino-select__checkbox"
                        />
                      )}
                      {option.icon && <span className="duino-select__option-icon">{option.icon}</span>}
                      <div className="duino-select__option-content">
                        <span className="duino-select__option-label">{option.label}</span>
                        {option.description && (
                          <span className="duino-select__option-description">{option.description}</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );

  return (
    <div
      ref={selectRef}
      className={selectClasses}
      onClick={() => {
        if (!disabled && !loading) {
          const newOpen = !isOpen;
          setIsOpen(newOpen);
          onDropdownVisibleChange?.(newOpen);
          
          if (newOpen) {
            onFocus?.();
          } else {
            onBlur?.();
          }
        }
      }}
      onKeyDown={handleKeyDown}
      tabIndex={disabled ? -1 : 0}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
      aria-expanded={isOpen ? "true" : "false"}
      aria-haspopup="listbox"
      aria-controls={isOpen ? `${id || 'select'}-dropdown` : undefined}
      role="combobox"
      id={id}
    >
      <div className="duino-select__selector">
        {renderSelectorContent()}
        
        <div className="duino-select__actions">
          {loading && (
            <div className="duino-select__loading-icon">
              <div className="duino-select__spinner" />
            </div>
          )}
          
          {clearable && !loading && selectedOptions.length > 0 && (
            <button
              type="button"
              className="duino-select__clear"
              onClick={handleClear}
              aria-label="Limpiar selección"
            >
              ×
            </button>
          )}
          
          <div className="duino-select__arrow">
            <svg viewBox="0 0 12 12" fill="currentColor">
              <path d="M6 8.825L1.175 4L2.35 2.825L6 6.475L9.65 2.825L10.825 4L6 8.825Z" />
            </svg>
          </div>
        </div>
      </div>

      {getPopupContainer ? 
        createPortal(dropdownContent, getPopupContainer()) : 
        createPortal(dropdownContent, document.body)
      }
    </div>
  );
};

Select.displayName = 'Select';
