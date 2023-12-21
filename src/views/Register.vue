<template >
    <div class="container">
        <el-image class="sign" fit="fill" src="../src/assets/logo.png" />
        <div class="main_container">
            <h2>新用户注册</h2>
            <div class="mian_box">
                <el-form ref="formRef" label-width="100px" :model="registerForm" :rules="rules"
                    style="max-width: 660px ;min-width: 400px;" class="box_form">
                    <el-form-item label="用户名" prop="name">
                        <el-input v-model="registerForm.name" placeholder="请输入用户名" />
                    </el-form-item>
                    <el-form-item label="邮箱" prop="email">
                        <el-input v-model="registerForm.email" placeholder="请输入邮箱" />
                    </el-form-item>
                    <el-form-item label="登陆密码" prop="password">
                        <el-input v-model="registerForm.password" type="password" placeholder="请输入登陆密码" show-password />
                    </el-form-item>
                    <el-form-item label="确认密码" prop="passwordAgain">
                        <el-input v-model="registerForm.passwordAgain" placeholder="请再次输入登陆密码" show-password />
                    </el-form-item>
                    <!-- <el-form-item label="验证码" prop="code">
                        <el-input v-model="registerForm.code" placeholder="请输入验证码" />
                    </el-form-item> -->
                </el-form>
                <!-- <div class="box_sure">
                    <el-checkbox v-model="checked">
                        <h6>我已阅读并同意《用户注册协议》</h6>
                    </el-checkbox>
                </div> -->
                <div class="box_bottom">
                    <div class="bottom_middle">
                        <!-- <h5>同意以上协议并注册</h5> -->
                        <el-button @click="register">同意以上协议并注册</el-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { totast } from '../composables/util'
import { registration } from "../utils/api"

// 设置接收传入的注册表单的值
const registerForm = reactive({
    name: '',
    email: '',
    password: '',
    passwordAgain: '',
    code: '',
})
// 设置登录表单的规则值
const rules = {
    name: [
        { required: true, message: '用户名不能为空', trigger: 'blur' },

    ],
    email: [
        { required: true, message: '邮箱不能为空', trigger: 'blur' },
        { pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/, message: '邮箱格式不正确', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '登陆密码不能为空', trigger: 'blur' },
        { min: 6, message: '登陆密码必须6位或以上', trigger: 'blur' },
    ],
    passwordAgain: [
        { required: true, message: '请再次输入登陆密码', trigger: 'blur' },

        {
            validator: (rule, value, callback) => {
                const password = registerForm.password // 这里需要用到第一次输入的密码值，可以根据实际情况修改
                if (value !== password) {
                    callback(new Error('两次输入的密码不一致'));
                } else {
                    callback();
                }
            },
            trigger: 'blur'
        }
    ],
    code: [
        { required: true, message: '验证码不能为空', trigger: 'blur' },
    ]
}
const router = useRouter();
// 返回登录页的配置
function login() {
    router.push('/login')
}
// 对注册的表单打上标识
const formRef = ref(null)
// 对于点击注册之后的函数进行实现
const register = () => {
    formRef.value.validate(() => {
        const { name, email, password, passwordAgain, code } = registerForm;
        // 进行表单验证
        if (!name || !email || !password || !passwordAgain) {
            // 有任何一个输入框为空，进行提示或处理
            totast("请将注册信息填充完整！", "error")
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            // 邮箱格式不正确，进行提示或处理
            totast("邮箱格式不正确！", "error")
            return;
        }
        // 判断密码是在这个范围之内
        if (password.length < 6) {
            totast("登陆密码需要6位或以上", "error")
            return;
        }
        if (password !== passwordAgain) {
            // 密码和确认密码不一致，进行提示或处理
            totast("密码和确认密码不一致！", "error")
            return;
        }


        // if(!valid){
        //     totast("请检查是否填写准确！","error")
        // }
        registration(registerForm.name, registerForm.email, registerForm.password, registerForm.passwordAgain)
            // 执行成功的回调
            .then(res => {
                console.log(res)
                totast("注册成功！请登录！", "success")
                router.push("/login")
            })
            // 执行错误的回调
            .catch(err => {
                totast(err.response.data.username[0], "error")
                // console.log(err)
            })
    })
}

</script>
<style lang="less">
.container {
    display: flex;
    justify-content: center;
    align-items: center;

    .main_container {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;



        .mian_box {
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            align-items: center;
            width: 500px;
            height: 400px;
            background-color: white;
            border-radius: 10px;

            .box_form {
                margin-top: 20px;
            }

            .el-form-item__label {
                font-size: 17px;
                font-weight: 700;
            }

            .box_sure {
                margin-top: -10px;

                h6 {
                    color: grey;
                    font-size: 12px;
                    font-weight: 400;
                }
            }

            .box_bottom {
                display: flex;
                width: 400px;
                justify-content: space-around;

                .bottom_left {
                    font-size: 15px;

                    h3 {
                        color: rgb(30, 30, 150);
                        font-weight: 400;
                        cursor: pointer;
                    }
                }

                .bottom_middle {
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    .el-button {
                        border-radius: 8px;
                        background-color: black;
                        color: white;
                        font-weight: 800;
                        height: 40px;
                    }
                }

                .bottom_right {
                    font-size: 15px;

                    h3 {
                        color: rgb(30, 30, 150);
                        font-weight: 400;
                        cursor: pointer;
                    }
                }

            }

        }
    }
}



@media only screen and (max-width: 768px) {
    .sign {
        height: 5%;
        position: absolute;
        left: 10px;
        top: 10px
    }


    .container {
        display: flex;
        justify-content: center;
        align-items: center;

        .main_container {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;



            .mian_box {
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                align-items: center;
                width: 90%;
                height: 300px;
                background-color: white;
                border-radius: 10px;

                .box_form {
                    margin-top: 20px;
                }

                .el-form-item {
                    width: 80%;
                    padding-left: 20px;
                }

                .el-form-item__label {
                    font-size: 17px;
                    font-weight: 700;
                }

                .box_sure {
                    margin-top: -10px;

                    h6 {
                        color: grey;
                        font-size: 12px;
                        font-weight: 400;
                    }
                }

                .box_bottom {
                    display: flex;
                    width: 400px;
                    justify-content: space-around;

                    .bottom_left {
                        font-size: 15px;

                        h3 {
                            color: rgb(30, 30, 150);
                            font-weight: 400;
                            cursor: pointer;
                        }
                    }

                    .bottom_middle {
                        display: flex;
                        justify-content: center;
                        align-items: center;

                        .el-button {
                            border-radius: 8px;
                            background-color: black;
                            color: white;
                            font-weight: 800;
                            height: 40px;
                        }
                    }

                    .bottom_right {
                        font-size: 15px;

                        h3 {
                            color: rgb(30, 30, 150);
                            font-weight: 400;
                            cursor: pointer;
                        }
                    }

                }

            }
        }
    }

}
</style>