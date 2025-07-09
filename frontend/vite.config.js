import { defineConfig } from 'vite'; // Функция типобезопасной настройки Vite
import react from '@vitejs/plugin-react'; // Официальный плагин для поддержки React.

export default defineConfig({
  plugins: [react()], // Подключает React плагин для Vite
  server: {
    port: 5001,
    proxy: {
      // Проксируем запросы к API
      '/api': {
        target: 'http://localhost:5001',
      },
      // Проксируем WebSocket соединения
      '/socket.io': {
        target: 'ws://localhost:5001',
        ws: true,
        rewriteWsOrigin: true,
      },
    },
  },
});
