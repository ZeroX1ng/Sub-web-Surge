import Vue from 'vue'
import axios from 'axios'

const instance = axios.create({
  timeout: 5000 // 请求超时的时间设定
})

// 统一错误处理：为请求错误补充便于展示的中文提示（displayMessage），
// 各调用处可通过 error.displayMessage 展示更具体的错误原因
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      error.displayMessage = `请求失败（HTTP ${error.response.status}）`
    } else if (error.request) {
      error.displayMessage = '网络请求失败（超时或后端不可达）'
    } else {
      error.displayMessage = '请求配置错误'
    }
    return Promise.reject(error)
  }
)

Vue.prototype.$axios = instance
