<template>
  <v-card class="pa-4 pa-md-8 rounded-3xl glass-card overflow-hidden" border="1">
    <div class="text-center mb-6">
      <v-chip color="purple-darken-2" variant="flat" class="mb-4 px-6 font-weight-black">
        🏛️ EL MUSEO DE LOS POLÍGONOS
      </v-chip>
      <h2 class="text-h4 font-weight-black mb-2">¡Ordena las piezas del museo!</h2>
      <p class="text-h6 text-medium-emphasis">
        Toca la figura y selecciona cuántos <strong>lados</strong> tiene.
      </p>
    </div>

    <!-- AREA DE JUEGO -->
    <v-row>
      <!-- Figura Actual -->
      <v-col cols="12" md="6" class="d-flex justify-center align-center">
        <v-card variant="outlined" class="pa-10 rounded-2xl bg-white border-dashed d-flex justify-center align-center" style="min-height: 250px; width: 100%;">
          <v-icon :size="150" :color="currentShape.color">{{ currentShape.icon }}</v-icon>
        </v-card>
      </v-col>

      <!-- Opciones de Lados -->
      <v-col cols="12" md="6" class="d-flex flex-column justify-center gap-4">
        <v-btn
          v-for="option in [3, 4, 5, 6]"
          :key="option"
          size="x-large"
          variant="flat"
          :color="selectedOption === option ? (option === currentShape.sides ? 'success' : 'error') : 'primary'"
          class="rounded-xl font-weight-black py-8"
          @click="checkOption(option)"
          :disabled="isCorrect"
        >
          {{ option }} Lados
        </v-btn>
      </v-col>
    </v-row>

    <!-- PROGRESO -->
    <div class="mt-8 text-center">
      <v-chip color="primary" variant="tonal" size="large" class="font-weight-black">
        Figuras clasificadas: {{ completedShapes }} / {{ totalShapes }}
      </v-chip>
    </div>

    <!-- FEEDBACK -->
    <v-fade-transition>
      <div v-if="isComplete" class="text-center mt-10">
        <v-alert
          type="success"
          variant="tonal"
          class="rounded-xl mb-6 py-6"
          icon="mdi-bank-outline"
        >
          <div class="text-h5 font-weight-black">¡Curador Experto!</div>
          <div class="text-body-1">Has organizado todas las figuras del museo correctamente.</div>
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

const shapes = [
  { name: "Triángulo", icon: "mdi-triangle", sides: 3, color: "orange" },
  { name: "Cuadrado", icon: "mdi-square", sides: 4, color: "blue" },
  { name: "Pentágono", icon: "mdi-pentagon", sides: 5, color: "green" },
  { name: "Hexágono", icon: "mdi-hexagon", sides: 6, color: "purple" },
];

const currentShapeIndex = ref(0);
const completedShapes = ref(0);
const selectedOption = ref(null);
const isCorrect = ref(false);

const shuffledShapes = ref([...shapes].sort(() => Math.random() - 0.5));
const currentShape = computed(() => shuffledShapes.value[currentShapeIndex.value]);
const totalShapes = shapes.length;
const isComplete = computed(() => completedShapes.value === totalShapes);

const checkOption = (option) => {
  selectedOption.value = option;
  if (option === currentShape.value.sides) {
    isCorrect.value = true;
    setTimeout(() => {
      completedShapes.value++;
      if (currentShapeIndex.value < totalShapes - 1) {
        currentShapeIndex.value++;
        selectedOption.value = null;
        isCorrect.value = false;
      }
    }, 1000);
  } else {
    setTimeout(() => {
      selectedOption.value = null;
    }, 1000);
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
