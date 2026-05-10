<template>
  <v-card class="pa-4 pa-md-8 rounded-3xl glass-card overflow-hidden" border="1">
    <div class="text-center mb-6">
      <v-chip color="green-darken-2" variant="flat" class="mb-4 px-6 font-weight-black">
        🏙️ LA CIUDAD DE LAS FORMAS
      </v-chip>
      <h2 class="text-h4 font-weight-black mb-2">¡Misión de Rescate!</h2>
      <p class="text-h6 text-medium-emphasis">
        Toca todos los <strong>{{ currentTargetShape.name }}s</strong> para salvar la ciudad.
      </p>
    </div>

    <!-- AREA DE JUEGO -->
    <v-card variant="flat" class="pa-6 rounded-2xl bg-green-lighten-5 border-sm border-green-lighten-3">
      <v-row justify="center">
        <v-col
          v-for="(shape, index) in shapes"
          :key="index"
          cols="4"
          sm="3"
          class="d-flex justify-center"
        >
          <v-btn
            icon
            size="x-large"
            :color="shape.found ? 'success' : 'white'"
            elevation="2"
            class="shape-btn"
            :class="{ 'found-animation': shape.found }"
            @click="checkShape(index)"
            :disabled="shape.found"
          >
            <v-icon :size="40" :color="shape.found ? 'white' : 'green-darken-1'">
              {{ shape.icon }}
            </v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-card>

    <!-- PROGRESO -->
    <div class="mt-8 text-center">
      <v-chip color="primary" variant="tonal" size="large" class="font-weight-black">
        Encontrados: {{ foundCount }} / {{ totalTargetCount }}
      </v-chip>
    </div>

    <!-- FEEDBACK -->
    <v-fade-transition>
      <div v-if="isComplete" class="text-center mt-10">
        <v-alert
          type="success"
          variant="flat"
          class="rounded-xl mb-6 py-6"
          icon="mdi-check-decagram"
        >
          <div class="text-h5 font-weight-black">¡Eres un experto en formas!</div>
          <div class="text-body-1">Has encontrado todos los {{ currentTargetShape.name }}s.</div>
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

const shapeTypes = [
  { name: "Círculo", icon: "mdi-circle" },
  { name: "Cuadrado", icon: "mdi-square" },
  { name: "Triángulo", icon: "mdi-triangle" },
];

const currentTargetShape = ref(shapeTypes[Math.floor(Math.random() * shapeTypes.length)]);

// Generar una mezcla de formas
const shapes = ref([
  { type: "Círculo", icon: "mdi-circle", found: false },
  { type: "Cuadrado", icon: "mdi-square", found: false },
  { type: "Triángulo", icon: "mdi-triangle", found: false },
  { type: "Círculo", icon: "mdi-circle", found: false },
  { type: "Cuadrado", icon: "mdi-square", found: false },
  { type: "Triángulo", icon: "mdi-triangle", found: false },
  { type: "Círculo", icon: "mdi-circle", found: false },
  { type: "Cuadrado", icon: "mdi-square", found: false },
  { type: "Triángulo", icon: "mdi-triangle", found: false },
].sort(() => Math.random() - 0.5));

const totalTargetCount = computed(() => shapes.value.filter(s => s.type === currentTargetShape.value.name).length);
const foundCount = computed(() => shapes.value.filter(s => s.type === currentTargetShape.value.name && s.found).length);
const isComplete = computed(() => foundCount.value === totalTargetCount.value && totalTargetCount.value > 0);

const checkShape = (index) => {
  if (shapes.value[index].type === currentTargetShape.value.name) {
    shapes.value[index].found = true;
  } else {
    // Animación de error
    const btn = document.querySelectorAll('.shape-btn')[index];
    if (btn) {
      btn.classList.add('shake-animation');
      setTimeout(() => btn.classList.remove('shake-animation'), 500);
    }
  }
};
</script>

<style scoped>
.glass-card {
  background: rgba(255, 255, 255, 0.9) !important;
  backdrop-filter: blur(10px);
}
.shape-btn {
  transition: all 0.3s ease;
}
.found-animation {
  animation: popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.shake-animation {
  animation: shake 0.5s ease-in-out;
}

@keyframes popIn {
  0% { transform: scale(0.5); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}
</style>
