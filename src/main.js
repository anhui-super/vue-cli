// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'lib-flexible/flexible'

import iView from 'iview'
 // import 'iview/dist/styles/iview.css'    // 使用 CSS
Vue.use(iView)
import './assets/css/common.css'
import './assets/css/iconfont.css'

Vue.config.productionTip = false

import axios from 'axios';
import qs from 'qs';

Vue.prototype.$axios = axios
Vue.prototype.qs = qs

import VueResource from 'vue-resource';
Vue.use(VueResource);

import layer from 'vue-layer'
Vue.prototype.$layer = layer(Vue);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
