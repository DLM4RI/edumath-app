<template>
  <v-card class="pa-4 pa-md-8 rounded-3xl glass-card overflow-hidden" border="1">
    <div class="text-center mb-6">
      <v-chip color="blue-darken-3" variant="flat" class="mb-4 px-6 font-weight-black">
        🗺️ LAS LÍNEAS DEL MAPA
      </v-chip>
      <h2 class="text-h4 font-weight-black mb-2">¡Explora las calles de la ciudad!</h2>
      <p class="text-h6 text-medium-emphasis">
        Identifica si las calles (líneas) son <strong>Paralelas</strong>, <strong>Perpendiculares</strong> o <strong>Secantes</strong>.
      </p>
    </div>

    <!-- AREA DE JUEGO -->
    <v-row>
      <!-- Visualización de Líneas -->
      <v-col cols="12" md="6" class="d-flex justify-center align-center">
        <v-card variant="outlined" class="pa-6 rounded-2xl bg-grey-lighten-4 border-dashed position-relative overflow-hidden" style="min-height: 300px; width: 100%;">
          <!-- SVG representativo de calles -->
          <svg width="200" height="200" viewBox="0 0 200 200" class="line-svg">
            <template v-if="currentChallenge.type === 'Paralelas'">
              <line x1="50" y1="40" x2="150" y2="40" stroke="#1976D2" stroke-width="12" stroke-linecap="round" />
              <line x1="50" y1="100" x2="150" y2="100" stroke="#1976D2" stroke-width="12" stroke-linecap="round" />
            </template>
            <template v-else-if="currentChallenge.type === 'Perpendiculares'">
              <line x1="100" y1="20" x2="100" y2="180" stroke="#D32F2F" stroke-width="12" stroke-linecap="round" />
              <line x1="20" y1="100" x2="180" y2="100" stroke="#D32F2F" stroke-width="12" stroke-linecap="round" />
              <rect x="100" y="85" width="15" height="15" fill="none" stroke="black" stroke-width="2" />
            </template>
            <template v-else-if="currentChallenge.type === 'Secantes'">
              <line x1="20" y1="20" x2="180" y2="180" stroke="#388E3C" stroke-width="12" stroke-linecap="round" />
              <line x1="20" y1="180" x2="180" y2="20" stroke="#388E3C" stroke-width="12" stroke-linecap="round" />
            </template>
          </svg>
          <div class="mt-4 font-weight-black text-h6">{{ currentChallenge.streetNames }}</div>
        </v-card>
      </v-col>

      <!-- Opciones -->
      <v-col cols="12" md="6" class="d-flex flex-column justify-center gap-4">
        <v-btn
          v-for="option in ['Paralelas', 'Perpendiculares', 'Secantes']"
          :key="option"
          size="x-large"
          variant="flat"
          :color="selectedOption === option ? (option === currentChallenge.type ? 'success' : 'error') : 'blue-darken-1'"
          class="rounded-xl font-weight-black py-8"
          @click="checkOption(option)"
          :disabled="isCorrect"
        >
          Líneas {{ option }}
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
          icon="mdi-map-marker-path"
        >
          <div class="text-h5 font-weight-black">¡Guía Experto!</div>
          <div class="text-body-1">Sabes navegar por cualquier ciudad usando la geometría.</div>
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
  { type: "Paralelas", streetNames: "Carrera 10 y Carrera 11" },
  { type: "Perpendiculares", streetNames: "Calle 5 con Carrera 4" },
  { type: "Secantes", streetNames: "Avenida Diagonal" },
  { type: "Paralelas", streetNames: "Calle 100 y Calle 101" },
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
  if (option === currentChallenge.value.type) {
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
.line-svg {
  filter: drop-shadow(0 4px 6px rgba(0,0,0,0.1));
}
</style>
