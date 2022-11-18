import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '@/views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/:categorie?',
    name: 'home',
    component: HomeView
  },
]

const router = new VueRouter({
  routes, 
  mode: 'history' 
})

export default router
