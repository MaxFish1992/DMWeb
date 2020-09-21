import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
 
const store = new Vuex.Store({
 
  state: {
    // 存储token
    Authority: localStorage.getItem('Authority') ? localStorage.getItem('Authority') : '',
  },
 
  mutations: {
    // 修改token，并将token存入localStorage
    changeToken (state, user) {
      state.Authority = user.Authority;
      localStorage.setItem('Authority', user.Authority);
    }
  },
  token: "",
});
 
export default store;