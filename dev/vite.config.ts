import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  root: resolve(__dirname, "."),
  plugins: [react()],
  resolve: {
    alias: {
      "react-ai-chat-actions": resolve(__dirname, "../src/index.ts"),
    },
  },
});
