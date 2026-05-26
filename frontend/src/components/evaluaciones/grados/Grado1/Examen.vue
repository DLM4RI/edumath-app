<template>
  <v-card class="pa-4 pa-md-8 rounded-3xl glass-card overflow-hidden" border="1">
    <div class="text-center mb-6">
      <v-avatar color="primary-lighten-4" size="70" class="mb-4">
        <v-icon color="primary" size="35">mdi-school</v-icon>
      </v-avatar>
      <h2 class="text-h4 font-weight-black mb-2">Desafío Final: Grado 1°</h2>
      <p class="text-body-1 text-medium-emphasis">
        ¡Demuestra lo que has aprendido en tu aventura matemática!
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
                <div 
                  class="option-box rounded-xl border pa-4 transition-all d-flex align-center"
                  :class="{
                    'selected-box border-primary elevation-3': answers[index] === optIdx,
                    'bg-white border-grey-lighten-2': answers[index] !== optIdx
                  }"
                  @click="answers[index] = optIdx"
                >
                  <v-radio
                    :value="optIdx"
                    color="primary"
                    hide-details
                    class="flex-grow-0 mr-3"
                  ></v-radio>
                  <span class="option-label text-body-1 font-weight-bold">{{ option.label }}</span>
                </div>
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
            {{ getGradeMessage(finalGrade) }}
          </h3>
          
          <div class="grade-display my-6">
            <span class="text-h6 text-medium-emphasis d-block mb-1">Tu calificación final es:</span>
            <div class="text-h1 font-weight-black" :class="finalGrade >= 3 ? 'text-success' : 'text-warning'">
              {{ finalGrade.toFixed(1) }}
            </div>
            <span class="text-body-1 font-weight-bold">Sobre 5.0</span>
            <div class="mt-3">
              <v-chip
                :color="getScaleColor(finalGrade)"
                variant="flat"
                class="font-weight-black px-6"
                size="large"
              >
                Desempeño {{ getScaleLabel(finalGrade) }}
              </v-chip>
            </div>
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
import { useStats } from "../../../../composables/useStats";

const emit = defineEmits(["finalizado"]);
const { saveExamResult } = useStats();

const feedbackByTopic = ref([]);

const currentStep = ref(0);
const score = ref(0);
const finalGrade = ref(0);

const questions = [
  {
    category: "Conteo",
    text: "🚀 Si en el cielo hay 3 estrellas y aparecen 2 más, ¿cuántas hay en total?",
    options: [
      { label: "4 estrellas", correct: false },
      { label: "5 estrellas", correct: true },
      { label: "6 estrellas", correct: false },
      { label: "3 estrellas", correct: false },
    ],
  },
  {
    category: "Secuencias",
    text: "🔢 ¿Qué número sigue en esta secuencia: 5, 6, 7, 8, __?",
    options: [
      { label: "8", correct: false },
      { label: "9", correct: true },
      { label: "10", correct: false },
      { label: "7", correct: false },
    ],
  },
  {
    category: "Comparar",
    text: "🐘 ¿Cuál de estos grupos tiene más elementos?",
    options: [
      { label: "8 manzanas", correct: false },
      { label: "12 manzanas", correct: true },
      { label: "5 manzanas", correct: false },
      { label: "10 manzanas", correct: false },
    ],
  },
  {
    category: "Sumas",
    text: "🍎 Tienes 4 manzanas y tu amigo te regala 3 más. ¿Cuántas tienes ahora?",
    options: [
      { label: "6 manzanas", correct: false },
      { label: "7 manzanas", correct: true },
      { label: "8 manzanas", correct: false },
      { label: "5 manzanas", correct: false },
    ],
  },
  {
    category: "Restas",
    text: "🎈 Tenías 8 globos y se explotaron 3. ¿Cuántos te quedan?",
    options: [
      { label: "5 globos", correct: true },
      { label: "4 globos", correct: false },
      { label: "6 globos", correct: false },
      { label: "3 globos", correct: false },
    ],
  },
  {
    category: "Sumas",
    text: "🧩 Si juntas 10 bloques azules y 5 bloques rojos, ¿cuántos bloques tienes?",
    options: [
      { label: "14", correct: false },
      { label: "12", correct: false },
      { label: "15", correct: true },
      { label: "10", correct: false },
    ],
  },
  {
    category: "Restas",
    text: "🍪 En una caja hay 10 galletas y te comes 4. ¿Cuántas quedan?",
    options: [
      { label: "7 galletas", correct: false },
      { label: "6 galletas", correct: true },
      { label: "5 galletas", correct: false },
      { label: "4 galletas", correct: false },
    ],
  },
  {
    category: "Decenas",
    text: "📦 ¿Cuántas unidades forman una DECENA?",
    options: [
      { label: "5 unidades", correct: false },
      { label: "10 unidades", correct: true },
      { label: "1 unidad", correct: false },
      { label: "20 unidades", correct: false },
    ],
  },
  {
    category: "Suma y Resta",
    text: "💰 Tienes 5 monedas, ganas 2 más, pero pierdes 1. ¿Cuántas te quedan?",
    options: [
      { label: "6 monedas", correct: true },
      { label: "5 monedas", correct: false },
      { label: "7 monedas", correct: false },
      { label: "8 monedas", correct: false },
    ],
  },
  {
    category: "Comparar",
    text: "⚖️ ¿Qué número es MENOR que 15?",
    options: [
      { label: "18", correct: false },
      { label: "12", correct: true },
      { label: "15", correct: false },
      { label: "20", correct: false },
    ],
  },
];

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

  // Persistir resultados
  saveExamResult('1', score.value, questions.length, topicsMap);

  // Filtrar temas que necesitan refuerzo (menos del 100% de aciertos)
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

// Escala de calificación colombiana (MEN)
const getScaleLabel = (grade) => {
  if (grade >= 4.6) return 'Superior';
  if (grade >= 4.0) return 'Alto';
  if (grade >= 3.0) return 'Básico';
  return 'Bajo';
};

const getScaleColor = (grade) => {
  if (grade >= 4.6) return 'success';
  if (grade >= 4.0) return 'blue';
  if (grade >= 3.0) return 'warning';
  return 'error';
};

const getGradeMessage = (grade) => {
  if (grade >= 4.6) return '¡Desempeño Superior!';
  if (grade >= 4.0) return '¡Excelente Trabajo!';
  if (grade >= 3.0) return '¡Buen Esfuerzo!';
  return '¡Sigue Intentándolo!';
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
  width: auto;
}
.option-box {
  cursor: pointer;
  height: 100%;
  background: white;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}
.option-box:hover {
  background: #F5F5F5;
  transform: translateY(-2px);
}
.selected-box {
  background: rgba(var(--v-theme-primary), 0.08) !important;
}
.option-label {
  color: #333;
}
.grade-display {
  background: rgba(var(--v-theme-primary), 0.05);
  padding: 2rem;
  border-radius: 2rem;
  display: inline-block;
  min-width: 250px;
}
</style>
