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
        path: 'home',
        component: () => import(/* webpackChunkName: "home" */ '@/views/home/index.vue'),
        name: 'Home',
        meta: { title: 'To Do List' }
      },
      {
        path: '/data-statistics',
        name: 'DataStatistics',
        meta: { title: '数据统计' },
        component: () => import(/* webpackChunkName: "data-statistics" */ '@/views/data-statistics/index.vue')
      },
      {
        path: '/user',
        name: 'User',
        meta: { title: '用户中心' },
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/index.vue')
      },
      {
        path: '/folder/:id',
        name: 'Folder',
        component: () => import(/* webpackChunkName: "user" */ '@/views/todo-list/folder.vue')
      },
      {
        path: '/list/:id',
        name: 'ToDoList',
        component: () => import(/* webpackChunkName: "user" */ '@/views/todo-list/index.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/login/index.vue')
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
