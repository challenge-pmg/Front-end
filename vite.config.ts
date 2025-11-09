import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/teleconsulta-api': {
        target: 'https://hc-teleonsulta-api-java-1.onrender.com',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/teleconsulta-api/, ''),
      },
    },
  },
})
