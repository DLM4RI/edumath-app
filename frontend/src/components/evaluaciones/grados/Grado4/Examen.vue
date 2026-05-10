<template>
  <v-card class="pa-4 pa-md-8 rounded-3xl glass-card overflow-hidden" border="1">
    <div class="text-center mb-6">
      <v-avatar color="primary-lighten-4" size="70" class="mb-4">
        <v-icon color="primary" size="35">mdi-school</v-icon>
      </v-avatar>
      <h2 class="text-h4 font-weight-black mb-2">Desafío Final: Grado 4°</h2>
      <p class="text-body-1 text-medium-emphasis">
        ¡Demuestra lo que has aprendido en tu aventura de cuarto grado!
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
    category: "Fracciones",
    text: "¿Cuál es una fracción equivalente a 1/2?",
    options: [
      { label: "1/4", correct: false },
      { label: "2/4", correct: true },
      { label: "3/4", correct: false },
      { label: "1/3", correct: false },
    ],
  },
  {
    category: "Números",
    text: "En el número 45.678, ¿qué cifra ocupa el lugar de las decenas de mil?",
    options: [
      { label: "4", correct: true },
      { label: "5", correct: false },
      { label: "6", correct: false },
      { label: "7", correct: false },
    ],
  },
  {
    category: "Multiplicación",
    text: "¿Cuánto es 12 x 100?",
    options: [
      { label: "120", correct: false },
      { label: "1.200", correct: true },
      { label: "12.000", correct: false },
      { label: "1.020", correct: false },
    ],
  },
  {
    category: "División",
    text: "¿Cuál es el resultado de 100 ÷ 5?",
    options: [
      { label: "10", correct: false },
      { label: "20", correct: true },
      { label: "25", correct: false },
      { label: "50", correct: false },
    ],
  },
  {
    category: "Geometría",
    text: "¿Qué nombre reciben las líneas que nunca se cruzan?",
    options: [
      { label: "Perpendiculares", correct: false },
      { label: "Secantes", correct: false },
      { label: "Paralelas", correct: true },
      { label: "Curvas", correct: false },
    ],
  },
  {
    category: "Geometría",
    text: "¿Cómo se llama el ángulo que mide más de 90° pero menos de 180°?",
    options: [
      { label: "Agudo", correct: false },
      { label: "Recto", correct: false },
      { label: "Obtuso", correct: true },
      { label: "Llano", correct: false },
    ],
  },
  {
    category: "Perímetro",
    text: "Si un rectángulo tiene base 10cm y altura 4cm, ¿cuál es su perímetro?",
    options: [
      { label: "14cm", correct: false },
      { label: "28cm", correct: true },
      { label: "40cm", correct: false },
      { label: "20cm", correct: false },
    ],
  },
  {
    category: "Área",
    text: "¿Cuál es el área de un cuadrado de 6cm de lado?",
    options: [
      { label: "12 cm²", correct: false },
      { label: "24 cm²", correct: false },
      { label: "36 cm²", correct: true },
      { label: "18 cm²", correct: false },
    ],
  },
  {
    category: "Decimales",
    text: "¿Cómo se lee el número 0,5?",
    options: [
      { label: "Cinco enteros", correct: false },
      { label: "Cinco décimas", correct: true },
      { label: "Cinco centésimas", correct: false },
      { label: "Cinco milésimas", correct: false },
    ],
  },
  {
    category: "Medición",
    text: "¿Cuántos mililitros hay en un litro?",
    options: [
      { label: "100 ml", correct: false },
      { label: "500 ml", correct: false },
      { label: "1.000 ml", correct: true },
      { label: "10.000 ml", correct: false },
    ],
  },
  {
    category: "Tiempo",
    text: "¿Cuántas horas hay en 2 días?",
    options: [
      { label: "24 horas", correct: false },
      { label: "48 horas", correct: true },
      { label: "12 horas", correct: false },
      { label: "60 horas", correct: false },
    ],
  },
  {
    category: "Estadística",
    text: "¿Qué gráfico es mejor para representar la temperatura durante una semana?",
    options: [
      { label: "Gráfico de barras", correct: false },
      { label: "Gráfico de líneas", correct: true },
      { label: "Pictograma", correct: false },
      { label: "Círculo", correct: false },
    ],
  },
  {
    category: "Problemas",
    text: "Tengo $5.000 y compro un helado de $2.300. ¿Cuánto dinero me queda?",
    options: [
      { label: "$3.700", correct: false },
      { label: "$2.700", correct: true },
      { label: "$3.300", correct: false },
      { label: "$2.300", correct: false },
    ],
  },
  {
    category: "Fracciones",
    text: "Si me como 3/4 de una pizza, ¿cuánto queda?",
    options: [
      { label: "1/4", correct: true },
      { label: "2/4", correct: false },
      { label: "3/4", correct: false },
      { label: "4/4", correct: false },
    ],
  },
  {
    category: "Lógica",
    text: "¿Cuál es el doble de 150?",
    options: [
      { label: "200", correct: false },
      { label: "300", correct: true },
      { label: "450", correct: false },
      { label: "250", correct: false },
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
