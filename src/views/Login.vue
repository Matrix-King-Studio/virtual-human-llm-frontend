<template >
  <div class="login-box">
    <!-- <el-image class="sign"  fit="fill" src="../src/assets/logo.png" /> -->
    <img src="../assets/images/logo.png" alt="" class="sign">
    <h2>用户登录</h2>
    <div class="login-container">
      <el-form
        ref="formRef"
        :model="LoginData"
        :rules="rules"
        @keyup.enter="onSubmit"
      >
        <el-form-item prop="username">
          <span>用户名</span>
            <el-input class="inp" placeholder="请输入用户名" v-model="LoginData.username" />
        </el-form-item>
        <el-form-item prop="password">
          <span>密码</span>
          <el-input type="password" class="inp" placeholder="请输入密码"  v-model="LoginData.password" show-password />
        </el-form-item>
        <el-form-item prop="remember">
          <el-checkbox   label="记住密码" name="remember" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" style="background-color: black;">
            开始登录
          </el-button>
        </el-form-item>
      </el-form>
      <div class="link-box">

        <span></span>

        <span><router-link to="/register" style="color: black; " > 注册账号</router-link></span>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive } from 'vue';
// 引入封装的登录接口
import { sign } from "../utils/api";
// 引入二次封装的提示信息
import { totast } from '../composables/util';

import router from '../router';

// import { useCookies } from '@vueuse/integrations/useCookies'
import { setToken } from '../composables/auth'; 


const LoginData = reactive({
username: '',
password: '',
remember: [],
})

const rules = {
username: [
  { required: true, message: '用户名不能为空', trigger: 'blur' }
],
password: [
  { required: true, message: '密码不能为空', trigger: 'blur' }
],
}

const formRef = ref(null)

const onSubmit = () => {
formRef.value.validate((valid)=>{
  // 这里使用的是判断表单是否填充完整
  if(!valid){
    totast("请将表单填充完整！","error")
    return
  }
  // 如果完整的话，调用接口函数，传入的参数为LoginData这个表单中的username和password
  sign(LoginData.username,LoginData.password)
  // 成功的话执行下面的回调函数
  .then(res =>{
    console.log(res)
    // 使用router的跳转到首页
    totast("登陆成功！！欢迎！！","success")
    // 将key值存储为cookie
    
    // cookie.set('admin-token',res.key)
    setToken(res.key)

    router.push("/")
  })
  // 失败的话执行下面的回调函数
  .catch(err =>{
    // console.log(err)
    totast("用户名或密码错误！","error")
  })

})
}

</script>
<style lang="less">
  .sign{
  height: 7%; 
  position: absolute; 
  left: 10px;
  top: 10px
}


  .login-box {
    width: 488px;
    height: 482px;
    h2 {
      font-size: 30px;
      text-align: center;
    }
    .el-checkbox__label{
      margin-top: -5px !important;
      color: black !important;
      font-size: 15px !important;
      font-weight: 600 !important;
    }
    .login-container {
      width: 90%;
      height: 70%;
      padding: 5%;
      background-color: #fff;
      box-shadow: 1px 50px 99px 1px #9fb3f540;
      border-radius: 20px;
      .el-form {
        height: 95%;
        padding: 0 5%;
        .el-form-item__content {
          span {
            font-weight: 700;
            font-size: 20px;
            margin-bottom: 5px;
          }
          .inp {
            height: 50px;
          }
          .el-button {
            margin: auto;
            width: 130px;
            height: 45px;
          }
        }
      }
      .link-box {
        display: flex;
        justify-content: flex-end;
      }
    }
  }


  @media only screen and (max-width: 768px) {

.sign{
  height: 5%; 
  position: absolute; 
  left: 10px;
  top: 10px
}
}
</style>