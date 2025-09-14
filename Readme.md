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
npm i duino-ui
# o
yarn add duino-ui
# o
pnpm add duino-ui
```

Importa el CSS (tokens + estilos base):

```ts
import "duino-ui/styles.css";
```

### Uso rápido

```tsx
import { Button, Card, Input } from "duino-ui";
import "duino-ui/styles.css";

export default function App() {
  return (
    <Card>
      <h2>Duino UI Components</h2>
      <Button>Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="danger" loading>Deleting…</Button>
      <Input placeholder="Ingresa texto..." />
    </Card>
  );
}
```

---

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

## 🎯 Componentes incluidos

- **Button**: Botones con variantes primary, secondary, ghost y danger
- **Card**: Contenedores con backdrop blur y estilos modernos  
- **Input**: Campos de entrada con estados de focus y error

Todos los componentes utilizan los tokens de Duino UI y siguen la metodología BEM para CSS.

---

## ⚖️ Licencia
MIT
