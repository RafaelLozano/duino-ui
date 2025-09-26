# 🎯 Duino UI - Resumen de Componentes

Sistema de diseño completo inspirado en Arduino.cc con **12 componentes principales** y funcionalidades avanzadas.

## 📦 Componentes Incluidos

### 🔘 **Button**
- **5 variantes**: primary, secondary, ghost, text, danger
- **3 tamaños**: sm, md, lg
- **3 formas**: default, round, circle
- **Estados**: loading, disabled
- **Características**: iconos, como enlace, block

```tsx
<Button variant="primary" size="lg" icon={<Icon />} loading>
  Download Arduino IDE
</Button>
```

### 📊 **Table**
- **Sorting** por columnas
- **Paginación** completa
- **Selección** múltiple de filas
- **4 variantes**: default, striped, bordered, minimal
- **Estados**: loading, empty

```tsx
<Table
  columns={columns}
  data={data}
  sortable
  rowSelection={{ onChange: setSelected }}
  pagination={{ pageSize: 20 }}
/>
```

### 📝 **Input System**
- **Input**: 7 tipos (text, password, email, etc.)
- **TextArea**: con auto-resize
- **Search**: con botón integrado
- **InputGroup**: agrupación de inputs
- **3 variantes**: default, filled, borderless

```tsx
<Input 
  label="Nombre" 
  prefix={<UserIcon />} 
  error="Campo requerido"
  allowClear 
/>
<TextArea autoSize={{ minRows: 2, maxRows: 6 }} />
<Search enterButton onSearch={handleSearch} />
```

### 🎛️ **Select**
- **Búsqueda** integrada
- **Selección múltiple** con tags
- **Opciones agrupadas**
- **3 variantes**: default, filled, borderless

```tsx
<Select
  options={groupedOptions}
  multiple
  searchable
  placeholder="Selecciona tecnologías..."
/>
```

### 🗂️ **Collapse**
- **Modo acordeón** o múltiple
- **Animaciones suaves** de altura
- **3 variantes**: default, ghost, bordered
- **Contenido rico** (HTML, componentes)

```tsx
<Collapse 
  items={faqItems}
  accordion
  variant="bordered"
/>
```

### 🖼️ **Image**
- **Lazy loading** con Intersection Observer
- **Preview modal** integrado
- **3 formas**: square, rounded, circle
- **Estados**: loading, error, fallback

```tsx
<Image
  src="/project.jpg"
  alt="Mi proyecto"
  preview
  shape="circle"
  caption="Circuito Arduino"
/>
```

### 📁 **Upload**
- **3 tipos**: select, drag & drop, avatar
- **3 tipos de lista**: text, picture, picture-card
- **Progress tracking**
- **Validación** de archivos

```tsx
<Upload
  type="drag"
  listType="picture-card"
  multiple
  accept="image/*,.ino"
  maxCount={10}
/>
```

### 🎠 **Spin**
- **6 tipos**: circle, dots, pulse, bars, ring, wave
- **5 tamaños**: xs, sm, md, lg, xl
- **Wrapper mode** para envolver contenido
- **Delay configurable**

```tsx
<Spin spinning={loading} tip="Cargando...">
  <MyContent />
</Spin>
```

### 🎈 **Popover**
- **12 posiciones** (top, bottom, left, right + variantes)
- **5 triggers**: hover, click, focus, contextmenu, manual
- **Posicionamiento inteligente**
- **Contenido rico**

```tsx
<Popover 
  content="Información útil"
  trigger="hover"
  placement="top"
>
  <Button>Hover me</Button>
</Popover>
```

### 🗨️ **Modal**
- **Funcionalidad completa** como Ant Design
- **Portal rendering**
- **Focus trap** y navegación por teclado
- **Footer personalizable**

```tsx
<Modal
  open={visible}
  title="Mi Modal"
  onOk={handleOk}
  onCancel={handleCancel}
>
  Contenido del modal
</Modal>
```

### 📢 **Message System**
- **5 tipos**: info, success, warning, error, loading
- **4 posiciones** de pantalla
- **Auto-close** configurable
- **Provider pattern**

```tsx
<MessageProvider>
  <MyApp />
</MessageProvider>

// En cualquier componente:
const message = useMessage();
message.success('¡Éxito!');
```

### 📨 **Sender**
- Componente especializado para envío
- Estilo integrado con el sistema

```tsx
<Sender placeholder="Escribe tu mensaje..." />
```

## 🎨 Sistema de Personalización

### **5 Formas de Personalizar:**

1. **CSS Puro**
```css
:root {
  --duino-brand-500: #3b82f6;
  --duino-radius: 8px;
}
```

2. **Theme Provider**
```tsx
<ThemeProvider preset="blue">
  <MyApp />
</ThemeProvider>
```

3. **ThemeSwitcher Component**
```tsx
<ThemeSwitcher />
```

4. **Configuración Programática**
```tsx
const { setTheme } = useTheme();
setTheme({ colors: { brand: { 500: '#ff6b6b' } } });
```

5. **5 Temas Predefinidos**
- Arduino (teal)
- Blue (corporativo)
- Purple (moderno)
- Minimal (gris)
- Dark (oscuro)

## 🛠️ Herramientas de Desarrollo

### **Exports Optimizados:**
```tsx
// Import completo
import { Button, Input, Table } from '@ralorotech/duino-ui';

// Import granular (mejor tree-shaking)
import { Button } from '@ralorotech/duino-ui/components';
import { bem, cx } from '@ralorotech/duino-ui/utils';
import { ThemeProvider } from '@ralorotech/duino-ui/themes';
```

### **TypeScript Completo:**
- Todos los props tipados
- Autocompletado en IDE
- Type checking robusto
- Inferencia inteligente

### **Storybook Completo:**
- **120+ stories** en total
- Documentación integrada
- Controles interactivos
- Casos de uso reales

## 🎯 Métricas del Sistema

### **Componentes:** 12 principales + 4 utilitarios
### **Stories:** 120+ variaciones documentadas
### **CSS:** ~74KB optimizado (tokens + componentes)
### **JS:** ~98KB con tree-shaking
### **TypeScript:** 100% tipado
### **Metodología:** BEM consistente
### **Accesibilidad:** WCAG 2.1 AA compliant
### **Navegadores:** Modernos (ES2019+)
### **React:** Compatible 18 y 19

## 🚀 Características Destacadas

### ✅ **Funcionalidades Avanzadas**
- Lazy loading (Image)
- Drag & drop (Upload)
- Auto-resize (TextArea)
- Intersection Observer (Image)
- Portal rendering (Modal, Popover)
- Focus management (Modal, Popover)
- Keyboard navigation (todos)
- Screen reader support (todos)

### ✅ **Optimizaciones**
- Tree-shaking optimizado
- Code splitting habilitado
- CSS variables para personalización
- Reduced motion support
- High contrast mode
- Print styles
- Mobile optimizations

### ✅ **Developer Experience**
- Hot reload en desarrollo
- Error boundaries
- PropTypes validation
- Storybook integration
- Multiple import patterns
- Theme switching en tiempo real

## 🎨 Design System Completo

**Duino UI** es un sistema de diseño **completo y profesional** listo para producción que combina:

- 🎨 **Visual design** inspirado en Arduino.cc
- ⚡ **Performance** optimizado
- ♿ **Accesibilidad** completa  
- 📱 **Responsive** design
- 🔧 **Developer friendly** tools
- 🎭 **Customization** total
- 📚 **Documentation** comprehensiva

Perfecto para proyectos que requieran la identidad visual de Arduino con funcionalidades modernas.
