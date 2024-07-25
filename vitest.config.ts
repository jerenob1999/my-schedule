import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

export default defineConfig({
  resolve: {
    alias: [{ find: "@", replacement: resolve(__dirname, "./src") }],
  },
  plugins: [react()],
  test: {
    environment: "jsdom",
  },
});
