import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

new Vue({
  name: 'root', // 1. 根实例
  router,
  store,  // 每一个vue实例上都有同一个this.$store
  render: h => h(App)  // 2. app中也会创建这个组件的实例
}).$mount('#app')
