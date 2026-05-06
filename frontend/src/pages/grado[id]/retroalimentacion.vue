<template>
  <v-container class="py-12 px-8">
    <v-row justify="center">
      <v-col cols="12" md="8" class="text-center">
        <v-avatar :color="currentTheme.primary" size="120" class="mb-8 elevation-10">
          <v-icon size="64" color="white">mdi-message-draw</v-icon>
        </v-avatar>
        
        <h1 class="text-h3 font-weight-black mb-4">Retroalimentación • Grado {{ selectedGrade }}°</h1>
        <p class="text-h6 text-medium-emphasis mb-12">
          Revisa tus logros y áreas de mejora en el grado {{ selectedGrade }}°.
        </p>

        <v-card class="rounded-xl pa-12 glass-card border-dashed" elevation="0">
          <v-icon size="80" color="grey-lighten-2" class="mb-4">mdi-chart-timeline-variant</v-icon>
          <h2 class="text-h5 font-weight-bold text-grey-darken-1 mb-2">Panel de Progreso</h2>
          <p class="text-body-1 text-grey mb-8">Aquí verás tus resultados detallados una vez completes las evaluaciones.</p>
          
          <v-btn
            size="large"
            :color="currentTheme.primary"
            variant="flat"
            class="rounded-xl px-12 text-none font-weight-bold"
            prepend-icon="mdi-arrow-left"
            :to="`/app/grado${selectedGrade}`"
          >
            Volver al Contenido
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useDashboard } from '~/composables/useDashboard'
const { selectedGrade, currentTheme } = useDashboard()


</script>

<style scoped>
.glass-card {
  background: rgba(255, 255, 255, 0.5) !important;
  backdrop-filter: blur(10px);
}
.border-dashed {
  border: 2px dashed #e2e8f0 !important;
}
</style>
