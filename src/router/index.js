import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '@/views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/information-cards/:categorie?',
    name: 'home2',
    component: HomeView
  },
]

const router = new VueRouter({
  routes, 
  mode: 'hash' 
})

export default router
