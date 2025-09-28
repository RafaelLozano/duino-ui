# Duino UI

Sistema de diseño minimalista en **React + TypeScript** con estilos **CSS (BEM)**, inspirado en la identidad visual de Arduino.  
Colores y tokens basados en la paleta teal/turquesa característica de Arduino.cc

## 🎨 Personalización Completa

Duino UI es **100% personalizable**. Cambia colores, border radius, tipografía y más en tiempo real.

### 🚀 Inicio Rápido con Temas
```tsx
import { ThemeProvider, Button, ThemeSwitcher } from '@ralorotech/duino-ui';

function App() {
  return (
    <ThemeProvider preset="blue">
      <ThemeSwitcher />  {/* Panel de personalización */}
      <Button variant="primary">Mi Botón Personalizado</Button>
    </ThemeProvider>
  );
}
```

### 📚 Guías de Personalización
- **[Guía Rápida](./THEMING_QUICK_START.md)** - Personalización en 2 minutos
- **[Guía Completa](./CUSTOMIZATION.md)** - Personalización avanzada con ejemplos

---

## 🚀 Instalación

```bash
npm install @ralorotech/duino-ui
# o
yarn add @ralorotech/duino-ui
# o
pnpm add @ralorotech/duino-ui
```

### Importar estilos

**Opción 1: Importación automática (recomendada)**
```tsx
import { Button, Input } from "@ralorotech/duino-ui";
// Los estilos se importan automáticamente
```

**Opción 2: Importación manual de estilos**
```tsx
import { Button, Input } from "@ralorotech/duino-ui";
import "@ralorotech/duino-ui/styles.css";
```

**Opción 3: Solo tokens CSS**
```tsx
import "@ralorotech/duino-ui/tokens.css";
```

### Uso rápido

```tsx
import { Button, Input, Modal, Select } from "@ralorotech/duino-ui";

export default function App() {
  return (
    <div>
      <h2>Duino UI Components</h2>
      <Button>Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="danger" loading>Deleting…</Button>
      <Input placeholder="Ingresa texto..." />
      <Select 
        options={[
          { label: "Opción 1", value: "1" },
          { label: "Opción 2", value: "2" }
        ]}
        placeholder="Selecciona una opción"
      />
    </div>
  );
}
```

---

## 📖 Ejemplos de Uso

### Ejemplo Básico
```tsx
import { Button, Input, Modal } from "@ralorotech/duino-ui";

function App() {
  return (
    <div>
      <Button>Hola Mundo</Button>
      <Input placeholder="Escribe algo..." />
    </div>
  );
}
```

### Ejemplo Completo
Ver el archivo [`examples/CompleteExample.tsx`](./examples/CompleteExample.tsx) para un ejemplo completo que muestra todos los componentes disponibles.

## 🧑‍💻 Desarrollo local

> Requisitos: **Node 18+** y npm/pnpm/yarn.

1) **Instalar dependencias**:

```bash
npm install
```

2) **Compilar en modo watch** (genera `dist/`):

```bash
npm run dev
```

3) **Probar componentes** con Storybook:

```bash
npm run storybook
```

4) **Ejecutar tests**:

```bash
npm run test
```

5) **Verificar tipos**:

```bash
npm run type-check
```

### 🎨 Tokens de diseño

Duino UI utiliza tokens CSS personalizados inspirados en Arduino:

```css
/* Colores principales */
--duino-brand-500: #14b8a6;  /* Teal principal */
--duino-brand-700: #008184;  /* Teal oscuro para botones */
--duino-brand-800: #005c5f;  /* Teal muy oscuro para hover */

/* Espaciado */
--duino-gap-sm: .375rem;
--duino-gap: .5rem;
--duino-gap-lg: .75rem;

/* Bordes */
--duino-radius: 12px;
```

---

## 📚 Storybook

Explora todos los componentes de Duino UI:

- **Localmente**:
  ```bash
  npm run storybook
  ```
  Abre: http://localhost:6006

- **Demo online**: (próximamente)

---

## 🧩 Scripts disponibles

```bash
# Desarrollo
npm run dev          # Compilar en modo watch
npm run storybook    # Ejecutar Storybook

# Construcción
npm run build        # Compilar librería
npm run build:css    # Generar CSS combinado
npm run build:storybook  # Compilar Storybook

# Testing
npm run test         # Ejecutar tests con Vitest
```

## ✨ Características

- 🎨 **100% Personalizable** - Cambia colores, tipografía y espaciado en tiempo real
- 🚀 **Tree-shaking optimizado** - Importa solo lo que necesitas
- 📱 **Responsive** - Diseño adaptativo para todos los dispositivos
- ♿ **Accesible** - Componentes con soporte completo de accesibilidad
- 🎯 **TypeScript** - Tipado completo para mejor experiencia de desarrollo
- 🎨 **BEM CSS** - Metodología de nomenclatura consistente y mantenible
- 🔧 **Temas** - Sistema de temas predefinidos y personalizables
- 📦 **Múltiples formatos** - ESM, CJS y UMD para máxima compatibilidad
- ⚡ **Rápido** - Optimizado para rendimiento y carga rápida
- 🛠️ **Desarrollador-friendly** - Hot reload, source maps y debugging

## 🎯 Componentes incluidos

- **Button**: Botones con variantes primary, secondary, ghost y danger
- **Input**: Campos de entrada con estados de focus y error
- **Modal**: Ventanas modales con overlay y animaciones
- **Select**: Selectores desplegables con búsqueda
- **Table**: Tablas con ordenamiento y paginación
- **Upload**: Componente de carga de archivos con drag & drop
- **Collapse**: Acordeones colapsables
- **Popover**: Tooltips y popovers posicionables
- **Spin**: Indicadores de carga
- **Message**: Sistema de notificaciones
- **Image**: Componente de imagen optimizado

Todos los componentes utilizan los tokens de Duino UI y siguen la metodología BEM para CSS.

---

## 🆕 Últimas Mejoras

### v0.0.16 - Mejoras de Usabilidad
- ✅ **Exports mejorados** - Mejor experiencia de importación con múltiples puntos de entrada
- ✅ **Tree-shaking optimizado** - Configuración mejorada para mejor eliminación de código muerto
- ✅ **CSS modular** - Importación flexible de estilos (automática o manual)
- ✅ **TypeScript mejorado** - Mejor resolución de tipos y configuración de build
- ✅ **Documentación actualizada** - Ejemplos más completos y guías mejoradas
- ✅ **Scripts de desarrollo** - Comandos adicionales para linting, type-checking y testing
- ✅ **Compatibilidad ampliada** - Soporte para ESM, CJS y UMD

## ⚖️ Licencia
MIT
