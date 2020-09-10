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

Vue.prototype.$axios = axios;
Vue.prototype.qs = QS;
Vue.use(ElementUI);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
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
        Authority: "",
      }
    }
  },
  render: h => h(App)
}).$mount('#app');

