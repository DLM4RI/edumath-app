<template>
  <div class="actividades-page">
    <v-row v-if="!showActivity">
      <v-col cols="12">
        <header class="mb-10 text-center">
          <v-avatar color="primary" size="80" class="mb-4 elevation-8">
            <v-icon size="40" color="white">mdi-controller-classic</v-icon>
          </v-avatar>
          <h1 class="text-h2 font-weight-black tracking-tight mb-2">Desafíos del Grado {{ selectedGrade }}°</h1>
          <p class="text-h6 text-medium-emphasis">Selecciona un pensamiento para comenzar a jugar y aprender.</p>
        </header>

        <v-row justify="center">
          <v-col v-for="act in activityTypes" :key="act.type" cols="12" sm="6" md="4">
            <v-card 
              class="rounded-3xl pa-6 text-center h-100 d-flex flex-column transition-all hover-card border-card"
              elevation="0"
              @click="startActivity(act.type)"
            >
              <v-avatar :color="act.color + '-lighten-4'" size="80" class="mx-auto mb-6">
                <v-icon :color="act.color" size="40">{{ act.icon }}</v-icon>
              </v-avatar>
              <h3 class="text-h5 font-weight-black mb-2">{{ act.title }}</h3>
              <p class="text-body-2 text-medium-emphasis flex-grow-1">{{ act.desc }}</p>
              <v-btn 
                block 
                :color="act.color" 
                variant="tonal" 
                class="mt-6 rounded-xl font-weight-bold"
              >
                Comenzar Reto
              </v-btn>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <!-- Dynamic Activity Component Loader -->
    <v-fade-transition mode="out-in" v-else>
      <div class="active-activity-view">
        <v-btn 
          variant="text" 
          prepend-icon="mdi-arrow-left" 
          class="mb-6 font-weight-bold"
          @click="showActivity = false"
        >
          Volver a la lista
        </v-btn>

        <component 
          :is="currentActivityComponent" 
          :grado="selectedGrade"
          @completada="onActivityCompleted"
        />
      </div>
    </v-fade-transition>
  </div>
</template>

<script setup>
import { ref, computed, defineAsyncComponent } from 'vue'
import { useDashboard } from '../../composables/useDashboard'

const { selectedGrade } = useDashboard()
const showActivity = ref(false)
const selectedType = ref('')

const activityTypes = [
  { type: 'Numerico', title: 'P. Numérico', icon: 'mdi-numeric', color: 'blue', desc: 'Contar, sumar y jugar con los números del campo.' },
  { type: 'Geometrico', title: 'P. Geométrico', icon: 'mdi-shape', color: 'green', desc: 'Descubre las formas en la naturaleza cordobesa.' },
  { type: 'Metrico', title: 'P. Métrico', icon: 'mdi-ruler', color: 'orange', desc: 'Mide distancias y tamaños en nuestra granja.' }
]

// Mapeo explícito de componentes para asegurar que Vite los incluya correctamente en el build
const componentsMap = {
  '1-Numerico': defineAsyncComponent(() => import('../../components/actividades/grados/Grado1/Numerico.vue')),
  '1-Geometrico': defineAsyncComponent(() => import('../../components/actividades/grados/Grado1/Geometrico.vue')),
  '1-Metrico': defineAsyncComponent(() => import('../../components/actividades/grados/Grado1/Metrico.vue')),
  
  '2-Numerico': defineAsyncComponent(() => import('../../components/actividades/grados/Grado2/Numerico.vue')),
  '2-Geometrico': defineAsyncComponent(() => import('../../components/actividades/grados/Grado2/Geometrico.vue')),
  '2-Metrico': defineAsyncComponent(() => import('../../components/actividades/grados/Grado2/Metrico.vue')),
  
  '3-Numerico': defineAsyncComponent(() => import('../../components/actividades/grados/Grado3/Numerico.vue')),
  '3-Geometrico': defineAsyncComponent(() => import('../../components/actividades/grados/Grado3/Geometrico.vue')),
  '3-Metrico': defineAsyncComponent(() => import('../../components/actividades/grados/Grado3/Metrico.vue')),
  
  '4-Numerico': defineAsyncComponent(() => import('../../components/actividades/grados/Grado4/Numerico.vue')),
  '4-Geometrico': defineAsyncComponent(() => import('../../components/actividades/grados/Grado4/Geometrico.vue')),
  '4-Metrico': defineAsyncComponent(() => import('../../components/actividades/grados/Grado4/Metrico.vue')),
  
  '5-Numerico': defineAsyncComponent(() => import('../../components/actividades/grados/Grado5/Numerico.vue')),
  '5-Geometrico': defineAsyncComponent(() => import('../../components/actividades/grados/Grado5/Geometrico.vue')),
  '5-Metrico': defineAsyncComponent(() => import('../../components/actividades/grados/Grado5/Metrico.vue')),
}

const currentActivityComponent = computed(() => {
  const key = `${selectedGrade.value}-${selectedType.value}`
  return componentsMap[key] || null
})

const startActivity = (type) => {
  selectedType.value = type
  showActivity.value = true
}

const onActivityCompleted = () => {
  // Guardar progreso o mostrar trofeo
  showActivity.value = false
}
</script>

<style scoped>
.actividades-page {
  animation: fadeIn 0.8s ease-out;
}

.hover-card {
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.hover-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px -10px rgba(0,0,0,0.1) !important;
}

.border-card {
  border: 1px solid rgba(0,0,0,0.05);
  background: rgba(255, 255, 255, 0.7) !important;
  backdrop-filter: blur(10px);
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.tracking-tight {
  letter-spacing: -0.05em !important;
}

.rounded-3xl {
  border-radius: 32px !important;
}
</style>
