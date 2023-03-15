import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  //baseURL: 'http://localhost:88',
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000
})

// 请求拦截器
service.interceptors.request.use(config => {
    //config.headers['Content-Type'] = 'application/json;charset=utf-8'
    if (store.getters.token) {
      //config.headers['X-Token'] = getToken()
    }
    return config
  },
  error => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    const res = response.data

    // if the custom code is not 200, it is judged as an error.
    if (res.code !== 200) {
      Message({
        message: res.msg || '操作失败',
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(new Error(res.msg || '操作失败'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,// Request failed with status code 500
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
