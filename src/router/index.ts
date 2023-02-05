import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    redirect: '/home',
    component: Layout,
    children: [
      {
        path: '/home',
        name: 'Home',
        meta: { title: '首页', icon: 'home' },
        component: () => import(/* webpackChunkName: "home" */ '@/views/home/index.vue')
      },
      {
        path: '/todo-sets',
        name: 'TodoSet',
        meta: { title: 'ToDo集', icon: 'widgets' },
        component: () => import(/* webpackChunkName: "todo-sets" */ '@/views/todo-sets/index.vue')
      },
      {
        path: '/data-statistics',
        name: 'DataStatistics',
        meta: { title: '数据统计', hidden: true },
        component: () => import(/* webpackChunkName: "data-statistics" */ '@/views/data-statistics/index.vue')
      },
      {
        path: '/user',
        name: 'User',
        meta: { title: '个人信息', icon: 'account_circle' },
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/index.vue')
      },
      {
        path: '/folder/:id',
        name: 'Folder',
        meta: { hidden: true },
        component: () => import(/* webpackChunkName: "folder" */ '@/views/todo-list/folder.vue')
      },
      {
        path: '/list/:id',
        name: 'ToDoList',
        meta: { hidden: true },
        component: () => import(/* webpackChunkName: "to-do-lis" */ '@/views/todo-list/index.vue')
      },
      {
        path: '/about',
        name: 'About',
        meta: { title: '关于', icon: 'info' },
        component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/login/index.vue')
  },
  {
    path: '/wechat-login',
    name: 'WechatLogin',
    component: () => import(/* webpackChunkName: "wechat-login" */ '@/views/login/wechatLogin.vue')
  },
  {
    path: '/bind-wechat',
    name: 'BindWechat',
    component: () => import(/* webpackChunkName: "bind-wechat" */ '@/views/bind-wechat/index.vue')
  },
  {
    path: '/forget',
    name: 'Forget',
    component: () => import(/* webpackChunkName: "forget" */ '@/views/login/forget.vue')
  },
  {
    path: '/s/:id',
    name: 'S',
    component: () => import(/* webpackChunkName: "s" */ '@/views/s/index.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "register" */ '@/views/login/register.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
