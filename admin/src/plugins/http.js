import axios from 'axios'
import Vue from 'vue'

const http = axios.create({
  baseURL: 'http://localhost:3000/admin/api'
})

// 请求拦截器
http.interceptors.request.use(function (config) {
  config.headers.Authorization = 'Bearer ' + localStorage.token
  return config
}, function (error) {
  return Promise.reject(error)
})

// 全局响应拦截器
http.interceptors.response.use(function (response) {
  return response
}, function (error) {
  if (error.response.data) {
    Vue.prototype.$message({
      type: 'error',
      message: error.response.data
    })
    return Promise.reject(error)
  }
})

export default http
