<template>
  <v-card class="pa-4 pa-md-8 rounded-3xl glass-card overflow-hidden" border="1">
    <div class="text-center mb-6">
      <v-chip color="light-blue-darken-3" variant="flat" class="mb-4 px-6 font-weight-black">
        🧪 EL LABORATORIO DE UNIDADES
      </v-chip>
      <h2 class="text-h4 font-weight-black mb-2">¡Calibra los instrumentos!</h2>
      <p class="text-h6 text-medium-emphasis">
        Selecciona la medida equivalente para que el experimento funcione.
      </p>
    </div>

    <!-- AREA DE JUEGO -->
    <v-row justify="center">
      <!-- Instrumento Principal -->
      <v-col cols="12" md="5" class="text-center">
        <v-card variant="flat" class="pa-8 rounded-2xl bg-light-blue-lighten-5 border-md border-light-blue-lighten-2 h-100 d-flex flex-column align-center justify-center">
          <v-icon size="100" color="light-blue-darken-2">mdi-flask-empty-outline</v-icon>
          <div class="text-h2 font-weight-black mt-4 text-light-blue-darken-4">
            {{ currentChallenge.value }} {{ currentChallenge.unit }}
          </div>
          <v-icon size="40" color="light-blue" class="my-4">mdi-equal</v-icon>
          <div class="text-h4 font-weight-bold text-grey-darken-1">? {{ currentChallenge.targetUnit }}</div>
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
              <div class="text-h4 font-weight-black">{{ option.label }}</div>
              <div class="text-subtitle-1">{{ currentChallenge.targetUnit }}</div>
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
          icon="mdi-flask-check"
        >
          <div class="text-h5 font-weight-black">¡Científico de Élite!</div>
          <div class="text-body-1">Tus cálculos de conversión son increíblemente precisos.</div>
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
    value: 5, unit: "km", targetUnit: "m",
    options: [
      { label: "50", correct: false },
      { label: "500", correct: false },
      { label: "5.000", correct: true },
      { label: "50.000", correct: false },
    ]
  },
  {
    value: 2, unit: "kg", targetUnit: "g",
    options: [
      { label: "200", correct: false },
      { label: "2.000", correct: true },
      { label: "20.000", correct: false },
      { label: "20", correct: false },
    ]
  },
  {
    value: 3, unit: "L", targetUnit: "ml",
    options: [
      { label: "300", correct: false },
      { label: "30", correct: false },
      { label: "3.000", correct: true },
      { label: "30.000", correct: false },
    ]
  },
  {
    value: 4.5, unit: "m", targetUnit: "cm",
    options: [
      { label: "45", correct: false },
      { label: "450", correct: true },
      { label: "4.500", correct: false },
      { label: "4,5", correct: false },
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
