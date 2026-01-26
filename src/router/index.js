import { createRouter, createWebHistory } from 'vue-router'

import LoginView from '../views/LoginView.vue'
import AuthLayout from '../layouts/AuthLayout.vue'

const routes = [
  { path: '/', redirect: { name: 'login' } },

  // ✅ логин БЕЗ лейаута
  { path: '/login', name: 'login', component: LoginView },

  // ✅ восстановление С лейаутом
  { path: '/forgot', name: 'forgot', component: AuthLayout },
  { path: '/check-email', name: 'checkEmail', component: AuthLayout },
  { path: '/new-password', name: 'newPassword', component: AuthLayout },
  { path: '/success', name: 'success', component: AuthLayout },

  { path: '/:pathMatch(.*)*', redirect: { name: 'login' } },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
