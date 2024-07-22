import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'
import MainLayout from './layouts/app-layout/HomeLayout.vue'
import AdminLayout from './layouts/app-layout/AdminLayout.vue'
import LoginLayout from './layouts/app-layout/LoginLayout.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/:pathMatch(.*)*',
    redirect: { path: '/home/' }
  },
  {
    name: 'home',
    path: '/:pathmatch(home|home/.*)*',
    component: MainLayout
  },
  {
    name: 'admin',
    path: '/:pathmatch(admin|admin/.*)*',
    component: AdminLayout
  },
  {
    name: 'login',
    path: '/admin/login',
    component: LoginLayout
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
