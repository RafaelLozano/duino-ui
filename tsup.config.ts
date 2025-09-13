import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    "components/index": "src/components/index.ts",
    "utils/index": "src/utils/index.ts"
  },
  dts: true,
  format: ["esm", "cjs"],
  sourcemap: true,
  clean: true,
  external: ["react", "react-dom"],
  target: "es2019",
  treeshake: true,
  splitting: true, // Habilita code splitting para mejor tree-shaking
  minify: false, // Mantener legible para debugging
});
