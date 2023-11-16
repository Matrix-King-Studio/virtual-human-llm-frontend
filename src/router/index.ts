// index.ts
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import('../views/Home.vue'),  // 路由的组件
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;