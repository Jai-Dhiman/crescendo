import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import UnoCSS from "unocss/vite";
import path from "path";

export default defineConfig({
  plugins: [TanStackRouterVite({}), react(), UnoCSS()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@crescendo/shared-types": path.resolve(__dirname, "../../packages/shared-types/src"),
      "@crescendo/validation": path.resolve(__dirname, "../../packages/validation/src"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8787",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
