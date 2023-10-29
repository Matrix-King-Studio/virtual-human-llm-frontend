import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// import * as PIXI from 'pixi.js';

// window.PIXI = PIXI;


const app = createApp(App);


app.use(ElementPlus)
app.mount('#app')




