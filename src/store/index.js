import Vue from 'vue'
import Vuex from '../vuex'

Vue.use(Vuex) // Vue通过Vue.use安装vuex，use通过调用vuex对象的install方法将vuex载入

export default new Vuex.Store({
  state: {
    age: 10
  },
  getters: { // 相当于data中的computed
    myAge(state) {
      return state.age + 10
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
