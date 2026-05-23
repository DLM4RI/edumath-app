<template>
  <v-card class="pa-4 pa-md-8 rounded-3xl glass-card overflow-hidden" border="1">
    <div class="text-center mb-6">
      <v-chip color="indigo-darken-2" variant="flat" class="mb-4 px-6 font-weight-black">
        🧊 FRACCIONES ESPACIALES
      </v-chip>
      <h2 class="text-h4 font-weight-black mb-2">¡Encuentra la fracción equivalente!</h2>
      <p class="text-h6 text-medium-emphasis">
        Selecciona la fracción que equivale a <strong>{{ currentChallenge.target }}</strong>.
      </p>
    </div>

    <!-- AREA DE JUEGO -->
    <v-row>
      <!-- Visualización -->
      <v-col cols="12" md="6" class="d-flex justify-center align-center">
        <v-card variant="outlined" class="pa-10 rounded-2xl bg-indigo-lighten-5 border-indigo-lighten-2 position-relative d-flex justify-center align-center" style="min-height: 300px; width: 100%;">
          <div class="text-h1 font-weight-black text-indigo-darken-4">
            {{ currentChallenge.fraction }}
          </div>
        </v-card>
      </v-col>

      <!-- Opciones -->
      <v-col cols="12" md="6" class="d-flex flex-column justify-center gap-4">
        <div class="text-h6 font-weight-bold mb-2 text-center">Fracción equivalente:</div>
        <v-row>
          <v-col v-for="option in currentChallenge.options" :key="option" cols="6">
            <v-btn
              block
              size="x-large"
              variant="flat"
              :color="selectedOption === option ? (option === currentChallenge.answer ? 'success' : 'error') : 'indigo-darken-1'"
              class="rounded-xl font-weight-black py-8 text-h4"
              @click="checkOption(option)"
              :disabled="isCorrect"
            >
              {{ option }}
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <!-- PROGRESO -->
    <div class="mt-8 text-center">
      <v-chip color="primary" variant="tonal" size="large" class="font-weight-black">
        Fracciones analizadas: {{ solvedCount }} / {{ totalChallenges }}
      </v-chip>
    </div>

    <!-- FEEDBACK -->
    <v-fade-transition>
      <div v-if="isComplete" class="text-center mt-10">
        <v-alert
          type="success"
          variant="tonal"
          class="rounded-xl mb-6 py-6"
          icon="mdi-fraction-one-half"
        >
          <div class="text-h5 font-weight-black">¡Ingeniero de Fracciones!</div>
          <div class="text-body-1">Conoces a la perfección las equivalencias numéricas.</div>
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
  { fraction: "1/2", target: "un medio", answer: "2/4", options: ["1/4", "2/4", "3/4", "4/4"] },
  { fraction: "1/3", target: "un tercio", answer: "2/6", options: ["2/3", "3/6", "2/6", "4/6"] },
  { fraction: "3/4", target: "tres cuartos", answer: "6/8", options: ["4/8", "6/8", "5/8", "2/8"] },
  { fraction: "2/5", target: "dos quintos", answer: "4/10", options: ["2/10", "3/10", "4/10", "5/10"] },
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
