import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    extensions: [".mdx", ".js", ".jsx"],
  },
  test: {
    environment: "jsdom",
    grobals: true,
    setupFiles: "./unit-tests/index.js",
    include: ["**.test.jsx"],
  },
});
