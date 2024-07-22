import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'
import MainLayout from './layouts/app-layout/HomeLayout.vue'
import AdminLayout from './layouts/app-layout/AdminLayout.vue'
import LoginLayout from './layouts/app-layout/LoginLayout.vue'
import ColumnsView from './views/columns/ColumnsView.vue'

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
    path: '/admin',
    component: AdminLayout,
    redirect: { path: '/admin/columns' },
    children: [
      {
        name: 'columns',
        path: 'columns',
        component: ColumnsView
      }
    ]
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
