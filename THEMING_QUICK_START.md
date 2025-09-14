# 🎨 Guía Rápida de Personalización

## 🚀 Inicio Rápido (2 minutos)

### 1. Cambiar Color Principal (Solo CSS)

```css
/* En tu archivo CSS principal */
@import '@ralorotech/duino-ui/styles.css';

:root {
  --duino-brand-500: #3b82f6; /* Cambiar de teal a azul */
}
```

### 2. Usar Theme Provider (React)

```tsx
import { ThemeProvider, Button } from '@ralorotech/duino-ui';

function App() {
  return (
    <ThemeProvider preset="blue">
      <Button variant="primary">Mi Botón Azul</Button>
    </ThemeProvider>
  );
}
```

### 3. Componente de Personalización

```tsx
import { ThemeSwitcher } from '@ralorotech/duino-ui';

function MyApp() {
  return (
    <div>
      <ThemeSwitcher />
      {/* Tus componentes aquí */}
    </div>
  );
}
```

## 🎯 Presets Disponibles

```tsx
// Temas predefinidos
<ThemeProvider preset="arduino" />   // Teal (por defecto)
<ThemeProvider preset="blue" />      // Azul corporativo  
<ThemeProvider preset="purple" />    // Púrpura moderno
<ThemeProvider preset="minimal" />   // Gris minimalista
<ThemeProvider preset="dark" />      // Tema oscuro
```

## 🔧 Personalización Rápida

### Solo Cambiar Color
```tsx
<ThemeProvider 
  initialTheme={{
    colors: {
      brand: { 500: '#ff6b6b' } // Rojo coral
    }
  }}
>
```

### Cambiar Border Radius
```tsx
<ThemeProvider 
  initialTheme={{ radius: '20px' }}
>
```

### Tema Completo
```tsx
<ThemeProvider 
  initialTheme={{
    colors: {
      brand: { 500: '#10b981' },
      background: '#f9fafb'
    },
    radius: '8px',
    font: 'Inter, sans-serif'
  }}
>
```

## 📱 Ejemplo Completo

```tsx
import { 
  ThemeProvider, 
  ThemeSwitcher, 
  Button, 
  Modal 
} from '@ralorotech/duino-ui';

export default function App() {
  return (
    <ThemeProvider preset="arduino">
      <div style={{ padding: '20px' }}>
        {/* Panel de personalización */}
        <ThemeSwitcher />
        
        {/* Tus componentes */}
        <Button variant="primary">
          Mi Botón Personalizado
        </Button>
      </div>
    </ThemeProvider>
  );
}
```

## 🎨 Variables CSS Principales

```css
/* Las más importantes para personalizar */
--duino-brand-500: #14b8a6;  /* Color principal */
--duino-radius: 12px;         /* Border radius */
--duino-font: system-ui;      /* Tipografía */
--duino-color-bg: #ffffff;    /* Fondo */
--duino-color-fg: #13151a;    /* Texto */
```

## 💡 Tips Rápidos

1. **Cambio rápido**: Usa `preset` para cambios inmediatos
2. **Color personalizado**: Usa el `ThemeSwitcher` con color picker
3. **CSS puro**: Sobrescribe variables para máximo control
4. **Múltiples temas**: Cambia `preset` dinámicamente

¿Necesitas más personalización? Ve la [Guía Completa](./CUSTOMIZATION.md)
