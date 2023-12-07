<template>
  <div class="main">
    <el-image style="height: 50px; position: absolute; left: 10px; top: 10px" fit="fill" src="../src/assets/logo.png" />
    <el-button @click="logout" style="position: absolute; right: 10px; top: 10px">退出登录</el-button>
    <div class="box">
      <div class="chatFrame" v-show="true">
        <h1 :title="titlebiaoti.value">防疫问答中心</h1>
        <!-- 滚动框 -->
        <el-scrollbar class="chatContent" ref="scrollBox">
          <ul ref="chatBox" id="scrollBox">
            <li v-for="(item, index) in info" :key="index"
              :class="{ 'user': item.role === 'user', 'virtual_human': item.role !== 'user' }">
              <div class="dialog">
                <div class="icoBox"></div>
                <span  :class="{ 'user': item.role === 'user', 'virtual_human': item.role !== 'user' }" :title="item.content" :id="item.time" ref="itemTimeRef"> {{
                  item.content }} </span>
              </div>

              <div v-if="item.role === 'virtual_human'">
                <svg width="15" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                  style="cursor: pointer;" @click="handleThumbUp(index)"
                  :class="item.status === 'upvote' ? 'upvote' : null" ref="svgRef">
                  <path fill-rule="nonzero" clip-rule="evenodd"
                    d="M12.1318 2.50389C12.3321 2.15338 12.7235 1.95768 13.124 2.00775L13.5778 2.06447C16.0449 2.37286 17.636 4.83353 16.9048 7.20993L16.354 8.99999H17.0722C19.7097 8.99999 21.6253 11.5079 20.9313 14.0525L19.5677 19.0525C19.0931 20.7927 17.5124 22 15.7086 22H6C4.34315 22 3 20.6568 3 19V12C3 10.3431 4.34315 8.99999 6 8.99999H8C8.25952 8.99999 8.49914 8.86094 8.6279 8.63561L12.1318 2.50389ZM10 20H15.7086C16.6105 20 17.4008 19.3964 17.6381 18.5262L19.0018 13.5262C19.3488 12.2539 18.391 11 17.0722 11H15C14.6827 11 14.3841 10.8494 14.1956 10.5941C14.0071 10.3388 13.9509 10.0092 14.0442 9.70591L14.9932 6.62175C15.3384 5.49984 14.6484 4.34036 13.5319 4.08468L10.3644 9.62789C10.0522 10.1742 9.56691 10.5859 9 10.8098V19C9 19.5523 9.44772 20 10 20ZM7 11V19C7 19.3506 7.06015 19.6872 7.17071 20H6C5.44772 20 5 19.5523 5 19V12C5 11.4477 5.44772 11 6 11H7Z">
                  </path>
                </svg>


                <svg width="15" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                  :class="item.status === 'downvote' ? 'downvote' : null" style="cursor: pointer; margin-left: 7px;"
                  @click="handleThumbDown(index)" ref="svgRef">
                  <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M11.8727 21.4961C11.6725 21.8466 11.2811 22.0423 10.8805 21.9922L10.4267 21.9355C7.95958 21.6271 6.36855 19.1665 7.09975 16.7901L7.65054 15H6.93226C4.29476 15 2.37923 12.4921 3.0732 9.94753L4.43684 4.94753C4.91145 3.20728 6.49209 2 8.29589 2H18.0045C19.6614 2 21.0045 3.34315 21.0045 5V12C21.0045 13.6569 19.6614 15 18.0045 15H16.0045C15.745 15 15.5054 15.1391 15.3766 15.3644L11.8727 21.4961ZM14.0045 4H8.29589C7.39399 4 6.60367 4.60364 6.36637 5.47376L5.00273 10.4738C4.65574 11.746 5.61351 13 6.93226 13H9.00451C9.32185 13 9.62036 13.1506 9.8089 13.4059C9.99743 13.6612 10.0536 13.9908 9.96028 14.2941L9.01131 17.3782C8.6661 18.5002 9.35608 19.6596 10.4726 19.9153L13.6401 14.3721C13.9523 13.8258 14.4376 13.4141 15.0045 13.1902V5C15.0045 4.44772 14.5568 4 14.0045 4ZM17.0045 13V5C17.0045 4.64937 16.9444 4.31278 16.8338 4H18.0045C18.5568 4 19.0045 4.44772 19.0045 5V12C19.0045 12.5523 18.5568 13 18.0045 13H17.0045Z"
                    fill="currentColor"></path>
                </svg>
                <svg width="15" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                  style="cursor: pointer; margin-left: 7px;" @click=" repeated(index - 1)" ref="svgRef">
                  <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M4.5 2.5C5.05228 2.5 5.5 2.94772 5.5 3.5V5.07196C7.19872 3.47759 9.48483 2.5 12 2.5C17.2467 2.5 21.5 6.75329 21.5 12C21.5 17.2467 17.2467 21.5 12 21.5C7.1307 21.5 3.11828 17.8375 2.565 13.1164C2.50071 12.5679 2.89327 12.0711 3.4418 12.0068C3.99033 11.9425 4.48712 12.3351 4.5514 12.8836C4.98798 16.6089 8.15708 19.5 12 19.5C16.1421 19.5 19.5 16.1421 19.5 12C19.5 7.85786 16.1421 4.5 12 4.5C9.7796 4.5 7.7836 5.46469 6.40954 7H9C9.55228 7 10 7.44772 10 8C10 8.55228 9.55228 9 9 9H4.5C3.96064 9 3.52101 8.57299 3.50073 8.03859C3.49983 8.01771 3.49958 7.99677 3.5 7.9758V3.5C3.5 2.94772 3.94771 2.5 4.5 2.5Z"
                    fill="currentColor"></path>
                </svg>
              </div>

            </li>
          </ul>
        </el-scrollbar>
        <div class="sendBox">
          <el-input v-model="msg"  :disabled="isInputDisabled"  placeholder="请输入想提问的问题" class="input-with-select" id="result" @keyup.enter="sendmsg">
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
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import { removeToken } from "../composables/auth";
import router from '../router'
import { totast } from "../composables/util";
import { debounce } from 'lodash-es';
import md5 from 'js-md5'
import { user, saveInfo, historyInfo, update, updateContent } from "../utils/api";
import { getToken } from "../composables/auth"
import { getColumnByCell } from "element-plus/es/components/table/src/util";




// 退出登录操作
function logout() {
  removeToken();
  totast("退出成功", "success");
  router.push('/login')
}
const visiable = ref(false)
const visiable1 = ref(true)
const itemTimeRef = ref(null)
const svgRef = ref(null)
const titlebiaoti = ref("")
const svg_color = ref("icon-mdb")
let updatecontent
// 调用点赞的函数
const handleThumbUp = debounce( (index) => {
  ////console.log(index)
  const itemId = itemTimeRef.value[index]?.getAttribute('id');
  // svgRef.value.setAttribute('display', "none")
  svgRef.value[((index - 1) / 2) * 3]?.setAttribute('class', 'upvote')
  svgRef.value[((index - 1) / 2) * 3 + 1]?.setAttribute('class', 'null')
  svgRef.value[((index - 1) / 2) * 3 + 2]?.setAttribute('class', 'null')
  const status = "upvote";
  
  update(user_id, status, itemId)
    .then(res => {
      totast('点赞成功', "success")
    })
  const token = getToken()
  user(token)
    .then(response => {
      user_id = response.pk;
      days = 1;
    // 在此基础上进行调用历史记录的接口,主要是为了进行刷新页面，将这个重新进行渲染
      historyInfo(user_id, days)
        .then((res) => {
          // //console.log(res.data)
          const historyInformation = res.data.map(element => {

            return {
              content: element.content,
              time: element.time,
              status: element.status,
              role: element.role
            }
          });
          info.value = historyInformation;
          //console.log(info.value)
        })
    })
  // ...
},500);


// 点踩函数的设置
const handleThumbDown = debounce( (index) => {
  //console.log(index)
  //console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%")
  const itemId = itemTimeRef.value[index]?.getAttribute('id');
  //console.log(itemTimeRef.value[index])
  svgRef.value[((index - 1) / 2) * 3]?.setAttribute('class', 'null')
  svgRef.value[((index - 1) / 2) * 3 + 1]?.setAttribute('class', 'downvote')
  svgRef.value[((index - 1) / 2) * 3 + 2]?.setAttribute('class', 'null')
  const status = "downvote";
  update(user_id, status, itemId)
    .then(res => {
      ////console.log(res)
      totast('点踩成功', "success")
    })
    //console.log(itemTimeRef.value[index])
    const token = getToken()
  // 调用获取用户消息的接口，同时对用户历史消息进行渲染，使用点踩可以进行运行
  user(token)
    .then(response => {
      ////console.log(response);
      user_id = response.pk;
      days = 1;
      ////console.log(response.pk);

      // 在此基础上进行调用历史记录的接口,主要是为了进行刷新页面，将这个重新进行渲染
      historyInfo(user_id, days)
        .then((res) => {
          // //console.log(res.data)
          const historyInformation = res.data.map(element => {

            return {
              content: element.content,
              time: element.time,
              status: element.status,
              role: element.role
            }
          });
          info.value = historyInformation;
          //console.log(info.value)
        })
    })
    .catch(error => {
      console.error(error);
    });
},500);



// 重新生成函数调用返回值
const repeated = debounce ((index) => {

  // 获取问题
  const content = itemTimeRef.value[index]?.getAttribute('title');
  // //console.log(centent)
  // 获取下方回答框的id值
  const itemId = itemTimeRef.value[index + 1]?.getAttribute('id');
  const messages = {
    messages: [
      {
        role: "user",
        content: content,
      },
    ],
  };
  // 在查询的过程中，将这个字符串作为返回答界面的值
  const textwaitting = "正在为您查询中...";
  itemTimeRef.value[index + 1].innerHTML = textwaitting;
  // 调用南开的值，进行重新查询
  axios({
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    url: "/search_web",
    data: messages,
  })
    .then((response) => {
      ////console.log(response)
      const { data } = response;
      const { result } = data;
      titlebiaoti.value = result
      const status = "null"
      role = "virtual_human"
      // 调用这个函数将回答的值返回到页面中
      repeatanswer(index + 1)
      // 将返回的内容定义到title中
      // itemTimeRef.value[index + 1]?.setAttribute('title', titlebiaoti.value)
      updatecontent = titlebiaoti.value
      totast("重新生成成功", "success")
      // 更新日志的回调，更新的内容
      updateContent(user_id, status, updatecontent, itemId)
        .then(res => {
          saveContent = updatecontent
        })
        const token = getToken()
  // 调用获取用户消息的接口，同时对用户历史消息进行渲染，使用点踩可以进行运行
  user(token)
    .then(response => {
      ////console.log(response);
      user_id = response.pk;
      days = 1;
      ////console.log(response.pk);

      // 在此基础上进行调用历史记录的接口,主要是为了进行刷新页面，将这个重新进行渲染
      historyInfo(user_id, days)
        .then((res) => {
          // //console.log(res.data)
          const historyInformation = res.data.map(element => {

            return {
              content: element.content,
              time: element.time,
              status: element.status,
              role: element.role
            }
          });
          info.value = historyInformation;
          //console.log(info.value)
        })
    })
    .catch(error => {
      console.error(error);
    });

    })
  // ...
},500);

// 将获取到的值进行返回到界面中的设置
// const sendmsg = debounce(() => {
const repeatanswer =  (index) => {
  // 获取回答框的id值
  svgRef.value[((index - 1) / 2) * 3]?.setAttribute('class', 'null')
  svgRef.value[((index - 1) / 2) * 3 + 1]?.setAttribute('class', 'null')
  svgRef.value[((index - 1) / 2) * 3 + 2]?.setAttribute('class', 'null')

  itemTimeRef.value[index].innerHTML = titlebiaoti.value
  //console.log(itemTimeRef.value[index])
  //console.log("@@@@@@@@@@@@")
};





let user_id;
let saveStatus;
let role
let saveContent
let rebuild;
let days

let model2;
onMounted(() => {
  const token = getToken()
  // 读取用户信息
  user(token)
    .then(response => {
      ////console.log(response);
      user_id = response.pk;
      days = 1;
      ////console.log(response.pk);

      // 在此基础上进行调用历史记录的接口
      historyInfo(user_id, days)
        .then((res) => {
          // //console.log(res.data)
          const historyInformation = res.data.map(element => {

            return {
              content: element.content,
              time: element.time,
              status: element.status,
              role: element.role
            }
          });
          info.value = historyInformation;
          //console.log(info.value)
          setTimeout(() => {
            scrollToBottom();
          });
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
const okToSend = ref(true);

const isInputDisabled = ref(false);
function sendmsg() {
  isInputDisabled.value = true
  setTimeout(() => {
    sendMsg();
  }, 500);
}


const sendMsg = debounce (() => {
  var audioMessage = document.getElementById("result").value;
  msg.value = audioMessage;
  ////console.log(visiable.value)
  // ////console.log("不能发送性能消息")
  if (msg.value.length < 1){
    isInputDisabled.value = false
    return ElMessage({ message: "不能发送空消息！", type: "error" });
  }
  // ////console.log(okToSend.value, "@@@@@@@@@@@@@@@");
  // okToSend.value =false;
  if (okToSend.value == false){
    return ElMessage({
      message: "正在查询，请稍候！！！",
      type: "error",
    })
    
  }
    ;

  const content = msg.value;
  // 调用保存日志的接口
  saveContent = msg.value;
  ////console.log(saveContent);
  msg.value = ""; //清空输入框
  document.getElementById("result").value = "";
  role = "user"
  saveStatus = null
  // 调用保存日志的接口
  saveContent = content;
  role = "user"
  saveStatus = null
  ////console.log(user_id)
  ////console.log(role)
  ////console.log(content)
  // 保存日志接口的调用
 

  saveInfo(user_id, role, saveContent, saveStatus, rebuild)
    // 保存日志接口成功之后执行的回调
    .then(res => {
      ////console.log(res)
    })
    .catch(err => {
      // 失败之后执行的回调
    })
    setTimeout(() => {
    chatWithAi({ content });
  }, 1000);
  // chatWithAi({
  //   content,
  // });

  info.value.push({
    role,
    content,
  });
  info1.value = info.value
  setTimeout(() => {
    scrollToBottom();
  });
  okToSend.value = true
},500) 

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
  okToSend.value = false;
  const messages = {
    messages: [
      {
        role: "user",
        content: content,
      },
    ],
  };
  ////console.log(messages);
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
      ////////成功之后执行下方的回调

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
        role: 'virtual_human'
      });

      // 对保存日志接口的调用，传入的参数值进行的匹配
      role = "virtual_human"
      saveContent = response.data.result
      saveStatus = null
      rebuild = false
      // 保存日志接口的调用
      saveInfo(user_id, role, saveContent, saveStatus, rebuild)
        // 保存日志接口成功之后执行的回调
        .then(res => {
          ////console.log(res)
        })
        .catch(err => {
          // 失败之后执行的回调
        })
        const token = getToken()
  user(token)
    .then(response => {
      user_id = response.pk;
      days = 1;
    // 在此基础上进行调用历史记录的接口,主要是为了进行刷新页面，将这个重新进行渲染
      historyInfo(user_id, days)
        .then((res) => {
          // //console.log(res.data)
          const historyInformation = res.data.map(element => {

            return {
              content: element.content,
              time: element.time,
              status: element.status,
              role: element.role
            }
          });
          info.value = historyInformation;
          //console.log(info.value)
        })
    })


      setTimeout(() => {
        scrollToBottom();
      });


      isInputDisabled.value = false
      okToSend.value = true;
      //console.log(okToSend.value)
    })
    .catch((err)=>{
      totast("聊天服务端错误","error")
      isInputDisabled.value = false;
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
  ////console.log(container, '************')
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

.questionBox {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  .questionBox_top {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  h1 {
    color: blue;
  }

  h3 {
    color: red;
  }
}

li.virtual_human {
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

li.virtual_human span {
  width: 100%;
  display: inline-block;
  // background: #cfcfcf00;
  // border-radius: 20px 20px 20px 20px;
  // box-shadow: 5px 5px 5px 5px rgba(67, 180, 255, 0.16);
  padding: 10px 15px;
  // margin: 20px;
  color: rgba(0, 0, 0, 0.758);
}

li.virtual_human .msg-evaluate {
  padding-left: 50px;
  display: block;
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

.upvote path {
  fill: blue;
}

.downvote path {
  fill: blue;
}

.null path {
  fill: black;
}

li.user {
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

li.user span {
  width: 100%;
  display: inline-block;
  // background: #cfcfcf00;
  // border-radius: 20px 20px 20px 20px;
  // box-shadow: 5px 5px 5px 5px rgba(67, 180, 255, 0.16);
  padding: 10px 15px;
  // margin: 20px;
  color: rgba(0, 0, 0, 0.758);
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

      h1 {
        color: blue;
        font-size: 40px;
      }

      .chatContent {
        // background: #ffffff45;
        // box-shadow: 1px 50px 99px 1px #9fb3f540;
        border-radius: 20px;
        width: 100%;
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