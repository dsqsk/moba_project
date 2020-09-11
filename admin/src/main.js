import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import http from './plugins/http'

Vue.config.productionTip = false

//加载至vue原型
Vue.prototype.$http = http

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
