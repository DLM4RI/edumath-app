<template>
  <v-card class="pa-4 pa-md-8 rounded-3xl glass-card overflow-hidden" border="1">
    <div class="text-center mb-6">
      <v-chip color="cyan-darken-2" variant="flat" class="mb-4 px-6 font-weight-black">
        🔢 EL MAESTRO DE LAS TABLAS
      </v-chip>
      <h2 class="text-h4 font-weight-black mb-2">¡Resuelve las multiplicaciones!</h2>
      <p class="text-h6 text-medium-emphasis">
        Mira la operación y selecciona el <strong>resultado</strong> correcto.
      </p>
    </div>

    <!-- AREA DE JUEGO -->
    <v-row>
      <!-- Visualización de la operación -->
      <v-col cols="12" md="6" class="d-flex justify-center align-center">
        <v-card variant="outlined" class="pa-10 rounded-2xl bg-white border-dashed d-flex justify-center align-center" style="min-height: 300px; width: 100%;">
          <div class="text-h1 font-weight-black" style="font-size: 5rem !important; color: #00838F;">
            {{ currentOperation.text }}
          </div>
        </v-card>
      </v-col>

      <!-- Opciones -->
      <v-col cols="12" md="6" class="d-flex flex-column justify-center gap-4">
        <v-btn
          v-for="option in currentOperation.options"
          :key="option"
          size="x-large"
          variant="flat"
          :color="selectedOption === option ? (option === currentOperation.answer ? 'success' : 'error') : 'cyan-darken-1'"
          class="rounded-xl font-weight-black py-8"
          @click="checkAnswer(option)"
          :disabled="isCorrect"
        >
          {{ option }}
        </v-btn>
      </v-col>
    </v-row>

    <!-- PROGRESO -->
    <div class="mt-8 text-center">
      <v-chip color="primary" variant="tonal" size="large" class="font-weight-black">
        Operaciones resueltas: {{ solvedCount }} / {{ totalOperations }}
      </v-chip>
    </div>

    <!-- FEEDBACK -->
    <v-fade-transition>
      <div v-if="isComplete" class="text-center mt-10">
        <v-alert
          type="success"
          variant="tonal"
          class="rounded-xl mb-6 py-6"
          icon="mdi-calculator"
        >
          <div class="text-h5 font-weight-black">¡Gran Matemático!</div>
          <div class="text-body-1">Has resuelto todas las operaciones perfectamente.</div>
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
  </v-card>
</template>

<script setup>
import { ref, computed } from "vue";

defineEmits(["completada"]);

const operations = [
  { text: "3 x 4", answer: 12, options: [10, 12, 14] },
  { text: "5 x 5", answer: 25, options: [20, 25, 30] },
  { text: "6 x 3", answer: 18, options: [18, 21, 24] },
  { text: "4 x 4", answer: 16, options: [12, 16, 20] },
  { text: "7 x 2", answer: 14, options: [12, 14, 16] },
];

const currentIndex = ref(0);
const solvedCount = ref(0);
const selectedOption = ref(null);
const isCorrect = ref(false);

const shuffledOperations = ref([...operations].sort(() => Math.random() - 0.5));
const currentOperation = computed(() => shuffledOperations.value[currentIndex.value]);
const totalOperations = operations.length;
const isComplete = computed(() => solvedCount.value === totalOperations);

const checkAnswer = (option) => {
  selectedOption.value = option;
  if (option === currentOperation.value.answer) {
    isCorrect.value = true;
    setTimeout(() => {
      solvedCount.value++;
      if (currentIndex.value < totalOperations - 1) {
        currentIndex.value++;
        selectedOption.value = null;
        isCorrect.value = false;
      }
    }, 1000);
  } else {
    setTimeout(() => {
      selectedOption.value = null;
    }, 1500);
  }
};
</script>

<style scoped>
.glass-card {
  background: rgba(255, 255, 255, 0.9) !important;
  backdrop-filter: blur(10px);
}
.gap-4 {
  gap: 16px;
}
</style>
