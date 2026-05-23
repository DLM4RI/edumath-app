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
    category: "Problemas Aditivos",
    text: "🚌 Un autobús llevaba 25 pasajeros. En la primera parada subieron 15 y bajaron 8. ¿Cuántos pasajeros quedan?",
    options: [
      { label: "32 pasajeros", correct: true },
      { label: "40 pasajeros", correct: false },
      { label: "18 pasajeros", correct: false },
      { label: "35 pasajeros", correct: false },
    ],
  },
  {
    category: "Multiplicación",
    text: "✖️ ¿Cuánto es 6 veces 4 (6 x 4)?",
    options: [
      { label: "20", correct: false },
      { label: "24", correct: true },
      { label: "18", correct: false },
      { label: "28", correct: false },
    ],
  },
  {
    category: "Problemas Multiplicativos",
    text: "📦 En una caja caben 8 chocolates. Si tienes 5 cajas llenas, ¿cuántos chocolates tienes en total?",
    options: [
      { label: "13 chocolates", correct: false },
      { label: "40 chocolates", correct: true },
      { label: "45 chocolates", correct: false },
      { label: "32 chocolates", correct: false },
    ],
  },
  {
    category: "Repartos",
    text: "➗ Tienes 20 canicas y quieres repartirlas por igual entre 4 amigos. ¿Cuántas canicas le tocan a cada uno?",
    options: [
      { label: "4 canicas", correct: false },
      { label: "5 canicas", correct: true },
      { label: "6 canicas", correct: false },
      { label: "10 canicas", correct: false },
    ],
  },
  {
    category: "Fracciones",
    text: "🍰 Si divides una torta en 4 partes iguales y te comes 1 parte, ¿qué fracción de la torta te comiste?",
    options: [
      { label: "1/2", correct: false },
      { label: "1/4", correct: true },
      { label: "1/3", correct: false },
      { label: "3/4", correct: false },
    ],
  },
  {
    category: "Fracciones",
    text: "🍕 ¿Qué es mayor, 1/2 de pizza o 1/4 de pizza?",
    options: [
      { label: "1/4 es mayor", correct: false },
      { label: "1/2 es mayor", correct: true },
      { label: "Son iguales", correct: false },
      { label: "Ninguna", correct: false },
    ],
  },
  {
    category: "Valor Posicional",
    text: "🔢 ¿Qué número representa 5 centenas, 0 decenas y 3 unidades?",
    options: [
      { label: "53", correct: false },
      { label: "530", correct: false },
      { label: "503", correct: true },
      { label: "305", correct: false },
    ],
  },
  {
    category: "Operaciones",
    text: "➕➖ ¿Cuánto es 100 - 25 + 10?",
    options: [
      { label: "85", correct: true },
      { label: "75", correct: false },
      { label: "65", correct: false },
      { label: "90", correct: false },
    ],
  },
  {
    category: "Multiplicación Inversa",
    text: "🤔 Si 5 x 6 = 30, entonces ¿cuánto es 30 dividido entre 5?",
    options: [
      { label: "5", correct: false },
      { label: "6", correct: true },
      { label: "7", correct: false },
      { label: "35", correct: false },
    ],
  },
  {
    category: "Problemas Multiplicativos",
    text: "🚲 En un parque hay 7 triciclos. Si cada triciclo tiene 3 llantas, ¿cuántas llantas hay en total?",
    options: [
      { label: "10 llantas", correct: false },
      { label: "21 llantas", correct: true },
      { label: "14 llantas", correct: false },
      { label: "18 llantas", correct: false },
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
  saveExamResult('3', score.value, questions.length, topicsMap);

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
