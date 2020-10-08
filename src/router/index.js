import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/login' // 重定向
    },
    {
      path: '/login', // 登录
      name: 'login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/registered', // 注册
      name: 'registered',
      component: () => import('../views/Registered.vue')
    },
    {
      path: '/about', // 关于
      name: 'about',
      component: () => import('../views/About.vue'),
      meta: {
        title: '关于',
        requireAuth: true
      }
    },
    {
      path: '/home', // 首页
      name: 'home',
      component: () => import('../views/layout/Home.vue'),
      meta: {
        title: '生产管理',
        requireAuth: true
      }
    },
    {
      path: '/productmanage', // 生产管理
      name: 'productmanage',
      component: () => import('../views/layout/ProductManage.vue'),
      meta: {
        title: '生产管理',
        requireAuth: true
      }
    },
    {
      path: '/salesmanage', // 销售管理
      name: 'salesmanage',
      component: () => import('../views/layout/SalesManage.vue')
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next();
  } else {
    let token = localStorage.getItem('Authorization');
 
    if (token === null || token === '') {
      next('/login');
    } else {
      next();
    }
  }
})

export default router;
