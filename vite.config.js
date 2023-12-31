import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'


// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue()
    ],
    server: {
        proxy: {
            '/trans': {
                target: 'http://api.fanyi.baidu.com/api/trans/vip/translate',
                changeOrigin: true,
                rewrite: path => path.replace(/^\/trans/, '')
            },
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
                changeOrigin: true,
                // rewrite: path => path.replace(/^\/search_web/, '')
            },
            '/search_web1': {
                target: 'http://120.220.95.176:19114/search',
                changeOrigin: true,
                // rewrite: path => path.replace(/^\/search_web1/, '')
            },
            '/individuation': {
                target: 'http://evo-hu.xf-yun.com',
                changeOrigin: true
            },
            // 配置跨域问题
            '/api': {
                target: 'http://39.99.254.148:10002/',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ''),
            }
        }
    }
})