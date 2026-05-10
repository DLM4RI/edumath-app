<template>
  <v-card class="pa-4 pa-md-8 rounded-3xl glass-card overflow-hidden" border="1">
    <div class="text-center mb-6">
      <v-avatar color="primary-lighten-4" size="70" class="mb-4">
        <v-icon color="primary" size="35">mdi-school</v-icon>
      </v-avatar>
      <h2 class="text-h4 font-weight-black mb-2">Desafío Final: Grado 3°</h2>
      <p class="text-body-1 text-medium-emphasis">
        ¡Demuestra lo que has aprendido en tu aventura de tercer grado!
      </p>
    </div>

    <!-- Progress Bar -->
    <div class="mb-8" v-if="currentStep < questions.length">
      <div class="d-flex justify-space-between mb-2">
        <span class="text-caption font-weight-bold text-primary">Progreso de la misión</span>
        <span class="text-caption font-weight-bold text-primary">{{ Math.round((currentStep / questions.length) * 100) }}%</span>
      </div>
      <v-progress-linear
        :model-value="(currentStep / questions.length) * 100"
        color="primary"
        height="12"
        rounded
        striped
      ></v-progress-linear>
    </div>

    <v-window v-model="currentStep">
      <!-- PREGUNTAS -->
      <v-window-item
        v-for="(q, index) in questions"
        :key="index"
        :value="index"
      >
        <v-card variant="flat" class="pa-2 pa-md-4 bg-transparent">
          <div class="d-flex align-center mb-4">
            <v-chip color="secondary" variant="flat" size="small" class="mr-2"
              >Pregunta {{ index + 1 }} de {{ questions.length }}</v-chip
              >
            <v-chip v-if="q.category" color="primary" variant="tonal" size="small">{{ q.category }}</v-chip>
          </div>

          <h3 class="text-h5 font-weight-bold mb-6">{{ q.text }}</h3>

          <v-radio-group v-model="answers[index]" class="custom-radio-group">
            <v-row>
              <v-col v-for="(option, optIdx) in q.options" :key="optIdx" cols="12" md="6">
                <v-radio
                  :label="option.label"
                  :value="optIdx"
                  class="mb-2 pa-4 rounded-xl border transition-all"
                  :class="{
                    'bg-primary-lighten-5 border-primary elevation-2':
                      answers[index] === optIdx,
                    'bg-white': answers[index] !== optIdx
                  }"
                ></v-radio>
              </v-col>
            </v-row>
          </v-radio-group>
        </v-card>
      </v-window-item>

      <!-- RESULTADOS -->
      <v-window-item :value="questions.length">
        <div class="text-center pa-6">
          <v-avatar :color="finalGrade >= 3 ? 'success' : 'warning'" size="120" class="mb-6 elevation-10">
            <v-icon size="60" color="white">
              {{ finalGrade >= 3 ? "mdi-trophy" : "mdi-star-half" }}
            </v-icon>
          </v-avatar>
          
          <h3 class="text-h3 font-weight-black mb-2">
            {{ finalGrade >= 3 ? "¡Excelente Trabajo!" : "¡Buen intento!" }}
          </h3>
          
          <div class="grade-display my-6">
            <span class="text-h6 text-medium-emphasis d-block mb-1">Tu calificación final es:</span>
            <div class="text-h1 font-weight-black" :class="finalGrade >= 3 ? 'text-success' : 'text-warning'">
              {{ finalGrade.toFixed(1) }}
            </div>
            <span class="text-body-1 font-weight-bold">Sobre 5.0</span>
          </div>

          <p class="text-h6 mb-8 text-medium-emphasis">
            Respondiste correctamente {{ score }} de {{ questions.length }} preguntas.
          </p>

          <!-- FEEDBACK POR TEMAS -->
          <div v-if="feedbackByTopic.length > 0" class="text-left mt-8">
            <v-divider class="mb-6"></v-divider>
            <h4 class="text-h5 font-weight-black mb-4 d-flex align-center">
              <v-icon color="primary" class="mr-2">mdi-book-open-page-variant</v-icon>
              Plan de Refuerzo Personalizado
            </h4>
            <p class="text-body-1 text-medium-emphasis mb-6">
              Basado en tus resultados, te recomendamos repasar los siguientes temas:
            </p>

            <v-row>
              <v-col v-for="topic in feedbackByTopic" :key="topic.name" cols="12" md="6">
                <v-card variant="outlined" class="pa-4 rounded-2xl border-primary-lighten-3 bg-primary-lighten-5 h-100">
                  <div class="d-flex justify-space-between align-center mb-2">
                    <span class="text-subtitle-1 font-weight-black text-primary">{{ topic.name }}</span>
                    <v-chip size="small" color="primary" variant="flat">{{ topic.correct }}/{{ topic.total }}</v-chip>
                  </div>
                  <v-progress-linear
                    :model-value="(topic.correct / topic.total) * 100"
                    color="primary"
                    height="8"
                    rounded
                    class="mb-4"
                  ></v-progress-linear>
                  <v-btn
                    block
                    color="primary"
                    variant="flat"
                    size="small"
                    class="rounded-pill font-weight-bold"
                    prepend-icon="mdi-school"
                    @click="goToStudy(topic.name)"
                  >
                    Estudiar Tema
                  </v-btn>
                </v-card>
              </v-col>
            </v-row>
          </div>

          <div v-else class="text-center mt-8">
            <v-alert type="success" variant="tonal" class="rounded-xl">
              ¡Dominas todos los temas evaluados! Sigue así.
            </v-alert>
          </div>

          <v-btn
            color="primary"
            size="x-large"
            class="rounded-xl px-12 font-weight-black mt-10"
            elevation="8"
            @click="$emit('finalizado')"
          >
            Finalizar Aventura <v-icon end>mdi-flag-checkered</v-icon>
          </v-btn>
        </div>
      </v-window-item>
    </v-window>

    <!-- NAVEGACIÓN -->
    <div
      v-if="currentStep < questions.length"
      class="mt-8 d-flex justify-space-between align-center"
    >
      <v-btn
        variant="text"
        size="large"
        rounded="xl"
        :disabled="currentStep === 0"
        @click="currentStep--"
        prepend-icon="mdi-chevron-left"
      >
        Anterior
      </v-btn>

      <v-btn
        color="primary"
        size="x-large"
        class="rounded-xl px-10 font-weight-bold"
        :disabled="answers[currentStep] === null"
        @click="nextStep"
        elevation="4"
      >
        {{ currentStep === questions.length - 1 ? "Finalizar y Calificar" : "Siguiente" }}
        <v-icon end v-if="currentStep < questions.length - 1">mdi-chevron-right</v-icon>
      </v-btn>
    </div>
  </v-card>
</template>

<script setup>
import { ref, computed } from "vue";

const emit = defineEmits(["finalizado"]);

const currentStep = ref(0);
const score = ref(0);
const finalGrade = ref(0);

const questions = [
  {
    category: "Multiplicación",
    text: "¿Cuánto es 7 x 8?",
    options: [
      { label: "54", correct: false },
      { label: "56", correct: true },
      { label: "48", correct: false },
      { label: "64", correct: false },
    ],
  },
  {
    category: "División",
    text: "Si reparto 20 manzanas entre 4 niños, ¿cuántas le tocan a cada uno?",
    options: [
      { label: "4", correct: false },
      { label: "5", correct: true },
      { label: "6", correct: false },
      { label: "10", correct: false },
    ],
  },
  {
    category: "Números",
    text: "¿Cuál es el valor del número 4 en 4.567?",
    options: [
      { label: "40", correct: false },
      { label: "400", correct: false },
      { label: "4.000", correct: true },
      { label: "4", correct: false },
    ],
  },
  {
    category: "Geometría",
    text: "¿Cómo se llama un ángulo de exactamente 90 grados?",
    options: [
      { label: "Agudo", correct: false },
      { label: "Obtuso", correct: false },
      { label: "Recto", correct: true },
      { label: "Llano", correct: false },
    ],
  },
  {
    category: "Geometría",
    text: "¿Cuántos lados tiene un octágono?",
    options: [
      { label: "6", correct: false },
      { label: "7", correct: false },
      { label: "8", correct: true },
      { label: "10", correct: false },
    ],
  },
  {
    category: "Geometría",
    text: "¿Qué figura tiene 3 lados iguales?",
    options: [
      { label: "Triángulo equilátero", correct: true },
      { label: "Cuadrado", correct: false },
      { label: "Pentágono", correct: false },
      { label: "Triángulo escaleno", correct: false },
    ],
  },
  {
    category: "Medición",
    text: "¿Cuántos gramos hay en 1 kilogramo?",
    options: [
      { label: "100g", correct: false },
      { label: "500g", correct: false },
      { label: "1000g", correct: true },
      { label: "10g", correct: false },
    ],
  },
  {
    category: "Medición",
    text: "Si un evento comienza a las 2:15 y dura 45 minutos, ¿a qué hora termina?",
    options: [
      { label: "2:45", correct: false },
      { label: "3:00", correct: true },
      { label: "3:15", correct: false },
      { label: "2:50", correct: false },
    ],
  },
  {
    category: "Perímetro",
    text: "¿Cuál es el perímetro de un cuadrado que mide 5cm por lado?",
    options: [
      { label: "10cm", correct: false },
      { label: "15cm", correct: false },
      { label: "20cm", correct: true },
      { label: "25cm", correct: false },
    ],
  },
  {
    category: "Fracciones",
    text: "¿Cómo se escribe 'un cuarto' en números?",
    options: [
      { label: "1/2", correct: false },
      { label: "1/4", correct: true },
      { label: "1/3", correct: false },
      { label: "4/1", correct: false },
    ],
  },
  {
    category: "Fracciones",
    text: "En la fracción 3/5, ¿cuál es el denominador?",
    options: [
      { label: "3", correct: false },
      { label: "5", correct: true },
      { label: "8", correct: false },
      { label: "15", correct: false },
    ],
  },
  {
    category: "Estadística",
    text: "¿Qué es la MODA en un conjunto de datos?",
    options: [
      { label: "El número que más se repite", correct: true },
      { label: "El número más grande", correct: false },
      { label: "La suma de todos", correct: false },
      { label: "El número del medio", correct: false },
    ],
  },
  {
    category: "Secuencias",
    text: "¿Qué número falta: 2, 4, 8, 16, __?",
    options: [
      { label: "20", correct: false },
      { label: "32", correct: true },
      { label: "24", correct: false },
      { label: "40", correct: false },
    ],
  },
  {
    category: "Problemas",
    text: "Compré 3 lápices a $500 cada uno. ¿Cuánto pagué en total?",
    options: [
      { label: "$1.000", correct: false },
      { label: "$1.500", correct: true },
      { label: "$2.000", correct: false },
      { label: "$800", correct: false },
    ],
  },
  {
    category: "Lógica",
    text: "Si hoy es martes, ¿qué día fue hace 2 días?",
    options: [
      { label: "Lunes", correct: false },
      { label: "Domingo", correct: true },
      { label: "Sábado", correct: false },
      { label: "Jueves", correct: false },
    ],
  },
].sort(() => Math.random() - 0.5);

const answers = ref(new Array(questions.length).fill(null));

const nextStep = () => {
  if (currentStep.value === questions.length - 1) {
    calculateScore();
  }
  currentStep.value++;
};

const calculateScore = () => {
  let total = 0;
  const topicsMap = {};

  answers.value.forEach((answer, index) => {
    const q = questions[index];
    if (!topicsMap[q.category]) {
      topicsMap[q.category] = { correct: 0, total: 0 };
    }
    topicsMap[q.category].total++;

    if (answer !== null && q.options[answer].correct) {
      total++;
      topicsMap[q.category].correct++;
    }
  });

  score.value = total;
  finalGrade.value = (total / questions.length) * 5;

  feedbackByTopic.value = Object.keys(topicsMap)
    .map((name) => ({
      name,
      correct: topicsMap[name].correct,
      total: topicsMap[name].total,
    }))
    .filter((t) => t.correct < t.total);
};

const goToStudy = (topic) => {
  console.log("Redirigiendo a estudio del tema:", topic);
  emit("finalizado"); 
};
</script>

<style scoped>
.glass-card {
  background: rgba(255, 255, 255, 0.9) !important;
  backdrop-filter: blur(10px);
}
.transition-all {
  transition: all 0.3s ease;
}
.custom-radio-group :deep(.v-selection-control) {
  width: 100%;
}
.grade-display {
  background: rgba(var(--v-theme-primary), 0.05);
  padding: 2rem;
  border-radius: 2rem;
  display: inline-block;
  min-width: 250px;
}
</style>
