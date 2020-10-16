// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'


// 引入axios，并加到原型链中
import axios from 'axios';
import QS from 'qs'          //全局注册，使用方法为:this.qs

/*ElementUI*/
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import App from './App'

import router from './router'
import store from './store'
// import print from './plugs/print.js'

Vue.prototype.$Authority = 4;
// Vue.prototype.$MenuItems = [
//   { router: "/home", name: "首页" },
//   { router: "/productmanage", name: "销售订单" },
//   // { router: "/salesmanage", name: "生产进度" },
//   // { name: "/financialmanage", navItem: "财务管理" },
//   // { name: "/procurementmanage", navItem: "进销存管理" },
//   { router: "/about", name: "关于" },
// ];
Vue.prototype.$MenuItems1 = [];
Vue.prototype.$store = store
Vue.prototype.$axios = axios;

Vue.prototype.qs = QS;
// Vue.use(print) // 注册
Vue.use(ElementUI);

import Print from '@/plugs/print'
Vue.use(Print) // 注册


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store: store,
  components: { App },
  template: '<App/>'
})

new Vue({
  router,
  data: function () {
    return {
      user: {
        userName: "",
        password: "",
        authority: "",
      },
      // menuitems:[],
    }
  },
  render: h => h(App)
}).$mount('#app');

