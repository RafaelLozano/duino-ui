// ===== ESTILOS GLOBALES =====
import "./styles/tokens.css";
import "./styles/index.css";

// ===== COMPONENTES =====
export { Button } from "./components/Button/Button";
export { Modal } from "./components/Modal/Modal";
export { MessageProvider, useMessage } from "./components/Message/MessageProvider";
export { Sender } from "./components/Sender/Sender";
export { Table } from "./components/Table/Table";

// ===== TIPOS DE COMPONENTES =====
export type { 
  ButtonProps, 
  ButtonVariant, 
  ButtonSize,
  ButtonShape
} from "./components/Button/Button";

export type { 
  ModalProps 
} from "./components/Modal/Modal";

export type { 
  MessageOptions,
  MessageType,
  MessagePlacement,
  UseMessageApi
} from "./components/Message/MessageProvider";

export type { 
  SenderProps 
} from "./components/Sender/Sender";

export type { 
  TableProps, 
  TableColumn, 
  TableSize, 
  SortDirection, 
  TableVariant 
} from "./components/Table/Table";

// ===== UTILIDADES =====
export { bem } from "./utils/bem";
export { cx } from "./utils/cx";

// ===== TEMAS =====
export { ThemeProvider, useTheme, ThemeSwitcher, themePresets } from "./themes";

// ===== TIPOS DE UTILIDADES =====
// Tipo para la función bem - se define inline para evitar archivos adicionales
export type BemFunction = (element?: string, modifiers?: Record<string, boolean | string | number | undefined>) => string;

// ===== TIPOS DE TEMAS =====
export type { DuinoTheme, ThemeProviderProps, ThemeSwitcherProps } from "./themes";

// ===== RE-EXPORTS PARA COMPATIBILIDAD =====
// Permite importar como: import { Button, ButtonProps } from '@ralorotech/duino-ui'
export * from "./components/Button/Button";
export * from "./components/Modal/Modal";
export * from "./components/Message/MessageProvider";
export * from "./components/Sender/Sender";
export * from "./components/Table/Table";