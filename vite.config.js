import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'


// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue()
    ],
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
                target: 'http://120.220.95.176:19114/',
                changeOrigin: true
            },
            '/individuation': {
                target: 'http://evo-hu.xf-yun.com',
                changeOrigin: true
            },
            '/api':'http://testapi.xuexiluxian.cn'
            // '/':{
            //   target:''
            // }
        }
    }
})