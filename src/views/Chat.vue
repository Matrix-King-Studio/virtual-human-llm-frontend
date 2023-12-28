<template>
  <div class="main">
    <img src="../assets/images/logo.png" alt="" class="sign">
    <el-button @click="deletecontent" style="position: absolute; right: 100px; top: 10px">清空对话</el-button>
    <el-button @click="logout" style="position: absolute; right: 10px; top: 10px">退出登录</el-button>
    <div class="box">
      <div class="chatFrame" v-show="true">
        <!-- <h1 :title="titlebiaoti.value">123</h1> -->
        <!-- 滚动框 -->
        <el-scrollbar class="chatContent" ref="scrollBox">
          <ul ref="chatBox" id="scrollBox">
            <li v-for="(item, index) in info" :key="index" :class="{
              user: item.role === 'user',
              virtual_human: item.role !== 'user',
            }">
              <div class="dialog">
                <div class="icoBox"></div>
                <span :class="{
                  user: item.role === 'user',
                  virtual_human: item.role !== 'user',
                }" :title="item.content" :id="item.time" ref="itemTimeRef">
                  {{ item.content }}
                </span>
              </div>
              <div v-if="item.role === 'virtual_human'" class="optionIcon">
                <svg width="15" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style="cursor: pointer"
                  @click="handleThumbUp(index)" :class="item.status === 'upvote' ? 'upvote' : null" ref="svgRef">
                  <path fill-rule="nonzero" clip-rule="evenodd"
                    d="M12.1318 2.50389C12.3321 2.15338 12.7235 1.95768 13.124 2.00775L13.5778 2.06447C16.0449 2.37286 17.636 4.83353 16.9048 7.20993L16.354 8.99999H17.0722C19.7097 8.99999 21.6253 11.5079 20.9313 14.0525L19.5677 19.0525C19.0931 20.7927 17.5124 22 15.7086 22H6C4.34315 22 3 20.6568 3 19V12C3 10.3431 4.34315 8.99999 6 8.99999H8C8.25952 8.99999 8.49914 8.86094 8.6279 8.63561L12.1318 2.50389ZM10 20H15.7086C16.6105 20 17.4008 19.3964 17.6381 18.5262L19.0018 13.5262C19.3488 12.2539 18.391 11 17.0722 11H15C14.6827 11 14.3841 10.8494 14.1956 10.5941C14.0071 10.3388 13.9509 10.0092 14.0442 9.70591L14.9932 6.62175C15.3384 5.49984 14.6484 4.34036 13.5319 4.08468L10.3644 9.62789C10.0522 10.1742 9.56691 10.5859 9 10.8098V19C9 19.5523 9.44772 20 10 20ZM7 11V19C7 19.3506 7.06015 19.6872 7.17071 20H6C5.44772 20 5 19.5523 5 19V12C5 11.4477 5.44772 11 6 11H7Z">
                  </path>
                </svg>

                <svg width="15" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                  :class="item.status === 'downvote' ? 'downvote' : null" style="cursor: pointer; margin-left: 7px"
                  @click="handleThumbDown(index)" ref="svgRef">
                  <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M11.8727 21.4961C11.6725 21.8466 11.2811 22.0423 10.8805 21.9922L10.4267 21.9355C7.95958 21.6271 6.36855 19.1665 7.09975 16.7901L7.65054 15H6.93226C4.29476 15 2.37923 12.4921 3.0732 9.94753L4.43684 4.94753C4.91145 3.20728 6.49209 2 8.29589 2H18.0045C19.6614 2 21.0045 3.34315 21.0045 5V12C21.0045 13.6569 19.6614 15 18.0045 15H16.0045C15.745 15 15.5054 15.1391 15.3766 15.3644L11.8727 21.4961ZM14.0045 4H8.29589C7.39399 4 6.60367 4.60364 6.36637 5.47376L5.00273 10.4738C4.65574 11.746 5.61351 13 6.93226 13H9.00451C9.32185 13 9.62036 13.1506 9.8089 13.4059C9.99743 13.6612 10.0536 13.9908 9.96028 14.2941L9.01131 17.3782C8.6661 18.5002 9.35608 19.6596 10.4726 19.9153L13.6401 14.3721C13.9523 13.8258 14.4376 13.4141 15.0045 13.1902V5C15.0045 4.44772 14.5568 4 14.0045 4ZM17.0045 13V5C17.0045 4.64937 16.9444 4.31278 16.8338 4H18.0045C18.5568 4 19.0045 4.44772 19.0045 5V12C19.0045 12.5523 18.5568 13 18.0045 13H17.0045Z"
                    fill="currentColor"></path>
                </svg>
                <svg width="15" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                  style="cursor: pointer; margin-left: 7px" @click="repeated(index - 1)" ref="svgRef">
                  <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M4.5 2.5C5.05228 2.5 5.5 2.94772 5.5 3.5V5.07196C7.19872 3.47759 9.48483 2.5 12 2.5C17.2467 2.5 21.5 6.75329 21.5 12C21.5 17.2467 17.2467 21.5 12 21.5C7.1307 21.5 3.11828 17.8375 2.565 13.1164C2.50071 12.5679 2.89327 12.0711 3.4418 12.0068C3.99033 11.9425 4.48712 12.3351 4.5514 12.8836C4.98798 16.6089 8.15708 19.5 12 19.5C16.1421 19.5 19.5 16.1421 19.5 12C19.5 7.85786 16.1421 4.5 12 4.5C9.7796 4.5 7.7836 5.46469 6.40954 7H9C9.55228 7 10 7.44772 10 8C10 8.55228 9.55228 9 9 9H4.5C3.96064 9 3.52101 8.57299 3.50073 8.03859C3.49983 8.01771 3.49958 7.99677 3.5 7.9758V3.5C3.5 2.94772 3.94771 2.5 4.5 2.5Z"
                    fill="currentColor"></path>
                </svg>

                <svg t="1702787092946" style="cursor: pointer; margin-left: 7px" class="icon" viewBox="0 0 1024 1024"
                  version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4313" width="15" height="20"
                  @click="abstractBoxShow(index)">
                  <path
                    d="M835.770182 0l5.818182 23.179636L1024 976.174545l-22.528 5.79491L778.356364 1024l-5.818182-23.179636-181.690182-952.994909 22.528-5.79491L835.770182 0z m-586.472727 49.268364v968.936727l-21.829819 2.164364H0V49.268364h249.274182z m300.846545-0.698182l2.187636 23.901091V1018.181818l-23.970909 2.164364H302.312727V48.546909h247.808zM207.127273 91.298909H43.636364v885.573818H207.127273V91.322182z m301.614545-0.744727h-164.235636v886.318545h164.235636V90.577455zM799.441455 50.734545l-158.440728 31.162182L811.752727 973.963636l161.349818-31.883636L799.441455 50.734545zM124.974545 771.072a53.713455 53.713455 0 0 1 53.783273 53.643636 53.713455 53.713455 0 0 1-53.76 53.620364 53.713455 53.713455 0 0 1-53.806545-53.620364 53.713455 53.713455 0 0 1 53.783272-53.643636z m300.893091 0a53.713455 53.713455 0 0 1 53.76 53.643636 53.713455 53.713455 0 0 1-53.76 53.620364 53.713455 53.713455 0 0 1-53.783272-53.620364 53.713455 53.713455 0 0 1 53.76-53.643636z m396.846546-37.003636a53.899636 53.899636 0 0 1 52.829091-10.030546 53.527273 53.527273 0 1 1 17.454545 91.229091 53.899636 53.899636 0 0 1-52.829091 10.053818 53.527273 53.527273 0 1 1-17.454545-91.229091zM188.229818 300.032V330.472727h-124.276363v-30.440727h124.276363z m300.869818-1.466182v30.440727h-124.276363V298.589091h124.276363z m335.685819-46.592l5.818181 29.789091-121.809454 23.552-5.818182-29.789091 121.809455-23.552zM188.229818 181.178182v30.440727h-124.276363V181.178182h124.276363z m300.869818-0.721455v30.440728h-124.276363V180.456727h124.276363zM799.883636 139.938909l5.678546 29.858909-122.088727 23.179637-5.678546-29.85891 122.088727-23.179636z"
                    fill="#161616" p-id="4314"></path>
                </svg>

                <svg t="1702787756112" style="cursor: pointer; margin-left: 7px" class="icon" viewBox="0 0 1024 1024"
                  version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5328" width="20" height="20"
                  @click="newsBoxShow(index)">
                  <path
                    d="M270.72 594.56V436.352h-28.672v82.816c0 2.432 0.256 5.888 0.64 10.496l-53.888-93.312h-39.936v158.208h28.928v-94.72c0-1.92-0.128-4.096-0.512-6.784-0.128-0.896-0.128-2.688-0.256-5.376l61.952 106.88h31.744zM349.952 594.56h113.024v-31.232h-75.392v-34.56h59.264v-29.824h-59.264v-32.512h75.392v-30.08h-113.024zM595.328 594.56l25.088-104.704 25.984 104.704h36.48l39.68-158.208h-30.464l-22.4 96.512c-1.024 4.608-1.792 7.936-2.304 9.984l-26.624-106.496h-34.176l-25.856 106.496c-0.512-2.176-1.024-3.84-1.28-4.864-0.768-2.944-1.152-4.608-1.28-5.12l-21.76-96.512h-37.888l40.704 158.208h36.096zM861.056 562.56c-4.224 3.328-10.496 4.864-18.944 4.864-17.536 0-28.288-7.424-32.128-22.144l-34.304 7.808c3.584 14.592 11.136 25.472 22.528 32.896 11.392 7.424 25.216 11.136 41.472 11.136 21.632 0 37.888-5.248 48.896-15.616 11.008-10.496 16.512-22.784 16.512-37.12 0-9.088-2.56-17.408-7.68-24.704-5.12-7.424-11.392-12.672-18.944-16s-19.328-6.656-35.456-9.856c-9.6-1.92-15.872-4.224-18.56-6.912-2.688-2.56-4.096-5.888-4.096-9.6 0-9.472 7.296-14.208 22.016-14.208 13.696 0 22.656 6.272 27.008 18.816l31.488-10.496c-8.832-24.832-28.8-37.248-59.904-37.248-17.536 0-31.36 4.864-41.6 14.464-10.24 9.6-15.36 21.504-15.36 35.584 0 13.952 4.224 24.448 12.8 31.744 8.576 7.168 22.912 12.928 43.008 17.152 10.752 2.304 18.048 4.608 21.888 7.168 3.84 2.56 5.632 6.144 5.632 10.752-0.128 4.352-2.176 8.192-6.272 11.52zM510.464 393.856V109.568c-2.688 0.128-5.504 0.128-8.192 0.256-91.008 69.632-157.824 169.344-185.856 284.032h194.048zM278.4 637.568H119.552c45.952 147.968 172.928 260.224 329.344 284.16-83.712-73.344-144.512-172.16-170.496-284.16zM278.4 393.856c25.984-112 86.784-210.816 170.496-284.16-156.416 23.936-283.392 136.192-329.344 284.16h158.848zM744.832 393.856H903.68c-45.952-147.968-172.928-260.224-329.344-284.16 83.712 73.344 144.512 172.16 170.496 284.16zM505.344 637.568v288.64c2.688-0.128 5.504-0.128 8.32-0.256 92.416-70.784 160.128-171.904 188.544-288.512H505.344zM744.832 637.568c-25.984 112-86.784 210.816-170.496 284.16 156.416-23.936 283.392-136.192 329.344-284.16H744.832z"
                    fill="#333333" p-id="5329"></path>
                </svg>
              </div>
            </li>
          </ul>
        </el-scrollbar>
        <!-- 参考信息 -->
        <el-drawer v-model="abstractBox" title="参考信息" :size="drawerSize">
          <div>
            <el-table row-key="id" :data="arrWithoutNews" style="width: 100%" stripe>
              <el-table-column type="index" label=" " width="50" />
              <el-table-column prop="query" label="相关问题" width="250" />
              <!-- <el-table-column prop="author" label="作者" width="150" />
              <el-table-column prop="time" label="时间" width="100" />
              <el-table-column prop="if" label="影响因子" width="100" /> -->
              <el-table-column fixed="right" prop="answer" label="摘要" width="100">
                <template #default="scope">
                  <el-button link type="primary" size="small" @click="abstractDrawer(scope.$index)">
                    详情
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-drawer v-model="abstracter" append-to-body class="abstract_bgc">
              <h3 class="abstract_title">
                {{ arrWithoutNews[selectedIndex].query }}
              </h3>
              <p v-if="selectedIndex !== null" class="abstract_content">
                {{ arrWithoutNews[selectedIndex].answer }}
              </p>
            </el-drawer>
          </div>
        </el-drawer>
        <!-- 相关资讯 -->
        <el-drawer v-model="newsBox" title="相关资讯" :size="drawerSize">
          <div>
            <el-table row-key="id" :data="arrWithNews" style="width: 100%" stripe max-height="300">
              <el-table-column type="index" label=" " width="50" />
              <el-table-column prop="title" label="标题" width="200" />
              <el-table-column fixed="right" prop="abstract" label="摘要" width="100">
                <template #default="scope">
                  <el-button link type="primary" size="small" @click="newsDrawer(scope.$index)">
                    详情
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-drawer v-model="newser" append-to-body class="abstract_bgc">
              <div class="news_link_title">
                <a :href="arrWithNews[selectedIndex].ref" target="_blank" class="news_link">
                  {{ arrWithNews[selectedIndex].title }}

                </a>
              </div>
              <p v-if="selectedIndex !== null" class="abstract_content">
                {{ arrWithNews[selectedIndex].abstract }}
              </p>
            </el-drawer>
          </div>
        </el-drawer>
        <div class="sendBox">
          <el-input v-model="msg" :disabled="isInputDisabled" placeholder="请输入想提问的问题" class="input-with-select"
            id="result" @keyup.enter="sendmsg">
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
import router from "../router";
import { totast } from "../composables/util";
import { debounce } from "lodash-es";
import {
  user,
  saveInfo,
  historyInfo,
  update,
  updateContent,
  deleteContent
} from "../utils/api";
import { getToken } from "../composables/auth";
import { getColumnByCell } from "element-plus/es/components/table/src/util";

// 退出登录操作
function logout() {
  removeToken();
  totast("退出成功", "success");
  router.push("/login");
}

function deletecontent() {
  const token = getToken();
  user(token).then((response) => {
    user_id = response.pk;
    //days = 1;
    console.log(user_id)
    // 在此基础上进行调用历史记录的接口,主要是为了进行刷新页面，将这个重新进行渲染
    deleteContent(user_id).then((res) => {
      // console.log(res)
      info.value = [];
      // window.location.reload();
      totast("清空对话成功", 'success')


    });
    // 在此基础上进行调用历史记录的接口,主要是为了进行刷新页面，将这个重新进行渲染


  });
}




//历史文献与相关资讯抽屉控制开关
let abstractBox = ref(false);
let newsBox = ref(false);


// 历史文献的开关的函数
const abstractBoxShow = debounce((index) => {
  abstractBox.value = true
  // //console.log(abstractBox)
  //////console.log(index)
  // const itemId = itemTimeRef.value[index]?.getAttribute("title");
  //console.log(info.value[index].source)
  const sourceFinal = info.value[index].source

  arrWithoutNews = sourceFinal.filter(
    (obj) => !obj.hasOwnProperty("news") || !obj.news
  );
  // ...
}, 0);

// 相关资讯开关的函数

const newsBoxShow = debounce((index) => {
  newsBox.value = true
  // //console.log(abstractBox)
  //////console.log(index)
  // const itemId = itemTimeRef.value[index]?.getAttribute("title");
  //console.log(info.value[index].source)
  const sourceFinal = info.value[index].source

  arrWithNews = sourceFinal.filter(
    (obj) => obj.hasOwnProperty("news") && obj.news
  );
  // ...
}, 0);


const visiable = ref(false);
const visiable1 = ref(true);
const itemTimeRef = ref(null);
const svgRef = ref(null);
const titlebiaoti = ref("");
const svg_color = ref("icon-mdb");

let updatecontent;
// 调用点赞的函数
const handleThumbUp = debounce((index) => {
  //////console.log(index)
  const itemId = itemTimeRef.value[index]?.getAttribute("id");
  // svgRef.value.setAttribute('display', "none")
  svgRef.value[((index - 1) / 2) * 3]?.setAttribute("class", "upvote");
  svgRef.value[((index - 1) / 2) * 3 + 1]?.setAttribute("class", "null");
  svgRef.value[((index - 1) / 2) * 3 + 2]?.setAttribute("class", "null");
  const status = "upvote";

  update(user_id, status, itemId).then((res) => {
    totast("点赞成功", "success");
  });
  const token = getToken();
  user(token).then((response) => {
    user_id = response.pk;
    //days = 1;
    // 在此基础上进行调用历史记录的接口,主要是为了进行刷新页面，将这个重新进行渲染
    historyInfo(user_id, days).then((res) => {
      // ////console.log(res.data)
      const historyInformation = res.data.map((element) => {
        return {
          content: element.content,
          time: element.time,
          status: element.status,
          role: element.role,
          source: element.role
        };
      });
      info.value = historyInformation;
      ////console.log(info.value)
    });
  });
  // ...
}, 500);

// 点踩函数的设置
const handleThumbDown = debounce((index) => {
  ////console.log(index)
  ////console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%")
  const itemId = itemTimeRef.value[index]?.getAttribute("id");
  ////console.log(itemTimeRef.value[index])
  svgRef.value[((index - 1) / 2) * 3]?.setAttribute("class", "null");
  svgRef.value[((index - 1) / 2) * 3 + 1]?.setAttribute("class", "downvote");
  svgRef.value[((index - 1) / 2) * 3 + 2]?.setAttribute("class", "null");
  const status = "downvote";
  update(user_id, status, itemId).then((res) => {
    //////console.log(res)
    totast("点踩成功", "success");
  });
  ////console.log(itemTimeRef.value[index])
  const token = getToken();
  // 调用获取用户消息的接口，同时对用户历史消息进行渲染，使用点踩可以进行运行
  user(token)
    .then((response) => {
      //////console.log(response);
      user_id = response.pk;
      //days = 1;
      //////console.log(response.pk);

      // 在此基础上进行调用历史记录的接口,主要是为了进行刷新页面，将这个重新进行渲染
      historyInfo(user_id, days).then((res) => {
        // ////console.log(res.data)
        const historyInformation = res.data.map((element) => {
          return {
            content: element.content,
            time: element.time,
            status: element.status,
            role: element.role,
            source: element.source
          };
        });
        info.value = historyInformation;
        ////console.log(info.value)
      });
    })
    .catch((error) => {
      console.error(error);
    });
}, 500);

// 重新生成函数调用返回值
const repeated = debounce((index) => {
  // 获取问题
  const content = itemTimeRef.value[index]?.getAttribute("title");
  // ////console.log(centent)
  // 获取下方回答框的id值
  const itemId = itemTimeRef.value[index + 1]?.getAttribute("id");
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
  }).then((response) => {
    // //console.log("$$$$$$")
    // //console.log(response)
    const { data } = response;
    const { result } = data;
    titlebiaoti.value = result;
    const status = "null";
    role = "virtual_human";
    // 调用这个函数将回答的值返回到页面中
    repeatanswer(index + 1);
    // 将返回的内容定义到title中
    // itemTimeRef.value[index + 1]?.setAttribute('title', titlebiaoti.value)
    updatecontent = titlebiaoti.value;
    totast("重新生成成功", "success");
    // 更新日志的回调，更新的内容
    updateContent(user_id, status, updatecontent, itemId).then((res) => {
      saveContent = updatecontent;
    });
    const token = getToken();
    // 调用获取用户消息的接口，同时对用户历史消息进行渲染，使用点踩可以进行运行
    user(token)
      .then((response) => {
        //////console.log(response);
        user_id = response.pk;
        //days = 1;
        //////console.log(response.pk);

        // 在此基础上进行调用历史记录的接口,主要是为了进行刷新页面，将这个重新进行渲染
        historyInfo(user_id, days).then((res) => {
          // ////console.log(res.data)
          const historyInformation = res.data.map((element) => {
            return {
              content: element.content,
              time: element.time,
              status: element.status,
              role: element.role,
              source: element.source
            };
          });
          info.value = historyInformation;
          ////console.log(info.value)
        });
      })
      .catch((error) => {
        console.error(error);
      });
  });
  // ...
}, 500);

//历史文献
const abstractDrawer = (index) => {
  selectedIndex = index;
  abstracter.value = true;

}
//相关资讯
const newsDrawer = (index) => {
  selectedIndex = index;
  newser.value = true;
}


// 将获取到的值进行返回到界面中的设置
// const sendmsg = debounce(() => {
const repeatanswer = (index) => {
  // 获取回答框的id值
  svgRef.value[((index - 1) / 2) * 3]?.setAttribute("class", "null");
  svgRef.value[((index - 1) / 2) * 3 + 1]?.setAttribute("class", "null");
  svgRef.value[((index - 1) / 2) * 3 + 2]?.setAttribute("class", "null");

  itemTimeRef.value[index].innerHTML = titlebiaoti.value;
  ////console.log(itemTimeRef.value[index])
  ////console.log("@@@@@@@@@@@@")
};

//查询历史文献

let user_id;
let saveStatus;
let role;
let saveContent;
let rebuild;
let days = 1;

let model2;


const drawerSize = ref("35%");

const handleResize = () => {
  drawerSize.value = window.innerWidth <= 768 ? "100%" : "35%";
};

onMounted(() => {
  const token = getToken();
  // 读取用户信息
  user(token)
    .then((response) => {
      //////console.log(response);
      user_id = response.pk;
      console.log(info.value)
      console.log("######")
      //days = 1;
      //////console.log(response.pk);

      // 在此基础上进行调用历史记录的接口
      historyInfo(user_id, days).then((res) => {
        //console.log(res.data)
        const historyInformation = res.data.map((element) => {
          return {
            content: element.content,
            time: element.time,
            status: element.status,
            role: element.role,
            source: element.source
          };
        });
        const historySource = res.data.map((element) => {
          return {
            source: element.source
          };
        });

        info.value = historyInformation;
        //console.log("&&&&&^^^^^")
        //console.log(historySource)
        setTimeout(() => {
          scrollToBottom();
        });
      });
    })
    .catch((error) => {
      console.error(error);
    });

  handleResize()
});

const setMouthOpenY = (v) => {
  v = Math.max(0, Math.min(1, v));
};

const result = ref("");
const lang = ref("");

let res_id;

const abstracter = ref(false);
const newser = ref(false);

const dialogTableVisible = ref(false);
const chatBoxIsShow = ref(false);

let selectedIndex = ref(null);

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
  isInputDisabled.value = true;
  setTimeout(() => {
    sendMsg();
  }, 500);
}

const sendMsg = debounce(() => {
  var audioMessage = document.getElementById("result").value;
  msg.value = audioMessage;
  //////console.log(visiable.value)
  // //////console.log("不能发送性能消息")
  if (msg.value.length < 1) {
    isInputDisabled.value = false;
    return ElMessage({ message: "不能发送空消息！", type: "error" });
  }
  // //////console.log(okToSend.value, "@@@@@@@@@@@@@@@");
  // okToSend.value =false;
  if (okToSend.value == false) {
    return ElMessage({
      message: "正在查询，请稍候！！！",
      type: "error",
    });
  }
  const content = msg.value;
  // 调用保存日志的接口
  saveContent = msg.value;
  //////console.log(saveContent);
  msg.value = ""; //清空输入框
  document.getElementById("result").value = "";
  role = "user";
  saveStatus = null;
  // 调用保存日志的接口
  saveContent = content;
  role = "user";
  saveStatus = null;
  //////console.log(user_id)
  //////console.log(role)
  //////console.log(content)
  // 保存日志接口的调用

  saveInfo(user_id, role, saveContent, saveStatus, rebuild)
    // 保存日志接口成功之后执行的回调
    .then((res) => {
      //////console.log(res)
    })
    .catch((err) => {
      // 失败之后执行的回调
    });
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
  info1.value = info.value;
  setTimeout(() => {
    scrollToBottom();
  });
  okToSend.value = true;
}, 500);

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
  //////console.log(messages);
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
      //console.log(source)
      // arrWithNews = source.filter(
      //   (obj) => obj.hasOwnProperty("news") && obj.news
      // );
      // arrWithoutNews = source.filter(
      //   (obj) => !obj.hasOwnProperty("news") || !obj.news
      // );
      //console.log(arrWithNews)
      //console.log(arrWithoutNews)
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
        role: "virtual_human",
      });

      // 对保存日志接口的调用，传入的参数值进行的匹配
      role = "virtual_human";
      saveContent = response.data.result;
      saveStatus = null;
      rebuild = false;
      //console.log(source)
      // 保存日志接口的调用
      saveInfo(user_id, role, saveContent, saveStatus, rebuild, source)
        // 保存日志接口成功之后执行的回调
        .then((res) => {
          //console.log(res)
        })
        .catch((err) => {
          // 失败之后执行的回调
        });
      const token = getToken();
      user(token).then((response) => {
        user_id = response.pk;
        //days = 1;
        // 在此基础上进行调用历史记录的接口,主要是为了进行刷新页面，将这个重新进行渲染
        historyInfo(user_id, days).then((res) => {
          //console.log(res.data)
          const historyInformation = res.data.map((element) => {
            return {
              content: element.content,
              time: element.time,
              status: element.status,
              role: element.role,
              source: element.source
            };
          });
          info.value = historyInformation;
          ////console.log(info.value)
        });
      });

      setTimeout(() => {
        scrollToBottom();
      });

      isInputDisabled.value = false;
      okToSend.value = true;
      ////console.log(okToSend.value)
    })
    .catch((err) => {
      totast("聊天服务端错误", "error");
      isInputDisabled.value = false;
    });
}

const subtitleRef = ref("");

//延时函数
let index = 0;
let time;
// 设置点赞和踩的更新

//设置滚动到底部的函数
function scrollToBottom() {
  const container = document.querySelector("#scrollBox");
  //////console.log(container, '************')
  const lastMessage = container.lastElementChild;
  if (lastMessage) {
    lastMessage.scrollIntoView({ behavior: "smooth" });
  }
}

const language = ref("chinese");
//xuniren
</script>

<style lang="less" scoped>
.sign {
  height: 7%;
  position: absolute;
  left: 10px;
  top: 10px
}

ul {
  list-style: none;
  padding: 20px 0;
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
  // margin-left: 20px;
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
  // margin-left: 20px;
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
  width: 100% !important;
  // padding: 0 5px;
}

.el-overlay {
  div {
    width: 100% !important;
  }
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
          // max-width: 120px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
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

  ul {
    list-style: none;
    padding: 20px 5px;
    margin: 0;
    font-size: 14px;
    line-height: 20px;
  }

  el-input-group {
    width: 100% !important;
    padding: 0 5px;
  }


  .main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 153%;
    height: 110%;
    // border: 1px solid #000;
    margin: 10px;

    .box {
      display: flex;
      justify-content: center;
      width: 155%;
      height: 110%;
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
        margin: 10px 0px;
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
            // max-width: 120px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }
    }
  }

  .sendBox div {
    padding: 0;
  }
}

.optionIcon {
  display: flex;
  justify-content: flex-end;
}
</style>