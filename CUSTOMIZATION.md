# 🎨 Guía de Personalización - Duino UI

Esta guía te ayudará a personalizar los colores, border radius, tipografía y otros aspectos visuales del design system Duino UI.

## 📋 Tabla de Contenidos

1. [Personalización Básica con CSS](#personalización-básica-con-css)
2. [Personalización Avanzada con JavaScript](#personalización-avanzada-con-javascript)
3. [Tokens Disponibles](#tokens-disponibles)
4. [Temas Predefinidos](#temas-predefinidos)
5. [Ejemplos Prácticos](#ejemplos-prácticos)

---

## 🎯 Personalización Básica con CSS

### Método 1: Sobrescribir Variables CSS

La forma más sencilla es sobrescribir las variables CSS después de importar los estilos:

```css
/* Tu archivo CSS principal */
@import '@ralorotech/duino-ui/styles.css';

/* Personalización de colores */
:root {
  /* Cambiar paleta de brand (Arduino teal → tu color) */
  --duino-brand-50: #f0f9ff;
  --duino-brand-100: #e0f2fe;
  --duino-brand-200: #bae6fd;
  --duino-brand-300: #7dd3fc;
  --duino-brand-400: #38bdf8;
  --duino-brand-500: #0ea5e9;  /* Color principal */
  --duino-brand-600: #0284c7;
  --duino-brand-700: #0369a1;
  --duino-brand-800: #075985;
  --duino-brand-900: #0c4a6e;

  /* Cambiar border radius */
  --duino-radius: 8px;  /* Era 12px por defecto */

  /* Cambiar tipografía */
  --duino-font: 'Inter', -apple-system, sans-serif;

  /* Cambiar espaciado */
  --duino-gap-sm: 0.25rem;
  --duino-gap: 0.5rem;
  --duino-gap-lg: 1rem;
}
```

### Método 2: CSS Personalizado por Componente

```css
/* Personalizar solo los botones */
.duino-btn--primary {
  background: linear-gradient(135deg, #6366f1, #8b5cf6) !important;
  border-color: #6366f1 !important;
}

.duino-btn--primary:hover {
  background: linear-gradient(135deg, #4f46e5, #7c3aed) !important;
}

/* Personalizar modales */
.duino-modal__container {
  border-radius: 16px !important;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25) !important;
}
```

---

## ⚡ Personalización Avanzada con JavaScript

### Crear un Theme Provider

```tsx
// themes/ThemeProvider.tsx
import React, { createContext, useContext, useEffect } from 'react';

type Theme = {
  colors: {
    brand: string;
    brandLight: string;
    brandDark: string;
    danger: string;
    background: string;
    foreground: string;
  };
  radius: string;
  font: string;
  spacing: {
    sm: string;
    md: string;
    lg: string;
  };
};

const defaultTheme: Theme = {
  colors: {
    brand: '#14b8a6',
    brandLight: '#2dd4bf',
    brandDark: '#0d9488',
    danger: '#ef4444',
    background: '#ffffff',
    foreground: '#13151a',
  },
  radius: '12px',
  font: 'ui-sans-serif, system-ui, sans-serif',
  spacing: {
    sm: '0.375rem',
    md: '0.5rem',
    lg: '0.75rem',
  },
};

const ThemeContext = createContext<{
  theme: Theme;
  setTheme: (theme: Partial<Theme>) => void;
}>({
  theme: defaultTheme,
  setTheme: () => {},
});

export const ThemeProvider: React.FC<{
  children: React.ReactNode;
  initialTheme?: Partial<Theme>;
}> = ({ children, initialTheme }) => {
  const [theme, setThemeState] = React.useState<Theme>({
    ...defaultTheme,
    ...initialTheme,
  });

  const setTheme = (newTheme: Partial<Theme>) => {
    setThemeState(prev => ({
      ...prev,
      ...newTheme,
      colors: { ...prev.colors, ...(newTheme.colors || {}) },
      spacing: { ...prev.spacing, ...(newTheme.spacing || {}) },
    }));
  };

  useEffect(() => {
    const root = document.documentElement;
    
    // Aplicar colores
    root.style.setProperty('--duino-brand-500', theme.colors.brand);
    root.style.setProperty('--duino-brand-400', theme.colors.brandLight);
    root.style.setProperty('--duino-brand-600', theme.colors.brandDark);
    root.style.setProperty('--duino-danger-500', theme.colors.danger);
    root.style.setProperty('--duino-color-bg', theme.colors.background);
    root.style.setProperty('--duino-color-fg', theme.colors.foreground);
    
    // Aplicar otras propiedades
    root.style.setProperty('--duino-radius', theme.radius);
    root.style.setProperty('--duino-font', theme.font);
    root.style.setProperty('--duino-gap-sm', theme.spacing.sm);
    root.style.setProperty('--duino-gap', theme.spacing.md);
    root.style.setProperty('--duino-gap-lg', theme.spacing.lg);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
```

### Uso del Theme Provider

```tsx
// App.tsx
import { ThemeProvider } from './themes/ThemeProvider';
import { Button, Modal } from '@ralorotech/duino-ui';

function App() {
  return (
    <ThemeProvider
      initialTheme={{
        colors: {
          brand: '#6366f1',      // Indigo
          brandLight: '#8b5cf6', // Purple
          brandDark: '#4f46e5',  // Dark indigo
        },
        radius: '8px',
      }}
    >
      <div className="app">
        <Button variant="primary">Mi Botón Personalizado</Button>
      </div>
    </ThemeProvider>
  );
}
```

---

## 🎨 Tokens Disponibles

### Colores

```css
/* Colores de marca (brand) */
--duino-brand-50: #f0fdfa;   /* Muy claro */
--duino-brand-100: #ccfbf1;  /* Claro */
--duino-brand-200: #99f6e4;  /* Claro medio */
--duino-brand-300: #5eead4;  /* Medio claro */
--duino-brand-400: #2dd4bf;  /* Medio */
--duino-brand-500: #14b8a6;  /* Principal */
--duino-brand-600: #0d9488;  /* Medio oscuro */
--duino-brand-700: #008184;  /* Oscuro */
--duino-brand-800: #005c5f;  /* Muy oscuro */
--duino-brand-900: #134e4a;  /* Ultra oscuro */

/* Colores de sistema */
--duino-color-bg: #ffffff;   /* Fondo */
--duino-color-fg: #13151a;   /* Texto */
--duino-color-muted: #6b7280; /* Texto secundario */

/* Colores de estado */
--duino-danger-500: #ef4444; /* Error/peligro */
--duino-border: #e5e7eb;     /* Bordes */
--duino-ring: #5eead4;       /* Focus ring */
```

### Espaciado y Layout

```css
/* Border radius */
--duino-radius: 12px;

/* Espaciado */
--duino-gap-sm: 0.375rem;  /* 6px */
--duino-gap: 0.5rem;       /* 8px */
--duino-gap-lg: 0.75rem;   /* 12px */

/* Tipografía */
--duino-font: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Inter, Arial, "Noto Sans", "Apple Color Emoji", "Segoe UI Emoji";
```

---

## 🌈 Temas Predefinidos

### Tema Arduino (Por defecto)
```css
:root {
  --duino-brand-500: #14b8a6; /* Teal */
  --duino-radius: 12px;
}
```

### Tema Azul Corporativo
```css
:root {
  --duino-brand-50: #eff6ff;
  --duino-brand-100: #dbeafe;
  --duino-brand-200: #bfdbfe;
  --duino-brand-300: #93c5fd;
  --duino-brand-400: #60a5fa;
  --duino-brand-500: #3b82f6;
  --duino-brand-600: #2563eb;
  --duino-brand-700: #1d4ed8;
  --duino-brand-800: #1e40af;
  --duino-brand-900: #1e3a8a;
  --duino-radius: 8px;
}
```

### Tema Púrpura Moderno
```css
:root {
  --duino-brand-50: #faf5ff;
  --duino-brand-100: #f3e8ff;
  --duino-brand-200: #e9d5ff;
  --duino-brand-300: #d8b4fe;
  --duino-brand-400: #c084fc;
  --duino-brand-500: #a855f7;
  --duino-brand-600: #9333ea;
  --duino-brand-700: #7c3aed;
  --duino-brand-800: #6b21a8;
  --duino-brand-900: #581c87;
  --duino-radius: 16px;
}
```

### Tema Minimalista
```css
:root {
  --duino-brand-50: #f9fafb;
  --duino-brand-100: #f3f4f6;
  --duino-brand-200: #e5e7eb;
  --duino-brand-300: #d1d5db;
  --duino-brand-400: #9ca3af;
  --duino-brand-500: #6b7280;
  --duino-brand-600: #4b5563;
  --duino-brand-700: #374151;
  --duino-brand-800: #1f2937;
  --duino-brand-900: #111827;
  --duino-radius: 4px;
}
```

---

## 💡 Ejemplos Prácticos

### 1. Cambiar Solo el Color Principal

```css
/* Cambiar de teal a azul */
:root {
  --duino-brand-500: #3b82f6;
  --duino-brand-600: #2563eb;
  --duino-brand-700: #1d4ed8;
}
```

### 2. Hacer el Diseño Más Redondeado

```css
:root {
  --duino-radius: 20px;
}

/* Botones extra redondeados */
.duino-btn {
  border-radius: 25px !important;
}
```

### 3. Tema Oscuro

```css
:root {
  --duino-color-bg: #1f2937;
  --duino-color-fg: #f9fafb;
  --duino-color-muted: #9ca3af;
  --duino-border: #374151;
}

/* Ajustar botones para tema oscuro */
.duino-btn--secondary {
  background: var(--duino-color-bg) !important;
  color: var(--duino-color-fg) !important;
  border-color: var(--duino-border) !important;
}
```

### 4. Personalización por Marca

```css
/* Para una empresa de salud */
:root {
  --duino-brand-500: #10b981; /* Verde salud */
  --duino-radius: 8px;
  --duino-font: 'Inter', sans-serif;
}

/* Para una fintech */
:root {
  --duino-brand-500: #6366f1; /* Índigo profesional */
  --duino-radius: 6px;
  --duino-font: 'SF Pro Display', sans-serif;
}

/* Para una startup creativa */
:root {
  --duino-brand-500: #f59e0b; /* Naranja vibrante */
  --duino-radius: 16px;
  --duino-font: 'Poppins', sans-serif;
}
```

---

## 🔧 Herramientas de Desarrollo

### Generador de Paleta de Colores

```javascript
// utils/colorGenerator.js
function generateColorPalette(baseColor) {
  // Función que genera una paleta completa desde un color base
  // Puedes usar librerías como chroma.js o color2k
  const palette = {
    50: lighten(baseColor, 0.95),
    100: lighten(baseColor, 0.9),
    200: lighten(baseColor, 0.75),
    300: lighten(baseColor, 0.6),
    400: lighten(baseColor, 0.3),
    500: baseColor,
    600: darken(baseColor, 0.1),
    700: darken(baseColor, 0.2),
    800: darken(baseColor, 0.3),
    900: darken(baseColor, 0.4),
  };
  
  return palette;
}

// Uso
const myPalette = generateColorPalette('#ff6b6b');
```

### Theme Switcher Component

```tsx
// components/ThemeSwitcher.tsx
import { useTheme } from '../themes/ThemeProvider';

const predefinedThemes = {
  arduino: { colors: { brand: '#14b8a6' }, radius: '12px' },
  blue: { colors: { brand: '#3b82f6' }, radius: '8px' },
  purple: { colors: { brand: '#a855f7' }, radius: '16px' },
};

export const ThemeSwitcher = () => {
  const { setTheme } = useTheme();

  return (
    <div className="theme-switcher">
      <h3>Seleccionar Tema</h3>
      {Object.entries(predefinedThemes).map(([name, theme]) => (
        <button
          key={name}
          onClick={() => setTheme(theme)}
          className="duino-btn duino-btn--ghost"
        >
          {name}
        </button>
      ))}
    </div>
  );
};
```

---

## 📚 Recursos Adicionales

- **Generadores de Paletas**: [Coolors.co](https://coolors.co), [Adobe Color](https://color.adobe.com)
- **Herramientas CSS**: [CSS Variables Inspector](https://chrome.google.com/webstore/detail/css-variables-inspector)
- **Accesibilidad**: [Contrast Checker](https://webaim.org/resources/contrastchecker/)

---

¿Necesitas ayuda con alguna personalización específica? ¡Contáctanos!
