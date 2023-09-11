//按照指定长度切分数组
export const groupArray = (array = [], subGroupLength = 0) => {
  let index = 0;
  const newArray = [];
  while (index < array.length) {
    newArray.push(array.slice(index, index += subGroupLength));
  }
  return newArray;
} 
//仿sigmoid函数，获取0-1数据
export const sigmoid = (x) => {
  return 1.0 / (1.0 + Math.exp(-x))
}
//bs数据：37维到84维转换
export const transBsData37To84 = (bs_in) => {
  if (bs_in.length != 37) {
    return;
  }

  let new_bs = [];
  for (let i = 0; i < 76; ++i) {
    new_bs.push(0);
  }

  for (let i = 0; i < 37; ++i) {
    new_bs[i + 19] = bs_in[i];
  }
  new_bs[25] = 0;
  new_bs[26] = 0;


  const sigmoid_21 = 0.08;
  const sigmoid_scale = 12;

  let scale = sigmoid(sigmoid_scale * (new_bs[21] - sigmoid_21));
  new_bs[21] = new_bs[21] * scale;

  let sigmoid_29303132 = 0.08;
  new_bs[29] = new_bs[29] * sigmoid(sigmoid_scale * (new_bs[29] - sigmoid_29303132));
  new_bs[30] = new_bs[30] * sigmoid(sigmoid_scale * (new_bs[30] - sigmoid_29303132));
  new_bs[31] = new_bs[31] * sigmoid(sigmoid_scale * (new_bs[31] - sigmoid_29303132));
  new_bs[32] = new_bs[32] * sigmoid(sigmoid_scale * (new_bs[32] - sigmoid_29303132));

  let sigmoid_27_28 = 0.25;
  new_bs[27] = new_bs[27] * sigmoid(sigmoid_scale * (new_bs[27] - sigmoid_27_28));
  new_bs[28] = new_bs[28] * sigmoid(sigmoid_scale * (new_bs[28] - sigmoid_27_28));

  let sigmoid_38 = 0.10;
  let sigmoid_39 = 0.05;
  new_bs[38] = new_bs[38] * sigmoid(3 * sigmoid_scale * (new_bs[38] - sigmoid_38));
  new_bs[39] = new_bs[39] * sigmoid(3 * sigmoid_scale * (new_bs[39] - sigmoid_39));


  new_bs[36] = new_bs[36] * 0.1;
  new_bs[50] = new_bs[50] * 0.1;
  new_bs[51] = new_bs[51] * 0.1;

  new_bs[27] = new_bs[27] * 0.7;
  new_bs[28] = new_bs[28] * 0.7;

  new_bs[29] = new_bs[29] * 0.25;
  new_bs[30] = new_bs[30] * 0.25;

  new_bs[21] = new_bs[21] * 1.4;

  new_bs[38] = new_bs[38] * 1.2;
  new_bs[39] = new_bs[39] * 1.2;

  let sym = true;
  if (sym) {
    let tmp_m = new_bs[20] + new_bs[22];
    new_bs[20] = new_bs[22] = tmp_m * 0.5;

    tmp_m = new_bs[23] + new_bs[24];
    new_bs[23] = new_bs[24] = tmp_m * 0.5;

    tmp_m = new_bs[27] + new_bs[28];
    new_bs[27] = new_bs[28] = tmp_m * 0.5;

    tmp_m = new_bs[29] + new_bs[30];
    new_bs[29] = new_bs[30] = tmp_m * 0.5;

    tmp_m = new_bs[31] + new_bs[32];
    new_bs[31] = new_bs[32] = tmp_m * 0.5;

    tmp_m = new_bs[48] + new_bs[49];
    new_bs[48] = new_bs[49] = tmp_m * 0.5;

    tmp_m = new_bs[52] + new_bs[53];
    new_bs[52] = new_bs[53] = tmp_m * 0.5;
  }


  // expression
  let expr_bs = []; //happer,sad,angry,sorry,cute,shy,question,normal
  for (let i = 0; i < 8; ++i) {
    expr_bs.push(0.0); //happer,sad,angry,sorry,cute,shy,question,normal
  }

  // int[] mouth_smile_idx = { 27, 28 };
  // int[] mouth_frown_idx = { 25, 26 };
  // int[] mouth_shrug_upper = { 35 };

  for (let i = 0; i < expr_bs.length; ++i) {
    new_bs.push(expr_bs[i]);
  }
  // clip
  for (let i = 0; i < new_bs.length; ++i) {
    new_bs[i] = new_bs[i] >= 1 ? 1 : new_bs[i] <= 0 ? 0 : new_bs[i];
  }

  return new_bs;
}
//字符串转utf8编码
export const str2utf8 = window.TextEncoder ? function (str) {

  var encoder = new TextEncoder('utf8');

  var bytes = encoder.encode(str);

  var result = '';

  for (var i = 0; i < bytes.length; ++i) {

    result += String.fromCharCode(bytes[i]);

  }

  return result;

} : function (str) {
  return eval('\'' + encodeURI(str).replace(/%/gm, '\\x') + '\'');
}
//从44100HZ压缩到16000HZ 
export const to16kHz = (audioDatas) => {
  var data = new Float32Array(audioDatas)
  var fitCount = Math.round(data.length * (16000 / 44100))
  var newData = new Float32Array(fitCount)
  var springFactor = (data.length - 1) / (fitCount - 1)
  newData[0] = data[0]
  for (let i = 1; i < fitCount - 1; i++) {
    var tmp = i * springFactor
    var before = Math.floor(tmp).toFixed()
    var after = Math.ceil(tmp).toFixed()
    var atPoint = tmp - before
    newData[i] = data[before] + (data[after] - data[before]) * atPoint
  }
  newData[fitCount - 1] = data[data.length - 1]
  return newData
}
//转换成16bit pcm
export const to16BitPCM = (input) => {
  var dataLength = input.length * (16 / 8)
  var dataBuffer = new ArrayBuffer(dataLength)
  var dataView = new DataView(dataBuffer)
  var offset = 0
  for (var i = 0; i < input.length; i++, offset += 2) {
    var s = Math.max(-1, Math.min(1, input[i]))
    dataView.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true)
  }
  return dataView
}
//转成合成需要的音频格式16k 16bit 单声道
export const transcode = (audioDatas) => {
  let output = to16kHz(audioDatas)
  let outputNew = to16BitPCM(output)
  return Array.from(new Uint8Array(outputNew.buffer))
}
//buffer转base64
export const toBase64 = (buffer) => {
  var binary = ''
  var bytes = new Uint8Array(buffer)
  var len = bytes.byteLength
  for (var i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  return window.btoa(binary)
}

//采样率转换
export const transSamplingRate = (data, fromRate = 44100, toRate = 16000) => {
  var fitCount = Math.round(data.length * (toRate / fromRate))
  var newData = new Float32Array(fitCount)
  var springFactor = (data.length - 1) / (fitCount - 1)
  newData[0] = data[0]
  for (let i = 1; i < fitCount - 1; i++) {
    var tmp = i * springFactor
    var before = Math.floor(tmp).toFixed()
    var after = Math.ceil(tmp).toFixed()
    var atPoint = tmp - before
    newData[i] = data[before] + (data[after] - data[before]) * atPoint
  }
  newData[fitCount - 1] = data[data.length - 1]
  return newData
}
//int16转float32
export const transS16ToF32 = (input) => {
  var tmpData = []
  for (let i = 0; i < input.length; i++) {
    var d = input[i] < 0 ? input[i] / 0x8000 : input[i] / 0x7fff
    tmpData.push(d)
  }
  return new Float32Array(tmpData)
}
//base64转int16
export const base64ToS16 = (base64AudioData) => {
  base64AudioData = atob(base64AudioData)
  const outputArray = new Uint8Array(base64AudioData.length)
  for (let i = 0; i < base64AudioData.length; ++i) {
    outputArray[i] = base64AudioData.charCodeAt(i)
  }
  return new Int16Array(new DataView(outputArray.buffer).buffer)
}
//base64转audio播放的音频数据
export const transToAudioData = (audioDataStr, fromRate = 16000, toRate = 22050) => {
  let outputS16 = base64ToS16(audioDataStr)
  let output = transS16ToF32(outputS16)
  output = transSamplingRate(output, fromRate, toRate)
  let outputNew = Array.from(output)
  return {
    data: outputNew,
    rawAudioData: Array.from(outputS16)
  }
}

export const computeRMS = (samples, scaling = 0.55) => {
  if (samples.length === 0) return 0;
  // Calculate RMS, adapted from https://github.com/Tonejs/Tone.js/blob/master/Tone/component/Meter.js#L88
  let sum = 0;
  for (let i = 0; i < samples.length; i++) {
    const sample = samples[i];
    sum += Math.pow(sample, 2);
  }
  const rms = Math.sqrt(sum / samples.length);
  const val = rms / scaling;
  return Math.sqrt(val);
};
