import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // 1. Solución al problema de 'No open ports' de Render
    host: '0.0.0.0',
    port: process.env.PORT || 5173,
    
    // 2. 🚨 Solución al problema de 'Blocked Host' (¡Este es el cambio clave!)
    // Permite que el dominio de Render acceda al servidor de desarrollo
    allowedHosts: ['actividad-11-bd.onrender.com'] 
  }
});