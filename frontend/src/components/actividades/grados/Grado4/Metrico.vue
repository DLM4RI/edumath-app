<template>
  <v-card class="pa-4 pa-md-8 rounded-3xl glass-card overflow-hidden" border="1">
    <div class="text-center mb-6">
      <v-chip color="teal-darken-3" variant="flat" class="mb-4 px-6 font-weight-black">
        📐 EL TOPÓGRAFO REAL
      </v-chip>
      <h2 class="text-h4 font-weight-black mb-2">¡Mide los terrenos del reino!</h2>
      <p class="text-h6 text-medium-emphasis">
        Calcula el <strong>{{ currentChallenge.mode }}</strong> de la figura mostrada.
      </p>
    </div>

    <!-- AREA DE JUEGO -->
    <v-row justify="center" align="center">
      <!-- Terreno (Visual) -->
      <v-col cols="12" md="6" class="text-center">
        <v-card variant="outlined" class="pa-10 rounded-2xl bg-green-lighten-5 border-green-darken-2 position-relative overflow-hidden">
          <div 
            class="shape-preview mx-auto bg-green-darken-1 rounded-lg d-flex align-center justify-center text-white font-weight-black text-h4"
            :style="{ width: currentChallenge.width * 20 + 'px', height: currentChallenge.height * 20 + 'px' }"
          >
            {{ currentChallenge.width }}m × {{ currentChallenge.height }}m
          </div>
          <div class="mt-6 text-subtitle-1 font-italic">"El Jardín de las Rosas"</div>
        </v-card>
      </v-col>

      <!-- Entrada de Datos -->
      <v-col cols="12" md="6">
        <v-card variant="flat" class="pa-8 rounded-2xl bg-grey-lighten-4 border-sm">
          <div class="text-h5 font-weight-black mb-4">¿Cuál es el {{ currentChallenge.mode }}?</div>
          
          <v-text-field
            v-model="userAnswer"
            :label="'Tu respuesta en ' + (currentChallenge.mode === 'Perímetro' ? 'metros' : 'metros cuadrados')"
            variant="outlined"
            type="number"
            class="text-h5"
            @keyup.enter="checkAnswer"
            suffix="m"
          ></v-text-field>

          <v-btn
            block
            color="teal-darken-2"
            size="x-large"
            class="rounded-xl font-weight-black mt-4"
            @click="checkAnswer"
          >
            Validar Medida
          </v-btn>

          <v-expand-transition>
            <v-alert
              v-if="feedback"
              :type="feedback.type"
              variant="tonal"
              class="mt-6 rounded-xl"
            >
              {{ feedback.text }}
            </v-alert>
          </v-expand-transition>
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
          icon="mdi-ruler-square"
        >
          <div class="text-h5 font-weight-black">¡Topógrafo Maestro!</div>
          <div class="text-body-1">Has medido todos los terrenos con precisión real.</div>
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
  { mode: "Perímetro", width: 5, height: 4, answer: 18 }, // (5+4)*2
  { mode: "Área", width: 6, height: 3, answer: 18 },      // 6*3
  { mode: "Perímetro", width: 10, height: 2, answer: 24 }, // (10+2)*2
  { mode: "Área", width: 4, height: 4, answer: 16 },      // 4*4
];

const currentIndex = ref(0);
const userAnswer = ref("");
const feedback = ref(null);
const solvedCount = ref(0);

const shuffledChallenges = ref([...challenges].sort(() => Math.random() - 0.5));
const currentChallenge = computed(() => shuffledChallenges.value[currentIndex.value]);
const isComplete = computed(() => solvedCount.value === challenges.length);

const checkAnswer = () => {
  if (parseInt(userAnswer.value) === currentChallenge.value.answer) {
    feedback.value = { type: "success", text: "¡Correcto! Excelente cálculo." };
    setTimeout(() => {
      solvedCount.value++;
      if (currentIndex.value < challenges.length - 1) {
        currentIndex.value++;
        userAnswer.value = "";
        feedback.value = null;
      }
    }, 1500);
  } else {
    feedback.value = { type: "error", text: "Incorrecto. Revisa tus cálculos." };
    setTimeout(() => {
      feedback.value = null;
    }, 2000);
  }
};
</script>

<style scoped>
.glass-card {
  background: rgba(255, 255, 255, 0.9) !important;
  backdrop-filter: blur(10px);
}
.shape-preview {
  border: 4px solid #fff;
  box-shadow: 0 10px 20px rgba(0,0,0,0.2);
  transition: all 0.5s ease;
}
</style>
