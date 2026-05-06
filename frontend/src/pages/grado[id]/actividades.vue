<template>
  <v-container class="py-8" maxWidth="1200">
    <!-- Header Selection -->
    <v-row class="mb-8 px-4" align="center">
      <v-col cols="12" md="6">
        <v-chip :color="currentTheme.primary" variant="tonal" class="mb-4 font-weight-bold">
          <v-icon start size="18">mdi-gamepad-variant</v-icon>
          MÓDULO DE PRÁCTICA
        </v-chip>
        <h1 class="text-h3 font-weight-black tracking-tight mb-2">Actividades</h1>
        <p class="text-h6 text-medium-emphasis">Grado {{ selectedGrade }}° • Selecciona un DBA para practicar</p>
      </v-col>
      <v-col cols="12" md="6">
        <v-select
          v-model="selectedDbaId"
          :items="gradeDbas"
          item-title="title"
          item-value="id"
          label="Selecciona un DBA"
          variant="outlined"
          rounded="xl"
          :color="currentTheme.primary"
          hide-details
          prepend-inner-icon="mdi-filter-variant"
        >
          <template v-slot:item="{ props, item }">
            <v-list-item v-bind="props" :subtitle="item.raw.statement.substring(0, 50) + '...'"></v-list-item>
          </template>
        </v-select>
      </v-col>
    </v-row>

    <!-- Activity Content -->
    <v-fade-transition mode="out-in">
      <v-row v-if="activeDba" :key="activeDba.id" justify="center">
        <v-col cols="12" md="4">
          <v-card class="rounded-xl mb-6 sticky-card border-l-8" :style="{ borderLeftColor: activeDba.color }" elevation="2">
            <v-card-item class="pa-6">
              <div class="d-flex align-center mb-4">
                <v-avatar :color="activeDba.color" size="40" class="mr-3">
                  <span class="text-white font-weight-bold">#{{ activeDba.dbaNumber }}</span>
                </v-avatar>
                <h3 class="text-h6 font-weight-black">Competencias</h3>
              </div>
              <div v-for="(ev, i) in activeDba.evidences" :key="i" class="mb-4">
                <div class="d-flex align-start">
                  <v-icon :color="activeDba.color" size="20" class="mr-3 mt-1">mdi-star-face</v-icon>
                  <p class="text-body-2 mb-0">{{ ev }}</p>
                </div>
              </div>
            </v-card-item>
          </v-card>
        </v-col>
        
        <v-col cols="12" md="8">
          <v-card class="rounded-xl pa-8 text-center glass-card border" elevation="0">
            <div v-if="!practiceStarted">
              <v-icon size="120" :color="activeDba.color" class="mb-6 opacity-20">mdi-rocket-launch</v-icon>
              <h3 class="text-h4 font-weight-black mb-4">¿Listo para el desafío?</h3>
              <p class="text-body-1 text-medium-emphasis mb-12 max-width-600 mx-auto">
                Practicaremos: "{{ activeDba.statement }}"
              </p>
              <v-btn
                size="x-large"
                :color="activeDba.color"
                class="text-white font-weight-bold px-12 rounded-xl text-none"
                elevation="8"
                @click="practiceStarted = true"
              >
                Empezar Práctica
              </v-btn>
            </div>

            <div v-else-if="!showResults" class="active-practice animate__animated animate__fadeIn">
              <div class="d-flex justify-space-between align-center mb-8">
                <div class="d-flex flex-column align-start">
                   <span class="text-overline font-weight-bold opacity-60">Reto de Matemáticas</span>
                   <span class="text-h6 font-weight-black">Pregunta {{ currentQuestionIndex + 1 }} de 5</span>
                </div>
                <v-progress-linear
                  :color="activeDba.color"
                  :model-value="(currentQuestionIndex + 1) * 20"
                  height="12"
                  rounded
                  class="max-width-200"
                ></v-progress-linear>
              </div>

              <v-divider class="mb-12 opacity-10"></v-divider>

              <div class="exercise-content py-4">
                <h4 class="text-h4 font-weight-black mb-8 text-center">{{ currentQuestion.question }}</h4>
                
                <v-expand-transition>
                  <div v-if="showHint" class="mb-8 pa-4 rounded-lg bg-amber-lighten-5 border-amber-lighten-3 border">
                    <div class="d-flex align-center text-amber-darken-4 font-weight-bold mb-1">
                      <v-icon start size="20">mdi-lightbulb-on</v-icon>
                      ¡PISTA!
                    </div>
                    <p class="text-body-2 text-amber-darken-3 mb-0">{{ currentQuestion.hint }}</p>
                  </div>
                </v-expand-transition>

                <v-row justify="center" class="px-md-12">
                  <v-col v-for="(opt, i) in currentQuestion.options" :key="i" cols="12" sm="6">
                    <v-btn
                      block
                      variant="flat"
                      size="x-large"
                      class="text-none py-10 rounded-xl option-btn"
                      :color="selectedOption === opt ? activeDba.color : 'grey-lighten-4'"
                      :class="selectedOption === opt ? 'text-white elevation-8' : 'text-grey-darken-2'"
                      @click="selectedOption = opt"
                    >
                      <span class="text-h6 font-weight-black">{{ opt }}</span>
                    </v-btn>
                  </v-col>
                </v-row>
              </div>

              <v-btn
                size="x-large"
                :color="activeDba.color"
                class="mt-12 px-12 rounded-xl font-weight-bold text-none text-white"
                :disabled="!selectedOption"
                @click="checkAnswer"
                elevation="6"
              >
                Verificar Respuesta
                <v-icon end>mdi-check-all</v-icon>
              </v-btn>
            </div>

            <!-- Results Summary -->
            <div v-else class="results-summary animate__animated animate__bounceIn">
              <v-icon size="100" color="warning" class="mb-6">mdi-trophy-variant</v-icon>
              <h3 class="text-h3 font-weight-black mb-2">¡Práctica Terminada!</h3>
              <p class="text-h6 text-medium-emphasis mb-8">Has completado los 5 retos del DBA #{{ activeDba.dbaNumber }}</p>
              
              <div class="score-display mb-10 pa-8 rounded-xl bg-grey-lighten-4 border">
                <div class="text-h2 font-weight-black" :style="{ color: activeDba.color }">{{ score }} / 5</div>
                <div class="text-subtitle-1 font-weight-bold text-medium-emphasis">Respuestas correctas</div>
              </div>

              <v-btn
                size="x-large"
                :color="activeDba.color"
                variant="flat"
                class="rounded-xl px-12 font-weight-bold text-none text-white"
                @click="resetPractice"
              >
                Volver a empezar
              </v-btn>
            </div>
          </v-card>
        </v-col>
      </v-row>

      <v-row v-else justify="center" class="py-12" key="empty">
        <v-col cols="12" md="6" class="text-center">
          <v-icon size="120" color="grey-lighten-3">mdi-selection-ellipse</v-icon>
          <h2 class="text-h4 font-weight-bold text-medium-emphasis mt-6">Nada seleccionado</h2>
          <p class="text-body-1 text-grey-darken-1 mb-8">Elige un DBA de la lista de arriba para comenzar a practicar.</p>
        </v-col>
      </v-row>
    </v-fade-transition>

    <v-snackbar v-model="snackbar.show" :color="snackbar.color" rounded="pill" elevation="10">
      <div class="text-center font-weight-bold text-h6">{{ snackbar.text }}</div>
    </v-snackbar>
  </v-container>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { dbasDatabase } from '../../utils/DbaData'
import { useDashboard } from '../../composables/useDashboard'

const route = useRoute()
const { selectedGrade, currentTheme } = useDashboard()

const selectedDbaId = ref(null)
const practiceStarted = ref(false)
const selectedOption = ref(null)
const currentQuestionIndex = ref(0)
const score = ref(0)
const showResults = ref(false)
const showHint = ref(false)
const snackbar = ref({ show: false, text: '', color: 'success' })

// Generate 5 questions based on the active DBA's core exercise
const practiceQuestions = computed(() => {
  if (!activeDba.value) return []
  
  const core = activeDba.value.exercise
  const questions = []
  
  // Create 5 variations with specific hints
  for (let i = 0; i < 5; i++) {
    questions.push({
      question: i === 0 ? core.question : `${core.question} (Reto ${i+1})`,
      options: i === 0 ? core.options : [...core.options].sort(() => Math.random() - 0.5),
      answer: core.answer,
      hint: `Recuerda lo que aprendimos sobre ${activeDba.value.type}. ¡Revisa bien las opciones!`
    })
  }
  return questions
})

const currentQuestion = computed(() => {
  return practiceQuestions.value[currentQuestionIndex.value] || null
})

// Filter DBAs for the current grade
const gradeDbas = computed(() => {
  return dbasDatabase
    .filter(dba => dba.grade === selectedGrade.value)
    .map(dba => ({
      ...dba,
      title: `DBA #${dba.dbaNumber} - ${dba.type.charAt(0).toUpperCase() + dba.type.slice(1)}`
    }))
})

const activeDba = computed(() => {
  return dbasDatabase.find(dba => dba.id === selectedDbaId.value)
})

// Initialize from query param
onMounted(() => {
  if (route.query.dba) {
    const dbaNum = parseInt(route.query.dba)
    const found = gradeDbas.value.find(d => d.dbaNumber === dbaNum)
    if (found) {
      selectedDbaId.value = found.id
      startPractice()
    }
  }
})

// Reset practice when DBA changes
watch(selectedDbaId, () => {
  resetPractice()
})

const startPractice = () => {
  practiceStarted.value = true
  currentQuestionIndex.value = 0
  score.value = 0
  showResults.value = false
  showHint.value = false
  selectedOption.value = null
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
    snackbar.value = { show: true, text: '¡Excelente! Respuesta correcta. 🥳', color: 'success' }
    
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
    snackbar.value = { show: true, text: '¡Casi! Inténtalo de nuevo. Te daré una pista. ✨', color: 'info' }
    selectedOption.value = null
  }
}
</script>

<style scoped>
.glass-card {
  background: rgba(255, 255, 255, 0.7) !important;
  backdrop-filter: blur(10px);
}

.sticky-card {
  position: sticky;
  top: 24px;
}

.option-btn {
  border-width: 2px !important;
  font-weight: 800 !important;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.option-btn:hover {
  transform: scale(1.05);
  background: rgba(255,255,255,0.8);
}

.max-width-600 {
  max-width: 600px;
}

.max-width-200 {
  max-width: 200px;
}

.tracking-tight {
  letter-spacing: -0.05em !important;
}
</style>
