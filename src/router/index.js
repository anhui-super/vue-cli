import Vue from 'vue'
import Router from 'vue-router'
import Sign_In from '@/components/login/Sign_In'
import sign_index from '@/components/index/index'

Vue.use(Router)


export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Sign_In',
      component: Sign_In,

    },
    {
      path:'/index',
      name:'index',
      component:sign_index
    }

  ]
})
