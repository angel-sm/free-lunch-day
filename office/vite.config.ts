import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  server: {
    host: true, // This ensures the server listens on 0.0.0.0
    port: 3000, // Use a common port like 3000
  },
  preview: {
    host: true,
    port: 3000,
  },
});
