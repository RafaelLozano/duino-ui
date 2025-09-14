import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export type DuinoTheme = {
  colors: {
    brand: {
      50: string;
      100: string;
      200: string;
      300: string;
      400: string;
      500: string;
      600: string;
      700: string;
      800: string;
      900: string;
    };
    danger: string;
    background: string;
    foreground: string;
    muted: string;
    border: string;
    ring: string;
  };
  radius: string;
  font: string;
  spacing: {
    sm: string;
    md: string;
    lg: string;
  };
};

const defaultTheme: DuinoTheme = {
  colors: {
    brand: {
      50: '#f0fdfa',
      100: '#ccfbf1',
      200: '#99f6e4',
      300: '#5eead4',
      400: '#2dd4bf',
      500: '#14b8a6',
      600: '#0d9488',
      700: '#008184',
      800: '#005c5f',
      900: '#134e4a',
    },
    danger: '#ef4444',
    background: '#ffffff',
    foreground: '#13151a',
    muted: '#6b7280',
    border: '#e5e7eb',
    ring: '#5eead4',
  },
  radius: '12px',
  font: 'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Inter, Arial, "Noto Sans", "Apple Color Emoji", "Segoe UI Emoji"',
  spacing: {
    sm: '0.375rem',
    md: '0.5rem',
    lg: '0.75rem',
  },
};

type ThemeContextType = {
  theme: DuinoTheme;
  setTheme: (theme: Partial<DuinoTheme>) => void;
  resetTheme: () => void;
  applyPreset: (preset: keyof typeof themePresets) => void;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: defaultTheme,
  setTheme: () => {},
  resetTheme: () => {},
  applyPreset: () => {},
});

// Presets de temas predefinidos
export const themePresets = {
  arduino: defaultTheme,
  
  blue: {
    ...defaultTheme,
    colors: {
      ...defaultTheme.colors,
      brand: {
        50: '#eff6ff',
        100: '#dbeafe',
        200: '#bfdbfe',
        300: '#93c5fd',
        400: '#60a5fa',
        500: '#3b82f6',
        600: '#2563eb',
        700: '#1d4ed8',
        800: '#1e40af',
        900: '#1e3a8a',
      },
      ring: '#93c5fd',
    },
    radius: '8px',
  } as DuinoTheme,
  
  purple: {
    ...defaultTheme,
    colors: {
      ...defaultTheme.colors,
      brand: {
        50: '#faf5ff',
        100: '#f3e8ff',
        200: '#e9d5ff',
        300: '#d8b4fe',
        400: '#c084fc',
        500: '#a855f7',
        600: '#9333ea',
        700: '#7c3aed',
        800: '#6b21a8',
        900: '#581c87',
      },
      ring: '#d8b4fe',
    },
    radius: '16px',
  } as DuinoTheme,
  
  minimal: {
    ...defaultTheme,
    colors: {
      ...defaultTheme.colors,
      brand: {
        50: '#f9fafb',
        100: '#f3f4f6',
        200: '#e5e7eb',
        300: '#d1d5db',
        400: '#9ca3af',
        500: '#6b7280',
        600: '#4b5563',
        700: '#374151',
        800: '#1f2937',
        900: '#111827',
      },
      ring: '#d1d5db',
    },
    radius: '4px',
  } as DuinoTheme,
  
  dark: {
    ...defaultTheme,
    colors: {
      ...defaultTheme.colors,
      background: '#1f2937',
      foreground: '#f9fafb',
      muted: '#9ca3af',
      border: '#374151',
    },
  } as DuinoTheme,
};

export interface ThemeProviderProps {
  children: ReactNode;
  initialTheme?: Partial<DuinoTheme>;
  preset?: keyof typeof themePresets;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  initialTheme,
  preset,
}) => {
  const [theme, setThemeState] = useState<DuinoTheme>(() => {
    if (preset) {
      return { ...themePresets[preset], ...initialTheme };
    }
    return { ...defaultTheme, ...initialTheme };
  });

  const setTheme = (newTheme: Partial<DuinoTheme>) => {
    setThemeState(prev => ({
      ...prev,
      ...newTheme,
      colors: { 
        ...prev.colors, 
        ...(newTheme.colors || {}),
        brand: { ...prev.colors.brand, ...(newTheme.colors?.brand || {}) }
      },
      spacing: { ...prev.spacing, ...(newTheme.spacing || {}) },
    }));
  };

  const resetTheme = () => {
    setThemeState(defaultTheme);
  };

  const applyPreset = (presetName: keyof typeof themePresets) => {
    setThemeState(themePresets[presetName]);
  };

  // Aplicar tema al DOM
  useEffect(() => {
    const root = document.documentElement;
    
    // Aplicar colores de marca
    Object.entries(theme.colors.brand).forEach(([key, value]) => {
      root.style.setProperty(`--duino-brand-${key}`, value);
    });
    
    // Aplicar otros colores
    root.style.setProperty('--duino-danger-500', theme.colors.danger);
    root.style.setProperty('--duino-color-bg', theme.colors.background);
    root.style.setProperty('--duino-color-fg', theme.colors.foreground);
    root.style.setProperty('--duino-color-muted', theme.colors.muted);
    root.style.setProperty('--duino-border', theme.colors.border);
    root.style.setProperty('--duino-ring', theme.colors.ring);
    
    // Aplicar otras propiedades
    root.style.setProperty('--duino-radius', theme.radius);
    root.style.setProperty('--duino-font', theme.font);
    root.style.setProperty('--duino-gap-sm', theme.spacing.sm);
    root.style.setProperty('--duino-gap', theme.spacing.md);
    root.style.setProperty('--duino-gap-lg', theme.spacing.lg);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, resetTheme, applyPreset }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Hook para generar paleta de colores desde un color base
export const useColorPalette = () => {
  const generatePalette = (baseColor: string) => {
    // Función simplificada para generar paleta
    // En producción, usar una librería como chroma.js
    const palette = {
      50: `color-mix(in srgb, ${baseColor} 5%, white)`,
      100: `color-mix(in srgb, ${baseColor} 10%, white)`,
      200: `color-mix(in srgb, ${baseColor} 25%, white)`,
      300: `color-mix(in srgb, ${baseColor} 40%, white)`,
      400: `color-mix(in srgb, ${baseColor} 70%, white)`,
      500: baseColor,
      600: `color-mix(in srgb, ${baseColor} 90%, black)`,
      700: `color-mix(in srgb, ${baseColor} 80%, black)`,
      800: `color-mix(in srgb, ${baseColor} 70%, black)`,
      900: `color-mix(in srgb, ${baseColor} 60%, black)`,
    };
    
    return palette;
  };

  return { generatePalette };
};
