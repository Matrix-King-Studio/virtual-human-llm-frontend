<script setup>
import {Base64} from 'js-base64';
import VMS from './libs/web-2d-sdk-1.1.0/sdk/vms-2d-web-sdk-1.1.0.esm.min';
import {ElMessage, ElInput} from 'element-plus';

import {ref} from 'vue';
import axios from 'axios';

function startVMS() {
  VMS.start({
    appId: 'c2f4af4c',
    apiKey: 'a50e10629e5399e23dd63410dc0e315f',
    apiSecret: 'NWE4MDlkNGYxMjAxOWIwNzE4MDRkOWYy',
    width: 360, //宽度，可取 1920、1280、720
    height: 720, // 高度，可取1080、720、405
    moveH: 100,
    moveV: 100,
    scale: 0.8,
    maskRegion: '[0,154,1080,1472]',
    avatarId: '110005018', //形象ID
    streamDomId: 'remote_stream', //虚拟人视频流要渲染的Dom Id
  })
      .then(() => {
        console.log('启动虚拟人服务成功'); //成功回调
      })
      .catch(() => {
        console.log('启动虚拟人服务失败'); //失败回调
      });
}

function textDriverVirtualHuman(text) {
  VMS.textDriver(
      {
        encoding: 'utf8',
        compress: 'raw',
        format: 'plain',
        status: 3,
        text: Base64.encode(text),
      },
      {
        vcn: 'x3_qianxue', // 发音人
        speed: 50, // 语速：[0,100]，默认50
        pitch: 50, // 语调：[0,100]，默认50
        volume: 50,
      },
      {
        // 字偏移控制指令
        encoding: 'utf8',
        compress: 'raw',
        format: 'json',
        status: 3,
        text: Base64.encode(
            JSON.stringify({
              avatar: [
                {type: 'action', value: 'A_LH_introduced_O', wb: 3, we: 20},
                {type: 'action', value: 'A_RH_bye_O', wb: 30, we: 50},
              ],
            })
        ),
      }
  )
      .then(res => {
        console.log(res);
      })
      .catch(e => {
        VMS.stop()
            .then(() => {
              console.log('结束虚拟人服务成功'); //成功回调
            })
            .catch(() => {
              console.log('结束虚拟人服务失败'); //失败回调
            });
      });
}

function stopVMS() {
  VMS.stop();
}

function getAccessToken() {
  try {
    const token = JSON.parse(localStorage.getItem('token'));
    const {access_token} = token;
    return access_token;
  } catch (error) {
    return '';
  }
}

const msg = ref(''); //输入内容
// 发送消息
function sendmsg() {
  if (msg.value.length < 1) return ElMessage({message: '不能发送空消息！', type: 'error'});

  const content = msg.value;
  msg.value = ''; //清空输入框

  chatWithAi({
    content,
  });

  info.value.push({
    content,
  });
}

const info = ref([]);

//  aichat({ text: msg.value}).then(res => {
//         info.value = res.data;
//  })

function aiChat() {
  axios({
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    url: '/baidubce/oauth/2.0/token',
    params: {
      grant_type: 'client_credentials',
      client_id: 'rG08BZZ7TfDqLQjkjyo9qqq1',
      client_secret: '3xXms40qc5WRG2RoQkagrCb18mFQTQtf',
    },
  }).then(response => {
    console.log(response);
    const {data} = response;
    localStorage.setItem('token', JSON.stringify(data));
  });
}

function chatWithAi({content}) {
  const access_token = getAccessToken();
  const messages = [
    {
      role: 'user',
      content,
    },
  ];
  axios({
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    url: `/baidubce/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/eb-instant`,
    params: {
      access_token,
    },
    data: {
      messages,
    },
  }).then(response => {
    const {data} = response;
    const {result, error_code, error_msg} = data;
    if (error_code) {
      ElMessage({message: error_msg, type: 'error'});
      return;
    }
    textDriverVirtualHuman(result);
    info.value.push({
      is_robot: 1,
      content: result,
    });
    console.log(response);
  });
}

function initAiChat() {
  if (!localStorage.getItem('token')) {
    aiChat();
  }
}

initAiChat();
</script>

<template>
  <div class="main">
    <div class="robot">
      <div id="remote_stream"></div>
      <!-- 这是你的虚拟人视频流的容器 -->
      <button @click="startVMS">开始播放</button>
      <button @click="stopVMS">停止</button>
      <button @click="aiChat">xinxi</button>
    </div>
    <div class="chatFrame">
      <div class="chatContent" ref="chatBox">
        <ul>
          <li v-for="(item, index) in info" :key="index" :class="[item.is_robot == 1 ? 'left' : 'right']">
            <span>{{ item.content }}</span>
          </li>
        </ul>
      </div>

      <div class="sendBox">
        <el-input v-model="msg" placeholder="Please input" class="input-with-select">
          <template #append>
            <el-button @click="sendmsg" type="primary">发送</el-button>
          </template>
        </el-input>
      </div>
    </div>
  </div>
</template>

<style scoped>
.main {
  display: flex;
  width: 1000px;
  height: 700px;
  justify-content: space-between;
  align-items: center;
}

.chatContent {
  height: 560px;
  width: 500px;
  overflow-x: hidden;
}

ul {
  list-style: none;
  padding: 20px;
  margin: 0;
  font-size: 14px;
  line-height: 20px;
}

li.left {
  margin-right: 20px;
}

li.left span {
  display: inline-block;
  border-radius: 0 15px 15px;
  background-color: rgba(66, 196, 240, 0.1);
  padding: 10px 15px;
}

li.right {
  margin-left: 20px;
  text-align: right;
}

li.right span {
  display: inline-block;
  border-radius: 15px 0 15px 15px;
  background-color: rgba(73, 154, 41, 0.1);
  padding: 10px 15px;
}

li + li {
  margin-top: 20px;
}

.ql-container.ql-snow {
  border: 0;
}

.ql-editor {
  padding: 0;
}

.sendBox {
  width: 400px;
  border-radius: 10px;
}
</style>
