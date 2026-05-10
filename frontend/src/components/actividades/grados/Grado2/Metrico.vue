<template>
  <v-card class="pa-4 pa-md-8 rounded-3xl glass-card overflow-hidden" border="1">
    <div class="text-center mb-6">
      <v-chip color="red-darken-2" variant="flat" class="mb-4 px-6 font-weight-black">
        ⏰ EL RELOJ DEL TIEMPO
      </v-chip>
      <h2 class="text-h4 font-weight-black mb-2">¡Pon el reloj en hora!</h2>
      <p class="text-h6 text-medium-emphasis">
        Selecciona la hora correcta que marca el reloj digital.
      </p>
    </div>

    <!-- AREA DE JUEGO -->
    <v-row justify="center" align="center">
      <!-- Reloj Digital -->
      <v-col cols="12" md="5" class="text-center">
        <v-card variant="flat" class="pa-8 rounded-2xl bg-grey-darken-4 text-green-accent-3 mb-6 digital-clock">
          <div class="text-h1 font-weight-black">{{ currentChallenge.time }}</div>
        </v-card>
      </v-col>

      <!-- Opciones de Relojes Análogos (Representados con texto por ahora o iconos) -->
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
              <v-icon size="60" color="primary">mdi-clock-outline</v-icon>
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
          <div class="text-h5 font-weight-black">¡Maestro del Tiempo!</div>
          <div class="text-body-1">Sabes leer perfectamente las horas.</div>
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
    time: "03:00",
    options: [
      { label: "3 en punto", correct: true },
      { label: "6 en punto", correct: false },
      { label: "12 y cuarto", correct: false },
      { label: "9 en punto", correct: false },
    ]
  },
  {
    time: "06:30",
    options: [
      { label: "6 y cuarto", correct: false },
      { label: "6 y media", correct: true },
      { label: "7 en punto", correct: false },
      { label: "5 y media", correct: false },
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
.digital-clock {
  font-family: 'Courier New', Courier, monospace;
  border: 4px solid #333;
  box-shadow: inset 0 0 20px rgba(0,0,0,0.5);
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
