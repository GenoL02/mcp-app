import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/mcp-app",
  server: {
    proxy: {
      "/mcp": {
        target: "https://mcp-sf-api.onrender.com",
        changeOrigin: true,
        secure: true,
      },
    },
  },
});
