import axios from 'axios'
import { ElMessage } from "element-plus";
// import store from '../store/index'

// create an axios instance
const service = axios.create({
  baseURL: '', // api的base_url
  timeout: 20000, // request timeout
  // headers: { '': '' }
})

// request interceptor（拦截器）
service.interceptors.request.use(config => {
  // Do something before request is sent
  // if (localStorage.getItem('token')) { 
    //在请求头加入token，名字要和后端接收请求头的token名字一样 
    // config.headers.token=localStorage.getItem('token');  
  // } 
  // if (localStorage.getItem('token')) { 
  //   //在请求头加入token，名字要和后端接收请求头的token名字一样 
  //   config.headers.token=localStorage.getItem('token');  
  // } 
  return config
}, error => {
  // Do something with request error
  // console.log(error) // for debug
  Promise.reject(error)
})

// respone interceptor
service.interceptors.response.use(
  response => {
    const res = response.data;
    if (res.success == '401') {
      // do something
    } else if (res.success !== true) {
      // do something
      return Promise.reject(res);
    } else {
      return response.data;
    }
  },
  error => {
      ElMessage.error('服务器异常，请耐心等待~')
      return Promise.reject(error)
  })

export default service
