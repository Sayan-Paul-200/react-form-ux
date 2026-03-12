import { defineConfig } from "tsup"

export default defineConfig([
  {
    entry: ["src/index.ts"],
    format: ["esm"],
    dts: true,
    sourcemap: true,
    clean: true,
    splitting: false
  },
  {
    entry: ["src/index.ts"],
    format: ["cjs"],
    sourcemap: true,
    dts: true,
    splitting: false,
    outExtension() {
      return { js: ".cjs" }
    }
  }
])