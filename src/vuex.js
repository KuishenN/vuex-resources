
let Vue;  // 定义变量Vue，的是引用外部的Vue构造函数
// Vue作为参数传递给Vuex, 我们不需要手动导入Vue，代码打包的时候不需要将vue包含进来
class Store {
  constructor(options) { // 当new Vuex.Store的时候传入一个参数
    this._state = new Vue({ // new Vue做了给state中的属性都监听了observe
      data: {
        state: options.state
      }
    })
    let _getters = options.getters || {} // 用户传递过来的getters
    this.getters = {} // 要把所有传递过来的属性复制一份给this.getters
    Object.keys(_getters).forEach(getterName => {  // getters的属性, 访问的时候是访问属性，返回的是函数的形式，想到的是Object.defineProperty
      Object.defineProperty(this.getters, getterName, {
        get:() => { // 防止this发生修改
          return _getters[getterName](this.state)
        }
      })
    })
  }
  get state() { //属性取值器
    return this._state.state
  }
}
// vue组件渲染 先渲染父组件,再显示子组建 深度优先
const install =(_vue) => { 
  /**
   * install中做什么？
   * 1. 先保留_vue共当前函数以外的方法使用
   * 2. 需要给每个组件注册一个this.$store属性 this即是这个组建实例
   * 3. 需要增加一个响应式监听state的属性，以此来计算出getters中的属性值
   */
  Vue = _vue
  Vue.mixin({ // 每个组件都混个一些东西
    beforeCreate() { //每个组件创建之间都增加这些东西,并且不会覆盖子组件的东西，递归增加属性
      console.log(this.$options.store) // 拿到所有的组件实例，给每一个组件上添加这个
      if (this.$options && this.$options.store) {  // 更组件
        this.$store = this.$options.store
      } else { // 子组件
        this.$store = this.$parent && this.$parent.$store
      }
    },
  })
}
export default {
  install,
  Store
}