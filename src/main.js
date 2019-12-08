import Vue from 'vue'
import App from './App.vue'
import router from './router'
//全局引入vuex数据 然后在所有页面注册
import store from './store'

//引入ui
import iView from 'iview'
import 'iview/dist/styles/iview.css'

Vue.use(iView)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
