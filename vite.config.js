import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // 1. SOLUCIÓN AL "NOT FOUND" (404)
  // Utiliza rutas relativas (./) para los assets, crucial para Static Sites.
  base: './', 
  
  server: {
    // 2. SOLUCIÓN AL "NO OPEN PORTS"
    // Escucha en todas las interfaces de red (0.0.0.0) y usa el puerto de Render ($PORT).
    host: '0.0.0.0',
    port: process.env.PORT || 5173,
    
    // 3. SOLUCIÓN AL "BLOCKED HOST"
    // Permite que el dominio de Render acceda al servidor de desarrollo.
    // 'true' es la opción más flexible.
    allowedHosts: true 
  }
});