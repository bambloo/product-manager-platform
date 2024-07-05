import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'
import MainLayout from './layouts/MainLayout.vue'
const routes: RouteRecordRaw[] = [
  {
    path: '/:pathMatch(.*)*',
    redirect: { name: 'home' }
  },
  {
    name: 'main',
    path: '/',
    component: MainLayout,
    redirect: { name: 'home' },
    children: [
      {
        name: 'home',
        path: 'home',
        component: () => import('./views/HomeView.vue')
      }
    ]
  }
]
export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    // For some reason using documentation example doesn't scroll on page navigation.
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    } else {
      window.scrollTo(0, 0)
    }
  },
  routes
})
