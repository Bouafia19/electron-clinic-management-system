import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Drivers from '../views/Drivers.vue'
import Patients from '../views/Patients.vue'
import Vehicles from '../views/Vehicles.vue'
import auth from '../middleware/auth.js';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      middleware: [auth]
    }
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/drivers',
    name: 'Drivers',
    component: Drivers,
  },
  {
    path: '/patients',
    name: 'Patients',
    component: Patients,
  },
  {
    path: '/vehicles',
    name: 'Vehicles',
    component: Vehicles,
  },
  {
    path: '/missions',
    component: () => import('../views/Mission/index.vue')
  },
  {
    path: '/mission/:id/edit',
    component: () => import('../views/Mission/edit.vue')
  },
  {
    path: '/mission/new',
    component: () => import('../views/Mission/new.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
