// index.ts
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import('../views/Choose.vue'),  // 路由的组件
  },
  {
    path: '/home',
    component: () => import('../views/Home.vue'),  // 路由的组件
  },
  {
    path: '/login',
    component: () => import('../views/Login.vue'),  // 路由的组件
  },
  {
    path: '/register',
    component: () => import('../views/Register.vue'),  // 路由的组件
  },
  {
    path: '/test',
    component: () => import('../views/Test.vue'),  // 路由的组件
  },
  {
    path: '/chat',
    component: () => import('../views/Chat.vue'),  // 路由的组件
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;