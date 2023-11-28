<template>
    <div>
        <el-image style="height: 50px; position: absolute; left: 10px; top: 10px" fit="fill" src="../src/assets/logo.png" />
        <h1>请选择你要进入的页面</h1>
        <div class="main">
            <router-link to="/home">虚拟人 </router-link>
            
        </div>
        <div>
            <router-link to="/chat">chat对话</router-link>
        </div>
        

        
    </div>
</template>

<script>

</script>
<style lang="less" scoped>
.main_{
    display: flex;
    justify-content: space-between;
    flex-direction: column;
}



</style>