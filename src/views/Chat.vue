<template>
  <div class="container">
    <div class="row">
      <div class="box col-xs-12">
        <img src="../assets/images/logo.png" alt="" class="logo" />
        <div class="title">
          <h2 class="text-center" style="display: none">防疫问答助手</h2>
        </div>
        <div class="answer">
          <div class="tips">
            <h2 class="text-center">防疫问答助手</h2>
            <h4>欢迎使用防疫问答助手，请在下方对话框输入想提问的问题</h4>
            <!--            <div data-v-5bac41ec="" class="card">-->
            <!--										<div data-v-5bac41ec="" class="block">-->
            <!--											<div data-v-5bac41ec="" class="sub_title">咨询法律问题</div>-->
            <!--											<div data-v-5bac41ec="" class="list">-->
            <!--												<div data-v-5bac41ec="" class="item">“租房中介不退押金怎么办”</div>-->
            <!--												<div data-v-5bac41ec="" class="item">“被车撞了对方不赔偿怎么办”</div>-->
            <!--											</div>-->
            <!--										</div>-->
            <!--										<div data-v-5bac41ec="" class="split"></div>-->
            <!--										<div data-v-5bac41ec="" class="block">-->
            <!--											<div data-v-5bac41ec="" class="sub_title">多轮问答交互</div>-->
            <!--											<div data-v-5bac41ec="" class="list">-->
            <!--												<div data-v-5bac41ec="" class="item">“公司强制加班不给加班费是否违法”</div>-->
            <!--												<div data-v-5bac41ec="" class="item">“未经房东同意转租房屋是否犯法”</div>-->
            <!--											</div>-->
            <!--										</div>-->
            <!--										<div data-v-5bac41ec="" class="split"></div>-->
            <!--										<div data-v-5bac41ec="" class="block">-->
            <!--											<div data-v-5bac41ec="" class="sub_title">自动匹配案例</div>-->
            <!--											<div data-v-5bac41ec="" class="list">-->
            <!--												<div data-v-5bac41ec="" class="item">“离婚后子女抚养费怎么算”</div>-->
            <!--												<div data-v-5bac41ec="" class="item">“企业拖欠工资怎么办”</div>-->
            <!--											</div>-->
            <!--										</div>-->
            <!--									</div>-->
          </div>
          <div id="chatWindow"></div>
          <div class="function">
            <div class="others">
              <div class="left" style="visibility: hidden">
                <div class="settings common dropup">
                  <a
                    class="dropdown-toggle icon-style"
                    id="dropdownMenu"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                    title="设置"
                  >
                    <i class="fa fa-cogs fa-lg" aria-hidden="true"></i>
                  </a>
                  <div
                    class="dropdown-menu"
                    style="padding: 0"
                    onclick="event.stopPropagation()"
                  >
                    <div class="settings-common">
                      <span
                        ><i class="fa fa fa-linode fa-lg" aria-hidden="true"></i
                        >&nbsp; 主题</span
                      >
                      <select class="form-control ipt-common theme">
                        <option value="light">light</option>
                        <option value="gray">gray</option>
                        <option value="light-red">light-red</option>
                        <option value="light-blue">light-blue</option>
                        <option value="light-purple">light-purple</option>
                        <option value="light-green">light-green</option>
                        <option value="light-yellow">light-yellow</option>
                      </select>
                    </div>
                    <div class="settings-common">
                      <span
                        ><i class="fa fa-key fa-lg" aria-hidden="true"></i
                        >&nbsp; OpenAI Key</span
                      >
                      <input
                        type="text"
                        class="form-control ipt-common api-key"
                        placeholder="可用自己的api key"
                      />
                    </div>
                    <div class="settings-common">
                      <span
                        ><i
                          class="fa fa-reddit-alien fa-lg"
                          aria-hidden="true"
                        ></i
                        >&nbsp; OpenAI 模型</span
                      >
                      <select class="form-control ipt-common model">
                        <option value="gpt-3.5-turbo">gpt-3.5-turbo</option>
                        <option value="gpt-4">gpt-4</option>
                      </select>
                    </div>
                    <div class="settings-common">
                      <span
                        ><i class="fa fa-floppy-o fa-lg" aria-hidden="true"></i
                        >&nbsp; 记录对话内容，刷新不会消失</span
                      >
                      <div class="chck-btn">
                        <input id="chck-1" type="checkbox" />
                        <label for="chck-1" class="check-trail">
                          <div class="check-handler"></div>
                        </label>
                      </div>
                    </div>
                    <div class="settings-common">
                      <span
                        ><i class="fa fa-retweet fa-lg" aria-hidden="true"></i
                        >&nbsp; 开启连续对话，加倍消耗tokens</span
                      >
                      <div class="chck-btn">
                        <input id="chck-2" type="checkbox" />
                        <label for="chck-2" class="check-trail">
                          <div class="check-handler"></div>
                        </label>
                      </div>
                    </div>
                    <div class="settings-common">
                      <span style="font-size: 14px"
                        ><i class="fa fa-qq fa-lg" aria-hidden="true"></i>&nbsp;
                        学习交流群</span
                      >
                      <span style="font-size: 14px">QQ群：799160455</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="center">
                <div class="stop common">
                  <a
                    class="icon-style stop-icon"
                    title="停止响应"
                    style="text-decoration: none"
                    ><i
                      class="fa fa-stop-circle-o fa-lg"
                      aria-hidden="true"
                    ></i>
                    停止</a
                  >
                </div>
              </div>
              <div class="right">
                <div class="screenshot common">
                  <a class="icon-style" title="截图保存对话"
                    ><i class="fa fa-file-image-o fa-lg" aria-hidden="true"></i
                  ></a>
                </div>
                <div class="delete common">
                  <a class="icon-style" title="删除历史记录"
                    ><i class="fa fa-trash-o fa-lg" aria-hidden="true"></i
                  ></a>
                </div>
              </div>
            </div>
            <div class="ipt">
              <div class="col-xs-12">
                <textarea
                  id="chatInput"
                  class="form-control"
                  rows="1"
                  placeholder="请输入想提问的问题"
                ></textarea>
              </div>
              <button
                id="chatBtn"
                class="btn btn-primary"
                type="button"
            @click="sendMsg"
              >
                发送
              </button>
            </div>
          </div>
        </div>
        <!--        <footer class="foot" style="margin-top: 20px;">-->
        <!--          <p class="lead text-center">“抢走工作的不会是AI,而是率先掌握AI能力的人”</p>-->
        <!--          <p class="lead text-center">-->
        <!--            <a href="https://blog.csdn.net/qq_57421630" target="_blank"><i class="fa fa-link fa-lg" aria-hidden="true"></i>&nbsp; 联系我</a>-->
        <!--            <a href="https://gitee.com/aniu-666/chat-gpt-website" target="_blank"><i class="fa fa-github fa-lg" aria-hidden="true"></i>&nbsp; 项目地址</a>-->
        <!--          </p>-->
        <!--        </footer>-->
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import "../assets/js/jquery-2.1.1.js";
import "../assets/js/bootstrap.min.js";
import "../assets/js/highlight.min.js";
import "../assets/js/marked.min.js";
import "../assets/js/html2canvas.min.js";
import EasyTyper from "easy-typer-js";
import axios from "axios";
// import '../assets/js/custom.js';

export default {
  name: "home",
  setup() {
    const message = ref("");
    const obj = ref({ output: "" });

    const mounted = () => {
      const typed = new EasyTyper(obj.value, input, fn, hooks);
      $(document).ready(function () {
        // $('#chatInput').text('您好，我是一名律师。作为一个AI语言模型，我可以回答您的问题并提供相关信息和建议。如果您有任何法律问题或需要法律咨询，欢迎随时向我提出。fjaslkjfaslkfjaslkfjasl;dfjas;lkfjasl;dfjas;lfdjaslkfdjas;fkjas;ldfkjas;ldfkjsl;dfjasldf');
        // $('#chatBtn').trigger('click');
        $(".left").css("visibility", "hidden"); // 无用，暂时隐藏
      });
    };
    const sendMsg = () => {
      var textarea = document.getElementById("chatInput");
      const messages = {
        messages: [
          {
            role: "user",
            content: textarea.value,
          },
        ],
      };
      console.log("打印了");
      axios({
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        url: "/search_web",
        data: messages,
      }).then((response) => {
        console.log(response, "hhhh");
      });
    };

    return {
      obj,
      mounted,
      sendMsg,
    };
  },
};
</script>

<style>
@import "../assets/css/bootstrap.min.css";
@import "../assets/font-awesome/css/font-awesome.min.css";
@import "../assets/css/github-dark-dimmed.min.css";
@import "../assets/css/style.css";
@import "../assets/css/style_wmz.css";

body {
  background: linear-gradient(
    30deg,
    rgba(113, 72, 248, 0.33),
    rgba(104, 157, 255, 0.12) 50%,
    rgba(166, 112, 235, 0.12)
  );
  color: var(--UI-FG-0);
}
</style>
