<template>
  <v-card class="pa-8 rounded-3xl glass-card overflow-hidden" border="1">
    <div class="text-center mb-8">
      <v-avatar color="primary-lighten-4" size="90" class="mb-4">
        <v-icon color="primary" size="45">mdi-school</v-icon>
      </v-avatar>
      <h2 class="text-h4 font-weight-black mb-2">Desafío Final: Grado 1°</h2>
      <p class="text-body-1 text-medium-emphasis">
        Demuestra lo que has aprendido sobre los números y las operaciones.
      </p>
    </div>

    <v-window v-model="currentStep">
      <!-- PREGUNTAS -->
      <v-window-item
        v-for="(q, index) in questions"
        :key="index"
        :value="index"
      >
        <v-card variant="flat" class="pa-4 bg-transparent">
          <div class="d-flex align-center mb-4">
            <v-chip color="primary" variant="flat" size="small" class="mr-2"
              >Pregunta {{ index + 1 }} / {{ questions.length }}</v-chip
            >
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
            <v-radio
              v-for="(option, optIdx) in q.options"
              :key="optIdx"
              :label="option.label"
              :value="optIdx"
              class="mb-3 pa-3 rounded-xl border"
              :class="{
                'bg-primary-lighten-5 border-primary':
                  answers[index] === optIdx,
              }"
            ></v-radio>
          </v-radio-group>
        </v-card>
      </v-window-item>

      <!-- RESULTADOS -->
      <v-window-item :value="questions.length">
        <div class="text-center pa-6">
          <v-icon
            :color="score >= 3 ? 'success' : 'error'"
            size="100"
            class="mb-4"
          >
            {{ score >= 3 ? "mdi-trophy" : "mdi-emoticon-sad" }}
          </v-icon>
          <h3 class="text-h4 font-weight-black mb-2">
            {{ score >= 3 ? "¡Felicidades!" : "¡Sigue practicando!" }}
          </h3>
          <p class="text-h6 mb-6">
            Tu puntaje fue de {{ score }} / {{ questions.length }}
          </p>

          <v-btn
            color="primary"
            size="x-large"
            class="rounded-xl px-12"
            @click="$emit('finalizado')"
          >
            Finalizar Evaluación
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
        :disabled="currentStep === 0"
        @click="currentStep--"
      >
        Anterior
      </v-btn>

      <v-btn
        color="primary"
        size="large"
        class="rounded-xl px-8"
        :disabled="answers[currentStep] === null"
        @click="nextStep"
      >
        {{ currentStep === questions.length - 1 ? "Calificar" : "Siguiente" }}
      </v-btn>
    </div>
  </v-card>
</template>

<script setup>
import { ref } from "vue";

const emit = defineEmits(["finalizado"]);

const currentStep = ref(0);
const score = ref(0);

const questions = [
  {
    text: "¿Cuántas estrellas hay en total?",
    imagePath: "/img/grado1_eval_1.png",
    options: [
      { label: "6 estrellas", correct: false },
      { label: "7 estrellas", correct: true },
      { label: "8 estrellas", correct: false },
    ],
  },
  {
    text: "Si tienes 3 manzanas y compras otras 2, ¿cuántas tienes ahora?",
    imagePath: "/img/grado1_eval_2.png",
    options: [
      { label: "5 manzanas", correct: true },
      { label: "4 manzanas", correct: false },
      { label: "6 manzanas", correct: false },
    ],
  },
  {
    text: "¿Cuál grupo tiene MÁS elementos?",
    imagePath: "/img/grado1_eval_3.png",
    options: [
      { label: "El grupo de 4 carros", correct: false },
      { label: "El grupo de 6 carros", correct: true },
      { label: "Son iguales", correct: false },
    ],
  },
  {
    text: "Había 8 pájaros en un árbol y se fueron 3 volando. ¿Cuántos quedaron?",
    imagePath: "/img/grado1_eval_4.png",
    options: [
      { label: "11 pájaros", correct: false },
      { label: "5 pájaros", correct: true },
      { label: "4 pájaros", correct: false },
    ],
  },
  {
    text: "Para saber cuántos juguetes tienes si te regalan más, ¿qué operación debes usar?",
    imagePath: "/img/grado1_eval_5.png",
    options: [
      { label: "Suma (+)", correct: true },
      { label: "Resta (-)", correct: false },
      { label: "Ninguna", correct: false },
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
  answers.value.forEach((answer, index) => {
    if (questions[index].options[answer].correct) {
      total++;
    }
  });
  score.value = total;
};
</script>

<style scoped>
.glass-card {
  background: rgba(255, 255, 255, 0.9) !important;
  backdrop-filter: blur(10px);
}
.custom-radio-group :deep(.v-selection-control) {
  width: 100%;
}
</style>
