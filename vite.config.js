// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // Aquí coloca la URL de tu servidor Node.js
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // Elimina el prefijo '/api' en las solicitudes
      },
    },
  },
});



// // vite.config.js
// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     proxy: {    
//       '/api': {
//         target: 'https://www.tclarevista.com.ar', // Sin necesidad de especificar un puerto para HTTPS
//         changeOrigin: true,
//         rewrite: (path) => path.replace(/^\/api/, ''),
//       },
//     },
//   },
// });