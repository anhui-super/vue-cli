import Vue from 'vue'
import Router from 'vue-router'
import Sign_In from '@/components/login/Sign_In' //
import index from '@/components/index/index'
import registe from '@/components/login/Sign_In_registe'
import login_1 from '@/components/login/login_1'
import login_2 from '@/components/login/login_2'
import forget from '@/components/login/Sign_In_register_forget'

Vue.use(Router)


export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/passport',
      component:Sign_In,
      children:[
        {path: '/passport/registe',component:registe},
        {path: '/passport/login_1',component:login_1},
        {path: '/passport/login_2',component:login_2},
        {path: '/passport/forget',component:forget},
      ]
    }




  ]
})
