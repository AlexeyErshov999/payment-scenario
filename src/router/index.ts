import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/order',
  },
  {
    path: '/order',
    name: 'order',
    component: () => import('@/views/Order.vue'),
    meta: {
      title: 'Создание заказа',
      requiresOrderData: false,
    },
  },
  {
    path: '/payment',
    name: 'payment',
    component: () => import('@/views/Payment.vue'),
    meta: {
      title: 'Оплата заказа',
      requiresOrderData: true,
      requiresStep: 'order',
    },
  },
  {
    path: '/payment-result',
    name: 'success',
    component: () => import('@/views/PaymentResult.vue'),
    meta: {
      title: 'Заказ оформлен',
      requiresOrderData: true,
      requiresPayment: true,
      requiresStep: 'payment',
    },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/order',
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
