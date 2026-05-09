<template>
  <v-card class="pa-10 rounded-3xl glass-card text-center" border="1">
    <v-avatar color="amber-lighten-4" size="100" class="mb-6">
      <v-icon color="amber-darken-3" size="50">mdi-numeric</v-icon>
    </v-avatar>
    <h2 class="text-h3 font-weight-black mb-4">Reto Numérico Grado 1</h2>
    <p class="text-h6 text-medium-emphasis mb-8">
      Ayuda al vaquero a contar cuántas vacas hay en el corral.
    </p>

    <div class="d-flex justify-center gap-4 mb-10">
      <v-btn
        v-for="n in [3, 5, 8]"
        :key="n"
        size="x-large"
        variant="outlined"
        class="rounded-xl px-10"
        @click="checkAnswer(n)"
      >
        {{ n }}
      </v-btn>
    </div>

    <v-alert v-if="feedback" :type="feedbackType" class="rounded-xl mb-6">
      {{ feedback }}
    </v-alert>

    <v-btn
      v-if="correct"
      color="success"
      size="x-large"
      class="rounded-xl px-12"
      @click="$emit('completada')"
    >
      ¡Continuar!
    </v-btn>
  </v-card>
</template>

<script setup>
import { ref } from "vue";
const emit = defineEmits(["completada"]);

const feedback = ref("");
const feedbackType = ref("info");
const correct = ref(false);

const checkAnswer = (n) => {
  if (n === 5) {
    feedback.value = "¡Excelente! Hay 5 vacas.";
    feedbackType.value = "success";
    correct.value = true;
  } else {
    feedback.value = "Inténtalo de nuevo, ¡tú puedes!";
    feedbackType.value = "error";
  }
};
</script>

<style scoped>
.glass-card {
  background: rgba(255, 255, 255, 0.9) !important;
  backdrop-filter: blur(10px);
}
</style>
