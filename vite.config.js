// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  // Define la raíz del proyecto
  root: 'src',
  // Define la carpeta de salida
  build: {
    outDir: '../dist',
  },
  // Configuración del servidor de desarrollo
  server: {
    port: 3000, // Puerto del servidor de desarrollo
    open: true, // Abre el navegador automáticamente
    proxy: {
      // Configuración de proxy si se necesita redirigir ciertas solicitudes
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  // Plugins
  plugins: [
    // Aquí puedes agregar plugins de Vite
  ],
});
