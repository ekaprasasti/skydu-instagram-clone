import Vue from 'vue'
import VueRouter from 'vue-router'
import AppDashboard from '../AppDashboard.vue'
import AppAuthentication from '../AppAuthentication.vue'

import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Setting from '../views/Setting.vue'
import Register from '../views/Register'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: AppDashboard,
    children: [
      {
        path: '',
        name: 'Home',
        component: Home
      },
      {
        path: '/setting',
        name: 'Setting',
        component: Setting
      }
    ]
  },
  {
    path: '/auth',
    component: AppAuthentication,
    children: [
      {
        path: '/login',
        name: 'Login',
        component: Login
      },
      {
        path: '/register',
        name: 'Register',
        component: Register
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
