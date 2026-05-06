import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../pages/index.vue'
import DashboardLayout from '../layouts/dashboard.vue'
import DashboardHome from '../pages/dashboard.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/app',
    component: DashboardLayout,
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: DashboardHome
      },
      {
        path: 'grado:id',
        name: 'grado-root',
        component: () => import('../pages/grado[id]/index.vue')
      },
      {
        path: 'grado:id/actividades',
        name: 'grado-actividades',
        component: () => import('../pages/grado[id]/actividades.vue')
      },
      {
        path: 'grado:id/evaluacion',
        name: 'grado-evaluacion',
        component: () => import('../pages/grado[id]/evaluacion.vue')
      },
      {
        path: 'grado:id/retroalimentacion',
        name: 'grado-retroalimentacion',
        component: () => import('../pages/grado[id]/retroalimentacion.vue')
      }
    ]
  },
  // Redirección por si acaso
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
