<template >
    <div>
        <el-input v-model="textarea" type="textarea" placeholder="请输入翻译内容"></el-input>
        <button @click="goTranslate">翻译</button>
        <el-input v-model="result" type="textarea" placeholder="这是翻译后的数据"></el-input>
    </div>
</template>
<script setup>
import axios from 'axios';
import { ref } from 'vue';
import md5 from 'js-md5'
const textarea=ref("")
const result=ref("")

const translate=(query)=>{
                    var appid = '20231117001883604'
                    var key = 'lAxlO8o4mTT0LkQXNW_V'
                    var salt = (new Date).getTime()
                    var query = query
                    var from = 'auto'
                    var to = 'zh'
                    var str1 = appid + query + salt + key
                    var sign = md5(str1)
                 axios.get('/trans',{params:{
                        q: query,
                            appid: appid,
                            salt: salt,
                            from: from,
                            to: to,
                            sign: sign
                    }}).then((res)=>{
                        result.value=res.data.trans_result[0].dst
                        console.log(res.data.trans_result[0].dst,'翻译成功咯')
                    })
                  
                }
const goTranslate=()=> {
                    if (textarea.value.length === 0) return
                    translate(textarea.value)
                }

    
</script>
<style lang="">

</style>