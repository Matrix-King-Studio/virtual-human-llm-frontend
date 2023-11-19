import axios from 'axios';
import { useCookies } from '@vueuse/integrations/useCookies'

import { getToken } from '../composables/auth';
//1. 创建axios对象
const service = axios.create({
  baseURL: "/api",
});

// 2. 请求拦截器

service.interceptors.request.use(config => {
  // 应用实例 向header中自动添加token

  const token = getToken()
  if (token) {
    config.headers['token'] = token
  }

  return config;
}, error => {
  Promise.reject(error);
});

// 3. 响应拦截器
service.interceptors.response.use(response => {

  //返回请求值的data
  return response.data;
})
// error => {
//   // return Promise.reject(error);
// });

export default service;