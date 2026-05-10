<template>
  <v-card class="pa-4 pa-md-8 rounded-3xl glass-card overflow-hidden" border="1">
    <div class="text-center mb-6">
      <v-chip color="amber-darken-3" variant="flat" class="mb-4 px-6 font-weight-black">
        ⚖️ LA BALANZA DE ORO
      </v-chip>
      <h2 class="text-h4 font-weight-black mb-2">¡Equilibra la balanza!</h2>
      <p class="text-h6 text-medium-emphasis">
        Selecciona las pesas necesarias para igualar el peso del objeto.
      </p>
    </div>

    <!-- AREA DE JUEGO -->
    <v-row>
      <!-- Objeto a Pesar -->
      <v-col cols="12" md="6" class="text-center">
        <v-card variant="outlined" class="pa-6 rounded-2xl bg-amber-lighten-5 border-amber-lighten-2 h-100 d-flex flex-column align-center justify-center">
          <v-icon size="100" color="amber-darken-3">{{ currentChallenge.icon }}</v-icon>
          <div class="text-h4 font-weight-black mt-4">{{ currentChallenge.name }}</div>
          <v-chip color="black" variant="flat" class="mt-2 font-weight-black" size="large">
            Peso: {{ currentChallenge.targetWeight }}g
          </v-chip>
        </v-card>
      </v-col>

      <!-- Balanza y Pesas -->
      <v-col cols="12" md="6">
        <v-card variant="flat" class="pa-6 rounded-2xl bg-grey-lighten-4 border-sm h-100">
          <div class="text-subtitle-1 font-weight-bold mb-4 text-center">Tus Pesas (Suma: {{ currentWeight }}g)</div>
          
          <div class="d-flex flex-wrap justify-center gap-3 mb-6">
            <v-btn
              v-for="w in availableWeights"
              :key="w"
              icon
              size="large"
              color="grey-darken-2"
              class="text-white font-weight-black"
              @click="addWeight(w)"
              :disabled="isComplete"
            >
              {{ w }}
            </v-btn>
          </div>

          <v-progress-linear
            :model-value="(currentWeight / currentChallenge.targetWeight) * 100"
            :color="currentWeight === currentChallenge.targetWeight ? 'success' : (currentWeight > currentChallenge.targetWeight ? 'error' : 'amber')"
            height="25"
            rounded
            striped
          ></v-progress-linear>

          <div class="text-center mt-6">
            <v-btn variant="text" color="error" prepend-icon="mdi-refresh" @click="reset">
              Reiniciar Pesas
            </v-btn>
          </div>
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
          icon="mdi-scale-balance"
        >
          <div class="text-h5 font-weight-black">¡Equilibrio Perfecto!</div>
          <div class="text-body-1">Has pesado el objeto con total precisión.</div>
        </v-alert>

        <v-btn
          color="success"
          size="x-large"
          class="rounded-xl px-12 font-weight-black"
          elevation="8"
          @click="nextChallenge"
        >
          {{ isLastChallenge ? '¡Finalizar Misión!' : 'Siguiente Objeto' }}
          <v-icon end>mdi-chevron-right</v-icon>
        </v-btn>
      </div>
    </v-fade-transition>
  </v-card>
</template>

<script setup>
import { ref, computed } from "vue";

const emit = defineEmits(["completada"]);

const challenges = [
  { name: "Manzana de Oro", icon: "mdi-food-apple", targetWeight: 150 },
  { name: "Cofre del Tesoro", icon: "mdi-treasure-chest", targetWeight: 500 },
  { name: "Corona Real", icon: "mdi-crown", targetWeight: 350 },
];

const availableWeights = [50, 100, 200, 500];
const currentChallengeIndex = ref(0);
const currentWeight = ref(0);

const shuffledChallenges = ref([...challenges].sort(() => Math.random() - 0.5));
const currentChallenge = computed(() => shuffledChallenges.value[currentChallengeIndex.value]);
const isComplete = computed(() => currentWeight.value === currentChallenge.value.targetWeight);
const isLastChallenge = computed(() => currentChallengeIndex.value === challenges.length - 1);

const addWeight = (w) => {
  if (currentWeight.value + w <= currentChallenge.value.targetWeight + 100) {
    currentWeight.value += w;
  }
};

const reset = () => {
  currentWeight.value = 0;
};

const nextChallenge = () => {
  if (isLastChallenge.value) {
    emit('completada');
  } else {
    currentChallengeIndex.value++;
    currentWeight.value = 0;
  }
};
</script>

<style scoped>
.glass-card {
  background: rgba(255, 255, 255, 0.9) !important;
  backdrop-filter: blur(10px);
}
.gap-3 {
  gap: 12px;
}
</style>
