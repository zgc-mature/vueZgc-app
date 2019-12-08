import Vue from 'vue'
import Router from 'vue-router'
import Goods from './pages/Goods.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'goods',
      component:Goods,
    },
    // 评价
    {
      path: '/evaluation',
      name: 'evaluation',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './pages/Evaluation.vue')
    },
    //商家
    {
      path: '/merchants',
      name: 'merchants',
      component: () => import('./pages/Merchants.vue')
    },
  ]
})
