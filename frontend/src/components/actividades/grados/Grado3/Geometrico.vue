<template>
  <v-card class="pa-4 pa-md-8 rounded-3xl glass-card overflow-hidden" border="1">
    <div class="text-center mb-6">
      <v-chip color="cyan-darken-2" variant="flat" class="mb-4 px-6 font-weight-black">
        📐 EL ÁNGULO MAESTRO
      </v-chip>
      <h2 class="text-h4 font-weight-black mb-2">¡Clasifica los ángulos!</h2>
      <p class="text-h6 text-medium-emphasis">
        Mira el ángulo y selecciona si es <strong>Agudo</strong>, <strong>Recto</strong> o <strong>Obtuso</strong>.
      </p>
    </div>

    <!-- AREA DE JUEGO -->
    <v-row>
      <!-- Visualización del Ángulo -->
      <v-col cols="12" md="6" class="d-flex justify-center align-center">
        <v-card variant="outlined" class="pa-10 rounded-2xl bg-white border-dashed position-relative overflow-hidden" style="min-height: 300px; width: 100%;">
          <svg width="200" height="200" viewBox="0 0 200 200" class="angle-svg">
            <!-- Línea base -->
            <line x1="100" y1="100" x2="180" y2="100" stroke="black" stroke-width="4" />
            <!-- Línea variable -->
            <line 
              x1="100" 
              y1="100" 
              :x2="angleX" 
              :y2="angleY" 
              stroke="black" 
              stroke-width="4" 
              class="transition-all"
            />
            <!-- Arco del ángulo -->
            <path 
              :d="arcPath" 
              fill="none" 
              stroke="cyan" 
              stroke-width="3" 
              stroke-dasharray="4"
            />
            <!-- Punto central -->
            <circle cx="100" cy="100" r="4" fill="red" />
          </svg>
          <div class="text-subtitle-1 font-weight-bold mt-4 position-absolute bottom-0 mb-4">{{ currentAngle.degrees }}°</div>
        </v-card>
      </v-col>

      <!-- Opciones de Clasificación -->
      <v-col cols="12" md="6" class="d-flex flex-column justify-center gap-4">
        <v-btn
          v-for="type in ['Agudo', 'Recto', 'Obtuso']"
          :key="type"
          size="x-large"
          variant="flat"
          :color="selectedType === type ? (type === currentAngle.type ? 'success' : 'error') : 'cyan-darken-1'"
          class="rounded-xl font-weight-black py-8"
          @click="checkType(type)"
          :disabled="isCorrect"
        >
          Ángulo {{ type }}
        </v-btn>
      </v-col>
    </v-row>

    <!-- PROGRESO -->
    <div class="mt-8 text-center">
      <v-chip color="primary" variant="tonal" size="large" class="font-weight-black">
        Ángulos clasificados: {{ solvedCount }} / {{ totalAngles }}
      </v-chip>
    </div>

    <!-- FEEDBACK -->
    <v-fade-transition>
      <div v-if="isComplete" class="text-center mt-10">
        <v-alert
          type="success"
          variant="tonal"
          class="rounded-xl mb-6 py-6"
          icon="mdi-angle-acute"
        >
          <div class="text-h5 font-weight-black">¡Gran Geómetra!</div>
          <div class="text-body-1">Has identificado todos los tipos de ángulos perfectamente.</div>
        </v-alert>

        <v-btn
          color="success"
          size="x-large"
          class="rounded-xl px-12 font-weight-black"
          elevation="8"
          @click="$emit('completada')"
        >
          ¡Siguiente Desafío! <v-icon end>mdi-chevron-right</v-icon>
        </v-btn>
      </div>
    </v-fade-transition>
  </v-card>
</template>

<script setup>
import { ref, computed } from "vue";

defineEmits(["completada"]);

const angles = [
  { degrees: 45, type: "Agudo" },
  { degrees: 90, type: "Recto" },
  { degrees: 135, type: "Obtuso" },
  { degrees: 30, type: "Agudo" },
  { degrees: 110, type: "Obtuso" },
];

const currentIndex = ref(0);
const solvedCount = ref(0);
const selectedType = ref(null);
const isCorrect = ref(false);

const shuffledAngles = ref([...angles].sort(() => Math.random() - 0.5));
const currentAngle = computed(() => shuffledAngles.value[currentIndex.value]);
const totalAngles = angles.length;
const isComplete = computed(() => solvedCount.value === totalAngles);

// Cálculos para el SVG
const angleX = computed(() => {
  const rad = (currentAngle.value.degrees * Math.PI) / 180;
  return 100 + 80 * Math.cos(-rad);
});

const angleY = computed(() => {
  const rad = (currentAngle.value.degrees * Math.PI) / 180;
  return 100 + 80 * Math.sin(-rad);
});

const arcPath = computed(() => {
  const radius = 30;
  const startX = 100 + radius;
  const startY = 100;
  const rad = (currentAngle.value.degrees * Math.PI) / 180;
  const endX = 100 + radius * Math.cos(-rad);
  const endY = 100 + radius * Math.sin(-rad);
  const largeArc = currentAngle.value.degrees > 180 ? 1 : 0;
  return `M ${startX} ${startY} A ${radius} ${radius} 0 ${largeArc} 0 ${endX} ${endY}`;
});

const checkType = (type) => {
  selectedType.value = type;
  if (type === currentAngle.value.type) {
    isCorrect.value = true;
    setTimeout(() => {
      solvedCount.value++;
      if (currentIndex.value < totalAngles - 1) {
        currentIndex.value++;
        selectedType.value = null;
        isCorrect.value = false;
      }
    }, 1000);
  } else {
    setTimeout(() => {
      selectedType.value = null;
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
.angle-svg {
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
}
.transition-all {
  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
</style>
