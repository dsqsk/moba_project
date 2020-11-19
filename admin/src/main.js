import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import http from './plugins/http'
import './style/style.css'

Vue.config.productionTip = false

// 加载至vue原型
Vue.prototype.$http = http

Vue.mixin({
  computed: {
    uploadUrl () {
      return this.$http.defaults.baseURL + '/upload'
    }
  },
  methods: {
    getAuthHeaders () {
      return {
        Authorization: `Bearer ${localStorage.token || ''}`
      }
    }
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
