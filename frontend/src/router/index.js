import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../pages/index.vue'
import DashboardLayout from '../layouts/dashboard.vue'

// Importar estáticamente las páginas principales para evitar errores de carga en el ejecutable
import GradoIndex from '../pages/grado[id]/index.vue'
import GradoActividades from '../pages/grado[id]/actividades.vue'
import GradoEvaluacion from '../pages/grado[id]/evaluacion.vue'
import GradoRetroalimentacion from '../pages/grado[id]/retroalimentacion.vue'

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
        path: 'grado/:id',
        name: 'grado-root',
        component: GradoIndex
      },
      {
        path: 'grado/:id/actividades',
        name: 'grado-actividades',
        component: GradoActividades
      },
      {
        path: 'grado/:id/evaluacion',
        name: 'grado-evaluacion',
        component: GradoEvaluacion
      },
      {
        path: 'grado/:id/retroalimentacion',
        name: 'grado-retroalimentacion',
        component: GradoRetroalimentacion
      }
    ]
  },
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
