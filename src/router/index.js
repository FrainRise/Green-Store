import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Products from '@/views/Products.vue'
import Cart from '@/views/Cart.vue'
import Order from '@/views/Order.vue'

Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/products',
    name: 'Products',
    component: Products
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart
  },
  {
    path: '/cart/order',
    name: 'Order',
    component: Order
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
