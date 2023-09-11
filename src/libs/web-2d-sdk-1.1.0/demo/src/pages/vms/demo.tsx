import voiceimg from "@/assets/imgs/voice.png";
import TransWorker from "@/libs/transcode.worker";
import VMS from "@/libs/vms-web-2d-sdk/1.1.0/vms-2d-web-sdk-1.1.0.esm.min";
import {
  Button,
  Card,
  Col,
  Divider,
  Input,
  InputNumber,
  Row,
  Select,
  Slider,
  Tag,
  Modal,
} from "antd";
import { encode ,decode} from "js-base64";
import { useState } from "react";
import "./style.less";

const transWorker = new Worker(TransWorker);
//形象列表
const avatarList = {
  110017006: {
    name: "马可",
    actionList: [
      {
        name: "身体微侧，左手有请",
        id: "A_LH_please_O",
      },
      {
        name: "右手手掌强调",
        id: "A_RH_emphasize2_O",
      },
      {
        name: "右手握拳加油",
        id: "A_RH_encourage_O",
      },
      {
        name: "右手点赞夸奖",
        id: "A_RH_good_O",
      },
      {
        name: "右手欢迎",
        id: "A_RH_hello_O",
      },
      {
        name: "右手有请",
        id: "A_RH_please1_O",
      },
      {
        name: "右手向右",
        id: "A_RH_please_O",
      },
      {
        name: "双手强调",
        id: "A_RLH_emphasize_O",
      },
    ],
  },
  // 110023005: '小柔',
  110018008: {
    name: "晓颜",
    actionList: [
      {
        name: "左手左上介绍",
        id: "A_LH_introduced_O",
      },
      {
        name: "右手向下指",
        id: "A_RH_click_O",
      },
      {
        name: "右手手掌强调",
        id: "A_RH_emphasize2_O",
      },
      {
        name: "右手点赞夸奖",
        id: "A_RH_good_O",
      },
      {
        name: "右手欢迎",
        id: "A_RH_hello_O",
      },
      {
        name: "右手向右上介绍",
        id: "A_RH_introduced1_O",
      },
      {
        name: "右手食指胸前右滑",
        id: "A_RH_introduced_O_1",
      },
      {
        name: "双手强调",
        id: "A_RLH_emphasize_O",
      },
      {
        name: "双手无奈",
        id: "A_RLH_puzzle_0",
      },
      {
        name: "双手打开",
        id: "A_RLH_welcome_O",
      },
    ],
  },
  110026010: {
    name: "伊凡",
    actionList: [
      {
        name: "左手左上介绍",
        id: "A_LH_introduced_O",
      },
      {
        name: "右手向下指",
        id: "A_RH_click_O",
      },
      {
        name: "右手手掌强调",
        id: "A_RH_emphasize2_O",
      },
      {
        name: "右手向右上介绍",
        id: "A_RH_introduced1_O",
      },
      {
        name: "右手点赞夸奖",
        id: "A_RH_good_O",
      },
      {
        name: "右手欢迎",
        id: "A_RH_hello_O",
      },
      {
        name: "右手食指胸前右滑",
        id: "A_RH_introduced_O_1",
      },
      {
        name: "双手打开",
        id: "A_RLH_welcome_O",
      },
      {
        name: "双手强调",
        id: "A_RLH_emphasize_O",
      },
    ],
  },
  118801001: {
    name: "依丹",
    actionList: [
      {
        name: "左手左上介绍",
        id: "A_LH_introduced_O",
      },
      {
        name: "身体微侧，左手有请",
        id: "A_LH_please_O",
      },
      {
        name: "右手打招呼",
        id: "A_RH_bye_O",
      },
      {
        name: "右手手掌强调",
        id: "A_RH_emphasize2_O",
      },
      {
        name: "右手食指强调",
        id: "A_RH_emphasize_O",
      },
      {
        name: "右手握拳加油",
        id: "A_RH_encourage_O",
      },
      {
        name: "右手点赞夸奖",
        id: "A_RH_good_O",
      },
      {
        name: "右手掌心呈现介绍",
        id: "A_RH_introduced_O",
      },
      {
        name: "右手向右上介绍",
        id: "A_RH_introduced1_O",
      },
      {
        name: "右手比心",
        id: "A_RH_like_O",
      },
      {
        name: "右手ok",
        id: "A_RH_ok_O",
      },
      {
        name: "右手有请",
        id: "A_RH_please1_O",
      },
      {
        name: "右手向右",
        id: "A_RH_please_O",
      },
      {
        name: "双手强调",
        id: "A_RLH_emphasize_O",
      },
    ],
  },
  110022010: {
    name: "晓云",
    actionList: [
      {
        name: "左手左上介绍",
        id: "A_LH_introduced_O",
      },
      {
        name: "右手向下指",
        id: "A_RH_click_O",
      },
      {
        name: "右手手掌强调",
        id: "A_RH_emphasize2_O",
      },
      {
        name: "右手点赞夸奖",
        id: "A_RH_good_O",
      },
      {
        name: "右手欢迎",
        id: "A_RH_hello_O",
      },
      {
        name: "右手向右上介绍",
        id: "A_RH_introduced1_O",
      },
      {
        name: "右手食指胸前右滑",
        id: "A_RH_introduced_O_1",
      },
      {
        name: "双手强调",
        id: "A_RLH_emphasize_O",
      },
      {
        name: "XXX",
        id: "A_RLH_puzzle_0",
      },
      {
        name: "双手打开",
        id: "A_RLH_welcome_O",
      },
    ],
  },
  110005018: {
    name: "知新",
    actionList: [
      {
        name: "左手点击",
        id: "A_LH_click_O",
      },
      {
        name: "左手左上介绍",
        id: "A_LH_introduced_O",
      },
      {
        name: "右手向下指",
        id: "A_RH_click_O",
      },
      {
        name: "右手欢迎",
        id: "A_RH_hello_O",
      },
      {
        name: "右手向右上介绍",
        id: "A_RH_introduced1_O",
      },
      {
        name: "右手有请",
        id: "A_RH_please1_O",
      },
      {
        name: "双手介绍",
        id: "A_RLH_introduced_O",
      },
    ],
  },
};
//发音人列表
const vcnList = {
  x3_qianxue: "X3_QIANXUE",
  x3_xiaoye_chongni: "x3_XIAOYE_CHONGNI",
  x3_yezi: "x3_YEZI",
  x3_doudou: "x3_DOUDOU",
  x3_yilin: "x3_YILIN",
  x3_mingge: "x3_MINGGE",
  x3_chaoge: "x3_CHAOGE",
  x3_shaohua: "x3_SHAOHUA",
  x3_lwk_female: "x3_lwk_female",
};
const { Option } = Select;

let audioContext, scriptProcessor, mediaSource, webSocket;

let status = "end";

export default () => {
  //鉴权参数
  const [appId, setAppID] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [apiSecret, setApiSecret] = useState(
    ""
  );

  //虚拟形象参数
  const [width, setWidth] = useState(1280); //[1920 1280 640]
  const [height, setHeight] = useState(720); // [1080 720 360]
  const [maskRegion,setMaskRegion]= useState('[0,154,1080,1472]'); 
  const [moveH,setMoveH]= useState(0); 
  const [moveV,setMoveY]= useState(0); 
  const [scale,setScale]= useState(1); 
  const [avatarId, setAvatarId] = useState("118801001"); //138801002
  const [vcn, setVcn] = useState("x3_qianxue");
  const [speed, setSpeed] = useState(50);
  const [pitch, setPitch] = useState(50);
  const [volume, setVolume] = useState(50);

  //当前文本驱动动作
  const [currentAction, setCurrentAction] = useState();
  //当前音频驱动动作
  const [currentAudioAction, setCurrentAudioAction] = useState();
  //文本驱动动作指令
  const [textActions, setTextActions] = useState([
    { type: "action", value: "A_3_7_TYT_M_0", wb: 3, we: 20 },
    { type: "action", value: "A_3_7_ZQQ_M_0", wb: 30, we: 50 },
  ]);

  //音频驱动动作指令
  const [audioActions, setAudioActions] = useState(); //[{ type: 'action', value: 'A_LH_introduced_O' }]
  //文本驱动后处理字偏移
  const [textPostpro, setTextPostpro] = useState();
  //输入的文本
  const [textContent, setTextContent] = useState("");
  //动作列表
  const [actionList, setActionList] = useState([
    {
      name: "左手左上介绍",
      id: "A_LH_introduced_O",
    },
    {
      name: "身体微侧，左手有请",
      id: "A_LH_please_O",
    },
    {
      name: "右手打招呼",
      id: "A_RH_bye_O",
    },
    {
      name: "右手手掌强调",
      id: "A_RH_emphasize2_O",
    },
    {
      name: "右手食指强调",
      id: "A_RH_emphasize_O",
    },
    {
      name: "右手握拳加油",
      id: "A_RH_encourage_O",
    },
    {
      name: "右手点赞夸奖",
      id: "A_RH_good_O",
    },
    {
      name: "右手掌心呈现介绍",
      id: "A_RH_introduced_O",
    },
    {
      name: "右手向右上介绍",
      id: "A_RH_introduced1_O",
    },
    {
      name: "右手比心",
      id: "A_RH_like_O",
    },
    {
      name: "右手ok",
      id: "A_RH_ok_O",
    },
    {
      name: "右手有请",
      id: "A_RH_please1_O",
    },
    {
      name: "右手向右",
      id: "A_RH_please_O",
    },
    {
      name: "双手强调",
      id: "A_RLH_emphasize_O",
    },
  ]);

  const [vmsStatus, setVmsStatus] = useState(0); //虚拟人服务状态 结束：0，激活：1
  const [isRecording, setIsRecording] = useState(false); //是否在录音
  //背景资源id==resId
  const [resId, setResId] = useState("这里展示背景资源id");

  //停止服务
  const stop = () => {
    VMS.stop()
      .then(() => {
        setVmsStatus(0);
      })
      .catch((e) => {
        setVmsStatus(0);
      });
  };
  //初始化启动
  const initClient = () => {
    VMS.start({
      appId: "",
      apiKey: "",
      apiSecret: "",
      width: width, //[1920 1280 720]
      height: height, // [1080 720 405]
      avatarId: avatarId,
      streamDomId: "remote_stream",
      resId: resId,
      isSsl: false,
      moveH:moveH,
      moveV:moveV,
      scale:scale,
      maskRegion: maskRegion //'[0,154,1080,1472]'
    })
      .then(() => {
        setVmsStatus(1);
      })
      .catch((e) => {
        if (e.stream && e.code === 0x4043) {
          let stream = e.stream;
          Modal.confirm({
            content: "ios兼容性问题，请点击确认按钮恢复虚拟人",
            onOk: () => {
              stream.resume();
            },
          });
        }
        setVmsStatus(0);
      });
  };
  //更新文本、音频动作指令
  const changeAction = (text, flag) => {
    if (flag === "text") {
      setCurrentAction(text);
      if (!text || !text.length) {
        setTextActions([]);
      } else {
        let textActionsArr = text.map((t, i) => {
          return {
            type: "action",
            value: t,
            wb: 3,
            we: 5,
          };
        });
        setTextActions([...textActionsArr]);
      }
    } else if (flag === "audio") {
      setCurrentAudioAction(text);
      if (!text) {
        setAudioActions([]);
      } else {
        setAudioActions([
          {
            type: "action",
            value: text,
          },
        ]);
      }
    }
  };
  //文本驱动输入框输入
  const textDrive = () => {
    if (!textContent) {
      return;
    }

    VMS.textDriver(
      {
        encoding: "utf8",
        compress: "raw",
        format: "plain",
        status: 3,
        text: encode(textContent),
      },
      {
        vcn: vcn, // 发音人
        speed: speed, // 语速：[0,100]，默认50
        pitch: pitch, // 语调：[0,100]，默认50
        volume: volume,
      },
      textActions
        ? {
            // 字偏移控制指令
            encoding: "utf8",
            compress: "raw",
            format: "json",
            status: 3,
            text: encode(
              JSON.stringify({
                avatar: textActions,
              })
            ),
          }
        : undefined,
      textPostpro
        ? {
            // 字偏移控制指令
            encoding: "utf8",
            compress: "raw",
            format: "json",
            status: 3,
            text: encode(JSON.stringify(textPostpro)),
          }
        : undefined
    )
      .then((res) => {})
      .catch((e) => {
        debugger;
      });
  };

  //文本驱动非打断
  const textDriveNit = ()=>{
    VMS.textDriverNit(
      {
        encoding: "utf8",
        compress: "raw",
        format: "plain",
        status: 3,
        text: encode(textContent),
      },
      {
        vcn: vcn, // 发音人
        speed: speed, // 语速：[0,100]，默认50
        pitch: pitch, // 语调：[0,100]，默认50
        volume: volume,
      },
      textActions
        ? {
            // 字偏移控制指令
            encoding: "utf8",
            compress: "raw",
            format: "json",
            status: 3,
            text: encode(
              JSON.stringify({
                avatar: textActions,
              })
            ),
          }
        : undefined,
     {
      realtime_status:{
        tts_status:1,
        vmr_status:1,
        vmr_action_status:1
      }
     },
     (res)=>{
      console.log('非打断返回的实时数据：',res.payload?decode(res.payload.realtime_status.text):res.payload)
     },
      textPostpro
        ? {
            // 字偏移控制指令
            encoding: "utf8",
            compress: "raw",
            format: "json",
            status: 3,
            text: encode(JSON.stringify(textPostpro)),
          }
        : undefined
    )
      .then((res) => {
        console.log('文本驱动建立连接成功啦')
      })
      .catch((e) => {
        debugger;
      });
  }

  // 初始化浏览器录音
  const recorderInit = () => {
    navigator.getUserMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia;
    // 创建音频环境
    try {
      audioContext = new (window.AudioContext || window.webkitAudioContext)();
      audioContext.resume();
      if (!audioContext) {
        alert("浏览器不支持webAudioApi相关接口");
        return;
      }
    } catch (e) {
      if (!audioContext) {
        alert("浏览器不支持webAudioApi相关接口");
        return;
      }
    }

    // 获取浏览器录音权限
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      debugger;
      navigator.mediaDevices
        .getUserMedia({
          audio: true,
          video: false,
        })
        .then((stream) => {
          getMediaSuccess(stream);
        })
        .catch((e) => {
          getMediaFail(e);
        });
    } else if (navigator.getUserMedia) {
      navigator.getUserMedia(
        {
          audio: true,
          video: false,
        },
        (stream) => {
          getMediaSuccess(stream);
        },
        function (e) {
          getMediaFail(e);
        }
      );
    } else {
      if (
        navigator.userAgent.toLowerCase().match(/chrome/) &&
        location.origin.indexOf("https://") < 0
      ) {
        alert(
          "chrome下获取浏览器录音功能，因为安全性问题，需要在localhost或127.0.0.1或https下才能获取权限"
        );
      } else {
        alert("无法获取浏览器录音功能，请升级浏览器或使用chrome");
      }
      audioContext && audioContext.close();
      return;
    }
    // 获取浏览器录音权限成功的回调
    let getMediaSuccess = (stream) => {
      // 创建一个用于通过JavaScript直接处理音频
      scriptProcessor = audioContext.createScriptProcessor(0, 1, 1);
      scriptProcessor.onaudioprocess = (e) => {
        // 去处理音频数据
        if (status === "ing") {
          transWorker.postMessage(e.inputBuffer.getChannelData(0));
        }
      };
      // 创建一个新的MediaStreamAudioSourceNode 对象，使来自MediaStream的音频可以被播放和操作
      mediaSource = audioContext.createMediaStreamSource(stream);
      // 连接
      mediaSource.connect(scriptProcessor);
      scriptProcessor.connect(audioContext.destination);
      VMS.audioDriverInit({
        frameSize: 1280,
        sendInterval: 40,
      })
        .then((res) => {
          if (res.message === "success") {
            console.log("音频驱动初始化成功");
          }
        })
        .catch((e) => {
          console.log(e.message);
        });
    };

    let getMediaFail = (e) => {
      alert("请求麦克风失败");
      // console.log(e)
      audioContext && audioContext.close();
      audioContext = undefined;
      // 关闭websocket
      if (webSocket && webSocket.readyState === 1) {
        webSocket.close();
      }
    };
  };
  //开始录音
  const startRecord = (e) => {
    if (webSocket) {
      webSocket.close();
    }
    setIsRecording(true);
    status = "ing";
    if (!audioContext) {
      recorderInit();
    } else {
      audioContext.resume();
      VMS.audioDriverInit({
        frameSize: 1280,
        sendInterval: 40,
      });
      // connectWebSocket()
    }
  };
  //结束录音
  const stopRecord = () => {
    // safari下suspend后再次resume录音内容将是空白，设置safari下不做suspend
    if (
      !(
        /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgen)
      )
    ) {
      audioContext && audioContext.suspend();
    }
    scriptProcessor.disconnect();
    scriptProcessor.onaudioprocess = null;
    audioContext = null;
    setIsRecording(false);
    status = "end";
  };
  //上传背景图片
  const uploadImageChange = (file, elementType, ele) => {
    if (ele) {
      ele.previousSibling.innerText = file.name;
    }
    let reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = function (e) {
      let result: any = reader.result;
      let base64Str = result.split(";base64,")[1];
      VMS.uploadResourceData(
        {
          appId: appId,
          apiKey: apiKey,
          apiSecret: apiSecret,
          resourceBase64Str: base64Str,
        }
      )
        .then((data) => {
          debugger
          if (data) {
            setResId(data.data);
            document.getElementById("fileUploaderBg").value = "";
          } else {
            setResId(undefined);
          }
        })
        .catch(() => {
          setResId(undefined);
        });
    };
  };

  transWorker.onmessage = function (event) {
    if (status !== "end") {
      VMS.audioDriverSendData(
        [...event.data],
        audioActions,
        textPostpro
          ? {
              // 字偏移控制指令
              encoding: "utf8",
              compress: "raw",
              format: "json",
              status: 1,
              text: encode(JSON.stringify(textPostpro)),
            }
          : undefined
      );
      if (audioActions) {
        setAudioActions(undefined);
      }
      if (textPostpro) {
        setTextPostpro(undefined);
      }
    }
  };

  return (
    <div className="vms-page">
      <div id="remote_stream" className="remote-stream-area">
        {/* 虚拟人将在这里展示哦 */}
      </div>
      {/* 虚拟人配置区域 */}
      <div className="vms-setting-area">
        <Row gutter={12}>
          <Col span={14}>
            <Card
              title={
                <p>
                  虚拟人服务起/停{" "}
                  <span style={{ marginLeft: "12px", color: "#ff0000" }}>
                    请先启动虚拟人服务哦~
                  </span>
                </p>
              }
              style={{ marginTop: "24px" }}
            >
              <div style={{ textAlign: "left" }}>
                <Row gutter={24}>
                  <Col span={14}>
                    <div className="params-setting-item">
                      <h4>鉴权</h4>
                      <div>
                        <Input
                          addonBefore="appId"
                          placeholder="请输入appId"
                          value={appId}
                          onInput={(e) => {
                            setAppID(e.target.value);
                          }}
                        />
                        <Input
                          addonBefore="apiKey"
                          placeholder="请输入apiKey"
                          style={{ marginTop: "12px" }}
                          value={apiKey}
                          onInput={(e) => {
                            setApiKey(e.target.value);
                          }}
                        />
                        <Input
                          addonBefore="apiSecret"
                          placeholder="请输入apiSecret"
                          style={{ margin: "12px 0" }}
                          value={apiSecret}
                          onInput={(e) => {
                            setApiSecret(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                    <div className="params-setting-item">
                      <h4>
                        虚拟人
                        <span
                          style={{
                            color: "#ff0000",
                            marginLeft: "10px",
                            fontWeight: 500,
                          }}
                        >
                          位移/缩放/裁切 需设置背景才能生效哦
                        </span>
                      </h4>
                      <div>
                        <Row gutter={12}>
                          <Col span={12}>
                            <InputNumber
                              min={1}
                              max={3840}
                              addonBefore="宽度"
                              placeholder="请输入宽度"
                              value={width}
                              onChange={(value) => {
                                setWidth(value);
                              }}
                            />
                          </Col>
                          <Col span={12}>
                            <InputNumber
                              min={1}
                              max={1920}
                              addonBefore="高度"
                              placeholder="请输入高度"
                              value={height}
                              onChange={(value) => {
                                setHeight(value);
                              }}
                            />
                          </Col>
                          <Col span={12}  style={{ marginTop: "12px" }}>
                            <InputNumber
                              min={0}
                              max={9999999}
                              addonBefore="X位移"
                              placeholder="请输入水平位移"
                              value={moveH}
                              onChange={(value) => {
                                setMoveH(value);
                              }}
                            />
                          </Col>
                          <Col span={12}  style={{ marginTop: "12px" }}>
                            <InputNumber
                              min={0}
                              max={999999}
                              addonBefore="Y位移"
                              placeholder="请输入纵向位移"
                              value={moveV}
                              onChange={(value) => {
                                setMoveY(value);
                              }}
                            />
                          </Col>
                          <Col span={12}  style={{ marginTop: "12px" }}>
                            <InputNumber
                              min={1}
                              max={1920}
                              addonBefore="缩放"
                              placeholder="请输入缩放"
                              value={scale}
                              onChange={(value) => {
                                setScale(value);
                              }}
                            />
                          </Col>
                          <Col span={12}  style={{ marginTop: "12px" }}>
                            <Input
                              addonBefore="裁切"
                              placeholder="请输入裁切范围"
                              value={maskRegion}
                              onChange={(value) => {
                                setMaskRegion(e.target.value);
                              }}
                            />
                          </Col>
                          <Col span={24} style={{ marginTop: "12px" }}>
                            <div className="params-setting-item">
                              {/* <h4>形象资源</h4> */}
                              <div>
                                <label>形象资源：</label>
                                <Select
                                  style={{ width: "200px" }}
                                  onChange={(e, option) => {
                                    setAvatarId(e);
                                    setActionList(option.data);
                                    // setCurrentAction(option.data[0].id)
                                  }}
                                  value={avatarId}
                                >
                                  {Object.keys(avatarList).map((t) => (
                                    <Option
                                      key={t}
                                      value={t}
                                      data={avatarList[t].actionList}
                                    >
                                      {t + "(" + avatarList[t].name + ")"}
                                    </Option>
                                  ))}
                                </Select>
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </div>
                    <div className="params-setting-item">
                      <h4>发音</h4>
                      <div>
                        <div className="params-setting-item-list">
                          <label>发音人：</label>
                          <Select
                            style={{ width: "200px" }}
                            value={vcn}
                            onChange={(e) => {
                              setVcn(e);
                            }}
                          >
                            {Object.keys(vcnList).map((t) => (
                              <Option key={t} value={t}>
                                {t}
                              </Option>
                            ))}
                          </Select>
                        </div>
                        <div className="params-setting-item-list">
                          <label>音量</label>
                          <div className="params-setting-item-slider">
                            <Slider
                              value={volume}
                              onChange={(e) => {
                                setVolume(e);
                              }}
                            />
                          </div>
                        </div>
                        <div className="params-setting-item-list">
                          <label>声调</label>
                          <div className="params-setting-item-slider">
                            <Slider
                              value={pitch}
                              onChange={(e) => {
                                setPitch(e);
                              }}
                            />
                          </div>
                        </div>
                        <div className="params-setting-item-list">
                          <label>语速</label>
                          <div className="params-setting-item-slider">
                            <Slider
                              value={speed}
                              onChange={(e) => {
                                setSpeed(e);
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col span={10}>
                    <div className="params-setting-item">
                      <h4>后处理</h4>
                      <div>
                        {/* <div></div> */}
                        <Divider orientation="left">
                          背景（图片或者视频，avi，mp4）
                        </Divider>
                        <label
                          htmlFor="fileUploaderBg"
                          className="upload-file-label"
                        >
                          <input
                            type="button"
                            className="uploader-btn"
                            value="请选择背景资源文件"
                          />
                          <span></span>
                          <input
                            className="excle-file"
                            type="file"
                            title=""
                            name="fileUploaderBg"
                            accept=".mp4,.avi,.jpg,.jpeg,.png;"
                            id="fileUploaderBg"
                            onChange={(e) => {
                              uploadImageChange(
                                e.target.files[0],
                                "bg",
                                e.target
                              );
                            }}
                            style={{ width: "100%" }}
                          />
                        </label>

                        <div style={{ marginTop: "12px" }}>
                          <Tag color="#87d068">{resId}</Tag>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>

                {vmsStatus ? (
                  <Button onClick={stop} block>
                    结束虚拟人服务
                  </Button>
                ) : (
                  <Button
                    onClick={initClient}
                    style={{ marginRight: "24px" }}
                    type="primary"
                    block
                    size="large"
                  >
                    启动虚拟人服务
                  </Button>
                )}
              </div>
            </Card>
          </Col>
          <Col span={10}>
            <Card title="文本驱动" style={{ marginTop: "24px" }}>
              <div>
                <p>文本</p>
                <Input.TextArea
                  showCount
                  maxLength={1000}
                  value={textContent}
                  placeholder="请输入你想说的话"
                  style={{
                    width: "100%",
                    height: "100px",
                  }}
                  onChange={(e) => {
                    setTextContent(e.target.value);
                  }}
                ></Input.TextArea>
                <div className="params-setting-item">
                  <p>动作</p>
                  <div>
                    <Select
                      style={{ width: "100%" }}
                      onChange={(e) => {
                        changeAction(e, "text");
                      }}
                      mode="multiple"
                      value={currentAction}
                      allowClear
                      placeholder="请选择动作，支持多个"
                    >
                      {actionList.map((t) => (
                        <Option key={t.id} value={t.id}>
                          {t.id + "(" + t.name + ")"}
                        </Option>
                      ))}
                    </Select>
                  </div>
                </div>
                <Button
                  type="primary"
                  // block
                  style={{ marginTop: "24px" }}
                  onClick={() => {
                    textDrive();
                  }}
                  // ghost
                >
                  提交文本驱动
                </Button>
                <Button
                  type="primary"
                  // block
                  style={{ marginTop: "24px",float:'right' }}
                  onClick={() => {
                    textDriveNit();
                  }}
                >
                  提交非打断文本驱动
                </Button>
              </div>
            </Card>
            <Card title="语音驱动" style={{ marginTop: "24px" }}>
              <Row gutter={0}>
                <Col span={10}>
                  <div>
                    <p>音频</p>
                    {isRecording ? (
                      <div>
                        <div
                          onClick={stopRecord}
                          className="record-button-stop"
                          id="stopRecordBtn"
                        >
                          <svg
                            height="80"
                            width="80"
                            style={{ overflow: "visible" }}
                          >
                            <circle
                              className="record-button-circle"
                              cx="40"
                              cy="40"
                              r="39"
                            />
                            <circle
                              className="record-button-circle-outline"
                              cx="40"
                              cy="40"
                              r={42}
                            />
                          </svg>
                        </div>
                        <p className="record-text">结束录音</p>
                      </div>
                    ) : (
                      <div>
                        <button
                          className="record-button"
                          onClick={startRecord}
                          id="startRecordBtn"
                          style={{ marginRight: "16px" }}
                        >
                          {" "}
                          <img
                            draggable={false}
                            src={voiceimg}
                            style={{ width: "25px", height: "37px" }}
                          />
                        </button>
                        <p className="record-text">开始录音</p>
                      </div>
                    )}
                  </div>
                </Col>
                <Col span={14}>
                  <div className="params-setting-item">
                    <p>动作</p>
                    <div>
                      <Select
                        style={{ width: "100%" }}
                        onSelect={(text) => {
                          changeAction(text, "audio");
                        }}
                        value={currentAudioAction}
                        allowClear
                        placeholder="请选择动作，仅支持单个"
                        // defaultValue={'A_LH_introduced_O'}
                      >
                        {actionList.map((t) => (
                          <Option key={t.id} value={t.id}>
                            {t.id + "(" + t.name + ")"}
                          </Option>
                        ))}
                      </Select>
                    </div>
                  </div>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </div>
      {/* 视频流展示区域 */}
      <div id="local_stream"></div>
    </div>
  );
};
