<template>
  <v-card class="pa-4 pa-md-8 rounded-3xl glass-card overflow-hidden" border="1">
    <div class="text-center mb-6">
      <v-chip color="deep-purple-darken-2" variant="flat" class="mb-4 px-6 font-weight-black">
        🚀 LA FÁBRICA DE MULTIPLICACIONES
      </v-chip>
      <h2 class="text-h4 font-weight-black mb-2">¡Carga combustible para el despegue!</h2>
      <p class="text-h6 text-medium-emphasis">
        Resuelve las multiplicaciones para llenar el tanque del cohete.
      </p>
    </div>

    <!-- AREA DE JUEGO -->
    <v-row>
      <!-- Cohete y Tanque -->
      <v-col cols="12" md="4" class="d-flex flex-column align-center">
        <div class="rocket-container mb-6">
          <v-img src="https://cdn-icons-png.flaticon.com/512/1033/1033039.png" width="120" :class="{ 'shake-launch': isComplete }"></v-img>
        </div>
        <v-progress-linear
          v-model="fuelLevel"
          color="orange"
          height="30"
          rounded
          striped
          class="fuel-bar"
        >
          <template v-slot:default="{ value }">
            <span class="font-weight-black text-white">{{ Math.ceil(value) }}% Combustible</span>
          </template>
        </v-progress-linear>
      </v-col>

      <!-- Panel de Control -->
      <v-col cols="12" md="8">
        <v-card variant="outlined" class="pa-6 rounded-2xl bg-indigo-darken-4 text-white border-md border-indigo-lighten-2">
          <div v-if="!isComplete">
            <div class="text-h2 font-weight-black text-center mb-8">
              {{ currentProblem.a }} × {{ currentProblem.b }} = ?
            </div>
            <v-row>
              <v-col v-for="option in currentProblem.options" :key="option" cols="6">
                <v-btn
                  block
                  height="80"
                  variant="flat"
                  :color="selectedOption === option ? (option === currentProblem.answer ? 'success' : 'error') : 'indigo-lighten-1'"
                  class="rounded-xl font-weight-black text-h4"
                  @click="checkAnswer(option)"
                  :disabled="selectedOption !== null"
                >
                  {{ option }}
                </v-btn>
              </v-col>
            </v-row>
          </div>

          <!-- FEEDBACK -->
          <v-fade-transition>
            <div v-if="isComplete" class="text-center py-6">
              <v-icon size="80" color="success" class="mb-4">mdi-rocket-launch</v-icon>
              <div class="text-h4 font-weight-black mb-4">¡TANQUE LLENO!</div>
              <p class="text-h6 mb-8">¡El cohete está listo para explorar el espacio!</p>
              
              <v-btn
                color="success"
                size="x-large"
                class="rounded-xl px-12 font-weight-black"
                elevation="8"
                @click="$emit('completada')"
              >
                ¡Despegar! <v-icon end>mdi-chevron-right</v-icon>
              </v-btn>
            </div>
          </v-fade-transition>
        </v-card>
      </v-col>
    </v-row>
  </v-card>
</template>

<script setup>
import { ref, computed } from "vue";

defineEmits(["completada"]);

const problems = [
  { a: 3, b: 4, answer: 12, options: [10, 12, 14, 16] },
  { a: 5, b: 6, answer: 30, options: [25, 30, 35, 40] },
  { a: 7, b: 3, answer: 21, options: [18, 20, 21, 24] },
  { a: 8, b: 2, answer: 16, options: [14, 16, 18, 20] },
  { a: 4, b: 9, answer: 36, options: [32, 36, 40, 45] },
];

const currentProblemIndex = ref(0);
const selectedOption = ref(null);
const fuelLevel = ref(0);

const shuffledProblems = ref([...problems].sort(() => Math.random() - 0.5));
const currentProblem = computed(() => shuffledProblems.value[currentProblemIndex.value]);
const isComplete = computed(() => fuelLevel.value >= 100);

const checkAnswer = (option) => {
  selectedOption.value = option;
  if (option === currentProblem.value.answer) {
    fuelLevel.value += 20;
    setTimeout(() => {
      if (currentProblemIndex.value < problems.length - 1) {
        currentProblemIndex.value++;
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
.fuel-bar {
  border: 2px solid #333;
  width: 100%;
}
.rocket-container {
  height: 150px;
  display: flex;
  align-items: flex-end;
}
.shake-launch {
  animation: launch 0.5s ease-in infinite;
}
@keyframes launch {
  0% { transform: translateY(0) translateX(0); }
  25% { transform: translateY(-2px) translateX(1px); }
  50% { transform: translateY(0) translateX(-1px); }
  75% { transform: translateY(-2px) translateX(1px); }
  100% { transform: translateY(-100vh); }
}
</style>
