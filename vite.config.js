import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],  // Plugin para soporte de React
  server: {
    port: 3000,         // Puerto del servidor de desarrollo
    open: true,         // Abre el navegador automáticamente al iniciar el servidor
  },
  build: {
    outDir: 'dist',     // Carpeta de salida para la compilación
    sourcemap: true,    // Genera archivos sourcemap para depuración
  },
  resolve: {
    alias: {
      '@': '/src',      // Alias para facilitar las importaciones desde 'src'
    },
  },
});
