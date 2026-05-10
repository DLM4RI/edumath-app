<template>
  <v-card class="pa-4 pa-md-8 rounded-3xl glass-card overflow-hidden" border="1">
    <div class="text-center mb-6">
      <v-chip color="green-darken-3" variant="flat" class="mb-4 px-6 font-weight-black">
        🐸 EL GRAN SALTO DE LA RANA
      </v-chip>
      <h2 class="text-h4 font-weight-black mb-2">¡Ayuda a Rosita a cruzar el charco!</h2>
      <p class="text-h6 text-medium-emphasis">
        Resuelve la suma para que la rana pueda saltar a la siguiente hoja.
      </p>
    </div>

    <!-- AREA DE JUEGO -->
    <v-row justify="center" align="center">
      <v-col cols="12" md="8">
        <v-card variant="flat" class="pa-6 rounded-2xl bg-blue-lighten-5 border-sm border-blue-lighten-3 position-relative overflow-hidden" style="min-height: 300px;">
          <!-- Fondo de charco -->
          <div class="water-background"></div>
          
          <!-- Lily Pads and Frog -->
          <div class="d-flex justify-space-around align-center fill-height position-relative" style="z-index: 1;">
            <div v-for="i in 3" :key="i" class="lily-pad-container">
              <v-img src="https://cdn-icons-png.flaticon.com/512/1155/1155307.png" width="80" class="lily-pad"></v-img>
              <div v-if="frogPosition === i - 1" class="frog-icon">
                <v-img src="https://cdn-icons-png.flaticon.com/512/3590/3590396.png" width="60"></v-img>
              </div>
            </div>
          </div>

          <!-- Problema Matemático -->
          <v-fade-transition hide-on-leave>
            <div v-if="!isComplete" class="math-problem text-center mt-10">
              <div class="d-flex justify-center align-center">
                <div class="text-h2 font-weight-black mr-4">{{ currentProblem.a }}</div>
                <div class="text-h2 font-weight-black mr-4">+</div>
                <div class="text-h2 font-weight-black mr-4">{{ currentProblem.b }}</div>
                <div class="text-h2 font-weight-black mr-4">=</div>
                <v-text-field
                  v-model="userAnswer"
                  variant="outlined"
                  class="answer-input"
                  hide-details
                  type="number"
                  @keyup.enter="checkAnswer"
                  autofocus
                ></v-text-field>
              </div>
              <v-btn color="primary" class="mt-6 rounded-xl font-weight-black px-10" size="large" @click="checkAnswer">
                ¡Saltar!
              </v-btn>
            </div>
          </v-fade-transition>
        </v-card>
      </v-col>
    </v-row>

    <!-- FEEDBACK -->
    <v-fade-transition>
      <div v-if="isComplete" class="text-center mt-10">
        <v-alert
          type="success"
          variant="flat"
          class="rounded-xl mb-6 py-6"
          icon="mdi-check-decagram"
        >
          <div class="text-h5 font-weight-black">¡Misión Cumplida!</div>
          <div class="text-body-1">Has ayudado a Rosita a llegar a la orilla.</div>
        </v-alert>

        <v-btn
          color="success"
          size="x-large"
          class="rounded-xl px-12 font-weight-black"
          elevation="8"
          @click="$emit('completada')"
        >
          ¡Siguiente Desafío! <v-icon end>mdi-chevron-right</v-icon>
        </v-btn>
      </div>
    </v-fade-transition>

    <!-- Error Shake -->
    <v-snackbar v-model="showError" color="error" timeout="2000" rounded="pill" class="mb-10">
      <div class="text-center w-100 font-weight-bold">¡Casi! Inténtalo de nuevo. 🐸</div>
    </v-snackbar>
  </v-card>
</template>

<script setup>
import { ref, computed } from "vue";

defineEmits(["completada"]);

const problems = [
  { a: 25, b: 18, result: 43 },
  { a: 56, b: 27, result: 83 },
  { a: 39, b: 45, result: 84 },
];

const currentProblemIndex = ref(0);
const frogPosition = ref(0);
const userAnswer = ref("");
const showError = ref(false);

const shuffledProblems = ref([...problems].sort(() => Math.random() - 0.5));
const currentProblem = computed(() => shuffledProblems.value[currentProblemIndex.value]);
const isComplete = computed(() => frogPosition.value >= 2);

const checkAnswer = () => {
  if (parseInt(userAnswer.value) === currentProblem.value.result) {
    frogPosition.value++;
    userAnswer.value = "";
    if (currentProblemIndex.value < problems.length - 1) {
      currentProblemIndex.value++;
    }
  } else {
    showError.value = true;
    // Shake effect could be added here via CSS class
  }
};
</script>

<style scoped>
.glass-card {
  background: rgba(255, 255, 255, 0.9) !important;
  backdrop-filter: blur(10px);
}
.water-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(180deg, #e3f2fd 0%, #bbdefb 100%);
  z-index: 0;
}
.lily-pad-container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.lily-pad {
  filter: drop-shadow(0 4px 4px rgba(0,0,0,0.1));
}
.frog-icon {
  position: absolute;
  top: -30px;
  animation: float 2s ease-in-out infinite;
}
.answer-input {
  width: 120px;
}
.answer-input :deep(input) {
  text-align: center;
  font-size: 2.5rem !important;
  font-weight: 900;
}
@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
}
.math-problem {
  position: relative;
  z-index: 2;
}
</style>
