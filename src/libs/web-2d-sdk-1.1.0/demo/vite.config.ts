import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
export default defineConfig({
  base: '/3d',
  server: {
    host: true,
    port: 8891,
    https: false,
    cors: true,
    proxy: {
      '/vmss': {
        target: 'https://vms.cn-huadong-1.xf-yun.com',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/vmss/, '')
      },
      '/vms3dPrefix': {
        target: 'http://vms.cn-huadong-1.xf-yun.com',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/vms3dPrefix/, '')
      },
      '/individuation': {
        target: 'https://evo-hu.xf-yun.com',
        changeOrigin: true
      },
    }
  },
  plugins: [react()],
  build: {
    sourcemap: false,
    assetsDir: 'static',
  },
  resolve: {
    alias: [
      { find: '@', replacement: '/src/' },
      { find: /^~/, replacement: '' }
    ]
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  }
})
