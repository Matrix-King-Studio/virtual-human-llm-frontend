// index.ts
import {createRouter, createWebHistory} from 'vue-router';
import {getToken} from "../composables/auth"

import {totast} from "../composables/util"

const routes = [
    {
        path: '/vip_chat',
        component: () => import('../views/TestChat.vue'),  // 路由的组件
    },
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
        path: '/chat',
        component: () => import('../views/Chat.vue'),  // 路由的组件
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    console.log("全局路由守卫");
    const token = getToken();
    console.log("获取Token：", token);
    // 没有登陆强制跳转回登录页面
    if (!token && to.path != "/login" && to.path != "/register" && to.path !="/vip_chat") {
        totast('请先登录！！', "error")
        return next({path: "/login"})
    }

    // 防止重复登录
    if (token && (to.path == "/login" || to.path == "/register")) {
        totast("请勿重复操作", "error")
        return next({path: from.path ? from.path : '/'})
    }
    // 将其放行，就可以通过
    next()
})

export default router;