<template>
  <v-card class="pa-4 pa-md-8 rounded-3xl glass-card overflow-hidden" border="1">
    <div class="text-center mb-6">
      <v-chip color="pink-darken-2" variant="flat" class="mb-4 px-6 font-weight-black">
        🍰 EL PASTEL DE LAS FRACCIONES
      </v-chip>
      <h2 class="text-h4 font-weight-black mb-2">¡Sirve las porciones correctas!</h2>
      <p class="text-h6 text-medium-emphasis">
        Selecciona la fracción que representa la parte coloreada del pastel.
      </p>
    </div>

    <!-- AREA DE JUEGO -->
    <v-row justify="center" align="center">
      <!-- Pastel (SVG) -->
      <v-col cols="12" md="5" class="d-flex justify-center">
        <v-card variant="outlined" class="pa-8 rounded-2xl bg-white border-dashed d-flex justify-center align-center" style="min-height: 250px; width: 100%;">
          <svg width="200" height="200" viewBox="0 0 200 200">
            <!-- Fondo del pastel -->
            <circle cx="100" cy="100" r="80" fill="#fce4ec" stroke="#f06292" stroke-width="2" />
            <!-- Porciones coloreadas -->
            <path 
              v-for="i in currentChallenge.numerator" 
              :key="i"
              :d="getSlicePath(i-1, currentChallenge.denominator)"
              fill="#f06292"
              stroke="white"
              stroke-width="2"
            />
            <!-- Líneas de división -->
            <line 
              v-for="i in currentChallenge.denominator" 
              :key="'line-'+i"
              x1="100" y1="100"
              :x2="getLineX(i-1, currentChallenge.denominator)"
              :y2="getLineY(i-1, currentChallenge.denominator)"
              stroke="#f06292"
              stroke-width="1"
            />
          </svg>
        </v-card>
      </v-col>

      <!-- Opciones -->
      <v-col cols="12" md="7">
        <v-row>
          <v-col v-for="(option, index) in currentChallenge.options" :key="index" cols="6">
            <v-card
              variant="flat"
              class="pa-6 rounded-xl text-center cursor-pointer fraction-option transition-all"
              :class="{
                'bg-success text-white': selectedOption === index && option.correct,
                'bg-error text-white': selectedOption === index && !option.correct,
                'bg-pink-lighten-5 border-sm border-pink-lighten-3': selectedOption !== index
              }"
              @click="checkOption(index)"
            >
              <div class="fraction-display">
                <div class="numerator">{{ option.n }}</div>
                <div class="divider"></div>
                <div class="denominator">{{ option.d }}</div>
              </div>
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
          variant="flat"
          class="rounded-xl mb-6 py-6"
          icon="mdi-cake-variant"
        >
          <div class="text-h5 font-weight-black">¡Maestro Pastelero!</div>
          <div class="text-body-1">Entiendes perfectamente cómo funcionan las fracciones.</div>
        </v-alert>

        <v-btn
          color="success"
          size="x-large"
          class="rounded-xl px-12 font-weight-black"
          elevation="8"
          @click="nextChallenge"
        >
          {{ isLastChallenge ? '¡Finalizar Misión!' : 'Siguiente Pastel' }}
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
  {
    numerator: 1,
    denominator: 4,
    options: [
      { n: 1, d: 4, correct: true },
      { n: 1, d: 2, correct: false },
      { n: 3, d: 4, correct: false },
      { n: 1, d: 3, correct: false },
    ]
  },
  {
    numerator: 3,
    denominator: 8,
    options: [
      { n: 1, d: 8, correct: false },
      { n: 3, d: 8, correct: true },
      { n: 5, d: 8, correct: false },
      { n: 3, d: 4, correct: false },
    ]
  },
  {
    numerator: 2,
    denominator: 3,
    options: [
      { n: 1, d: 3, correct: false },
      { n: 2, d: 3, correct: true },
      { n: 3, d: 2, correct: false },
      { n: 2, d: 6, correct: false },
    ]
  }
];

const currentIndex = ref(0);
const selectedOption = ref(null);
const solvedCount = ref(0);

const shuffledChallenges = ref([...challenges].sort(() => Math.random() - 0.5));
const currentChallenge = computed(() => shuffledChallenges.value[currentIndex.value]);
const isComplete = computed(() => solvedCount.value === challenges.length);
const isLastChallenge = computed(() => currentIndex.value === challenges.length - 1);

const getSlicePath = (index, total) => {
  const radius = 80;
  const startAngle = (index * 360) / total;
  const endAngle = ((index + 1) * 360) / total;
  
  const startRad = (startAngle - 90) * (Math.PI / 180);
  const endRad = (endAngle - 90) * (Math.PI / 180);
  
  const x1 = 100 + radius * Math.cos(startRad);
  const y1 = 100 + radius * Math.sin(startRad);
  const x2 = 100 + radius * Math.cos(endRad);
  const y2 = 100 + radius * Math.sin(endRad);
  
  const largeArc = endAngle - startAngle > 180 ? 1 : 0;
  
  return `M 100 100 L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`;
};

const getLineX = (index, total) => {
  const angle = (index * 360) / total - 90;
  return 100 + 80 * Math.cos(angle * (Math.PI / 180));
};

const getLineY = (index, total) => {
  const angle = (index * 360) / total - 90;
  return 100 + 80 * Math.sin(angle * (Math.PI / 180));
};

const checkOption = (index) => {
  if (selectedOption.value !== null) return;
  selectedOption.value = index;
  
  if (currentChallenge.value.options[index].correct) {
    setTimeout(() => {
      solvedCount.value++;
    }, 1000);
  } else {
    setTimeout(() => {
      selectedOption.value = null;
    }, 1500);
  }
};

const nextChallenge = () => {
  if (isLastChallenge.value) {
    emit('completada');
  } else {
    currentIndex.value++;
    selectedOption.value = null;
    solvedCount.value = solvedCount.value; // Keep same if not moving yet
  }
};
</script>

<style scoped>
.glass-card {
  background: rgba(255, 255, 255, 0.9) !important;
  backdrop-filter: blur(10px);
}
.fraction-display {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 2rem;
  font-weight: 900;
}
.divider {
  width: 40px;
  height: 4px;
  background: currentColor;
  margin: 4px 0;
}
.fraction-option:hover {
  transform: scale(1.05);
}
.transition-all {
  transition: all 0.3s ease;
}
</style>
