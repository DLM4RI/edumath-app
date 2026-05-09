<template>
  <v-card class="pa-10 rounded-3xl glass-card" border="1">
    <div class="text-center mb-10">
      <v-avatar color="secondary-lighten-4" size="100" class="mb-6">
        <v-icon color="secondary" size="50">mdi-file-document-edit</v-icon>
      </v-avatar>
      <h2 class="text-h3 font-weight-black mb-4">Evaluación Final Grado 2</h2>
      <p class="text-h6 text-medium-emphasis">Completa todas las preguntas para ver tus resultados.</p>
    </div>

    <!-- FORMULARIO DE PREGUNTAS -->
    <v-form class="mt-8">
      <!-- INSTRUCCIÓN: Añade aquí las preguntas (Radio buttons, Checkboxes, etc.) -->
      <div v-for="q in 3" :key="q" class="mb-8">
        <h3 class="text-h6 font-weight-bold mb-4">{{q}}. Pregunta de opción múltiple para el grado 2?</h3>
        <v-radio-group>
          <v-radio label="Opción A (Respuesta incorrecta)" value="a"></v-radio>
          <v-radio label="Opción B (Respuesta correcta)" value="b"></v-radio>
          <v-radio label="Opción C (Respuesta incorrecta)" value="c"></v-radio>
        </v-radio-group>
      </div>

      <!-- BOTÓN DE ENVÍO -->
      <div class="text-center mt-10">
        <v-btn color="secondary" size="x-large" class="rounded-xl px-12" @click="$emit('finalizado')">
          Terminar Evaluación
        </v-btn>
      </div>
    </v-form>
  </v-card>
</template>

<script setup>
// Define el evento para avisar a la app que el examen terminó
defineEmits(['finalizado'])

// AQUÍ PUEDES AÑADIR LA LÓGICA DE CALIFICACIÓN
</script>

<style scoped>
.glass-card {
  background: rgba(255, 255, 255, 0.9) !important;
  backdrop-filter: blur(10px);
}
</style>
