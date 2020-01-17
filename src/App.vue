<template>
  <div id="app">
    {{this.$store.state.age}}
    我的年龄: {{$store.getters.myAge}}
  </div>
</template>
<script>
export default {
  name: 'app',
  mounted () {
    setTimeout(() => {
      this.$store.state.age = 200  // 修改了state是状态管理中的属性不是响应式的，需要添加get set函数对于data中的属性
    }, 100)
  }
}
</script>

<style>
</style>
