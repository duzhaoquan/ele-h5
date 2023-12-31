import { createRouter, createWebHistory } from 'vue-router'
import TabsViews from '../views/tabs/TabsViews.vue'
import HomeView from '../views/tabs/home/HomeView.vue'
import OrderView from '../views/tabs/order//OrderView.vue'
import MeView from '../views/tabs/me/MeView.vue'
import ShopView from '@/views/shop/ShopView.vue'
import GoodDetail from '@/views/shop/components/GoodDetail.vue'
import LoginView from '@/views/login/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: 'home',
    },
    {
      path: '/tabs',
      name: 'tabs',
      component: TabsViews,
      children: [
        { name: 'home', path: '/home', component: HomeView },
        { name: 'order', path: '/order', component: OrderView },
        { name: 'me', path: '/me', component: MeView },
      ],
    },
    { name: 'shop', path: '/shop', component: ShopView },
    { name: 'login', path: '/login', component: LoginView },
    { name: 'goods', path: '/goods', component: GoodDetail },
  ],
})

export default router
