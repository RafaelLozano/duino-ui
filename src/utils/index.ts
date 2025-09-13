// ===== EXPORTS DE UTILIDADES =====
export { bem } from "./bem";
export { cx } from "./cx";

// ===== TIPOS DE UTILIDADES =====
export type BemFunction = (element?: string, modifiers?: Record<string, boolean | string | number | undefined>) => string;
