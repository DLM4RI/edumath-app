<template>
  <v-card class="pa-4 pa-md-8 rounded-3xl glass-card overflow-hidden" border="1">
    <div class="text-center mb-6">
      <v-chip color="light-blue-darken-3" variant="flat" class="mb-4 px-6 font-weight-black">
        🧪 EL LABORATORIO DE LAS POTENCIAS
      </v-chip>
      <h2 class="text-h4 font-weight-black mb-2">¡Calcula la potencia exacta!</h2>
      <p class="text-h6 text-medium-emphasis">
        Selecciona el resultado de elevar la <strong>base</strong> al <strong>exponente</strong> indicado.
      </p>
    </div>

    <!-- AREA DE JUEGO -->
    <v-row justify="center">
      <!-- Instrumento Principal -->
      <v-col cols="12" md="5" class="text-center">
        <v-card variant="flat" class="pa-8 rounded-2xl bg-light-blue-lighten-5 border-md border-light-blue-lighten-2 h-100 d-flex flex-column align-center justify-center">
          <div class="d-flex align-start justify-center mt-4">
            <span class="text-h1 font-weight-black text-light-blue-darken-4">{{ currentChallenge.base }}</span>
            <span class="text-h4 font-weight-bold text-light-blue-darken-2 mt-2">{{ currentChallenge.exponent }}</span>
          </div>
          <v-icon size="40" color="light-blue" class="my-4">mdi-arrow-down</v-icon>
          <div class="text-h4 font-weight-bold text-grey-darken-1">?</div>
        </v-card>
      </v-col>

      <!-- Opciones de Calibración -->
      <v-col cols="12" md="7">
        <v-row>
          <v-col v-for="(option, index) in currentChallenge.options" :key="index" cols="6">
            <v-card
              variant="outlined"
              class="pa-6 rounded-xl text-center cursor-pointer calibration-card transition-all"
              :class="{
                'bg-success-lighten-4 border-success': selectedOption === index && option.correct,
                'bg-error-lighten-4 border-error': selectedOption === index && !option.correct,
                'bg-white': selectedOption !== index
              }"
              @click="checkOption(index)"
            >
              <div class="text-h3 font-weight-black">{{ option.label }}</div>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <!-- FEEDBACK FINAL -->
    <v-fade-transition>
      <div v-if="isComplete" class="text-center mt-10">
        <v-alert
          type="success"
          variant="flat"
          class="rounded-xl mb-6 py-6"
          icon="mdi-brain"
        >
          <div class="text-h5 font-weight-black">¡Científico de Élite!</div>
          <div class="text-body-1">Tus cálculos de potenciación son increíbles.</div>
        </v-alert>

        <v-btn
          color="success"
          size="x-large"
          class="rounded-xl px-12 font-weight-black"
          elevation="8"
          @click="$emit('completada')"
        >
          ¡Finalizar Aventura! <v-icon end>mdi-chevron-right</v-icon>
        </v-btn>
      </div>
    </v-fade-transition>
  </v-card>
</template>

<script setup>
import { ref, computed } from "vue";

defineEmits(["completada"]);

const challenges = [
  {
    base: 2, exponent: 3, // 2^3 = 8
    options: [
      { label: "6", correct: false },
      { label: "8", correct: true },
      { label: "5", correct: false },
      { label: "9", correct: false },
    ]
  },
  {
    base: 3, exponent: 2, // 3^2 = 9
    options: [
      { label: "6", correct: false },
      { label: "9", correct: true },
      { label: "12", correct: false },
      { label: "5", correct: false },
    ]
  },
  {
    base: 4, exponent: 2, // 4^2 = 16
    options: [
      { label: "8", correct: false },
      { label: "12", correct: false },
      { label: "16", correct: true },
      { label: "20", correct: false },
    ]
  },
  {
    base: 5, exponent: 2, // 5^2 = 25
    options: [
      { label: "10", correct: false },
      { label: "25", correct: true },
      { label: "15", correct: false },
      { label: "20", correct: false },
    ]
  }
];

const currentIndex = ref(0);
const solvedCount = ref(0);
const selectedOption = ref(null);

const shuffledChallenges = ref([...challenges].sort(() => Math.random() - 0.5));
const currentChallenge = computed(() => shuffledChallenges.value[currentIndex.value]);
const isComplete = computed(() => solvedCount.value === challenges.length);

const checkOption = (index) => {
  if (selectedOption.value !== null) return;
  selectedOption.value = index;
  
  if (currentChallenge.value.options[index].correct) {
    setTimeout(() => {
      solvedCount.value++;
      if (currentIndex.value < challenges.length - 1) {
        currentIndex.value++;
        selectedOption.value = null;
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
.calibration-card {
  border-width: 2px;
}
.calibration-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}
.transition-all {
  transition: all 0.3s ease;
}
</style>
