<template>
  <div class="retroalimentacion-page">
    <div v-if="!hasData" class="locked-state text-center py-16 animate__animated animate__fadeIn">
      <v-avatar color="grey-lighten-4" size="120" class="mb-6">
        <v-icon size="60" color="grey-lighten-1">mdi-lock-open-variant-outline</v-icon>
      </v-avatar>
      <h2 class="text-h4 font-weight-black text-grey-darken-1 mb-4">¡Aún no hay datos!</h2>
      <p class="text-h6 text-medium-emphasis mb-8 px-4">
        Completa tu primer **Desafío Final** (Evaluación) para desbloquear tu mapa de aprendizaje.
      </p>
      <v-btn 
        :to="`/app/grado/${id}/evaluacion`" 
        color="primary" 
        size="x-large" 
        rounded="xl"
        class="px-8 font-weight-bold elevation-4"
        prepend-icon="mdi-trophy"
      >
        Ir a Evaluación
      </v-btn>
    </div>

    <div v-else class="unlocked-state">
      <header class="mb-10 text-center text-md-left animate__animated animate__fadeInDown">
        <h1 class="text-h3 font-weight-black mb-2 gradient-text">Tu Mapa de Aprendizaje</h1>
        <p class="text-h6 text-medium-emphasis">Analicemos tu desempeño en el Grado {{ id }}°</p>
      </header>

      <v-row class="animate__animated animate__fadeInUp">
        <!-- Performance Summary Card -->
        <v-col cols="12" md="4">
          <v-card class="rounded-3xl pa-8 text-center glass-card h-100 border-primary" elevation="4">
            <h3 class="text-h5 font-weight-bold mb-6">Desempeño General</h3>
            <v-progress-circular
              :rotate="360"
              :size="180"
              :width="18"
              :model-value="overallPercentage"
              :color="getScoreColor(overallPercentage)"
            >
              <template v-slot:default>
                <div class="text-center">
                  <div class="text-h3 font-weight-black">{{ Math.round(overallPercentage) }}%</div>
                  <div class="text-caption font-weight-bold">PRECISIÓN</div>
                </div>
              </template>
            </v-progress-circular>
            <div class="mt-8">
              <v-chip :color="getScoreColor(overallPercentage)" variant="flat" class="font-weight-black mb-4 px-6">
                {{ getScoreLabel(overallPercentage) }}
              </v-chip>
              <p class="text-body-1 text-medium-emphasis">
                Has respondido correctamente <strong>{{ totalCorrect }}</strong> de <strong>{{ totalQuestions }}</strong> preguntas.
              </p>
            </div>
          </v-card>
        </v-col>

        <!-- Insights Section -->
        <v-col cols="12" md="8">
          <v-row>
            <!-- STRENGTHS -->
            <v-col cols="12">
              <v-card class="rounded-3xl pa-6 glass-card border-success mb-6" elevation="2">
                <h3 class="text-h5 font-weight-bold mb-4 d-flex align-center text-success">
                  <v-icon class="mr-2">mdi-shield-check</v-icon>
                  Tus Fortalezas
                </h3>
                <div v-if="strengths.length" class="d-flex flex-wrap gap-2">
                  <v-chip
                    v-for="s in strengths"
                    :key="s.name"
                    color="success"
                    variant="tonal"
                    class="ma-1 font-weight-bold"
                    size="large"
                    prepend-icon="mdi-star"
                  >
                    {{ s.name }} ({{ Math.round((s.correct/s.total)*100) }}%)
                  </v-chip>
                </div>
                <p v-else class="text-body-1 text-medium-emphasis italic">Aún no hemos detectado temas dominados al 100%. ¡Sigue practicando!</p>
              </v-card>
            </v-col>

            <!-- DIFFICULTIES & IMPROVEMENTS -->
            <v-col cols="12">
              <v-card class="rounded-3xl pa-6 glass-card border-warning" elevation="2">
                <h3 class="text-h5 font-weight-bold mb-6 d-flex align-center text-warning-darken-3">
                  <v-icon class="mr-2">mdi-compass-outline</v-icon>
                  Áreas a Mejorar y Dificultades
                </h3>
                
                <v-list class="bg-transparent pa-0">
                  <v-list-item 
                    v-for="item in areasToImprove" 
                    :key="item.name"
                    class="mb-4 rounded-xl border-dashed pa-4 bg-white"
                    border="1"
                  >
                    <template v-slot:prepend>
                      <v-progress-circular
                        :model-value="(item.correct/item.total)*100"
                        :color="getScoreColor((item.correct/item.total)*100)"
                        size="50"
                        width="5"
                        class="mr-4"
                      >
                        <span class="text-caption font-weight-black">{{ Math.round((item.correct/item.total)*100) }}%</span>
                      </v-progress-circular>
                    </template>

                    <v-list-item-title class="font-weight-black text-h6 mb-1">
                      {{ item.name }}
                    </v-list-item-title>
                    <v-list-item-subtitle class="text-body-2 mb-2">
                      {{ getTopicAdvice(item) }}
                    </v-list-item-subtitle>

                    <template v-slot:append>
                      <v-btn 
                        color="primary" 
                        variant="flat" 
                        rounded="pill" 
                        size="small"
                        class="font-weight-black"
                        :to="`/app/grado/${id}`"
                      >
                        REFORZAR TEMA
                      </v-btn>
                    </template>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <!-- Action Footer -->
      <div class="mt-12 text-center pb-12">
        <v-btn 
          :to="`/app/grado/${id}/actividades`" 
          variant="tonal" 
          color="primary" 
          size="large" 
          rounded="xl" 
          class="px-8 font-weight-bold mr-4"
        >
          <v-icon start>mdi-controller-classic</v-icon>
          Ir a Juegos
        </v-btn>
        <v-btn 
          color="error" 
          variant="text" 
          size="small" 
          @click="resetStats"
        >
          Reiniciar Progreso
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useDashboard } from '../../composables/useDashboard'
import { useStats } from '../../composables/useStats'

const route = useRoute()
const id = computed(() => route.params.id || '1')
const { userName } = useDashboard()
const { getGradeStats, clearStats } = useStats()

const stats = ref(null)

onMounted(() => {
  stats.value = getGradeStats(id.value)
})

const hasData = computed(() => !!stats.value && stats.value.topics && Object.keys(stats.value.topics).length > 0)

const totalCorrect = computed(() => {
  if (!hasData.value) return 0
  return Object.values(stats.value.topics).reduce((acc, t) => acc + t.correct, 0)
})

const totalQuestions = computed(() => {
  if (!hasData.value) return 0
  return Object.values(stats.value.topics).reduce((acc, t) => acc + t.total, 0)
})

const overallPercentage = computed(() => {
  if (totalQuestions.value === 0) return 0
  return (totalCorrect.value / totalQuestions.value) * 100
})

const sortedTopics = computed(() => {
  if (!hasData.value) return []
  return Object.entries(stats.value.topics).map(([name, data]) => ({
    name,
    ...data,
    percentage: (data.correct / data.total) * 100
  })).sort((a, b) => b.percentage - a.percentage)
})

const strengths = computed(() => sortedTopics.value.filter(t => t.percentage >= 80))
const areasToImprove = computed(() => sortedTopics.value.filter(t => t.percentage < 80))

const getScoreColor = (p) => {
  if (p >= 80) return 'success'
  if (p >= 60) return 'warning'
  return 'error'
}

const getScoreLabel = (p) => {
  if (p >= 90) return '¡Eres un Genio!'
  if (p >= 80) return 'Excelente Trabajo'
  if (p >= 60) return 'Buen Esfuerzo'
  return '¡Sigue Intentándolo!'
}

const getTopicAdvice = (topic) => {
  const p = topic.percentage
  if (p < 50) return `Este tema te está costando un poco. Revisa los videos en la sección de contenido.`
  if (p < 80) return `¡Vas bien! Practica unos minutos más para dominarlo completamente.`
  return `¡Casi lo tienes! Un último repaso y serás un experto.`
}

const resetStats = () => {
  if (confirm('¿Estás seguro de que quieres borrar tu progreso?')) {
    clearStats()
    stats.value = null
  }
}
</script>

<style scoped>
.retroalimentacion-page {
  animation: fadeIn 0.8s ease-out;
  min-height: 80vh;
}

.glass-card {
  background: rgba(255, 255, 255, 0.85) !important;
  backdrop-filter: blur(12px);
  border: 1px solid rgba(var(--v-theme-primary), 0.1);
}

.border-primary { border: 2px solid rgba(var(--v-theme-primary), 0.3) !important; }
.border-success { border: 1px solid rgba(var(--v-theme-success), 0.3) !important; }
.border-warning { border: 1px solid rgba(var(--v-theme-warning), 0.3) !important; }

.gradient-text {
  background: linear-gradient(135deg, #1565C0, #0D47A1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.locked-state {
  background: white;
  border-radius: 40px;
  border: 3px dashed #E0E0E0;
  box-shadow: 0 10px 30px rgba(0,0,0,0.05);
}

.border-dashed {
  border-style: dashed !important;
}

.gap-2 { gap: 8px; }

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(15px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
