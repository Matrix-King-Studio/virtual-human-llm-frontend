<template>
    <div class="main_container">
        <el-button @click="logout" style="position: absolute; right: 10px; top: 10px">退出登录</el-button>
        <el-image style="height: 50px; position: absolute; left: 10px; top: 10px" fit="fill" src="../src/assets/logo.png" />
        <h1 style="height: 50px;  position: absolute;  top: 10px">请选择你要进入的页面</h1>
        <div class="main">
            <router-link to="/home">虚拟人 </router-link>
            <router-link to="/chat">chat对话</router-link>
        </div>



    </div>
</template>

<script setup>

import { removeToken } from "../composables/auth";
import router from '../router'
import { totast } from "../composables/util";
import {  onMounted } from "vue";
import { user } from "../utils/api";
import { getToken } from "../composables/auth"
// 退出登录操作
function logout() {

    removeToken();
    totast("退出成功", "success");
    router.push('/login')
}



onMounted(() => {
    const token = getToken()
    console.log(token ==="")
    // 读取用户信息
    user(token)
        .then(response => {
            // user_id = response.pk;
            console.log(response)
            // days = 1;
        })
        .catch(error => {
            console.error(error);
        });
});
</script>
<style lang="less" scoped>
.main_container {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;
}

.main {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;

    a {
        padding: 20px 50px;
        margin-top: 30px;
        border-radius: 10px;
        color: white;
        font-weight: 800;
        font-size: 25px;
        background-color: rgb(58, 52, 52);
    }
}
</style>