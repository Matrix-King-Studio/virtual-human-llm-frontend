<template >
  <div class="login-box">
    <el-image
      style="height: 50px; position: absolute; left: 10px; top: 10px" fit="fill"
      src="../src/assets/logo.png"/>
    <h2>用户登录</h2>
    <div class="login-container">
      <el-form
        ref="formRef"
        :model="LoginData"
        :rules="rules"
      >
        <el-form-item prop="username">
          <span>用户名</span>
            <el-input class="inp" placeholder="请输入用户名" v-model="LoginData.username" />
        </el-form-item>
        <el-form-item prop="password">
          <span>密码</span>
          <el-input type="password" class="inp" placeholder="请输入密码" v-model="LoginData.password" show-password />
        </el-form-item>
        <el-form-item prop="remember">
          <el-checkbox label="记住密码" name="remember" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">
            开始登录
          </el-button>
        </el-form-item>
      </el-form>
      <div class="link-box">
        <span><router-link to="/register">注册账号</router-link></span>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive } from 'vue';

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
  console.log(valid);
})
}

</script>
<style lang="less">
  .login-box {
    width: 488px;
    height: 482px;
    h2 {
      font-size: 30px;
      text-align: center;
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
</style>