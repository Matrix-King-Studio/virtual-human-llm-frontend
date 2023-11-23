<template>
  <div class="main">
    <el-image style="height: 50px; position: absolute; left: 10px; top: 10px" fit="fill" src="../src/assets/logo.png" />
    <el-select v-model="language" placeholder="一键翻译"
      style="width: 100px; height: 50px; position: absolute; right: 200px; top: 10px" @change="change">
      <el-option label="中文" value="chinese" />
      <el-option label="英文" value="english" />
    </el-select>
    <el-button @click="logout" style="position: absolute; right: 10px; top: 10px">退出登录</el-button>
    <div class="box">
      <div class="chatFrame" v-if="chatBoxIsShow">
        <!-- 滚动框 -->
        <el-scrollbar class="chatContent" ref="scrollBox">
          <ul ref="chatBox" id="scrollBox">
            <li v-for="(item, index) in info" :key="index" :class="[index % 2 === 0 ? 'right' : 'left']">
              <span :class="[index % 2 === 0 ? '' : '']" :title="item.content">{{ item.content }}</span>
              <div v-if="index % 2 !== 0" class="msg-evaluate">
                <el-button size="small" class="evaluate-btn">点赞</el-button>
                <el-button size="small" class="evaluate-btn">点踩</el-button>
                <el-button size="small" class="evaluate-btn">重答</el-button>
              </div>
            </li>
          </ul>
        </el-scrollbar>
      </div>

      <!-- 虚拟人 -->
      <div class="right-box">
        <div class="robot">
          <!-- 这是你的虚拟人视频流的容器 -->
          <div class="remote_stream" id="robot_stream">
            <canvas id="canvas" class="canvas"></canvas>
          </div>
        </div>
        <!-- 两个按钮 -->
        <div class="chatBut" @click="chatBoxIsShow = !chatBoxIsShow">
          <svg t="1698560429724" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
            p-id="10229" width="20" height="20">
            <path
              d="M683.7 922.7h-345c-73.5 0-133.3-59.8-133.3-133.3V459.8c0-73.5 59.8-133.3 133.3-133.3h345c73.5 0 133.3 59.8 133.3 133.3v329.6c0 73.5-59.8 133.3-133.3 133.3z m-345-506.9c-24.3 0-44.1 19.8-44.1 44.1v329.6c0 24.3 19.8 44.1 44.1 44.1h345c24.3 0 44.1-19.8 44.1-44.1V459.8c0-24.3-19.8-44.1-44.1-44.1h-345zM914.3 759.6c-24.6 0-44.6-20-44.6-44.6V534.3c0-24.6 20-44.6 44.6-44.6s44.6 20 44.6 44.6V715c0 24.7-20 44.6-44.6 44.6zM111.7 759.6c-24.6 0-44.6-20-44.6-44.6V534.3c0-24.6 20-44.6 44.6-44.6s44.6 20 44.6 44.6V715c0 24.7-19.9 44.6-44.6 44.6z"
              fill="#ffffff" p-id="10230"></path>
            <path
              d="M511.2 415.8c-24.6 0-44.6-20-44.6-44.6V239.3c0-24.6 20-44.6 44.6-44.6s44.6 20 44.6 44.6v131.9c0 24.6-20 44.6-44.6 44.6z"
              fill="#ffffff" p-id="10231"></path>
            <path
              d="M511.2 276.6c-49.2 0-89.2-40-89.2-89.2s40-89.2 89.2-89.2 89.2 40 89.2 89.2-40 89.2-89.2 89.2z m0-89.2h0.2-0.2z m0 0h0.2-0.2z m0 0h0.2-0.2z m0 0h0.2-0.2z m0 0z m0 0h0.2-0.2z m0 0h0.2-0.2z m0-0.1h0.2-0.2zM399 675.5c-28.1 0-50.9-22.8-50.9-50.9 0-28.1 22.8-50.9 50.9-50.9s50.9 22.8 50.9 50.9c0 28.1-22.8 50.9-50.9 50.9zM622.9 675.5c-28.1 0-50.9-22.8-50.9-50.9 0-28.1 22.8-50.9 50.9-50.9 28.1 0 50.9 22.8 50.9 50.9 0 28.1-22.8 50.9-50.9 50.9z"
              fill="#ffffff" p-id="10232"></path>
          </svg>
        </div>
        <div class="newsBut" @click="newsBoxIsShow = !newsBoxIsShow">
          <svg t="1698559285380" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
            p-id="5066" width="20" height="20">
            <path
              d="M896 192v704H256.8c-71.2 0-128.8-57.6-128.8-128.8V256.8C128 185.6 185.6 128 256.8 128H768v512H257.6c-36 0-65.6 29.6-65.6 65.6v60.8c0 36 29.6 65.6 65.6 65.6H832V192h64zM768 704H256v64h512v-64z"
              p-id="5067" fill="#ffffff"></path>
          </svg>
        </div>

        <!-- 字幕 -->
        <!-- <div class="subtitle-container">
          <div
              class="subtitle"
              :key="index"
          >
            {{ subtitleRef }}
          </div>
        </div> -->
        <!-- 输入的内容，左上角显示 -->
        <li ref="chatBox" v-for="(item, index) in info" :key="index" class="question"
          :class="[index % 2 === 0 ? 'right' : 'vanish']" v-show="index === info.length - 2">
          <span>{{ item.content }}</span>

        </li>

        <!-- 发送框 -->
        <div class="sendBox">

          <el-input v-model="msg" placeholder="Please input" class="input-with-select" id="result" @keyup.enter="sendmsg">
            <!-- :suffix-icon="Microphone" -->
            <template #append>
              <el-button style="padding-right: 40px" id="btn_control">
                <svg t="1695268139557" class="icon" viewBox="0 0 1024 1024" version="1.1"
                  xmlns="http://www.w3.org/2000/svg" p-id="1815" width="16" height="16">
                  <path
                    d="M488.727273 930.909091v-93.905455a325.934545 325.934545 0 0 1-280.832-207.825454A325.073455 325.073455 0 0 1 186.181818 512h46.545455c0 34.792727 6.353455 68.677818 18.594909 100.421818A279.365818 279.365818 0 0 0 791.272727 512h46.545455c0 40.494545-7.400727 80.011636-21.643637 117.038545A325.934545 325.934545 0 0 1 535.272727 837.003636V930.909091h186.181818v46.545454H302.545455v-46.545454h186.181818z m23.272727-837.818182a186.181818 186.181818 0 0 0-186.181818 186.181818v232.727273a186.181818 186.181818 0 1 0 372.363636 0V279.272727a186.181818 186.181818 0 0 0-186.181818-186.181818z m0-46.545454c128.535273 0 232.727273 104.192 232.727273 232.727272v232.727273c0 128.535273-104.192 232.727273-232.727273 232.727273s-232.727273-104.192-232.727273-232.727273V279.272727c0-128.535273 104.192-232.727273 232.727273-232.727272z"
                    fill="#6D7793" p-id="1816"></path>
                </svg>
              </el-button>

              <el-button @click="sendmsg" type="primary" style="padding-right: 10px">
                <svg t="1695268383161" class="icon" viewBox="0 0 1024 1024" version="1.1"
                  xmlns="http://www.w3.org/2000/svg" p-id="2870" width="16" height="16">
                  <path
                    d="M978.7 67.5c0-0.1-0.1-0.1-0.1-0.2-2.1-4.1-5.1-7.8-8.8-10.8-3.6-3-7.7-5.2-12-6.6-0.1 0-0.2-0.1-0.3-0.1-1.7-0.6-3.5-0.9-5.3-1.2-0.5-0.1-1-0.3-1.6-0.3-1.7-0.2-3.3-0.2-5-0.1-0.7 0-1.3-0.1-2 0-4.8 0.3-9.6 1.7-14 3.9L61.5 482.6c-8.5 4.1-15 11.5-18 20.5-0.9 2.5-1.3 5.2-1.6 7.8-0.9 5.3-0.7 10.8 1 16 2.8 9.1 9.1 16.6 17.6 20.9l220.3 115.8c5.3 2.8 11.1 4.2 17.1 4.2 13.3 0.1 25.5-7.1 32-18.7 9.5-17.3 2.8-38.8-14.8-48.1l-161-84.6 647.5-321.2-394.9 453.5c-0.3 0.3-0.4 0.7-0.7 1-9.8 6.4-16.2 17.2-16.2 29.6v261.1c0.1 9.5 4 18.6 10.8 25.3 6.8 6.7 16 10.3 25.5 10.2v0.1c20 0 36.2-15.9 36.2-35.5V694.3L893.4 199l-89.6 653.3-227.3-109.2c-17.9-8.6-39.4-1.4-48.5 16.2-4.2 8.5-4.8 18.3-1.7 27.3 3.1 9 9.7 16.3 18.3 20.3l270.1 129.9c5 2.4 10.4 3.6 16 3.6 0.2 0 0.4-0.1 0.6-0.1 0.6 0 1.3 0.2 1.9 0.2 18 0.1 33.3-13 35.9-30.8l112-816.1c2.5-8.4 2-17.7-2.4-26.1z"
                    p-id="2871"></path>
                </svg>
              </el-button>
            </template>
          </el-input>
        </div>
      </div>
      <div class="newsBox" v-show="newsBoxIsShow">
        <div class="abstract">
          <!-- 参考文献 -->
          <el-button class="butBox" text @click="dialogTableVisible1 = true">
            参考文献
          </el-button>
          <el-drawer v-model="dialogTableVisible1" title="参考文献" size="35%">
            <div>
              <el-table row-key="id" :data="arrWithoutNews" style="width: 100%" stripe>
                <el-table-column type="index" label=" " width="50" />
                <el-table-column prop="title" label="标题" width="250" />
                <el-table-column prop="author" label="作者" width="150" />
                <el-table-column prop="time" label="时间" width="100" />
                <el-table-column prop="if" label="影响因子" width="100" />
                <el-table-column fixed="right" prop="abstract" label="摘要" width="100">
                  <template #default="scope">
                    <el-button link type="primary" size="small" @click="showDrawer(scope.$index)">
                      详情
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-drawer v-model="drawer1" append-to-body class="abstract_bgc">
                <h3 class="abstract_title">
                  {{ arrWithoutNews[selectedRowIndex].title }}
                </h3>
                <p v-if="selectedRowIndex !== null" class="abstract_content">
                  {{ arrWithoutNews[selectedRowIndex].abstract }}
                </p>
              </el-drawer>
            </div>
          </el-drawer>
        </div>
        <div class="news">
          <!-- 新闻 -->
          <el-button class="butBox" text @click="dialogTableVisible2 = true">
            新闻
          </el-button>
          <el-drawer v-model="dialogTableVisible2" title="新闻" size="35%">
            <div>
              <el-table row-key="id" :data="arrWithNews" style="width: 100%" stripe max-height="300">
                <el-table-column type="index" label=" " width="50" />
                <el-table-column prop="title" label="标题" width="350" />

                <el-table-column prop="time" label="时间" width="200" />

                <el-table-column fixed="right" prop="abstract" label="摘要" width="100">
                  <template #default="scope">
                    <el-button link type="primary" size="small" @click="showDrawer1(scope.$index)">
                      详情
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-drawer v-model="drawer2" append-to-body class="abstract_bgc">
                <div class="news_link_title">
                  <a :href="arrWithNews[selectedRowIndex].ref" target="_blank" class="news_link">
                    {{ arrWithNews[selectedRowIndex].title }}

                  </a>
                </div>
                <p v-if="selectedRowIndex !== null" class="abstract_content">
                  {{ arrWithNews[selectedRowIndex].abstract }}
                </p>
              </el-drawer>
            </div>
          </el-drawer>


          <!-- <el-dialog v-model="drawer2" title="相关新闻">
            <div v-for="(item, index) in arrWithNews" :key="index">
              <div>
                
                <el-link :href="item.ref" target="_blank" :underline="false" style="font-weight: bold" class="news_title">
                  {{ item.title }}
                </el-link>
              </div>
              <div class="news_content">{{ item.abstract }}</div>
            </div>
          </el-dialog> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { Base64 } from "js-base64";
import { ElMessage } from "element-plus";
import { ref, onMounted } from "vue";
import axios from "axios";
import { removeToken } from "../composables/auth";
import router from '../router'
import { totast } from "../composables/util";
import md5 from 'js-md5'

// 退出登录操作
function logout() {

  removeToken();
  totast("退出成功", "success");
  router.push('/login')
}


const cubism2Model =
  "./src/assets/haru/haru_greeter_t03.model3.json";
// "https://cdn.jsdelivr.net/gh/Matrix-King-Studio/virtual-human-llm-frontend@master/src/assets/live2d-widget-model-chitose/chitose.model.base.json";
const cubism4Model =
  "https://cdn.jsdelivr.net/gh/nladuo/live2d-chatbot-demo@main/dist/assets/haru/haru_greeter_t03.model3.json";

let model2;
let model4;
onMounted(() => {
  const virtualHuman = async () => {
    const app = new PIXI.Application({
      view: document.getElementById("canvas"),
      autoStart: true,
      backgroundColor: 0xffffff,
    });

    // model4 = await PIXI.live2d.Live2DModel.from(cubism4Model);
    // model4.x = -200;
    // model4.y = -100;
    // app.stage.addChild(model4);
    // model4.scale.set(0.5);

    model2 = await PIXI.live2d.Live2DModel.from(cubism2Model);
    model2.x = -200;
    model2.y = -100;
    app.stage.addChild(model2);
    model2.scale.set(0.5);
  };
  virtualHuman();
});
const setMouthOpenY = (v) => {
  v = Math.max(0, Math.min(1, v));

  // 这个地方需要进行调试
  // model2.internalModel.coreModel.setParamFloat("PARAM_MOUTH_OPEN_Y", v);
  model2.internalModel.coreModel.setParameterValueById("ParamMouthOpenY", v);
};

const result = ref("")
const lang = ref('')

let res_id;


const drawer1 = ref(false);
const drawer2 = ref(false);

const dialogTableVisible = ref(false);
const newsBoxIsShow = ref(false);
const chatBoxIsShow = ref(false);

let selectedRowIndex = ref(null);
let dialogTableVisible1 = ref(false);
let dialogTableVisible2 = ref(false);

function showDrawer(index) {
  selectedRowIndex = index;
  drawer1.value = true;

}

function showDrawer1(index) {
  selectedRowIndex = index;
  drawer2.value = true;
}

const translate = () => {
  const query1 = ref('');

  if (lang.value == 'en') {
    query1.value = info.value.map(element => (element.content ? element.content : element)).join('@ ');
  } else if (lang.value == 'zh') {
    info.value = info1.value;
    query1.value = info.value.map(element => (element.content ? element.content : element)).join('@ ');
  }
  const queryWithoutSymbols = query1.value.replace(/[^@]/g, '');

  const appid = '20231117001883604';
  const key = 'lAxlO8o4mTT0LkQXNW_V';
  const salt = (new Date()).getTime();
  const query = query1.value
  const from = 'auto';
  const to = lang.value;
  const str1 = appid + query + salt + key;
  const sign = md5(str1);

  axios.get('/trans', {
    params: {
      q: query,
      appid: appid,
      salt: salt,
      from: from,
      to: to,
      sign: sign
    }
  }).then((res) => {


    const translatedInfo = res.data.trans_result[0].dst.split('@').map(item => {
      return {
        content: item
      };
    });
    
    info.value = translatedInfo;

  });
};
const change = (e) => {

  if (e == 'chinese') {
    lang.value = 'zh'
  } else if (e == 'english') {
    lang.value = 'en'
  } else {
    lang.value = ''
  }
  translate()
}

const scriptElement1 = document.createElement("script");
const scriptElement2 = document.createElement("script");
const scriptElement3 = document.createElement("script");
scriptElement1.src = "./src/libs/example/crypto-js.js";
scriptElement2.src = "./dists/index.umd.js";
scriptElement3.src = "./src/libs/example/iat/index.js";
document.body.appendChild(scriptElement1);
document.body.appendChild(scriptElement2);
document.body.appendChild(scriptElement3);

//文字转语音
function translateTextListAudio(textList) {
  okToSend.value = false;
  if (!textList || textList.length === 0) return;

  const APPID = "c2f4af4c";
  const API_SECRET = "NWE4MDlkNGYxMjAxOWIwNzE4MDRkOWYy";
  const API_KEY = "a50e10629e5399e23dd63410dc0e315f";

  const audioPlayer = new AudioPlayer("../public/dist");
  let intervalOpen;
  let intervalClose;

  audioPlayer.onPlay = () => {
    intervalOpen = setInterval(() => {
      let randomOpenValue = 0.5 + (0.7 - 0.5) * Math.random();
      setMouthOpenY(randomOpenValue);
    }, 200);
    intervalClose = setInterval(() => {
      let randomCloseValue = 0.2 + (0.5 - 0.2) * Math.random();
      setMouthOpenY(randomCloseValue)
    }, 250);
    subtitleRef.value = textList[0];
  };

  audioPlayer.onStop = (audioDatas) => {
    clearInterval(intervalOpen);
    clearInterval(intervalClose);
    setMouthOpenY(0);
    subtitleRef.value = "";
    // 移除已经处理过的文本，并递归处理剩余的文本
    textList.shift();
    if (textList.length === 0) {
      okToSend.value = true;
    } else {
      translateTextListAudio(textList);
    }

  };

  function getWebSocketUrl(apiKey, apiSecret) {
    var url = "wss://tts-api.xfyun.cn/v2/tts";
    var host = location.host;
    var date = new Date().toGMTString();
    var algorithm = "hmac-sha256";
    var headers = "host date request-line";
    var signatureOrigin = `host: ${host}\ndate: ${date}\nGET /v2/tts HTTP/1.1`;
    var signatureSha = CryptoJS.HmacSHA256(signatureOrigin, apiSecret);
    var signature = CryptoJS.enc.Base64.stringify(signatureSha);
    var authorizationOrigin = `api_key="${apiKey}", algorithm="${algorithm}", headers="${headers}", signature="${signature}"`;
    var authorization = btoa(authorizationOrigin);
    url = `${url}?authorization=${authorization}&date=${date}&host=${host}`;
    return url;
  }

  function encodeText(text, type) {
    if (type === "unicode") {
      let buf = new ArrayBuffer(text.length * 4);
      let bufView = new Uint16Array(buf);
      for (let i = 0, strlen = text.length; i < strlen; i++) {
        bufView[i] = text.charCodeAt(i);
      }
      let binary = "";
      let bytes = new Uint8Array(buf);
      let len = bytes.byteLength;
      for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      return window.btoa(binary);
    } else {
      return Base64.encode(text);
    }
  }

  let ttsWS;

  function connectWebSocket(text) {
    const url = getWebSocketUrl(API_KEY, API_SECRET);
    if ("WebSocket" in window) {
      ttsWS = new WebSocket(url);
    } else if ("MozWebSocket" in window) {
      ttsWS = new MozWebSocket(url);
    } else {
      alert("浏览器不支持WebSocket");
      return;
    }

    ttsWS.onopen = (e) => {
      audioPlayer.start({
        autoPlay: true,
        sampleRate: 16000,
        resumePlayDuration: 1000,
      });

      var tte = "UTF8";
      var params = {
        common: { app_id: APPID },
        business: {
          aue: "raw",
          auf: "audio/L16;rate=16000",
          vcn: "xiaoyan",
          speed: 50,
          volume: 50,
          pitch: 50,
          tte,
        },
        data: {
          status: 2,
          text: encodeText(text, tte),
        },
      };
      ttsWS.send(JSON.stringify(params));
    };
    ttsWS.onmessage = (e) => {
      let jsonData = JSON.parse(e.data);
      // 合成失败
      if (jsonData.code !== 0) {
        console.error(jsonData);
        changeBtnStatus("UNDEFINED");
        return;
      }
      audioPlayer.postMessage({
        type: "base64",
        data: jsonData.data.audio,
        isLastData: jsonData.data.status === 2,
      });

      if (jsonData.code === 0 && jsonData.data.status === 2) {
        ttsWS.close();
      }
    };
    ttsWS.onerror = (e) => {
      console.error(e);
    };
    ttsWS.onclose = (e) => {
      // console.log(e);
    };
  }

  // 开始处理文本列表的第一个文本
  connectWebSocket(textList[0]);
}

const msg = ref(""); //输入内容

// 发送消息
let okToSend = ref(true);

function sendmsg() {
  var audioMessage = document.getElementById("result").value;

  msg.value = audioMessage;
  if (msg.value.length < 1)
    return ElMessage({ message: "不能发送空消息！", type: "error" });
  // console.log(okToSend.value, "@@@@@@@@@@@@@@@");
  if (okToSend.value == false)
    return ElMessage({
      message: "待当前对话结束后，方可发送信息！",
      type: "error",
    });
  const content = msg.value;
  msg.value = ""; //清空输入框
  document.getElementById("result").value = "";

  // console.log(chatBox.value.scrollHeight);

  chatWithAi({
    content,
  });

  info.value.push({
    content,
  });
  info1.value = info.value
  setTimeout(() => {
    scrollToBottom();
  });
  // consoloe.log("123131");
}

const info = ref([]);
const info1 = ref([]);

let finalSource;

function ruleSplitString(string, length = 25) {
  // 根据中文分割标点符号进行分割
  var sentences = string.split(/[\r\n，。！？；|,.!?;]/);

  // 初始化结果数组和当前字符串变量
  var result = [];
  var current = "";

  // 循环遍历分割后的每个句子
  for (var i = 0; i < sentences.length; i++) {
    var sentence = sentences[i];

    // 如果当前字符串变量加上该句子后长度小于指定长度，则将该句子加入到当前字符串变量中
    if (current.length + sentence.length < length) {
      current += sentence + " "; // 在句子末尾添加一个句号
    } else {
      // 如果加入该句子后长度大于等于指定长度，则将当前字符串变量添加到结果数组中，并将当前字符串变量重置为该句子
      result.push(current);
      current = sentence + " ";
    }
  }

  // 如果最后一个句子没有加入到结果数组中，则将其添加到结果数组中
  if (current) {
    result.push(current);
  }

  // 遍历结果数组，拼接长度小于5的元素与后一项元素
  for (var j = 0; j < result.length - 1; j++) {
    if (result[j].length < 5) {
      result[j] += result[j + 1];
      result.splice(j + 1, 1);
      j--; // 重新检查当前位置
    }
  }

  return result;
}

let splitResult;
let arrWithNews;
let arrWithoutNews;

function chatWithAi({ content }) {
  const messages = {
    messages: [
      {
        role: "user",
        content: content,
      },
    ],
  };
  console.log(messages);
  const textwaitting = "正在为您查询中...";

  subtitleRef.value = textwaitting;
  axios({
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    url: "/search_web",
    data: messages,
  })
    .then((response) => {

      const { data } = response;
      const { status, result, source, history } = data;
      arrWithNews = source.filter(
        (obj) => obj.hasOwnProperty("news") && obj.news
      );
      arrWithoutNews = source.filter(
        (obj) => !obj.hasOwnProperty("news") || !obj.news
      );

      finalSource = source;


      // if (status != 200) {
      //   ElMessage({message: result, type: "error"});
      // }

      splitResult = ruleSplitString(result);
      splitResult = splitResult.filter(function (element) {
        return element.trim() !== "";
      });

      info.value.push({
        content: result,
      });
      setTimeout(() => {
        scrollToBottom();
      });

      // delayedLoop(splitResult);
      translateTextListAudio(splitResult);
    })
}


//字幕
function countWords(str) {
  const chinese = Array.from(str).filter((ch) =>
    /[\u4e00-\u9fa5]/.test(ch)
  ).length;

  const english = Array.from(str)
    .map((ch) => (/[a-zA-Z0-9\s]/.test(ch) ? ch : " "))
    .join("")
    .split(/\s+/)
    .filter((s) => s).length;

  return chinese + english;
}

const subtitleRef = ref("");

//延时函数
let index = 0;



function scrollToBottom() {
  const container = document.querySelector("#scrollBox");
  console.log(container, '************')
  const lastMessage = container.lastElementChild;
  if (lastMessage) {
    lastMessage.scrollIntoView({ behavior: "smooth" });
  }
}

const language = ref("chinese");
//xuniren
</script>

<style lang="less" scoped>
ul {
  list-style: none;
  padding: 20px;
  margin: 0;
  font-size: 14px;
  line-height: 20px;
}

li.left {
  position: relative;
  margin-right: 20px;
}

li.vanish {
  display: none;
}

li.left span {
  display: inline-block;
  background: #cfcfcf00;
  border-radius: 20px 20px 20px 20px;
  box-shadow: 5px 5px 5px 5px rgba(67, 180, 255, 0.16);
  padding: 10px 15px;
  margin: 20px;
  color: rgba(0, 0, 0, 0.758);
}

li.left .msg-evaluate {
  position: absolute;
  bottom: -15px;
  left: 20px;
  width: 150px;
  height: 25px;
  border-radius: 20px 20px 20px 20px;
  .evaluate-btn {
    padding: 5px 6px;
    border-radius: 20px 20px 20px 20px;
  }
}

li.right {
  margin-left: 20px;
  text-align: right;
}

li.right span {
  display: inline-block;
  background: linear-gradient(180deg, #4c94f5 0%, #2dc7ff 100%);
  box-shadow: 3px 50px 50px 1px rgba(67, 180, 255, 0.16);
  border-radius: 20px 20px 20px 20px;
  color: white;
  padding: 10px 15px;
}

li+li {
  margin-top: 20px;
}

.ql-container.ql-snow {
  border: 0;
}

.ql-editor {
  padding: 0;
}

.main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;

  .box {
    display: flex;
    justify-content: center;
    width: 90%;
    height: 90%;
    // border: 1px solid #000;
    margin: 10px;

    .sendBox {
      height: 10%;
      width: 100%;
      margin-top: 10px;
      border-radius: 10px;
      --el-border-radius-base: 10px !important;
    }

    .chatFrame {
      margin: 10px;
      height: 100%;
      width: 30%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .chatContent {
        background: #ffffff45;
        box-shadow: 1px 50px 99px 1px #9fb3f540;
        border-radius: 20px;
        height: 100%;
        margin: 5px;
        position: relative;
        // overflow: auto;

        // overflow-x: hidden;
        .overNone {
          max-width: 120px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }

    .right-box {
      position: relative;
      margin: 10px;
      // width:550px;
      height: 90%;
      // border: 1px solid #000; //不需要
      // background: #ffffff;
      box-shadow: 1px 50px 99px 1px #9fb3f540;
      border-radius: 20px;

      .chatBut {
        background: linear-gradient(180deg, #979797 0%, #292929 100%);
        box-shadow: 0px 3px 6px 1px rgba(0, 0, 0, 0.16);
        width: 50px;
        height: 50px;
        box-shadow: 0px 3px 6px 1px rgba(0, 0, 0, 0.16);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;

        position: absolute;
        bottom: 45%;
        left: 10px;
      }

      .newsBut {
        width: 50px;
        height: 50px;
        background: linear-gradient(180deg, #ffe66b 0%, #ffc932 100%);
        box-shadow: 0px 3px 6px 1px rgba(0, 0, 0, 0.16);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;

        position: absolute;
        bottom: 45%;
        right: 10px;
      }

      .robot {
        overflow: hidden;
        width: 100%;
        height: 100%;
        box-shadow: 1px 50px 99px 1px #9fb3f540;
        border-radius: 20px;

        .remote_stream {
          ///虚拟人视频
          // height: ;
          // border: 2px solid #3dce3f; //不需要
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100%;
          width: 100%;
          background-color: white;
          box-shadow: 1px 50px 99px 1px #9fb3f540;
          border-radius: 20px;

          .canvas {
            width: 80%;
            height: 80%;
          }
        }
      }

      .right {
        position: absolute;
        top: 20px;
        left: 10px;
        list-style: none;
        font-size: small;
      }

      ///字字幕
      .subtitle-container {
        z-index: 9;
        position: absolute;
        bottom: 10px;
        left: 50%;
        transform: translateX(-50%);
        line-height: 50px;
        /*垂直居中*/
        text-align: center;

        width: 90%;
        height: 50px;

        overflow: hidden;

        border-radius: 20px;
        // border: 3px solid #d47171; //不需要
      }

      .subtitle {
        width: 100%;
        height: 100%;
        white-space: nowrap;
        // border: 2px solid #4b2a80; //不需要
      }

      .zimu {
        animation: scroll-left var(--animateTime, 1s) linear 1;
      }

      @keyframes scroll-left {
        0% {
          transform: translateX(0);
        }

        100% {
          transform: translateX(-100%);
        }
      }

      .chatContent {
        height: 30% !important;
        position: relative;
        z-index: 99;
        // overflow: auto;

        ul {
          position: absolute;
          bottom: 0;
          left: 0;
          z-index: 99;
        }
      }
    }

    .newsBox {
      margin: 10px;
      height: 100%;
      width: 15%;
      display: flex;
      flex-direction: column;

      background: #ffffff45;
      box-shadow: 1px 50px 99px 1px #9fb3f540;
      border-radius: 20px;
      height: 100%;

      .butBox {
        ///参考文献按钮
        margin: 10px;
        height: 40px;
        width: 80%;
        background: linear-gradient(180deg, #ffe66b 0%, #ffc932 100%);
        box-shadow: 0px 3px 6px 1px rgba(0, 0, 0, 0.16);
        color: white;
        font-weight: bold;
        border-radius: 20px 20px 20px 20px;
        display: flex;
        align-items: center;
        z-index: 99;
      }
    }
  }
}
</style>