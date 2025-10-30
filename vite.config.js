import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // 🚨 SOLUCIÓN 1: Configurar la ruta base para producción
  base: './', 
  server: {
    host: '0.0.0.0',
    port: process.env.PORT || 5173,
    allowedHosts: true // Puedes dejarlo como 'true' o con el dominio específico
  }
});