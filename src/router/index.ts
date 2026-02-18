import { createRouter, createWebHistory } from 'vue-router'
import Order from '../views/Order.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Order,
    },
  ],
})

export default router
