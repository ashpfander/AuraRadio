import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // adds server area for graphql
  server: {
    port: 3001,
    open: true,
    proxy: {
      '/graphql': {
        target: 'http://localhost:3002',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
