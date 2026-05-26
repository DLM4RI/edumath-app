<template>
  <div class="actividades-page">
    <v-row v-if="!quizStarted && !quizFinished">
      <v-col cols="12">
        <header class="mb-10 text-center">
          <v-avatar color="primary" size="80" class="mb-4 elevation-8">
            <v-icon size="40" color="white">mdi-rocket-launch</v-icon>
          </v-avatar>
          <h1 class="text-h2 font-weight-black tracking-tight mb-2">Misión Numérica Grado {{ selectedGrade }}°</h1>
          <p class="text-h6 text-medium-emphasis">Pon a prueba lo que aprendiste en las 5 unidades.</p>
        </header>

        <v-row justify="center">
          <v-col cols="12" md="8">
            <v-card class="rounded-3xl pa-8 text-center border-card" elevation="0">
              <h3 class="text-h4 font-weight-black mb-4">Gran Desafío Final</h3>
              <p class="text-body-1 mb-8">Te enfrentarás a 5 retos matemáticos, uno por cada unidad que estudiaste. ¡Demuestra que eres un experto en números!</p>
              <v-btn 
                color="primary" 
                size="x-large" 
                class="rounded-xl px-12 font-weight-black text-h6" 
                elevation="4"
                @click="startQuiz"
              >
                ¡COMENZAR MISIÓN!
              </v-btn>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <!-- ZONA DEL QUIZ -->
    <v-fade-transition mode="out-in">
      <div v-if="quizStarted && !quizFinished" class="quiz-view">
        <v-btn variant="text" prepend-icon="mdi-arrow-left" class="mb-6 font-weight-bold" @click="quizStarted = false">
          Abandonar misión
        </v-btn>

        <v-card class="rounded-3xl pa-6 pa-md-10 bg-white border-card" elevation="4">
          <!-- Progreso -->
          <div class="d-flex align-center mb-8">
            <v-progress-linear
              :model-value="(currentQuestionIndex / currentQuiz.length) * 100"
              color="primary"
              height="12"
              rounded
              class="flex-grow-1"
            ></v-progress-linear>
            <span class="ml-4 font-weight-bold text-primary">Reto {{ currentQuestionIndex + 1 }} de {{ currentQuiz.length }}</span>
          </div>

          <!-- Pregunta -->
          <div class="text-center mb-8">
            <v-chip :color="currentQuestion.color" variant="flat" class="mb-4 font-weight-black px-6">
              {{ currentQuestion.unidad }}
            </v-chip>
            <h2 class="text-h4 font-weight-black">{{ currentQuestion.pregunta }}</h2>
          </div>

          <!-- Opciones -->
          <v-row justify="center">
            <v-col cols="12" sm="8" md="6">
              <v-card
                v-for="(opcion, index) in currentQuestion.opciones"
                :key="index"
                class="option-card rounded-xl pa-4 mb-4 text-center text-h6 font-weight-bold cursor-pointer transition-all"
                :class="{ 
                  'selected-option': selectedOption === index,
                  'correct-option': showFeedback && index === currentQuestion.respuestaCorrecta,
                  'wrong-option': showFeedback && selectedOption === index && selectedOption !== currentQuestion.respuestaCorrecta
                }"
                @click="selectOption(index)"
                :disabled="showFeedback"
                elevation="0"
                border
              >
                {{ opcion }}
              </v-card>
            </v-col>
          </v-row>

          <div class="text-center mt-8" v-if="selectedOption !== null">
            <v-btn
              v-if="!showFeedback"
              color="primary"
              size="x-large"
              class="rounded-xl px-12 font-weight-black"
              @click="checkAnswer"
            >
              Comprobar Respuesta
            </v-btn>
            <v-btn
              v-else
              color="success"
              size="x-large"
              class="rounded-xl px-12 font-weight-black mt-4"
              @click="nextQuestion"
            >
              {{ isLastQuestion ? 'Ver Resultados' : 'Siguiente Reto' }} <v-icon end>mdi-chevron-right</v-icon>
            </v-btn>
            
            <div v-if="showFeedback" class="mt-6">
              <v-alert
                :type="isAnswerCorrect ? 'success' : 'error'"
                variant="tonal"
                class="rounded-xl"
              >
                {{ isAnswerCorrect ? '¡Excelente! Respuesta correcta.' : 'Oops. La respuesta correcta era: ' + currentQuestion.opciones[currentQuestion.respuestaCorrecta] }}
              </v-alert>
            </div>
          </div>
        </v-card>
      </div>
    </v-fade-transition>

    <!-- RESULTADOS FINALES -->
    <v-fade-transition mode="out-in">
      <div v-if="quizFinished" class="text-center mt-10">
        <v-avatar :color="score >= 3 ? 'success' : 'warning'" size="120" class="mb-6 elevation-8">
          <v-icon size="60" color="white">{{ score >= 3 ? 'mdi-trophy' : 'mdi-star-half-full' }}</v-icon>
        </v-avatar>
        <h1 class="text-h2 font-weight-black mb-4">¡Misión Completada!</h1>
        <p class="text-h5 mb-6">Lograste superar <strong>{{ score }}</strong> de {{ currentQuiz.length }} retos.</p>
        
        <v-alert v-if="score === 5" type="success" variant="flat" class="rounded-xl d-inline-block px-10 mb-8 font-weight-black text-h6">
          ¡PUNTUACIÓN PERFECTA! Eres un genio matemático.
        </v-alert>

        <div>
          <v-btn color="primary" size="x-large" class="rounded-xl px-8 font-weight-black mx-2" @click="resetQuiz">
            <v-icon start>mdi-refresh</v-icon> Intentar de nuevo
          </v-btn>
          <v-btn color="secondary" size="x-large" class="rounded-xl px-8 font-weight-black mx-2" @click="$router.push(`/app/grado/${selectedGrade}`)">
            Volver a Temas
          </v-btn>
        </div>
      </div>
    </v-fade-transition>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useDashboard } from '../../composables/useDashboard'

const { selectedGrade } = useDashboard()

const quizData = {
  '1': [
    { unidad: 'Unidad 1: Conteo', color: 'blue', pregunta: 'Si tienes 1 decena y 2 unidades, ¿qué número tienes?', opciones: ['2', '12', '21'], respuestaCorrecta: 1 },
    { unidad: 'Unidad 2: Suma', color: 'green', pregunta: 'Si juntas 4 manzanas y 3 manzanas, ¿cuántas tienes?', opciones: ['6', '7', '8'], respuestaCorrecta: 1 },
    { unidad: 'Unidad 3: Resta', color: 'red', pregunta: 'Tenías 10 globos y se volaron 2. ¿Cuántos quedan?', opciones: ['7', '8', '12'], respuestaCorrecta: 1 },
    { unidad: 'Unidad 4: Secuencias', color: 'purple', pregunta: 'La rana salta de 2 en 2: 2, 4, 6... ¿Qué número sigue?', opciones: ['7', '8', '10'], respuestaCorrecta: 1 },
    { unidad: 'Unidad 5: Retos', color: 'indigo', pregunta: 'Si tienes 5 dulces y te regalan 5 más, ¿cuántos tienes ahora?', opciones: ['10', '5', '15'], respuestaCorrecta: 0 }
  ],
  '2': [
    { unidad: 'Unidad 1: Números 999', color: 'blue', pregunta: '¿Qué número forman 3 centenas, 4 decenas y 2 unidades?', opciones: ['342', '432', '243'], respuestaCorrecta: 0 },
    { unidad: 'Unidad 2: Suma Llevando', color: 'green', pregunta: 'Resuelve: 48 + 25', opciones: ['63', '73', '613'], respuestaCorrecta: 1 },
    { unidad: 'Unidad 3: Resta Prestando', color: 'red', pregunta: 'Resuelve: 52 - 18', opciones: ['34', '44', '46'], respuestaCorrecta: 0 },
    { unidad: 'Unidad 4: Intro Multiplicación', color: 'orange', pregunta: 'Si sumas 5 + 5 + 5 + 5, es lo mismo que decir:', opciones: ['4 veces 5', '5 veces 5', '3 veces 5'], respuestaCorrecta: 0 },
    { unidad: 'Unidad 5: La Tiendita', color: 'purple', pregunta: 'Compras un jugo de $200 y pagas con una moneda de $500. ¿Cuánto es tu vuelto?', opciones: ['$200', '$300', '$700'], respuestaCorrecta: 1 }
  ],
  '3': [
    { unidad: 'Unidad 1: Miles', color: 'blue', pregunta: 'Suma: 1.500 + 2.300', opciones: ['3.800', '3.700', '4.800'], respuestaCorrecta: 0 },
    { unidad: 'Unidad 2: Tablas', color: 'green', pregunta: '¿Cuánto es 7 × 8?', opciones: ['54', '56', '64'], respuestaCorrecta: 1 },
    { unidad: 'Unidad 3: Propiedades', color: 'orange', pregunta: 'Por la propiedad conmutativa, 4 × 5 es igual a...', opciones: ['4 + 5', '5 × 4', '20 × 1'], respuestaCorrecta: 1 },
    { unidad: 'Unidad 4: División', color: 'purple', pregunta: 'Reparte 15 dulces entre 3 niños. ¿Cuántos le tocan a cada uno?', opciones: ['4', '5', '6'], respuestaCorrecta: 1 },
    { unidad: 'Unidad 5: Combinados', color: 'red', pregunta: 'Compro 2 cajas de 6 colores, y luego me regalan 3 colores sueltos. ¿Cuántos colores tengo?', opciones: ['15', '12', '9'], respuestaCorrecta: 0 }
  ],
  '4': [
    { unidad: 'Unidad 1: Millones', color: 'blue', pregunta: '¿Cómo se lee el número 1.500.000?', opciones: ['Mil quinientos', 'Un millón quinientos mil', 'Ciento cincuenta mil'], respuestaCorrecta: 1 },
    { unidad: 'Unidad 2: Mult 2 Cifras', color: 'green', pregunta: 'El primer paso para multiplicar 24 × 12 es:', opciones: ['Multiplicar 24 por el 2', 'Multiplicar 24 por el 1', 'Sumar 24 y 12'], respuestaCorrecta: 0 },
    { unidad: 'Unidad 3: División', color: 'orange', pregunta: 'La cantidad que sobra en una división inexacta se llama:', opciones: ['Cociente', 'Dividendo', 'Residuo'], respuestaCorrecta: 2 },
    { unidad: 'Unidad 4: Fracciones', color: 'purple', pregunta: 'Una fracción donde el número de arriba es menor que el de abajo es una:', opciones: ['Fracción Propia', 'Fracción Impropia', 'Fracción Homogénea'], respuestaCorrecta: 0 },
    { unidad: 'Unidad 5: Suma Homogénea', color: 'teal', pregunta: 'Suma: 2/7 + 3/7', opciones: ['5/14', '5/7', '6/7'], respuestaCorrecta: 1 }
  ],
  '5': [
    { unidad: 'Unidad 1: Divisibilidad', color: 'blue', pregunta: '¿Cuál de estos números es múltiplo de 5?', opciones: ['12', '23', '35'], respuestaCorrecta: 2 },
    { unidad: 'Unidad 2: Frac. Heterogéneas', color: 'green', pregunta: 'Para sumar 1/2 + 1/3, primero debes:', opciones: ['Sumar 1+1 y 2+3', 'Hallar el MCM de 2 y 3', 'Restar los denominadores'], respuestaCorrecta: 1 },
    { unidad: 'Unidad 3: Valor Decimal', color: 'orange', pregunta: 'En el número 4.75, el 7 ocupa el lugar de las:', opciones: ['Unidades', 'Décimas', 'Centésimas'], respuestaCorrecta: 1 },
    { unidad: 'Unidad 4: Suma Decimal', color: 'purple', pregunta: 'Resuelve alineando el punto: 12.5 + 3.4', opciones: ['15.9', '46.5', '15.09'], respuestaCorrecta: 0 },
    { unidad: 'Unidad 5: Conversiones', color: 'red', pregunta: '¿Cómo se escribe la fracción 1/2 en número decimal?', opciones: ['0.12', '0.5', '1.2'], respuestaCorrecta: 1 }
  ]
}

const currentQuiz = computed(() => quizData[selectedGrade.value] || quizData['1'])

const quizStarted = ref(false)
const quizFinished = ref(false)
const currentQuestionIndex = ref(0)
const selectedOption = ref(null)
const showFeedback = ref(false)
const isAnswerCorrect = ref(false)
const score = ref(0)

const currentQuestion = computed(() => currentQuiz.value[currentQuestionIndex.value])
const isLastQuestion = computed(() => currentQuestionIndex.value === currentQuiz.value.length - 1)

const startQuiz = () => {
  quizStarted.value = true
  quizFinished.value = false
  currentQuestionIndex.value = 0
  score.value = 0
  resetTurn()
}

const selectOption = (index) => {
  if (showFeedback.value) return
  selectedOption.value = index
}

const checkAnswer = () => {
  if (selectedOption.value === null) return
  
  isAnswerCorrect.value = selectedOption.value === currentQuestion.value.respuestaCorrecta
  if (isAnswerCorrect.value) {
    score.value++
  }
  showFeedback.value = true
}

const nextQuestion = () => {
  if (isLastQuestion.value) {
    quizFinished.value = true
  } else {
    currentQuestionIndex.value++
    resetTurn()
  }
}

const resetTurn = () => {
  selectedOption.value = null
  showFeedback.value = false
  isAnswerCorrect.value = false
}

const resetQuiz = () => {
  startQuiz()
}
</script>

<style scoped>
.actividades-page {
  animation: fadeIn 0.8s ease-out;
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
}

.border-card {
  border: 1px solid rgba(0,0,0,0.05);
  background: rgba(255, 255, 255, 0.9) !important;
  backdrop-filter: blur(10px);
}

.option-card {
  background-color: #F5F5F5;
  border: 2px solid transparent !important;
}

.option-card:hover:not(:disabled) {
  background-color: #EEEEEE;
  transform: translateY(-2px);
}

.selected-option {
  border-color: var(--v-primary-base, #1976D2) !important;
  background-color: #E3F2FD !important;
}

.correct-option {
  border-color: #4CAF50 !important;
  background-color: #E8F5E9 !important;
  color: #2E7D32 !important;
}

.wrong-option {
  border-color: #F44336 !important;
  background-color: #FFEBEE !important;
  color: #C62828 !important;
}

.transition-all {
  transition: all 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
