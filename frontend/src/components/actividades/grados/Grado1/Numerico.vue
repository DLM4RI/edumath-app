<template>
  <v-card class="pa-8 rounded-3xl glass-card overflow-hidden" border="1">
    <div class="text-center mb-6">
      <v-avatar color="orange-lighten-4" size="80" class="mb-4">
        <v-icon color="orange-darken-3" size="40">mdi-basket</v-icon>
      </v-avatar>
      <h2 class="text-h4 font-weight-black mb-2">La Frutería Matemática</h2>
      <p class="text-body-1 text-medium-emphasis">
        ¡Ayuda a llenar el pedido! El cliente necesita
        <strong>{{ targetScore }}</strong> manzanas.
      </p>
    </div>

    <!-- AREA DE JUEGO -->
    <div
      class="game-container pa-6 rounded-2xl mb-6 border-sm border-dashed border-orange-darken-1"
      style="background-image: url('/img/grado1_fruteria_bg.png'); background-size: cover; background-position: center;"
    >
      <div class="d-flex justify-space-between align-center mb-6">
        <div class="basket-display text-center">
          <div class="text-h6 mb-2">Tu Canasta</div>
          <v-badge
            :content="currentScore"
            color="success"
            overlap
            offset-x="10"
            offset-y="10"
          >
            <v-icon size="100" color="brown-darken-2">mdi-basket-fill</v-icon>
          </v-badge>
        </div>

        <v-icon size="40" color="orange-darken-2">mdi-arrow-left-bold</v-icon>

        <div class="shelf text-center">
          <div class="text-h6 mb-2">Estante de Manzanas</div>
          <div
            class="d-flex flex-wrap justify-center gap-2"
            style="max-width: 200px"
          >
            <v-btn
              v-for="i in 10"
              :key="i"
              icon
              variant="flat"
              color="white"
              class="elevation-2"
              :disabled="currentScore >= targetScore || correct"
              @click="addFruit"
            >
              <v-icon color="red">mdi-apple</v-icon>
            </v-btn>
          </div>
        </div>
      </div>

      <div class="text-center">
        <v-chip
          v-if="currentScore > 0"
          color="primary"
          variant="flat"
          class="font-weight-bold"
        >
          Llevas: {{ currentScore }} / {{ targetScore }}
        </v-chip>
      </div>
    </div>

    <!-- FEEDBACK Y CONTROLES -->
    <v-expand-transition>
      <div v-if="feedback" class="text-center">
        <v-alert
          :type="feedbackType"
          variant="tonal"
          class="rounded-xl mb-4"
          border="start"
        >
          {{ feedback }}
        </v-alert>

        <div class="d-flex justify-center gap-4">
          <v-btn
            v-if="!correct"
            variant="text"
            color="error"
            prepend-icon="mdi-refresh"
            @click="resetGame"
          >
            Reiniciar
          </v-btn>
          <v-btn
            v-if="correct"
            color="success"
            size="large"
            class="rounded-xl px-10 shadow-lg"
            @click="$emit('completada')"
          >
            ¡Siguiente Reto!
          </v-btn>
        </div>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script setup>
import { ref, watch } from "vue";
const emit = defineEmits(["completada"]);

const targetScore = ref(7);
const currentScore = ref(0);
const feedback = ref("");
const feedbackType = ref("info");
const correct = ref(false);

const addFruit = () => {
  if (currentScore.value < targetScore.value) {
    currentScore.value++;

    if (currentScore.value === targetScore.value) {
      feedback.value = "¡Excelente! Has completado el pedido correctamente.";
      feedbackType.value = "success";
      correct.value = true;
    } else {
      feedback.value = `¡Vas bien! Agregaste una manzana. Faltan ${targetScore.value - currentScore.value}.`;
      feedbackType.value = "info";
    }
  }
};

const resetGame = () => {
  currentScore.value = 0;
  feedback.value = "";
  correct.value = false;
};
</script>

<style scoped>
.game-container {
  min-height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.gap-2 {
  gap: 8px;
}
.gap-4 {
  gap: 16px;
}
.glass-card {
  background: rgba(255, 255, 255, 0.9) !important;
  backdrop-filter: blur(10px);
}
</style>
