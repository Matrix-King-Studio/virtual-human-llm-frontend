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
      <div class="questionBox" v-show="visiable1">
        <div class="questionBox_top"> 
          <h1>防疫问答中心</h1>
        <h3>欢迎使用防疫问答助手，请在下方对话框输入想要提问的问题</h3>
        </div>
          
        <div class="sendBox">
          <el-input v-model="msg" placeholder="请输入想提问的问题" class="input-with-select" id="result" @keyup.enter="sendmsg">
            <!-- :suffix-icon="Microphone" -->
            <template #append>
              <el-button @click="sendmsg" type="primary" style="padding-right: 10px">
                发送
              </el-button>
            </template>
          </el-input>
        </div>
      </div>
      <div class="chatFrame" v-show="visiable">
        <h1  :title="titlebiaoti.value" >防疫问答中心</h1>
        <!-- 滚动框 -->
        <el-scrollbar class="chatContent" ref="scrollBox">
          <ul ref="chatBox" id="scrollBox">
            <li v-for="(item, index) in info" :key="index" :class="[index % 2 === 0 ? 'right' : 'left']">
              <div class="dialog">
                <div class="icoBox"></div>
                <span :class="[index % 2 === 0 ? '' : '']" :title="item.content" :id="item.time" ref="itemTimeRef"> {{
                  item.content }} </span>
              </div>

              <div v-if="index % 2 !== 0" class="msg-evaluate">
                <svg width="15" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                  class="icon-md" style="cursor: pointer;" @click="handleThumbUp(index) "  >
                  <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M12.1318 2.50389C12.3321 2.15338 12.7235 1.95768 13.124 2.00775L13.5778 2.06447C16.0449 2.37286 17.636 4.83353 16.9048 7.20993L16.354 8.99999H17.0722C19.7097 8.99999 21.6253 11.5079 20.9313 14.0525L19.5677 19.0525C19.0931 20.7927 17.5124 22 15.7086 22H6C4.34315 22 3 20.6568 3 19V12C3 10.3431 4.34315 8.99999 6 8.99999H8C8.25952 8.99999 8.49914 8.86094 8.6279 8.63561L12.1318 2.50389ZM10 20H15.7086C16.6105 20 17.4008 19.3964 17.6381 18.5262L19.0018 13.5262C19.3488 12.2539 18.391 11 17.0722 11H15C14.6827 11 14.3841 10.8494 14.1956 10.5941C14.0071 10.3388 13.9509 10.0092 14.0442 9.70591L14.9932 6.62175C15.3384 5.49984 14.6484 4.34036 13.5319 4.08468L10.3644 9.62789C10.0522 10.1742 9.56691 10.5859 9 10.8098V19C9 19.5523 9.44772 20 10 20ZM7 11V19C7 19.3506 7.06015 19.6872 7.17071 20H6C5.44772 20 5 19.5523 5 19V12C5 11.4477 5.44772 11 6 11H7Z"
                    fill="currentColor"></path>
                </svg>


                <svg width="15" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                  class="icon-md" style="cursor: pointer; margin-left: 7px;" @click="handleThumbDown(index)">
                  <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M11.8727 21.4961C11.6725 21.8466 11.2811 22.0423 10.8805 21.9922L10.4267 21.9355C7.95958 21.6271 6.36855 19.1665 7.09975 16.7901L7.65054 15H6.93226C4.29476 15 2.37923 12.4921 3.0732 9.94753L4.43684 4.94753C4.91145 3.20728 6.49209 2 8.29589 2H18.0045C19.6614 2 21.0045 3.34315 21.0045 5V12C21.0045 13.6569 19.6614 15 18.0045 15H16.0045C15.745 15 15.5054 15.1391 15.3766 15.3644L11.8727 21.4961ZM14.0045 4H8.29589C7.39399 4 6.60367 4.60364 6.36637 5.47376L5.00273 10.4738C4.65574 11.746 5.61351 13 6.93226 13H9.00451C9.32185 13 9.62036 13.1506 9.8089 13.4059C9.99743 13.6612 10.0536 13.9908 9.96028 14.2941L9.01131 17.3782C8.6661 18.5002 9.35608 19.6596 10.4726 19.9153L13.6401 14.3721C13.9523 13.8258 14.4376 13.4141 15.0045 13.1902V5C15.0045 4.44772 14.5568 4 14.0045 4ZM17.0045 13V5C17.0045 4.64937 16.9444 4.31278 16.8338 4H18.0045C18.5568 4 19.0045 4.44772 19.0045 5V12C19.0045 12.5523 18.5568 13 18.0045 13H17.0045Z"
                    fill="currentColor"></path>
                </svg>
                <svg width="15" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                  class="icon-md" style="cursor: pointer; margin-left: 7px;" @click="repeated(index-1), repeatanswer(index)">
                  <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M4.5 2.5C5.05228 2.5 5.5 2.94772 5.5 3.5V5.07196C7.19872 3.47759 9.48483 2.5 12 2.5C17.2467 2.5 21.5 6.75329 21.5 12C21.5 17.2467 17.2467 21.5 12 21.5C7.1307 21.5 3.11828 17.8375 2.565 13.1164C2.50071 12.5679 2.89327 12.0711 3.4418 12.0068C3.99033 11.9425 4.48712 12.3351 4.5514 12.8836C4.98798 16.6089 8.15708 19.5 12 19.5C16.1421 19.5 19.5 16.1421 19.5 12C19.5 7.85786 16.1421 4.5 12 4.5C9.7796 4.5 7.7836 5.46469 6.40954 7H9C9.55228 7 10 7.44772 10 8C10 8.55228 9.55228 9 9 9H4.5C3.96064 9 3.52101 8.57299 3.50073 8.03859C3.49983 8.01771 3.49958 7.99677 3.5 7.9758V3.5C3.5 2.94772 3.94771 2.5 4.5 2.5Z"
                    fill="currentColor"></path>
                </svg>
              </div>

            </li>
          </ul>
        </el-scrollbar>
        <div class="sendBox">
          <el-input v-model="msg" placeholder="请输入想提问的问题" class="input-with-select" id="result" @keyup.enter="sendmsg">
            <!-- :suffix-icon="Microphone" -->
            <template #append>

              <el-button @click="sendmsg" type="primary" style="padding-right: 10px">
                发送
              </el-button>
            </template>
          </el-input>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ElMessage } from "element-plus";
import { ref, onMounted } from "vue";
import axios from "axios";
import { removeToken } from "../composables/auth";
import router from '../router'
import { totast } from "../composables/util";
import md5 from 'js-md5'
import { user, saveInfo, historyInfo, update } from "../utils/api";



// 退出登录操作
function logout() {
  removeToken();
  totast("退出成功", "success");
  router.push('/login')
}
const visiable = ref(false)
const visiable1 = ref(true)
const itemTimeRef = ref(null)
const titlebiaoti = ref("")
let repeat 
// 调用点赞的函数
// 使用itemTimeRef引用
const handleThumbUp = (index) => {
  const itemId = itemTimeRef.value[index]?.getAttribute('id');
  const status = "upvote";
  // 根据需要使用itemId变量
  console.log(itemId)
  console.log(user_id)
  console.log(status)
  update(user_id, status, itemId)
    .then(res => {
      console.log(res)
      totast('点赞成功', "success")
    })

  // ...
};

const repeated = (index) => {
  const content = itemTimeRef.value[index]?.getAttribute('title');
  

  const messages = {
    messages: [
      {
        role: "user",
        content: content,
      },
    ],
  };
  console.log(messages);
  axios({
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    url: "/search_web",
    data: messages,
  })
    .then((response) => {
      console.log(response)
      const { data } = response;
      const {  result } = data;
      titlebiaoti.value = result

      console.log(titlebiaoti.value)
    console.log("@@@@*******")
    })

  // ...
};

const repeatanswer = (index) => {
  
};


const handleThumbDown = (index) => {
  const itemId = itemTimeRef.value[index]?.getAttribute('id');
  const status = "downvote";
  // 根据需要使用itemId变量
  console.log(itemId)
  console.log(user_id)
  console.log(status)
  update(user_id, status, itemId)
    .then(res => {
      console.log(res)
      totast('点踩成功', "success")
    })

  // ...
};


let user_id;
let saveStatus;
let role
let saveContent
let rebuild;
let days

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

  // 读取用户信息
  user()
    .then(response => {
      console.log(response);
      user_id = response.pk;
      days = 1;
      console.log(response.pk);

      // 在此基础上进行调用历史记录的接口
      historyInfo(user_id, days)
        .then((res) => {
          console.log(res.data)
          const historyInformation = res.data.map(element => {
            console.log(element.content)
            return {
              content: element.content,
              time: element.time
            }
          });
          // const historyInfoTime = res.data.map(element => {
          //   // console.log(element.content)
          //   return {
          //     time: element.time
          //   }
          // });
          info.value = historyInformation;
          // info.time = historyInfoTime
          console.log(info.value)
          // console.log(info.time)
          console.log("@@@@@@@@")
        })
    })
    .catch(error => {
      console.error(error);
    });


});


const setMouthOpenY = (v) => {
  v = Math.max(0, Math.min(1, v));

};

const result = ref("")
const lang = ref('')

let res_id;


const drawer1 = ref(false);
const drawer2 = ref(false);

const dialogTableVisible = ref(false);
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
// 调用翻译的接口
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
// 调用选择语言的函数
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


const msg = ref(""); //输入内容

// 发送消息
let okToSend = ref(true);

function sendmsg() {
  var audioMessage = document.getElementById("result").value;
  msg.value = audioMessage;
  visiable.value = true;
  visiable1.value = false;
  console.log(visiable.value)
  console.log("不能发送性能消息")
  if (msg.value.length < 1)
    return ElMessage({ message: "不能发送空消息！", type: "error" });
  // console.log(okToSend.value, "@@@@@@@@@@@@@@@");
  if (okToSend.value == false)
    return ElMessage({
      message: "待当前对话结束后，方可发送信息！",
      type: "error",
    });

  const content = msg.value;
  // 调用保存日志的接口
  saveContent = msg.value;
  console.log(saveContent);
  msg.value = ""; //清空输入框
  document.getElementById("result").value = "";
  role = "user"
  saveStatus = null
  console.log(user_id)
  console.log(role)
  console.log(content)
  // 保存日志接口的调用
  saveInfo(user_id, role, saveContent, saveStatus, rebuild)
    // 保存日志接口成功之后执行的回调
    .then(res => {
      console.log(res)
    })
    .catch(err => {
      // 失败之后执行的回调
    })
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
// 进行分割的函数
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


// 调用南开虚拟人的回答问题的接口
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

      // 对保存日志接口的调用，传入的参数值进行的匹配
      role = "virtual_human"
      saveContent = response.data.result
      saveStatus = null
      // 保存日志接口的调用
      saveInfo(user_id, role, saveContent, saveStatus, rebuild)
        // 保存日志接口成功之后执行的回调
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          // 失败之后执行的回调
        })

      user()
        .then(response => {
          console.log(response);
          user_id = response.pk;
          days = 1;
          console.log(response.pk);

          // 在此基础上进行调用历史记录的接口
          historyInfo(user_id, days)
            .then((res) => {
              console.log(res.data)
              const historyInformation = res.data.map(element => {
                console.log(element.content)
                return {
                  content: element.content,
                  time: element.time
                }
              });
              // const historyInfoTime = res.data.map(element => {
              //   // console.log(element.content)
              //   return {
              //     time: element.time
              //   }
              // });
              info.value = historyInformation;
              // info.time = historyInfoTime
              console.log(info.value)
              // console.log(info.time)
              console.log("@@@@@@@@")
            })
        })
        .catch(error => {
          console.error(error);
        });
      setTimeout(() => {
        scrollToBottom();
      });

      // delayedLoop(splitResult);
      translateTextListAudio(splitResult);

    })
}


const subtitleRef = ref("");

//延时函数
let index = 0;
let time;
// 设置点赞和踩的更新



//设置滚动到底部的函数
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
.questionBox{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
.questionBox_top{
  display: flex;
  flex-direction: column;
  align-items: center;
}
  h1{
    color: blue;
  }
  h3{
    color: red;
  }
}
li.left {
  margin-top: 10px;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 10px;
  padding: 10px;

  .dialog {
    // border: 1px solid red;
    display: flex;
    justify-content: flex-start;

    .icoBox {
      width: 35px;
      height: 35px;
      border-radius: 3px;
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
      // background-image: url(../images/user.png);
      background-image: url(../assets/images/robot.png);
    }
  }


}

li.vanish {
  display: none;
}

li.left span {
  width: 100%;
  display: inline-block;
  // background: #cfcfcf00;
  // border-radius: 20px 20px 20px 20px;
  // box-shadow: 5px 5px 5px 5px rgba(67, 180, 255, 0.16);
  padding: 10px 15px;
  // margin: 20px;
  color: rgba(0, 0, 0, 0.758);
}

li.left .msg-evaluate {
  padding-left: 50px;
  // position: absolute;
  // bottom: -15px;
  // left: 20px;
  // width: 150px;
  // height: 25px;
  // border-radius: 20px 20px 20px 20px;

  .evaluate-btn {
    padding: 5px 6px;
    border-radius: 20px 20px 20px 20px;
  }
}

li.right {
  margin-top: 10px;
  margin-left: 20px;
  display: flex;
  // justify-content: flex-start;
  flex-direction: column;
  // text-align: right;

  .dialog {
    display: flex;
    justify-content: flex-start;
    background-color: white;
    border-radius: 10px;
    padding: 10px;

    .icoBox {
      width: 35px;
      height: 35px;
      border-radius: 3px;
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
      // background-image: url(../images/user.png);
      background-image: url(../assets/images/user.png);
    }
  }
}

li.right span {
  display: inline-block;
  // background: linear-gradient(180deg, #4c94f5 0%, #2dc7ff 100%);
  // box-shadow: 3px 50px 50px 1px rgba(67, 180, 255, 0.16);
  // border-radius: 20px 20px 20px 20px;
  color: black;
  padding: 10px 15px;
}

// li+li {
//   margin-top: 20px;
// }

.ql-container.ql-snow {
  border: 0;
}

.ql-editor {
  padding: 0;
}

.el-input-group {
  width: 92% !important;
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
    height: 120%;
    // border: 1px solid #000;
    margin: 10px;

    .sendBox {
      height: 10%;
      width: 100%;
      margin-top: 10px;
      border-radius: 10px;
      display: flex;
      justify-content: center;
      --el-border-radius-base: 10px !important;
    }

    .chatFrame {
      margin: 10px;
      height: 100%;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      h1{
        color: blue;
        font-size: 40px;
      }
      .chatContent {
        // background: #ffffff45;
        // box-shadow: 1px 50px 99px 1px #9fb3f540;
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

  }
}
</style>