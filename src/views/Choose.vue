<template>
    <div class="main_container">
        <el-button @click="logout" style="position: absolute; right: 10px; top: 10px">退出登录</el-button>
        <!-- <img class="sign"  src="../src/assets/logo.png" /> -->
      <router-link to="/">
        <img src="../assets/images/logo.png" alt="" class="sign">
      </router-link>
        <div class="main">
            <h1>请选择你要进入的页面</h1>
            <router-link to="/home">   虚拟人 </router-link>
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

.sign{
  height: 5%;
  position: absolute;
  left: 10px;
  top: 10px
}
.main_container {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;

    h1 {
        width: 100%;
        text-align: center;
        font-weight: 800;
        font-size: 30px; /* 调整字体大小以适应移动端 */
    }

    .main {
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        align-items: center;

        a {
            padding: 15px 30px; /* 调整内边距以适应移动端 */
            margin-top: 15px;  /* 调整外边距以适应移动端 */
            border-radius: 10px;
            color: white;
            font-weight: 800;
            font-size: 18px; /* 调整字体大小以适应移动端 */
            background-color: rgb(58, 52, 52);
        }
    }

    @media only screen and (min-width: 600px) {
        .sign{
  height: 7%;
  position: absolute;
  left: 10px;
  top: 10px
}

        /* 在屏幕宽度大于等于600px时应用的样式 */
        h1 {
            font-size: 50px; /* 恢复原始字体大小 */
        }

        .main {
            // flex-direction: row; /* 在大屏幕上改为水平方向布局 */
            // align-items: flex-start; /* 调整对齐方式 */

            a {
                padding: 20px 50px; /* 恢复原始内边距 */
                margin-top: 30px; /* 恢复原始外边距 */
            }
        }
    }
}
</style>
