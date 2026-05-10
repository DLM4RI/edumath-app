<template>
  <v-card class="pa-4 pa-md-8 rounded-3xl glass-card overflow-hidden" border="1">
    <div class="text-center mb-6">
      <v-chip color="orange-darken-3" variant="flat" class="mb-4 px-6 font-weight-black">
        🐛 LA CARRERA DE GUSANOS
      </v-chip>
      <h2 class="text-h4 font-weight-black mb-2">¿Quién ganará?</h2>
      <p class="text-h6 text-medium-emphasis">
        Toca el gusano que es <strong>{{ currentChallenge.target }}</strong>.
      </p>
    </div>

    <!-- AREA DE JUEGO -->
    <v-card variant="outlined" class="pa-8 rounded-2xl bg-brown-lighten-5 border-dashed">
      <v-row v-for="(worm, index) in worms" :key="index" class="mb-6 align-center">
        <v-col cols="12">
          <div 
            class="worm-container pa-2 rounded-pill d-flex align-center cursor-pointer transition-all"
            :class="{ 
              'bg-white elevation-2': selectedWorm !== index,
              'bg-success-lighten-4 elevation-6 border-success': selectedWorm === index && isCorrect(index),
              'bg-error-lighten-4 border-error': selectedWorm === index && !isCorrect(index)
            }"
            @click="selectWorm(index)"
          >
            <!-- Cabeza del gusano -->
            <v-avatar :color="worm.color" size="40" class="mr-2">
              <v-icon color="white" size="24">mdi-emoticon-happy</v-icon>
            </v-avatar>
            
            <!-- Cuerpo del gusano (largo dinámico) -->
            <div 
              class="worm-body rounded-pill"
              :style="{ width: worm.length + '%', backgroundColor: worm.color, height: '20px' }"
            ></div>
            
            <v-spacer></v-spacer>
            
            <!-- Icono de resultado -->
            <v-fade-transition>
              <v-icon v-if="selectedWorm === index" :color="isCorrect(index) ? 'success' : 'error'" size="30">
                {{ isCorrect(index) ? 'mdi-check-circle' : 'mdi-close-circle' }}
              </v-icon>
            </v-fade-transition>
          </div>
        </v-col>
      </v-row>
    </v-card>

    <!-- FEEDBACK -->
    <v-fade-transition>
      <div v-if="hasWon" class="text-center mt-10">
        <v-alert
          type="success"
          variant="tonal"
          class="rounded-xl mb-6 py-6"
          icon="mdi-trophy-variant"
        >
          <div class="text-h5 font-weight-black">¡Increíble!</div>
          <div class="text-body-1">Sabes medir muy bien con tus ojos.</div>
        </v-alert>

        <v-btn
          color="success"
          size="x-large"
          class="rounded-xl px-12 font-weight-black"
          elevation="8"
          @click="$emit('completada')"
        >
          ¡Terminar Carrera! <v-icon end>mdi-flag-checkered</v-icon>
        </v-btn>
      </div>
    </v-fade-transition>

    <div v-if="!hasWon && selectedWorm !== null && !isCorrect(selectedWorm)" class="text-center mt-6">
      <v-btn variant="text" color="error" prepend-icon="mdi-refresh" @click="selectedWorm = null">
        Intentar otra vez
      </v-btn>
    </div>
  </v-card>
</template>

<script setup>
import { ref, computed } from "vue";

defineEmits(["completada"]);

const challenges = [
  { target: "más LARGO", type: "longest" },
  { target: "más CORTO", type: "shortest" },
];

const currentChallenge = ref(challenges[Math.floor(Math.random() * challenges.length)]);
const selectedWorm = ref(null);

const worms = ref([
  { color: "green", length: 40 },
  { color: "blue", length: 80 },
  { color: "orange", length: 20 },
].sort(() => Math.random() - 0.5));

const isCorrect = (index) => {
  const lengths = worms.value.map(w => w.length);
  if (currentChallenge.value.type === "longest") {
    return worms.value[index].length === Math.max(...lengths);
  } else {
    return worms.value[index].length === Math.min(...lengths);
  }
};

const hasWon = computed(() => selectedWorm.value !== null && isCorrect(selectedWorm.value));

const selectWorm = (index) => {
  if (hasWon.value) return;
  selectedWorm.value = index;
};
</script>

<style scoped>
.glass-card {
  background: rgba(255, 255, 255, 0.9) !important;
  backdrop-filter: blur(10px);
}
.worm-container {
  border: 2px solid transparent;
  transition: all 0.3s ease;
}
.worm-body {
  transition: width 1s ease-in-out;
}
.transition-all {
  transition: all 0.3s ease;
}
.border-success {
  border-color: #4CAF50 !important;
}
.border-error {
  border-color: #F44336 !important;
}
</style>
