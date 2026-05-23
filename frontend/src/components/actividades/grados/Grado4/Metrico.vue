<template>
  <v-card class="pa-4 pa-md-8 rounded-3xl glass-card overflow-hidden" border="1">
    <div class="text-center mb-6">
      <v-chip color="teal-darken-3" variant="flat" class="mb-4 px-6 font-weight-black">
        🧮 EL EXPLORADOR DE FRACCIONES
      </v-chip>
      <h2 class="text-h4 font-weight-black mb-2">¡Identifica la fracción correcta!</h2>
      <p class="text-h6 text-medium-emphasis">
        Selecciona la fracción que representa la <strong>palabra</strong> mostrada.
      </p>
    </div>

    <!-- AREA DE JUEGO -->
    <v-row justify="center" align="center">
      <!-- Expresión (Visual) -->
      <v-col cols="12" md="6" class="text-center">
        <v-card variant="outlined" class="pa-10 rounded-2xl bg-teal-lighten-5 border-teal-darken-2 position-relative overflow-hidden d-flex justify-center align-center" style="min-height: 250px;">
          <div class="text-h3 font-weight-black text-teal-darken-4 text-capitalize">
            {{ currentChallenge.word }}
          </div>
        </v-card>
      </v-col>

      <!-- Entrada de Datos -->
      <v-col cols="12" md="6">
        <v-card variant="flat" class="pa-8 rounded-2xl bg-grey-lighten-4 border-sm">
          <div class="text-h5 font-weight-black mb-4 text-center">¿Cuál es la fracción?</div>
          
          <v-row>
            <v-col v-for="option in currentChallenge.options" :key="option" cols="6">
              <v-btn
                block
                size="x-large"
                variant="outlined"
                :color="selectedOption === option ? (option === currentChallenge.answer ? 'success' : 'error') : 'teal-darken-3'"
                class="rounded-xl font-weight-black py-8 text-h4 border-md"
                @click="checkOption(option)"
                :disabled="isCorrect"
              >
                {{ option }}
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

    <!-- FEEDBACK FINAL -->
    <v-fade-transition>
      <div v-if="isComplete" class="text-center mt-10">
        <v-alert
          type="success"
          variant="flat"
          class="rounded-xl mb-6 py-6"
          icon="mdi-fraction-one-half"
        >
          <div class="text-h5 font-weight-black">¡Explorador Experto!</div>
          <div class="text-body-1">Sabes leer e identificar fracciones perfectamente.</div>
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
  { word: "Un Medio", answer: "1/2", options: ["1/2", "1/3", "2/1", "2/2"] },
  { word: "Tres Cuartos", answer: "3/4", options: ["4/3", "3/4", "1/4", "3/5"] },
  { word: "Dos Quintos", answer: "2/5", options: ["5/2", "2/3", "2/5", "1/5"] },
  { word: "Un Tercio", answer: "1/3", options: ["3/1", "1/3", "1/2", "2/3"] },
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
</style>
