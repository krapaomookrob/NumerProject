import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Root from '../views/Root.vue'
import Matrix from '../views/Matrix.vue'
import Derv from '../views/Derivative.vue'
import Ing from '../views/Integration.vue'
import Reg from '../views/Regression.vue'
import Interpolation from '../views/Interpolation.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path:'/rootofequation',
    name:'roe',
    component:Root
  },
  {
    path:'/matrix',
    name:'matrix',
    component:Matrix
  },
  {
    path:'/derivative',
    name:'derv',
    component:Derv
  },
  {
    path:'/integration',
    name:'ing',
    component:Ing
  },
  {
    path:'/regression',
    name:'reg',
    component:Reg
  },{
    path:'/interpolation',
    name:'inter',
    component:Interpolation
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
