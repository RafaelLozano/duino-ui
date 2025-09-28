import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    "components/index": "src/components/index.ts",
    "utils/index": "src/utils/index.ts"
  },
  dts: {
    resolve: true,
    entry: ["src/index.ts", "src/components/index.ts", "src/utils/index.ts"]
  },
  format: ["esm", "cjs"],
  sourcemap: true,
  clean: true,
  external: ["react", "react-dom"],
  target: "es2019",
  treeshake: true,
  splitting: true,
  minify: false,
  // Incluir archivos CSS automáticamente
  injectStyle: true,
  esbuildOptions(options) {
    options.banner = {
      js: '"use client";',
    };
    // Configurar CSS para ser incluido en JS
    options.loader = {
      ...options.loader,
      '.css': 'css'
    };
  },
  onSuccess: "echo 'Build completed successfully!'",
});
