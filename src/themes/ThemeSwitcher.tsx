import React, { useState } from 'react';
import { useTheme, themePresets } from './ThemeProvider';

export interface ThemeSwitcherProps {
  className?: string;
  showColorPicker?: boolean;
  showPresets?: boolean;
  showCustomization?: boolean;
}

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({
  className = '',
  showColorPicker = true,
  showPresets = true,
  showCustomization = true,
}) => {
  const { theme, applyPreset, setTheme, resetTheme } = useTheme();
  const [customColor, setCustomColor] = useState('#14b8a6');
  const [customRadius, setCustomRadius] = useState('12');

  const handlePresetChange = (presetName: keyof typeof themePresets) => {
    applyPreset(presetName);
  };

  const handleCustomColorChange = (color: string) => {
    setCustomColor(color);
    // Generar paleta básica desde el color
    const palette = {
      50: `color-mix(in srgb, ${color} 5%, white)`,
      100: `color-mix(in srgb, ${color} 10%, white)`,
      200: `color-mix(in srgb, ${color} 25%, white)`,
      300: `color-mix(in srgb, ${color} 40%, white)`,
      400: `color-mix(in srgb, ${color} 70%, white)`,
      500: color,
      600: `color-mix(in srgb, ${color} 90%, black)`,
      700: `color-mix(in srgb, ${color} 80%, black)`,
      800: `color-mix(in srgb, ${color} 70%, black)`,
      900: `color-mix(in srgb, ${color} 60%, black)`,
    };

    setTheme({
      colors: {
        ...theme.colors,
        brand: palette,
        ring: palette[300],
      },
    });
  };

  const handleRadiusChange = (radius: string) => {
    setCustomRadius(radius);
    setTheme({ radius: `${radius}px` });
  };

  const presetInfo = {
    arduino: { name: 'Arduino', color: '#14b8a6', description: 'Teal clásico de Arduino' },
    blue: { name: 'Azul', color: '#3b82f6', description: 'Azul corporativo' },
    purple: { name: 'Púrpura', color: '#a855f7', description: 'Púrpura moderno' },
    minimal: { name: 'Minimal', color: '#6b7280', description: 'Gris minimalista' },
    dark: { name: 'Oscuro', color: '#14b8a6', description: 'Tema oscuro' },
  };

  return (
    <div className={`duino-theme-switcher ${className}`} style={{ 
      padding: '20px', 
      border: '1px solid var(--duino-border)', 
      borderRadius: 'var(--duino-radius)',
      backgroundColor: 'var(--duino-color-bg)',
      fontFamily: 'var(--duino-font)'
    }}>
      <h3 style={{ 
        margin: '0 0 16px 0', 
        color: 'var(--duino-color-fg)',
        fontSize: '18px',
        fontWeight: '600'
      }}>
        🎨 Personalizar Tema
      </h3>

      {showPresets && (
        <div style={{ marginBottom: '24px' }}>
          <h4 style={{ 
            margin: '0 0 12px 0', 
            color: 'var(--duino-color-fg)',
            fontSize: '14px',
            fontWeight: '500'
          }}>
            Temas Predefinidos
          </h4>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '8px'
          }}>
            {Object.entries(presetInfo).map(([key, info]) => (
              <button
                key={key}
                onClick={() => handlePresetChange(key as keyof typeof themePresets)}
                className="duino-btn duino-btn--ghost"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  justifyContent: 'flex-start',
                  padding: '8px 12px',
                  textAlign: 'left'
                }}
              >
                <div
                  style={{
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    backgroundColor: info.color,
                    flexShrink: 0,
                  }}
                />
                <div>
                  <div style={{ fontSize: '14px', fontWeight: '500' }}>
                    {info.name}
                  </div>
                  <div style={{ fontSize: '12px', opacity: 0.7 }}>
                    {info.description}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {showColorPicker && (
        <div style={{ marginBottom: '24px' }}>
          <h4 style={{ 
            margin: '0 0 12px 0', 
            color: 'var(--duino-color-fg)',
            fontSize: '14px',
            fontWeight: '500'
          }}>
            Color Personalizado
          </h4>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <input
              type="color"
              value={customColor}
              onChange={(e) => handleCustomColorChange(e.target.value)}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: 'var(--duino-radius)',
                border: '1px solid var(--duino-border)',
                cursor: 'pointer',
              }}
            />
            <input
              type="text"
              value={customColor}
              onChange={(e) => handleCustomColorChange(e.target.value)}
              placeholder="#14b8a6"
              style={{
                flex: 1,
                padding: '8px 12px',
                borderRadius: 'var(--duino-radius)',
                border: '1px solid var(--duino-border)',
                fontSize: '14px',
                fontFamily: 'monospace',
              }}
            />
          </div>
        </div>
      )}

      {showCustomization && (
        <div style={{ marginBottom: '24px' }}>
          <h4 style={{ 
            margin: '0 0 12px 0', 
            color: 'var(--duino-color-fg)',
            fontSize: '14px',
            fontWeight: '500'
          }}>
            Border Radius
          </h4>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <input
              type="range"
              min="0"
              max="24"
              value={customRadius}
              onChange={(e) => handleRadiusChange(e.target.value)}
              style={{ flex: 1 }}
            />
            <span style={{ 
              minWidth: '50px', 
              fontSize: '14px',
              fontFamily: 'monospace',
              color: 'var(--duino-color-muted)'
            }}>
              {customRadius}px
            </span>
          </div>
        </div>
      )}

      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <button
          onClick={resetTheme}
          className="duino-btn duino-btn--secondary"
          style={{ fontSize: '14px' }}
        >
          Resetear
        </button>
        
        <button
          onClick={() => {
            const css = generateThemeCSS(theme);
            navigator.clipboard.writeText(css);
            alert('¡CSS copiado al portapapeles!');
          }}
          className="duino-btn duino-btn--ghost"
          style={{ fontSize: '14px' }}
        >
          Copiar CSS
        </button>
      </div>
    </div>
  );
};

// Función para generar CSS del tema actual
const generateThemeCSS = (theme: any) => {
  const brandColors = Object.entries(theme.colors.brand)
    .map(([key, value]) => `  --duino-brand-${key}: ${value};`)
    .join('\n');

  return `:root {
${brandColors}
  --duino-danger-500: ${theme.colors.danger};
  --duino-color-bg: ${theme.colors.background};
  --duino-color-fg: ${theme.colors.foreground};
  --duino-color-muted: ${theme.colors.muted};
  --duino-border: ${theme.colors.border};
  --duino-ring: ${theme.colors.ring};
  --duino-radius: ${theme.radius};
  --duino-font: ${theme.font};
  --duino-gap-sm: ${theme.spacing.sm};
  --duino-gap: ${theme.spacing.md};
  --duino-gap-lg: ${theme.spacing.lg};
}`;
};
