<template>
  <v-container class="py-8" maxWidth="1200">
    <v-fade-transition mode="out-in">
      
      <!-- VISTA 1: CUADRÍCULA DE MISIONES -->
      <div v-if="!selectedMissionId" key="grid" class="animate__animated animate__fadeIn">
        
        <!-- Header Gamificado -->
        <div class="text-center mb-10">
          <v-icon size="80" color="warning" class="mb-4 animate__animated animate__pulse animate__infinite">mdi-star-shooting</v-icon>
          <h1 class="text-h3 md-text-h2 font-weight-black tracking-tight mb-4 text-gradient">Misiones Espaciales</h1>
          <p class="text-h6 text-medium-emphasis">Elige tu próxima aventura matemática para el grado {{ selectedGrade }}°</p>
        </div>

        <!-- Pestañas de Exploración -->
        <v-card flat class="rounded-xl mb-8 glass-tabs border" elevation="0">
          <v-tabs
            v-model="activeTab"
            bg-color="transparent"
            :color="currentTheme.primary"
            grow
            height="80"
            class="custom-tabs"
            show-arrows
          >
            <v-tab v-for="tab in thinkingTypes" :key="tab.value" :value="tab.value" class="text-none">
              <v-icon size="28" class="mr-3">{{ tab.icon }}</v-icon>
              <div class="d-flex flex-column align-start">
                <span class="text-caption text-uppercase font-weight-bold opacity-60">Exploración</span>
                <span class="text-subtitle-1 font-weight-black">{{ tab.label }}</span>
              </div>
            </v-tab>
          </v-tabs>
        </v-card>

        <!-- Cuadrícula de Tarjetas -->
        <v-window v-model="activeTab" class="bg-transparent">
          <v-window-item v-for="tab in thinkingTypes" :key="tab.value" :value="tab.value">
            <v-row v-if="filteredMissions.length > 0">
              <v-col
                v-for="mission in filteredMissions"
                :key="mission.id"
                cols="12"
                md="6"
                lg="4"
                class="d-flex"
              >
                <v-card
                  class="mission-card rounded-xl overflow-hidden"
                  elevation="4"
                  hover
                  @click="startMission(mission)"
                >
                  <div class="card-gradient" :style="{ background: `linear-gradient(135deg, ${mission.color}11 0%, ${mission.color}33 100%)` }"></div>
                  
                  <v-card-item class="pt-6">
                    <div class="d-flex justify-space-between align-center mb-4">
                      <v-avatar :color="mission.color" size="48" class="elevation-4 avatar-bounce">
                        <span class="text-h6 font-weight-black text-white">{{ mission.dbaNumber }}</span>
                      </v-avatar>
                      <v-chip size="x-small" :color="mission.color" variant="elevated" class="font-weight-bold text-white shadow-sm">
                        MISIÓN ESTELAR
                      </v-chip>
                    </div>
                    
                    <v-card-title class="text-h6 font-weight-black text-wrap mb-2" style="line-height: 1.3;">
                      {{ mission.statement }}
                    </v-card-title>
                  </v-card-item>

                  <v-card-text class="flex-grow-1">
                    <div class="text-caption text-uppercase font-weight-bold text-medium-emphasis mb-2">Objetivos</div>
                    <div class="evidences-list">
                      <div v-for="(ev, i) in mission.evidences.slice(0, 2)" :key="i" class="evidence-item mb-2 d-flex">
                        <v-icon size="14" :color="mission.color" class="mr-2 mt-1">mdi-star-circle</v-icon>
                        <span class="text-body-2 text-medium-emphasis">{{ ev }}</span>
                      </div>
                    </div>
                  </v-card-text>

                  <v-divider class="opacity-10"></v-divider>

                  <v-card-actions class="pa-4">
                    <v-btn
                      block
                      variant="flat"
                      :color="mission.color"
                      class="text-white font-weight-bold py-6 rounded-lg text-none btn-hover"
                      prepend-icon="mdi-rocket-launch"
                    >
                      ¡Despegar!
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
            
            <v-row v-else class="justify-center py-12">
              <v-col cols="12" md="6" class="text-center">
                <div class="empty-state-container">
                  <v-icon size="100" color="grey-lighten-2" class="mb-4 animate__animated animate__float">mdi-ufo-outline</v-icon>
                  <h3 class="text-h4 font-weight-black text-medium-emphasis mt-4">Sector inexplorado</h3>
                  <p class="text-body-1 text-grey">Pronto descubriremos nuevas misiones en esta área.</p>
                </div>
              </v-col>
            </v-row>
          </v-window-item>
        </v-window>
      </div>

      <!-- VISTA 2: MISIÓN ACTIVA (CUESTIONARIO GAMIFICADO) -->
      <div v-else key="mission" class="animate__animated animate__fadeInUp">
        
        <div class="d-flex align-center mb-6">
          <v-btn variant="text" prepend-icon="mdi-arrow-left" class="text-none font-weight-bold text-h6" @click="goBackToGrid">
            Volver a la Base
          </v-btn>
        </div>

        <v-row justify="center">
          <v-col cols="12" lg="10">
            <v-card class="rounded-xl pa-2 pa-md-8 text-center glass-card border-t-8" :style="{ borderTopColor: activeMission.color }" elevation="6">
              
              <!-- Pantalla de Inicio de Misión -->
              <div v-if="!practiceStarted">
                <v-icon size="150" :color="activeMission.color" class="mb-6 animate__animated animate__bounceIn">mdi-rocket-launch</v-icon>
                <h3 class="text-h3 font-weight-black mb-4">¡Preparando Nave!</h3>
                <p class="text-h5 text-medium-emphasis mb-12 max-width-600 mx-auto font-weight-regular">
                  Tu misión es: "{{ activeMission.statement }}"
                </p>
                <v-btn
                  size="x-large"
                  :color="activeMission.color"
                  class="text-white font-weight-black px-12 py-8 rounded-pill text-none text-h5 btn-hover"
                  elevation="8"
                  @click="practiceStarted = true"
                >
                  <v-icon start size="32">mdi-play-circle</v-icon>
                  Comenzar Aventura
                </v-btn>
              </div>

              <!-- Pantalla de Pregunta -->
              <div v-else-if="!showResults" class="active-practice animate__animated animate__fadeIn">
                <div class="d-flex justify-space-between align-center mb-8 bg-grey-lighten-4 pa-4 rounded-xl">
                  <div class="d-flex flex-column align-start">
                     <v-chip :color="activeMission.color" variant="flat" class="font-weight-bold text-white mb-2">
                       <v-icon start size="16">mdi-gamepad-variant</v-icon>
                       NIVEL {{ currentQuestionIndex + 1 }}
                     </v-chip>
                     <span class="text-h6 font-weight-black">Desafío Estelar</span>
                  </div>
                  <div class="d-flex flex-column align-end flex-grow-1 ml-4" style="max-width: 300px;">
                    <div class="d-flex justify-space-between w-100 mb-1">
                      <span class="text-caption font-weight-bold">Progreso</span>
                      <span class="text-caption font-weight-bold">{{ currentQuestionIndex + 1 }} / 5</span>
                    </div>
                    <v-progress-linear
                      :color="activeMission.color"
                      :model-value="(currentQuestionIndex + 1) * 20"
                      height="20"
                      rounded="pill"
                      striped
                      class="progress-rocket"
                    ></v-progress-linear>
                  </div>
                </div>

                <div class="exercise-content py-6">
                  <v-card class="mb-8 pa-8 rounded-xl bg-white border" elevation="2">
                    <h4 class="text-h4 font-weight-black text-center" style="line-height: 1.4;">{{ currentQuestion.question }}</h4>
                  </v-card>
                  
                  <v-expand-transition>
                    <div v-if="showHint" class="mb-8 pa-6 rounded-xl bg-amber-lighten-5 border-amber-lighten-3 border-md d-flex align-center text-left shadow-sm">
                      <v-avatar color="amber" size="64" class="mr-6 elevation-2">
                        <v-icon color="white" size="36">mdi-robot-happy</v-icon>
                      </v-avatar>
                      <div>
                        <div class="text-amber-darken-4 font-weight-black text-h6 mb-1">Pista de tu Copiloto</div>
                        <p class="text-body-1 text-amber-darken-3 mb-0 font-weight-medium">{{ currentQuestion.hint }}</p>
                      </div>
                    </div>
                  </v-expand-transition>

                  <v-row justify="center" class="px-md-8">
                    <v-col v-for="(opt, i) in currentQuestion.options" :key="i" cols="12" sm="6">
                      <v-btn
                        block
                        variant="flat"
                        size="x-large"
                        class="text-none py-12 rounded-xl option-btn interactive-option"
                        :color="selectedOption === opt ? activeMission.color : 'white'"
                        :class="selectedOption === opt ? 'text-white elevation-10 active-option' : 'text-grey-darken-3 border-md text-medium-emphasis'"
                        @click="selectedOption = opt"
                      >
                        <span class="text-h5 font-weight-black">{{ opt }}</span>
                      </v-btn>
                    </v-col>
                  </v-row>
                </div>

                <div class="mt-8 mb-4">
                  <v-btn
                    size="x-large"
                    :color="selectedOption ? activeMission.color : 'grey-lighten-2'"
                    class="px-12 py-6 rounded-pill font-weight-black text-none text-h6 transition-swing"
                    :class="{'text-white elevation-8 btn-hover': selectedOption, 'text-grey': !selectedOption}"
                    :disabled="!selectedOption"
                    @click="checkAnswer"
                  >
                    Confirmar Respuesta
                    <v-icon end size="28">mdi-check-decagram</v-icon>
                  </v-btn>
                </div>
              </div>

              <!-- Pantalla de Resultados -->
              <div v-else class="results-summary animate__animated animate__jackInTheBox py-8">
                <v-icon size="150" color="warning" class="mb-6 animate__animated animate__tada animate__infinite">mdi-trophy-award</v-icon>
                <h3 class="text-h2 font-weight-black mb-4 text-gradient">¡Misión Cumplida!</h3>
                <p class="text-h5 text-medium-emphasis mb-8 font-weight-regular">¡Felicidades astronauta! Has superado todos los desafíos.</p>
                
                <div class="score-display mb-10 pa-8 rounded-circle bg-white border mx-auto elevation-4 d-flex flex-column justify-center align-center" style="width: 250px; height: 250px;">
                  <div class="text-h1 font-weight-black mb-2" :style="{ color: activeMission.color }">{{ score }} <span class="text-h3 text-grey-lighten-1">/ 5</span></div>
                  <div class="text-subtitle-1 font-weight-bold text-medium-emphasis text-uppercase">Estrellas<br>Ganadas</div>
                </div>

                <v-row justify="center" class="mt-8">
                  <v-col cols="12" sm="5">
                    <v-btn
                      block
                      size="x-large"
                      variant="outlined"
                      :color="activeMission.color"
                      class="rounded-pill font-weight-bold text-none border-md"
                      @click="resetPractice"
                    >
                      Jugar de nuevo
                    </v-btn>
                  </v-col>
                  <v-col cols="12" sm="5">
                    <v-btn
                      block
                      size="x-large"
                      :color="activeMission.color"
                      class="rounded-pill font-weight-bold text-none text-white elevation-6 btn-hover"
                      @click="goBackToGrid"
                    >
                      Elegir otra misión
                    </v-btn>
                  </v-col>
                </v-row>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </v-fade-transition>

    <v-snackbar v-model="snackbar.show" :color="snackbar.color" rounded="pill" elevation="10" location="top" timeout="3000">
      <div class="text-center font-weight-black text-h6 py-2 d-flex align-center justify-center">
        <v-icon start size="28" class="mr-3">{{ snackbar.icon }}</v-icon>
        {{ snackbar.text }}
      </div>
    </v-snackbar>
  </v-container>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { dbasDatabase } from '../../utils/DbaData'
import { useDashboard } from '../../composables/useDashboard'

const route = useRoute()
const router = useRouter()
const { selectedGrade, currentTheme } = useDashboard()

// Grid State
const activeTab = ref('numerico')
const thinkingTypes = [
  { value: 'numerico', label: 'Números Mágicos', icon: 'mdi-numeric-9-plus-box-outline' },
  { value: 'geometrico', label: 'Formas y Figuras', icon: 'mdi-shape-plus' },
  { value: 'estadistico', label: 'Datos Curiosos', icon: 'mdi-chart-box-outline' }
]

const filteredMissions = computed(() => {
  return dbasDatabase.filter(
    mission => mission.grade === selectedGrade.value && mission.type === activeTab.value
  )
})

// Mission State
const selectedMissionId = ref(null)
const practiceStarted = ref(false)
const selectedOption = ref(null)
const currentQuestionIndex = ref(0)
const score = ref(0)
const showResults = ref(false)
const showHint = ref(false)
const snackbar = ref({ show: false, text: '', color: 'success', icon: 'mdi-check' })

const activeMission = computed(() => {
  return dbasDatabase.find(mission => mission.id === selectedMissionId.value)
})

const practiceQuestions = computed(() => {
  if (!activeMission.value || !activeMission.value.exercises) return []
  
  return activeMission.value.exercises.map(exercise => ({
    ...exercise,
    // Add a generic hint if we don't have specific ones
    hint: `Pista de Copiloto: Observa bien las opciones y recuerda las clases de la misión.`
  }))
})

const currentQuestion = computed(() => {
  return practiceQuestions.value[currentQuestionIndex.value] || null
})

// Navigation & Actions
onMounted(() => {
  if (route.query.dba) {
    const missionNum = parseInt(route.query.dba)
    const found = dbasDatabase.find(d => d.dbaNumber === missionNum && d.grade === selectedGrade.value)
    if (found) {
      selectedMissionId.value = found.id
    }
  }
})

const startMission = (mission) => {
  selectedMissionId.value = mission.id
  resetPractice()
  // Actualizar URL sin recargar para que el botón de ir atrás funcione lógicamente si se desea
  router.replace({ query: { dba: mission.dbaNumber } })
}

const goBackToGrid = () => {
  selectedMissionId.value = null
  router.replace({ query: {} })
}

const resetPractice = () => {
  practiceStarted.value = false
  currentQuestionIndex.value = 0
  score.value = 0
  showResults.value = false
  showHint.value = false
  selectedOption.value = null
}

const checkAnswer = () => {
  if (selectedOption.value === currentQuestion.value.answer) {
    score.value++
    showHint.value = false
    snackbar.value = { show: true, text: '¡Increíble! Respuesta correcta. 🚀', color: 'success', icon: 'mdi-star-shooting' }
    
    setTimeout(() => {
      if (currentQuestionIndex.value < 4) {
        currentQuestionIndex.value++
        selectedOption.value = null
      } else {
        showResults.value = true
      }
    }, 1500)
  } else {
    showHint.value = true
    snackbar.value = { show: true, text: '¡Ups! Inténtalo de nuevo. Lee la pista. 🤖', color: 'info', icon: 'mdi-robot-confused' }
    selectedOption.value = null
  }
}
</script>

<style scoped>
.text-gradient {
  background: linear-gradient(135deg, #f59e0b 0%, #ec4899 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.glass-tabs {
  background: rgba(255, 255, 255, 0.6) !important;
  backdrop-filter: blur(10px);
  border-color: rgba(255,255,255,0.8) !important;
}

.glass-card {
  background: rgba(255, 255, 255, 0.85) !important;
  backdrop-filter: blur(15px);
}

.mission-card {
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  border: none !important;
  background: white !important;
  position: relative;
  width: 100%;
  cursor: pointer;
}

.mission-card:hover {
  transform: translateY(-12px);
  box-shadow: 0 30px 60px -15px rgba(0, 0, 0, 0.2) !important;
}

.card-gradient {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100px;
  z-index: 0;
}

.avatar-bounce {
  animation: bounceAvatar 3s infinite;
}

@keyframes bounceAvatar {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}

.btn-hover {
  transition: all 0.3s ease;
}

.btn-hover:hover {
  transform: translateY(-3px) scale(1.02);
  filter: brightness(1.1);
}

.interactive-option {
  border-width: 3px !important;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  background: #f8fafc !important;
}

.interactive-option:hover:not(.active-option) {
  transform: scale(1.03);
  background: white !important;
  border-color: #cbd5e1 !important;
  box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1) !important;
}

.active-option {
  transform: scale(1.05);
}

.progress-rocket :deep(.v-progress-linear__determinate) {
  background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.2) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.2) 50%, rgba(255, 255, 255, 0.2) 75%, transparent 75%, transparent);
  background-size: 1rem 1rem;
  animation: progress-stripes 1s linear infinite;
}

@keyframes progress-stripes {
  from { background-position: 1rem 0; }
  to { background-position: 0 0; }
}

.max-width-600 {
  max-width: 600px;
}

/* Animations from animate.css (if not globally available, let's fake some basic ones just in case) */
@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-15px); }
  100% { transform: translateY(0px); }
}

.animate__float {
  animation: float 4s ease-in-out infinite;
}
</style>
