import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss()],
  build: {
    lib: {
      entry: "src/index.ts",
      name: "KonvoWidget",
      fileName: "widget",
      formats: ["iife"]
    },
    rollupOptions: {
      output: {
        extend: true,
      }
    },
    minify: true,
    sourcemap: false,
  }
})
