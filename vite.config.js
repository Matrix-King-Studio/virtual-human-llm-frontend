import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    server: {
        proxy: {
            // 使用正则表达式
            '/vmss': {
                target: 'http://vms.cn-huadong-1.xf-yun.com',
                changeOrigin: true,
                rewrite: path => path.replace(/^\/vmss/, '')
            },
            '/baidubce': {
                target: 'https://aip.baidubce.com',
                changeOrigin: true,
                rewrite: path => path.replace(/^\/baidubce/, '')
            },
            '/search_web': {
                target: 'http://36.103.177.230:10088/',
                changeOrigin: true
            },
            '/individuation': {
                target: 'http://evo-hu.xf-yun.com',
               
            },
            '/test.json':{
                target:'http://127.0.0.1:5050/',
                changeOrigin: true
            }
            // '/':{
            //   target:''
            // }
        }
    }
})