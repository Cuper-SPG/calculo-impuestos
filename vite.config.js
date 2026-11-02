import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/calculo-impuestos/",
  plugins: [react()],
  server: {
    port: 5500,
    strictPort: true, // si el puerto está ocupado, falla en vez de usar otro
  },
});
