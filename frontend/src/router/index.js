import { createRouter, createWebHashHistory } from 'vue-router'
// Solo la página de inicio se importa estáticamente (es la primera en mostrarse)
import Home from '../pages/index.vue'

// Las rutas internas se cargan de forma diferida (lazy loading)
// → Solo se descargan cuando el usuario navega a ellas, acelerando el inicio
const MasterLayout = () => import('../layouts/MasterLayout.vue')
const GradoIndex = () => import('../pages/grado[id]/index.vue')
const GradoActividades = () => import('../pages/grado[id]/actividades.vue')
const GradoEvaluacion = () => import('../pages/grado[id]/evaluacion.vue')
const GradoRetroalimentacion = () => import('../pages/grado[id]/retroalimentacion.vue')

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/app',
    component: MasterLayout,
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
