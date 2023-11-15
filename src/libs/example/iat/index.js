(function () {
  var APPID = "85e46ea2";
  var API_SECRET = "OTY5NGRjMzk5OGY0NjQ1MWJkZTJhOWEy";
  var API_KEY = "e4edb9793dfcdf5bc3b71464f12390b3";

  let btnStatus = "UNDEFINED"; // "UNDEFINED" "CONNECTING" "OPEN" "CLOSING" "CLOSED"

  const btnControl = document.getElementById("btn_control");

  const recorder = new RecorderManager("../../dists");
  recorder.onStart = () => {
    changeBtnStatus("OPEN");
  }
  let iatWS;
  let resultText = "";
  let resultTextTemp = "";
  let countdownInterval;

  /**
   * 获取websocket url
   * 该接口需要后端提供，这里为了方便前端处理
   */
  function getWebSocketUrl() {
    // 请求地址根据语种不同变化
    var url = "wss://iat-api.xfyun.cn/v2/iat";
    var host = "iat-api.xfyun.cn";
    var apiKey = API_KEY;
    var apiSecret = API_SECRET;
    var date = new Date().toGMTString();
    var algorithm = "hmac-sha256";
    var headers = "host date request-line";
    var signatureOrigin = `host: ${host}\ndate: ${date}\nGET /v2/iat HTTP/1.1`;
    var signatureSha = CryptoJS.HmacSHA256(signatureOrigin, apiSecret);
    var signature = CryptoJS.enc.Base64.stringify(signatureSha);
    var authorizationOrigin = `api_key="${apiKey}", algorithm="${algorithm}", headers="${headers}", signature="${signature}"`;
    var authorization = btoa(authorizationOrigin);
    url = `${url}?authorization=${authorization}&date=${date}&host=${host}`;
    return url;
  }

  function toBase64(buffer) {
    var binary = "";
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

  function countdown() {
    let seconds = 60;
    btnControl.innerText = `录音中（${seconds}s）`;
    countdownInterval = setInterval(() => {
      seconds = seconds - 1;
      if (seconds <= 0) {
        clearInterval(countdownInterval);
        recorder.stop();
      } else {
        btnControl.innerText = `录音中（${seconds}s）`;
      }
    }, 1000);
  }

  function changeBtnStatus(status) {
    btnStatus = status;
    if (status === "CONNECTING") {
      btnControl.innerText = "建立连接中";
      document.getElementById("result").innerText = "";
      resultText = "";
      resultTextTemp = "";
    } else if (status === "OPEN") {
      countdown();
    } else if (status === "CLOSING") {
      btnControl.innerText = "关闭连接中";
    } else if (status === "CLOSED") {
      btnControl.innerHTML = '<svg t="1695268139557" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1815" width="16" height="16"><path d="M488.727273 930.909091v-93.905455a325.934545 325.934545 0 0 1-280.832-207.825454A325.073455 325.073455 0 0 1 186.181818 512h46.545455c0 34.792727 6.353455 68.677818 18.594909 100.421818A279.365818 279.365818 0 0 0 791.272727 512h46.545455c0 40.494545-7.400727 80.011636-21.643637 117.038545A325.934545 325.934545 0 0 1 535.272727 837.003636V930.909091h186.181818v46.545454H302.545455v-46.545454h186.181818z m23.272727-837.818182a186.181818 186.181818 0 0 0-186.181818 186.181818v232.727273a186.181818 186.181818 0 1 0 372.363636 0V279.272727a186.181818 186.181818 0 0 0-186.181818-186.181818z m0-46.545454c128.535273 0 232.727273 104.192 232.727273 232.727272v232.727273c0 128.535273-104.192 232.727273-232.727273 232.727273s-232.727273-104.192-232.727273-232.727273V279.272727c0-128.535273 104.192-232.727273 232.727273-232.727272z" fill="#6D7793" p-id="1816"></path></svg>';
    }
  }
  function renderResult(resultData) {
    // 识别结束
    let jsonData = JSON.parse(resultData);
    if (jsonData.data && jsonData.data.result) {
      let data = jsonData.data.result;
      let str = "";
      let ws = data.ws;
      for (let i = 0; i < ws.length; i++) {
        str = str + ws[i].cw[0].w;
      }
      // 开启wpgs会有此字段(前提：在控制台开通动态修正功能)
      // 取值为 "apd"时表示该片结果是追加到前面的最终结果；取值为"rpl" 时表示替换前面的部分结果，替换范围为rg字段
      if (data.pgs) {
        if (data.pgs === "apd") {
          // 将resultTextTemp同步给resultText
          resultText = resultTextTemp;
        }
        // 将结果存储在resultTextTemp中
        resultTextTemp = resultText + str;
      } else {
        resultText = resultText + str;
      }
      document.getElementById("result").value =
        resultTextTemp || resultText || "";
    }
    if (jsonData.code === 0 && jsonData.data.status === 2) {
      iatWS.close();
    }
    if (jsonData.code !== 0) {
      iatWS.close();
      console.error(jsonData);
    }
  }

  function connectWebSocket() {
    const websocketUrl = getWebSocketUrl();
    if ("WebSocket" in window) {
      iatWS = new WebSocket(websocketUrl);
    } else if ("MozWebSocket" in window) {
      iatWS = new MozWebSocket(websocketUrl);
    } else {
      alert("浏览器不支持WebSocket");
      return;
    }
    changeBtnStatus("CONNECTING");
    iatWS.onopen = (e) => {
      // 开始录音
      recorder.start({
        sampleRate: 16000,
        frameSize: 1280,
      });
      var params = {
        common: {
          app_id: APPID,
        },
        business: {
          language: "zh_cn",
          domain: "iat",
          accent: "mandarin",
          vad_eos: 5000,
          dwa: "wpgs",
        },
        data: {
          status: 0,
          format: "audio/L16;rate=16000",
          encoding: "raw",
        },
      };
      iatWS.send(JSON.stringify(params));
    };
    iatWS.onmessage = (e) => {
      renderResult(e.data);
    };
    iatWS.onerror = (e) => {
      console.error(e);
      recorder.stop();
      changeBtnStatus("CLOSED");
    };
    iatWS.onclose = (e) => {
      recorder.stop();
      changeBtnStatus("CLOSED");
    };
  }

  recorder.onFrameRecorded = ({ isLastFrame, frameBuffer }) => {
    if (iatWS.readyState === iatWS.OPEN) {
      iatWS.send(
        JSON.stringify({
          data: {
            status: isLastFrame ? 2 : 1,
            format: "audio/L16;rate=16000",
            encoding: "raw",
            audio: toBase64(frameBuffer),
          },
        })
      );
      if (isLastFrame) {
        changeBtnStatus("CLOSING");
      }
    }
  };
  recorder.onStop = () => {
    clearInterval(countdownInterval);
  };

  btnControl.onclick = function () {
    if (btnStatus === "UNDEFINED" || btnStatus === "CLOSED") {
      connectWebSocket();
    } else if (btnStatus === "CONNECTING" || btnStatus === "OPEN") {
      // 结束录音
      recorder.stop();
    }
  };
})();
