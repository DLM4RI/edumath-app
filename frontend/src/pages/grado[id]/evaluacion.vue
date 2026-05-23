<template>
  <div class="evaluacion-page">
    <v-row v-if="!showExam">
      <v-col cols="12">
        <header class="mb-10 text-center">
          <v-avatar color="secondary" size="80" class="mb-4 elevation-8">
            <v-icon size="40" color="white">mdi-file-document-check</v-icon>
          </v-avatar>
          <h1 class="text-h2 font-weight-black tracking-tight mb-2">Evaluación de Grado {{ selectedGrade }}°</h1>
          <p class="text-h6 text-medium-emphasis">Pon a prueba tus conocimientos y obtén tu retroalimentación.</p>
        </header>

        <v-row justify="center">
          <v-col cols="12" md="8">
            <v-card class="rounded-3xl pa-10 text-center glass-card" border="1">
              <h2 class="text-h4 font-weight-black mb-4">¿Estás listo, {{ firstName }}?</h2>
              <p class="text-body-1 mb-8">
                Esta evaluación cubrirá de manera exclusiva los temas de pensamiento numérico alineados a los Derechos Básicos de Aprendizaje (DBA).
              </p>
              <div class="d-flex justify-center gap-4">
                <v-btn 
                  color="secondary" 
                  size="x-large" 
                  rounded="xl" 
                  class="px-12 font-weight-bold"
                  elevation="8"
                  @click="showExam = true"
                >
                  ¡Comenzar Evaluación!
                </v-btn>
              </div>
              
              <v-alert
                type="info"
                variant="tonal"
                class="mt-10 rounded-xl text-left"
                border="start"
              >
                Al finalizar, podrás ver tu retroalimentación personalizada.
              </v-alert>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <!-- Dynamic Exam Component Loader -->
    <v-fade-transition mode="out-in" v-else>
      <div class="active-exam-view">
        <v-btn 
          variant="text" 
          prepend-icon="mdi-arrow-left" 
          class="mb-6 font-weight-bold"
          @click="showExam = false"
        >
          Volver atrás
        </v-btn>

        <component 
          :is="currentExamComponent" 
          :grado="selectedGrade"
          @finalizado="onExamFinished"
        />
      </div>
    </v-fade-transition>
  </div>
</template>

<script setup>
import { ref, computed, defineAsyncComponent } from 'vue'
import { useRouter } from 'vue-router'
import { useDashboard } from '../../composables/useDashboard'

const router = useRouter()
const { selectedGrade, userName } = useDashboard()

const showExam = ref(false)
const firstName = computed(() => userName.value.split(' ')[0])

const onExamFinished = () => {
  router.push(`/app/grado/${selectedGrade.value}/retroalimentacion`)
}

// Mapeo explícito de exámenes para asegurar compatibilidad con el build de producción
const examComponents = {
  '1': defineAsyncComponent(() => import('../../components/evaluaciones/grados/Grado1/Examen.vue')),
  '2': defineAsyncComponent(() => import('../../components/evaluaciones/grados/Grado2/Examen.vue')),
  '3': defineAsyncComponent(() => import('../../components/evaluaciones/grados/Grado3/Examen.vue')),
  '4': defineAsyncComponent(() => import('../../components/evaluaciones/grados/Grado4/Examen.vue')),
  '5': defineAsyncComponent(() => import('../../components/evaluaciones/grados/Grado5/Examen.vue')),
}

const currentExamComponent = computed(() => {
  return examComponents[selectedGrade.value.toString()] || null
})
</script>

<style scoped>
.evaluacion-page {
  animation: fadeIn 0.8s ease-out;
}

.glass-card {
  background: rgba(255, 255, 255, 0.8) !important;
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
