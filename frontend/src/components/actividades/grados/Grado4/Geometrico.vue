<template>
  <v-card class="pa-4 pa-md-8 rounded-3xl glass-card overflow-hidden" border="1">
    <div class="text-center mb-6">
      <v-chip color="blue-darken-3" variant="flat" class="mb-4 px-6 font-weight-black">
        🔢 EL MAESTRO DE LOS DECIMALES
      </v-chip>
      <h2 class="text-h4 font-weight-black mb-2">¡Suma los números decimales!</h2>
      <p class="text-h6 text-medium-emphasis">
        Resuelve la operación y selecciona el <strong>resultado</strong> correcto.
      </p>
    </div>

    <!-- AREA DE JUEGO -->
    <v-row>
      <!-- Visualización -->
      <v-col cols="12" md="6" class="d-flex justify-center align-center">
        <v-card variant="outlined" class="pa-6 rounded-2xl bg-grey-lighten-4 border-dashed position-relative overflow-hidden w-100 d-flex justify-center align-center" style="min-height: 300px;">
          <div class="mt-4 font-weight-black text-h2 text-center" style="color: #1565C0;">
            {{ currentChallenge.expression }}
          </div>
        </v-card>
      </v-col>

      <!-- Opciones -->
      <v-col cols="12" md="6" class="d-flex flex-column justify-center gap-4">
        <v-btn
          v-for="option in currentChallenge.options"
          :key="option"
          size="x-large"
          variant="flat"
          :color="selectedOption === option ? (option === currentChallenge.answer ? 'success' : 'error') : 'blue-darken-1'"
          class="rounded-xl font-weight-black py-8"
          @click="checkOption(option)"
          :disabled="isCorrect"
        >
          {{ option }}
        </v-btn>
      </v-col>
    </v-row>

    <!-- FEEDBACK -->
    <v-fade-transition>
      <div v-if="isComplete" class="text-center mt-10">
        <v-alert
          type="success"
          variant="tonal"
          class="rounded-xl mb-6 py-6"
          icon="mdi-calculator"
        >
          <div class="text-h5 font-weight-black">¡Mente Brillante!</div>
          <div class="text-body-1">Has dominado las sumas con números decimales.</div>
        </v-alert>

        <v-btn
          color="success"
          size="x-large"
          class="rounded-xl px-12 font-weight-black"
          elevation="8"
          @click="$emit('completada')"
        >
          ¡Siguiente Misión! <v-icon end>mdi-chevron-right</v-icon>
        </v-btn>
      </div>
    </v-fade-transition>
  </v-card>
</template>

<script setup>
import { ref, computed } from "vue";

defineEmits(["completada"]);

const challenges = [
  { expression: "1.5 + 2.0", answer: "3.5", options: ["2.5", "3.0", "3.5"] },
  { expression: "0.8 + 0.4", answer: "1.2", options: ["1.0", "1.2", "0.12"] },
  { expression: "2.5 + 2.5", answer: "5.0", options: ["4.5", "5.0", "5.5"] },
  { expression: "3.2 + 1.1", answer: "4.3", options: ["4.3", "4.2", "3.3"] },
];

const currentIndex = ref(0);
const solvedCount = ref(0);
const selectedOption = ref(null);
const isCorrect = ref(false);

const shuffledChallenges = ref([...challenges].sort(() => Math.random() - 0.5));
const currentChallenge = computed(() => shuffledChallenges.value[currentIndex.value]);
const totalChallenges = challenges.length;
const isComplete = computed(() => solvedCount.value === totalChallenges);

const checkOption = (option) => {
  selectedOption.value = option;
  if (option === currentChallenge.value.answer) {
    isCorrect.value = true;
    setTimeout(() => {
      solvedCount.value++;
      if (currentIndex.value < totalChallenges - 1) {
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
