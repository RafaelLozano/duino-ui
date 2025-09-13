# Guía de Imports - Duino UI

## Importaciones Disponibles

### 🎯 Import Principal (Recomendado)
```typescript
// Importa todos los componentes y utilidades
import { Button, Modal, Sender, bem, cx } from '@ralorotech/duino-ui';
import type { ButtonProps, ModalProps, SenderProps } from '@ralorotech/duino-ui';
```

### 📦 Imports Granulares (Para Tree-Shaking Óptimo)

#### Solo Componentes
```typescript
import { Button, Modal, Sender } from '@ralorotech/duino-ui/components';
import type { ButtonProps, ModalProps, SenderProps } from '@ralorotech/duino-ui/components';
```

#### Solo Utilidades
```typescript
import { bem, cx } from '@ralorotech/duino-ui/utils';
import type { BemFunction } from '@ralorotech/duino-ui/utils';
```

### 🎨 Estilos CSS
```css
/* En tu CSS principal o archivo de entrada */
@import '@ralorotech/duino-ui/styles.css';
```

## Ejemplos de Uso

### Componente Button
```typescript
import { Button } from '@ralorotech/duino-ui';
import type { ButtonProps } from '@ralorotech/duino-ui';

const MyButton: React.FC<ButtonProps> = (props) => {
  return <Button variant="primary" size="lg" {...props} />;
};
```

### Componente Modal
```typescript
import { Modal } from '@ralorotech/duino-ui';
import type { ModalProps } from '@ralorotech/duino-ui';

const MyModal: React.FC<ModalProps> = ({ open, onCancel, ...props }) => {
  return (
    <Modal
      open={open}
      title="Mi Modal"
      onCancel={onCancel}
      {...props}
    >
      Contenido del modal
    </Modal>
  );
};
```

### Utilidades BEM
```typescript
import { bem } from '@ralorotech/duino-ui/utils';

const buttonBem = bem('my-button');

// Genera: "my-button"
const baseClass = buttonBem();

// Genera: "my-button my-button--primary my-button--large"
const modifiedClass = buttonBem(undefined, { primary: true, large: true });

// Genera: "my-button__icon my-button__icon--left"
const elementClass = buttonBem('icon', { left: true });
```

### Utilidad cx (Class Names)
```typescript
import { cx } from '@ralorotech/duino-ui/utils';

const className = cx(
  'base-class',
  isActive && 'active',
  isDisabled && 'disabled',
  customClass
);
```

## Ventajas del Sistema de Exports

### ✅ Tree-Shaking Optimizado
- Importa solo lo que necesitas
- Bundles más pequeños en producción
- Mejor rendimiento de carga

### ✅ Flexibilidad de Importación
- Import completo para desarrollo rápido
- Imports granulares para optimización
- Compatible con diferentes bundlers

### ✅ TypeScript Completo
- Tipos exportados correctamente
- Autocompletado en IDE
- Type checking robusto

### ✅ Compatibilidad
- ESM y CommonJS
- React 18 y 19
- Todos los bundlers modernos

## Migración desde Versiones Anteriores

### Antes
```typescript
import { Button } from '@ralorotech/duino-ui';
```

### Ahora (Misma sintaxis funciona)
```typescript
import { Button } from '@ralorotech/duino-ui';
// O para mejor tree-shaking:
import { Button } from '@ralorotech/duino-ui/components';
```

No se requieren cambios en el código existente. Todas las importaciones anteriores siguen funcionando.
