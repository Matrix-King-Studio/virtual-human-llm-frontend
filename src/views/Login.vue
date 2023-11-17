<template >
    <div>
       <el-form :model="LoginData">
        <el-form-item label="用户名" >
            <el-input v-model="LoginData.username"></el-input>
        </el-form-item>
       </el-form>
    </div>
</template>
<script setup>
import { reactive } from 'vue';
const LoginData=reactive({
    username:''
})

</script>
<style lang="less">
    
</style>