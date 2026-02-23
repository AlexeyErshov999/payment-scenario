import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { useOrderStore } from '../stores/orderStore'
import { useValidationErrorsStore } from '../stores/validationErrorsStore'

declare module 'vue-router' {
  interface RouteMeta {
    title?: string
    requiresOrderData?: boolean
    requiresPayment?: boolean
    requiresStep?: 'order' | 'payment' | 'success'
  }
}

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/order',
  },
  {
    path: '/order',
    name: 'order',
    component: () => import('@/views/OrderForm.vue'),
    meta: {
      title: 'Создание заказа',
      requiresOrderData: false,
    },
  },
  {
    path: '/payment',
    name: 'payment',
    component: () => import('@/views/OrderPayment.vue'),
    meta: {
      title: 'Оплата заказа',
      requiresOrderData: true,
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
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    redirect: '/order',
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }

  const orderStore = useOrderStore()
  const validationStore = useValidationErrorsStore()

  validationStore.clearAllErrors()

  if (to.meta.requiresOrderData && !orderStore.hasOrderData) {
    console.log('No order data, redirecting to /order')
    next('/order')
    return
  }

  if (to.meta.requiresPayment) {
    // Этап оплаты всегда считается пройденным после сабмита формы оплаты
    if (!orderStore.getPaymentPassed()) {
      console.log('Payment required, redirecting to /payment')
      next('/payment')
      return
    }
  }

  next()
})

export default router
