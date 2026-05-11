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

          <v-img
            v-if="q.imagePath"
            :src="q.imagePath"
            height="200"
            class="rounded-2xl mb-6 bg-grey-lighten-4 border"
            cover
          >
            <template v-slot:placeholder>
              <div class="d-flex align-center justify-center fill-height">
                <v-icon size="48" color="grey-lighten-2">mdi-image-outline</v-icon>
              </div>
            </template>
          </v-img>

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
    text: "¿Cuántas estrellas ves en el cielo si hay 7 brillantes?",
    options: [
      { label: "5 estrellas", correct: false },
      { label: "7 estrellas", correct: true },
      { label: "8 estrellas", correct: false },
      { label: "6 estrellas", correct: false },
    ],
  },
  {
    category: "Números",
    text: "¿Qué número sigue después del 19?",
    options: [
      { label: "18", correct: false },
      { label: "20", correct: true },
      { label: "21", correct: false },
      { label: "10", correct: false },
    ],
  },
  {
    category: "Números",
    text: "¿Qué número está antes del 11?",
    options: [
      { label: "12", correct: false },
      { label: "10", correct: true },
      { label: "9", correct: false },
      { label: "13", correct: false },
    ],
  },
  {
    category: "Comparación",
    text: "¿Cuál número es el más grande (MAYOR)?",
    options: [
      { label: "5", correct: false },
      { label: "12", correct: false },
      { label: "8", correct: false },
      { label: "15", correct: true },
    ],
  },
  {
    category: "Comparación",
    text: "¿Cuál número es the más pequeño (MENOR)?",
    options: [
      { label: "20", correct: false },
      { label: "15", correct: false },
      { label: "10", correct: true },
      { label: "25", correct: false },
    ],
  },
  {
    category: "Suma",
    text: "¿Cuánto es 3 + 5?",
    options: [
      { label: "7", correct: false },
      { label: "8", correct: true },
      { label: "9", correct: false },
      { label: "6", correct: false },
    ],
  },
  {
    category: "Suma",
    text: "Si tienes 10 dulces y te regalan 4 más, ¿cuántos tienes ahora?",
    options: [
      { label: "14 dulces", correct: true },
      { label: "12 dulces", correct: false },
      { label: "6 dulces", correct: false },
      { label: "16 dulces", correct: false },
    ],
  },
  {
    category: "Resta",
    text: "¿Cuánto es 9 - 3?",
    options: [
      { label: "5", correct: false },
      { label: "6", correct: true },
      { label: "4", correct: false },
      { label: "7", correct: false },
    ],
  },
  {
    category: "Resta",
    text: "Tenías 8 globos y se explotaron 2. ¿Cuántos te quedan?",
    options: [
      { label: "10 globos", correct: false },
      { label: "6 globos", correct: true },
      { label: "5 globos", correct: false },
      { label: "8 globos", correct: false },
    ],
  },
  {
    category: "Conjuntos",
    text: "¿Qué es un CONJUNTO?",
    options: [
      { label: "Un solo objeto", correct: false },
      { label: "Un grupo de objetos con algo en común", correct: true },
      { label: "Un número grande", correct: false },
      { label: "Una línea recta", correct: false },
    ],
  },
  {
    category: "Conjuntos",
    text: "Si tenemos un conjunto de FRUTAS, ¿cuál de estos NO pertenece?",
    options: [
      { label: "Manzana", correct: false },
      { label: "Banano", correct: false },
      { label: "Un carro", correct: true },
      { label: "Pera", correct: false },
    ],
  },
  {
    category: "Conjuntos",
    text: "¿Cuántos elementos hay en un conjunto que tiene: un lápiz, un borrador y un cuaderno?",
    options: [
      { label: "2 elementos", correct: false },
      { label: "3 elementos", correct: true },
      { label: "4 elementos", correct: false },
      { label: "1 elemento", correct: false },
    ],
  },
  {
    category: "Secuencias",
    text: "¿Qué número falta en esta serie: 2, 4, 6, __, 10?",
    options: [
      { label: "7", correct: false },
      { label: "8", correct: true },
      { label: "9", correct: false },
      { label: "5", correct: false },
    ],
  },
  {
    category: "Geometría",
    text: "¿Cuál de estas figuras tiene 4 lados iguales?",
    options: [
      { label: "Círculo", correct: false },
      { label: "Triángulo", correct: false },
      { label: "Cuadrado", correct: true },
      { label: "Rectángulo", correct: false },
    ],
  },
  {
    category: "Geometría",
    text: "¿Cuántos lados tiene un TRIÁNGULO?",
    options: [
      { label: "4 lados", correct: false },
      { label: "2 lados", correct: false },
      { label: "3 lados", correct: true },
      { label: "5 lados", correct: false },
    ],
  },
  {
    category: "Unidades y Decenas",
    text: "¿Cuántas unidades forman una DECENA?",
    options: [
      { label: "5 unidades", correct: false },
      { label: "10 unidades", correct: true },
      { label: "20 unidades", correct: false },
      { label: "1 unidad", correct: false },
    ],
  },
  {
    category: "Unidades y Decenas",
    text: "El número 13 está formado por:",
    options: [
      { label: "1 decena y 3 unidades", correct: true },
      { label: "3 decenas y 1 unidad", correct: false },
      { label: "10 decenas", correct: false },
      { label: "13 decenas", correct: false },
    ],
  },
  {
    category: "Medición",
    text: "¿Cuál objeto es el más LARGO?",
    options: [
      { label: "Un lápiz nuevo", correct: true },
      { label: "Un borrador pequeño", correct: false },
      { label: "Un clip", correct: false },
      { label: "Una uña", correct: false },
    ],
  },
  {
    category: "Medición",
    text: "¿Cuál animal es el más PESADO?",
    options: [
      { label: "Una hormiga", correct: false },
      { label: "Un elefante", correct: true },
      { label: "Un pollito", correct: false },
      { label: "Un ratón", correct: false },
    ],
  },
  {
    category: "Espacial",
    text: "¿Dónde están las nubes?",
    options: [
      { label: "Abajo en el suelo", correct: false },
      { label: "Arriba en el cielo", correct: true },
      { label: "Adentro de la casa", correct: false },
      { label: "Detrás de la puerta", correct: false },
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
  // Aquí se implementaría la navegación al componente de contenido específico
  // Por ahora, emitimos un evento o usamos el router si estuviera disponible
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
