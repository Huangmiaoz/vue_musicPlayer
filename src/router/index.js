import store from '@/store/index.js'
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/ItemMusic',
    name: 'ItemMusic',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "ItemMusic" */ '../views/ItemMusic.vue')
  },
  {
    path: '/SearchView',
    name: 'SearchView',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "SearchView" */ '../views/SearchView.vue')
  },
  {
    path: '/UserInfoView',
    name: 'UserInfoView',
    beforeEnter:(to,from,next) => {
      // 路由守卫
      // if(store.state.isLogin || store.state.token || localStorage.getItem('token')) {
      if(store.state.isLogin || store.state.token) {
        next();
      } else {
        next('/LoginView');
      }
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "UserInfoView" */ '../views/UserInfoView.vue')
  },
  {
    path: '/LoginView',
    name: 'LoginView',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "LoginView" */ '../views/LoginView.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
// 判断全局组件footer需不需要展示出来
router.beforeEach((to,from)=>{
  console.log(to.path);
  if(to.path === '/LoginView') {
    store.state.isFooterMusic = false;
  } else {
    store.state.isFooterMusic = true;
  }
})
export default router
