import router from './router/index'
import {getToken} from "./composables/auth"

import {totast} from "./composables/util"

//全局前置守卫

router.beforeEach((to, from, next) => {
    console.log("全局路由守卫");
    const token = getToken();
    console.log("获取Token：", token);
    // 没有登陆强制跳转回登录页面
    if (!token && to.path != "/login" && to.path != "/register") {
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