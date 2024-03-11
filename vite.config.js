// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://api.football-data.org/v4',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        headers: {
          'X-Auth-Token': '',
        },
      },
      '/sports': {
        target: 'https://www.thesportsdb.com/api/v1/json/3',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/sports/, ''),
        headers: {
          // Burada gerekli başlıkları ekleyin
        },
      },
    },
  },
})
