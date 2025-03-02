import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // Enable global variables like `describe`, `it`, etc.
    environment: "jsdom", // Use jsdom for browser-like environment
    setupFiles: "./src/setupTests.js", // Path to setup file
  },
});
