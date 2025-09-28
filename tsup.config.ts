import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    "components/index": "src/components/index.ts",
    "utils/index": "src/utils/index.ts",
    "styles": "src/styles.css"
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
  esbuildOptions(options) {
    options.banner = {
      js: '"use client";',
    };
  },
  onSuccess: "echo 'Build completed successfully!'",
});
