<template>
  <v-card class="pa-4 pa-md-8 rounded-3xl glass-card overflow-hidden" border="1">
    <div class="text-center mb-6">
      <v-chip color="red-darken-2" variant="flat" class="mb-4 px-6 font-weight-black">
        🎯 CÁLCULO RÁPIDO
      </v-chip>
      <h2 class="text-h4 font-weight-black mb-2">¡Encuentra la operación!</h2>
      <p class="text-h6 text-medium-emphasis">
        Selecciona la suma correcta que da el resultado mostrado.
      </p>
    </div>

    <!-- AREA DE JUEGO -->
    <v-row justify="center" align="center">
      <!-- Número Objetivo -->
      <v-col cols="12" md="5" class="text-center">
        <v-card variant="flat" class="pa-8 rounded-2xl target-display mb-6">
          <div class="text-caption font-weight-bold text-white mb-2" style="opacity: 0.8;">EL RESULTADO ES:</div>
          <div class="text-h1 font-weight-black text-white">{{ currentChallenge.time }}</div>
          <v-icon color="white" class="mt-2" size="30">mdi-bullseye-arrow</v-icon>
        </v-card>
      </v-col>

      <!-- Opciones de Sumas -->
      <v-col cols="12" md="7">
        <v-row>
          <v-col v-for="(option, index) in currentChallenge.options" :key="index" cols="6">
            <v-card
              variant="outlined"
              class="pa-4 rounded-xl text-center cursor-pointer option-card transition-all"
              :class="{
                'bg-success-lighten-4 border-success': selectedOption === index && option.correct,
                'bg-error-lighten-4 border-error': selectedOption === index && !option.correct,
                'bg-white': selectedOption !== index
              }"
              @click="checkOption(index)"
            >
              <v-icon size="40" color="primary">mdi-plus-box-outline</v-icon>
              <div class="mt-2 font-weight-bold">{{ option.label }}</div>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <!-- FEEDBACK -->
    <v-fade-transition>
      <div v-if="isComplete" class="text-center mt-10">
        <v-alert
          type="success"
          variant="tonal"
          class="rounded-xl mb-6 py-6"
          icon="mdi-timer-sand"
        >
          <div class="text-h5 font-weight-black">¡Maestro del Cálculo!</div>
          <div class="text-body-1">Sabes sumar perfectamente.</div>
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
  {
    time: "15",
    options: [
      { label: "10 + 5", correct: true },
      { label: "8 + 6", correct: false },
      { label: "9 + 7", correct: false },
      { label: "11 + 3", correct: false },
    ]
  },
  {
    time: "20",
    options: [
      { label: "15 + 4", correct: false },
      { label: "10 + 10", correct: true },
      { label: "12 + 7", correct: false },
      { label: "18 + 3", correct: false },
    ]
  }
];

const currentChallengeIndex = ref(0);
const selectedOption = ref(null);
const solvedCount = ref(0);

const shuffledChallenges = ref([...challenges].sort(() => Math.random() - 0.5));
const currentChallenge = computed(() => shuffledChallenges.value[currentChallengeIndex.value]);
const isComplete = computed(() => solvedCount.value === challenges.length);

const checkOption = (index) => {
  if (selectedOption.value !== null) return;
  selectedOption.value = index;
  
  if (currentChallenge.value.options[index].correct) {
    setTimeout(() => {
      solvedCount.value++;
      if (currentChallengeIndex.value < challenges.length - 1) {
        currentChallengeIndex.value++;
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
.target-display {
  background: linear-gradient(135deg, #C62828, #E53935) !important;
  border-radius: 24px !important;
  box-shadow: 0 8px 24px rgba(198, 40, 40, 0.3);
}
.option-card {
  border-width: 2px;
}
.option-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}
.transition-all {
  transition: all 0.3s ease;
}
</style>
