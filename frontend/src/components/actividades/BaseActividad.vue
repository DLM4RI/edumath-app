<template>
  <v-card class="pa-6 rounded-xl border-dashed border-2" elevation="0">
    <div class="text-center py-12">
      <v-icon size="64" color="grey-lighten-1" class="mb-4">mdi-math-log</v-icon>
      <h3 class="text-h5 font-weight-bold text-grey-darken-1">Actividad de Pensamiento {{ tipo }}</h3>
      <p class="text-body-1 text-grey">Template para actividad del Grado {{ grado }}</p>
      <v-btn color="primary" variant="tonal" class="mt-4 rounded-xl" @click="$emit('completada')">
        Simular Completada
      </v-btn>
    </div>
  </v-card>
</template>

<script setup>
defineProps(['grado', 'tipo'])
defineEmits(['completada'])
</script>
