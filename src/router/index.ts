// index.ts
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/home',
    component: () => import('../views/Home.vue'),  // 路由的组件
  },
  {
    path: '/',
    component: () => import('../views/Login.vue'),  // 路由的组件
  },
  {
    path: '/register',
    component: () => import('../views/Register.vue'),  // 路由的组件
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;