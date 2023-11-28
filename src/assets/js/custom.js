// 功能
$(document).ready(function() {
  var chatBtn = $('#chatBtn');
  var chatInput = $('#chatInput');
  var chatWindow = $('#chatWindow');
$(".title .text-center").hide();
  // 全局变量,存储对话信息
  var messages = [];

  // 创建自定义渲染器
  const renderer = new marked.Renderer();

  // 重写list方法
  renderer.list = function(body, ordered, start) {
    const type = ordered ? 'ol' : 'ul';
    const startAttr = (ordered && start) ? ` start="${start}"` : '';
    return `<${type}${startAttr}>\n${body}</${type}>\n`;
  };

  // 设置marked选项
  marked.setOptions({
    renderer: renderer,
    highlight: function (code, language) {
      const validLanguage = hljs.getLanguage(language) ? language : 'javascript';
      return hljs.highlight(code, { language: validLanguage }).value;
    }
  });

  // 转义html代码(对应字符转移为html实体)，防止在浏览器渲染
  function escapeHtml(html) {
    let text = document.createTextNode(html);
    let div = document.createElement('div');
    div.appendChild(text);
    return div.innerHTML;
  }

  
  // 添加请求消息到窗口
  function addRequestMessage(message) {
    $(".answer .tips").css({"display":"none"});    // 打赏卡隐藏
    $(".title .text-center").show();

    chatInput.val('');
    let escapedMessage = escapeHtml(message);  // 对请求message进行转义，防止输入的是html而被浏览器渲染
    let requestMessageElement = $('<div class="message-bubble"><span class="chat-icon request-icon"></span><div class="message-text request"><p>' +  escapedMessage + '</p></div></div>');
    chatWindow.append(requestMessageElement);
    let responseMessageElement = $('<div class="message-bubble"><span class="chat-icon response-icon"></span><div class="message-text response type" ><span class="loading-icon"><i class="fa fa-spinner fa-pulse fa-2x"></i></span><p></p></div></div>');
    chatWindow.append(responseMessageElement);



    chatWindow.scrollTop(chatWindow.prop('scrollHeight'));
  }

  // 添加响应消息到窗口,流式响应此方法会执行多次
  function addResponseMessage(message, source) {
    let lastResponseElement = $(".message-bubble .response").last();
    $(".message-bubble .response").removeClass('type');
    lastResponseElement.empty();
    lastResponseElement.addClass('type')
    if ($(".answer .others .center").css("display") === "none") {
      $(".answer .others .center").css("display", "flex");
    }
    let escapedMessage;
    // 处理流式消息中的代码块
    let codeMarkCount = 0;
    // let index = message.indexOf('```');
    let index = -1;   // wmz: 暂不需要对代码块处理
    while (index !== -1) {
      codeMarkCount ++ ;
      index = message.indexOf('```', index + 3);
    }
    if(codeMarkCount % 2 == 1  ){  // 有未闭合的 code
      escapedMessage = marked.parse(message + '\n\n```');
    }else if(codeMarkCount % 2 == 0 && codeMarkCount != 0){
      escapedMessage = marked.parse(message);  // 响应消息markdown实时转换为html
    }else if(codeMarkCount == 0){  // 输出的代码没有markdown代码块
      if (message.includes('`')){
        escapedMessage = marked.parse(message);  // 没有markdown代码块，但有代码段，依旧是markdown格式
      }else{
        escapedMessage = marked.parse(escapeHtml(message)); // 有可能不是markdown格式，都用escapeHtml处理后再转换，防止非markdown格式html紊乱页面
      }
    }

    lastResponseElement.append(escapedMessage + (source==null?'':source));
    // if(source == '' || source == null || source == undefined){
    //   source = '';
    // }
    // // escapedMessage += source;
    // let typed = new Typed(".type", {
    //     strings: [escapedMessage+source],//字符串
    //     startDelay: 0,//开始的延迟
    //     typeSpeed: 0,//打字速度
    //     backSpeed: 0,//回退速度
    //     loop: false,//是否循环
    //     showCursor: false,//显示游标
    //     shuffle: false//是否随机
    //     });
    chatWindow.scrollTop(chatWindow.prop('scrollHeight'));
  }

  // 添加失败信息到窗口
  function addFailMessage(message) {
    let lastResponseElement = $(".message-bubble .response").last();
    let lastbox = $('.message-bubble').last()
    lastResponseElement.empty();
    lastResponseElement.append('<p class="error">' + message + '</p>');
    lastResponseElement.append('<svg width="15" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"class="icon-md" style="cursor: pointer;" @click="updateInfo"><path fill-rule="evenodd" clip-rule="evenodd"d="M12.1318 2.50389C12.3321 2.15338 12.7235 1.95768 13.124 2.00775L13.5778 2.06447C16.0449 2.37286 17.636 4.83353 16.9048 7.20993L16.354 8.99999H17.0722C19.7097 8.99999 21.6253 11.5079 20.9313 14.0525L19.5677 19.0525C19.0931 20.7927 17.5124 22 15.7086 22H6C4.34315 22 3 20.6568 3 19V12C3 10.3431 4.34315 8.99999 6 8.99999H8C8.25952 8.99999 8.49914 8.86094 8.6279 8.63561L12.1318 2.50389ZM10 20H15.7086C16.6105 20 17.4008 19.3964 17.6381 18.5262L19.0018 13.5262C19.3488 12.2539 18.391 11 17.0722 11H15C14.6827 11 14.3841 10.8494 14.1956 10.5941C14.0071 10.3388 13.9509 10.0092 14.0442 9.70591L14.9932 6.62175C15.3384 5.49984 14.6484 4.34036 13.5319 4.08468L10.3644 9.62789C10.0522 10.1742 9.56691 10.5859 9 10.8098V19C9 19.5523 9.44772 20 10 20ZM7 11V19C7 19.3506 7.06015 19.6872 7.17071 20H6C5.44772 20 5 19.5523 5 19V12C5 11.4477 5.44772 11 6 11H7Z"fill="currentColor"></path></svg>')
    lastResponseElement.append('<svg width="15" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"class="icon-md" style="cursor: pointer; margin-left: 7px;"><path fill-rule="evenodd" clip-rule="evenodd"d="M11.8727 21.4961C11.6725 21.8466 11.2811 22.0423 10.8805 21.9922L10.4267 21.9355C7.95958 21.6271 6.36855 19.1665 7.09975 16.7901L7.65054 15H6.93226C4.29476 15 2.37923 12.4921 3.0732 9.94753L4.43684 4.94753C4.91145 3.20728 6.49209 2 8.29589 2H18.0045C19.6614 2 21.0045 3.34315 21.0045 5V12C21.0045 13.6569 19.6614 15 18.0045 15H16.0045C15.745 15 15.5054 15.1391 15.3766 15.3644L11.8727 21.4961ZM14.0045 4H8.29589C7.39399 4 6.60367 4.60364 6.36637 5.47376L5.00273 10.4738C4.65574 11.746 5.61351 13 6.93226 13H9.00451C9.32185 13 9.62036 13.1506 9.8089 13.4059C9.99743 13.6612 10.0536 13.9908 9.96028 14.2941L9.01131 17.3782C8.6661 18.5002 9.35608 19.6596 10.4726 19.9153L13.6401 14.3721C13.9523 13.8258 14.4376 13.4141 15.0045 13.1902V5C15.0045 4.44772 14.5568 4 14.0045 4ZM17.0045 13V5C17.0045 4.64937 16.9444 4.31278 16.8338 4H18.0045C18.5568 4 19.0045 4.44772 19.0045 5V12C19.0045 12.5523 18.5568 13 18.0045 13H17.0045Z"fill="currentColor"></path></svg>')
    lastResponseElement.append('<svg width="15" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"class="icon-md" style="cursor: pointer; margin-left: 7px;"><path fill-rule="evenodd" clip-rule="evenodd"d="M4.5 2.5C5.05228 2.5 5.5 2.94772 5.5 3.5V5.07196C7.19872 3.47759 9.48483 2.5 12 2.5C17.2467 2.5 21.5 6.75329 21.5 12C21.5 17.2467 17.2467 21.5 12 21.5C7.1307 21.5 3.11828 17.8375 2.565 13.1164C2.50071 12.5679 2.89327 12.0711 3.4418 12.0068C3.99033 11.9425 4.48712 12.3351 4.5514 12.8836C4.98798 16.6089 8.15708 19.5 12 19.5C16.1421 19.5 19.5 16.1421 19.5 12C19.5 7.85786 16.1421 4.5 12 4.5C9.7796 4.5 7.7836 5.46469 6.40954 7H9C9.55228 7 10 7.44772 10 8C10 8.55228 9.55228 9 9 9H4.5C3.96064 9 3.52101 8.57299 3.50073 8.03859C3.49983 8.01771 3.49958 7.99677 3.5 7.9758V3.5C3.5 2.94772 3.94771 2.5 4.5 2.5Z"fill="currentColor"></path></svg>')
    chatWindow.scrollTop(chatWindow.prop('scrollHeight'));
    messages.pop() // 失败就让用户输入信息从数组删除
  }

  // 定义一个变量保存ajax请求对象
  let ajaxRequest = null;

  // 处理用户输入
  chatBtn.click(function() {
    // 解绑键盘事件
    chatInput.off("keydown",handleEnter);

    // ajax上传数据
    let data = {};
    // data.model = $(".settings-common .model").val();

    // 判断消息是否是正常的标志变量
    let resFlag = true;

    // 判断是否使用自己的api key
    // let apiKey = localStorage.getItem('apiKey');
    // if (apiKey){
    //   data.apiKey = apiKey;
    // }
    const chat_history = localStorage.getItem('history');
    if (chat_history){
      data.history = chat_history
    }
    else{
      data.history = []
    }
    // 接收输入信息变量
    let message = chatInput.val();
    if (message.length == 0){
      // 重新绑定键盘事件
      chatInput.on("keydown",handleEnter);
      return ;
    }

    addRequestMessage(message);
    // 将用户消息保存到数组
    messages.push({"role": "user", "content": message})
    // 收到回复前让按钮不可点击
    chatBtn.attr('disabled',true)

    if(messages.length>20){
      addFailMessage("此次对话长度过长，请点击下方删除按钮清除对话内容！");
      // 重新绑定键盘事件
      chatInput.on("keydown",handleEnter);
      chatBtn.attr('disabled',false) // 让按钮可点击
      return ;
    }
    
    // 判读是否已开启连续对话
    data.prompts = messages.slice();  // 拷贝一份全局messages赋值给data.prompts,然后对data.prompts处理
    if(localStorage.getItem('continuousDialogue') == 'true'){
      // 控制上下文，对话长度超过4轮，取最新的3轮,即数组最后7条数据
      if(data.prompts.length > 8) {
        data.prompts.splice(0, data.prompts.length - 7);
      }
    }else{
      data.prompts.splice(0, data.prompts.length - 1); // 未开启连续对话，取最后一条
    }
    data.prompts = JSON.stringify(data.prompts);
    
    let res;
    console.log(data.prompts)
    // 发送信息到后台
    ajaxRequest = $.ajax({
      url: '/search_web',
      method: 'POST',
      data: data,
      // headers: {
      //   "Accept":"application/json, text/plain, */*",
      //   'Content-Type': 'application/json'
      // },
      xhrFields: {
        onprogress: function(e) {
          res = e.target.responseText;
          t_res = JSON.parse(res).response
          t_source = JSON.parse(res).source
          let resJsonObj;
          try {  
            resJsonObj = t_res;  // 只有错误信息是json类型字符串,且一次返回
            if(resJsonObj.hasOwnProperty("error")){
              addFailMessage(resJsonObj.error.type + " : " + resJsonObj.error.message + " " + resJsonObj.error.code);
              resFlag = false;
            }else{
              addResponseMessage(t_res, t_source);
            }
          }catch(e){
            addResponseMessage(t_res, t_source);
          }
        }
      },
      success:function(output){
        // 判断是否是回复正确信息
        output = JSON.parse(output)
        result = output.response
        source = output.source
        source_doc = output.source_doc
        t_chat_history = output.history
        if(resFlag){
          messages.push({"role": "assistant", "content": result, "source":source, "source_doc":source_doc});
          // 判断是否本地存储历史会话
          if(localStorage.getItem('archiveSession')=="true"){
            localStorage.setItem("session",JSON.stringify(messages));
            localStorage.setItem("history",JSON.stringify(t_chat_history));
          }
        }
      },
      error: function(jqXHR, textStatus, errorThrown) {
        if (textStatus === 'abort') {
          messages.push({"role": "assistant", "content": res, "source":null, "source_doc":null});
          if(localStorage.getItem('archiveSession')=="true"){
            localStorage.setItem("session",JSON.stringify(messages));
          }
        } else {
          addFailMessage('出错啦！请稍后再试!');
        }
      },
      complete : function(XMLHttpRequest,status){
        // 收到回复，让按钮可点击
        chatBtn.attr('disabled',false)
        // 重新绑定键盘事件
        chatInput.on("keydown",handleEnter); 
        ajaxRequest = null;
        $(".answer .others .center").css("display","none");
        // 添加复制
        copy();
      }
    });
  });

  // 停止输出
  $('.stop a').click(function() {
    if(ajaxRequest){
      ajaxRequest.abort();
    }
  })





  // Enter键盘事件
  function handleEnter(e){
    if (e.keyCode==13){
      chatBtn.click();
      e.preventDefault();  //避免回车换行
    }
  }

  // 绑定Enter键盘事件
  chatInput.on("keydown",handleEnter);

  // 设置栏宽度自适应
  let width = $('.function .others').width();
  $('.function .settings .dropdown-menu').css('width', width);
  
  $(window).resize(function() {
    width = $('.function .others').width();
    $('.function .settings .dropdown-menu').css('width', width);
  });

  



  // 主题
  function setBgColor(theme){
    $(':root').attr('bg-theme', theme);
    $('.settings-common .theme').val(theme);
    // 定位在文档外的元素也同步主题色
    $('.settings-common').css('background-color', 'var(--bg-color)');
  }
  
  let theme = localStorage.getItem('theme');
  // 如果之前选择了主题，则将其应用到网站中
  if (theme) {
    setBgColor(theme);
  }else{
    localStorage.setItem('theme', "light"); //默认的主题
    theme = localStorage.getItem('theme');
    setBgColor(theme);
  }




  // 监听主题选择的变化
  $('.settings-common .theme').change(function() {
    const selectedTheme = $(this).val();
    localStorage.setItem('theme', selectedTheme);
    $(':root').attr('bg-theme', selectedTheme);
    // 定位在文档外的元素也同步主题色
    $('.settings-common').css('background-color', 'var(--bg-color)');
  });




  // 读取apiKey
  const apiKey = localStorage.getItem('apiKey');
  if (apiKey) {
    $(".settings-common .api-key").val(apiKey);
  }

  // apiKey输入框事件
  $(".settings-common .api-key").blur(function() { 
    const apiKey = $(this).val();
    if(apiKey.length!=0){
      localStorage.setItem('apiKey', apiKey);
    }else{
      localStorage.removeItem('apiKey');
    }
  })

  // 是否保存历史对话  默认保存
  var archiveSession = localStorage.getItem('archiveSession');

  // 初始化archiveSession
  if(archiveSession == null){
    archiveSession = "true";
    localStorage.setItem('archiveSession', archiveSession);
  }
  
  if(archiveSession == "true"){
    $("#chck-1").prop("checked", true);
  }else{
    $("#chck-1").prop("checked", false);
  }

  $('#chck-1').click(function() {
    if ($(this).prop('checked')) {
      // 开启状态的操作
      localStorage.setItem('archiveSession', true);
      if(messages.length != 0){
        localStorage.setItem("session",JSON.stringify(messages));
      }
    } else {
      // 关闭状态的操作
      localStorage.setItem('archiveSession', false);
      localStorage.removeItem("session");
    }
  });
  
  // 加载历史保存会话
  if(archiveSession == "true"){
    const messagesList = JSON.parse(localStorage.getItem("session"));
    if(messagesList){
      messages = messagesList;
      $.each(messages, function(index, item) {
        if (item.role === 'user') {
          addRequestMessage(item.content)
        } else if (item.role === 'assistant') {
          addResponseMessage(item.content, item.source)
        }
      });
      $(".answer .others .center").css("display", "none");
      // $(".answer .others .center").fadeOut(2000)
      // 添加复制
      copy();
    }
  }

  // 是否连续对话
  var continuousDialogue = localStorage.getItem('continuousDialogue');

  // 初始化continuousDialogue
  if(continuousDialogue == null){
    continuousDialogue = "true";
    localStorage.setItem('continuousDialogue', continuousDialogue);
  }
  
  if(continuousDialogue == "true"){
    $("#chck-2").prop("checked", true);
  }else{
    $("#chck-2").prop("checked", false);
  }

  $('#chck-2').click(function() {
    if ($(this).prop('checked')) {
       localStorage.setItem('continuousDialogue', true);
    } else {
       localStorage.setItem('continuousDialogue', false);
    }
  });



  // 删除功能
  $(".delete a").click(function(){
    chatWindow.empty();
    $(".answer .tips").css({"display":"flex"});
    messages = [];
    localStorage.removeItem("session");
    localStorage.removeItem("history");
    localStorage.removeItem("source");
    $(".title .text-center").hide();
  });

  // 截图功能
  $(".screenshot a").click(function() {
    // 创建副本元素
    const clonedChatWindow = chatWindow.clone();
    clonedChatWindow.css({
      position: "absolute",
      left: "-9999px",
      overflow: "visible",
      width: chatWindow.width(),
      height: "auto"
    });
    $("body").append(clonedChatWindow);
    // 截图
    html2canvas(clonedChatWindow[0], {
      allowTaint: false,
      useCORS: true,
      scrollY: 0,
    }).then(function(canvas) {
      // 将 canvas 转换成图片
      const imgData = canvas.toDataURL('image/png');
      // 创建下载链接
      const link = document.createElement('a');
      link.download = "screenshot_" + Math.floor(Date.now() / 1000) + ".png";
      link.href = imgData;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      clonedChatWindow.remove();
    });
  });

  // 复制代码功能
  function copy(){
    $('pre').each(function() {
      let btn = $('<button class="copy-btn">复制</button>');
      $(this).append(btn);
      btn.hide();
    });

    $('pre').hover(
      function() {
        $(this).find('.copy-btn').show();
      },
      function() {
        $(this).find('.copy-btn').hide();
      }
    );

    $('pre').on('click', '.copy-btn', function() {
      let text = $(this).siblings('code').text();
      // 创建一个临时的 textarea 元素
      let textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);

      // 选择 textarea 中的文本
      textArea.select();

      // 执行复制命令
      try {
        document.execCommand('copy');
        $(this).text('复制成功');
      } catch (e) {
        $(this).text('复制失败');
      }

      // 从文档中删除临时的 textarea 元素
      document.body.removeChild(textArea);

      setTimeout(() => {
        $(this).text('复制');
      }, 2000);
    });
  }
});
