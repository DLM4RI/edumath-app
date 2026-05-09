<template>
  <v-card class="pa-10 rounded-3xl glass-card text-center" border="1">
    <v-avatar color="primary-lighten-4" size="100" class="mb-6">
      <v-icon color="primary" size="50">mdi-puzzle</v-icon>
    </v-avatar>
    
    <!-- TÍTULO DE LA ACTIVIDAD -->
    <h2 class="text-h3 font-weight-black mb-4">{t} - Grado 4</h2>
    
    <!-- INSTRUCCIONES: Explica aquí qué debe hacer el estudiante -->
    <p class="text-h6 text-medium-emphasis mb-8">
      ¡Bienvenido al reto de pensamiento metrico! Sigue las instrucciones para ganar puntos.
    </p>

    <!-- ÁREA DE JUEGO / EJERCICIOS -->
    <div class="game-area mb-10 py-10 bg-grey-lighten-4 rounded-xl">
      <p class="text-h5">Espacio para la lógica de la actividad (Gráficos, Preguntas, Arrastrar y Soltar, etc.)</p>
    </div>

    <!-- BOTÓN DE FINALIZACIÓN -->
    <!-- INSTRUCCIÓN: Llama a $emit('completada') cuando el estudiante resuelva el reto -->
    <v-btn color="primary" size="x-large" class="rounded-xl px-12" @click="$emit('completada')">
      ¡Misión Completada!
    </v-btn>
  </v-card>
</template>

<script setup>
// Define el evento para avisar a la app que la actividad terminó
defineEmits(['completada'])

// AQUÍ PUEDES AÑADIR TU LÓGICA DE JUEGO (Refs, Validaciones, etc.)
</script>

<style scoped>
.glass-card {
  background: rgba(255, 255, 255, 0.9) !important;
  backdrop-filter: blur(10px);
}
.game-area {
  border: 2px dashed #ccc;
}
</style>
