<template>
  <div id="app">
      <!-- 使用组件 -->
      <Index/>
  </div>
</template>
<script>
//引入组件
import Index from './pages/Index.vue'
export default {
  //注册组件
  components:{
    Index
  }
}
</script>


<style lang="less">
  html,body,#app{
    height: 100%;
  }

</style>
