<template>
  <div class="grade-content">
    <header class="mb-8">
      <v-chip color="primary" variant="tonal" class="mb-2 font-weight-bold">
        GRADO 1° • MATEMÁTICAS
      </v-chip>
      <h1 class="text-h3 font-weight-black tracking-tight">
        Explora y Aprende
      </h1>
      <p class="text-h6 text-medium-emphasis">
        Contenido específico para el Grado 1.
      </p>
    </header>

    <v-card class="rounded-2xl overflow-hidden glass-card" border="1">
      <v-tabs
        v-model="tab"
        color="primary"
        grow
        class="content-tabs"
        height="70"
      >
        <v-tab value="videos" class="text-none font-weight-bold">
          <v-icon start>mdi-play-circle</v-icon> Videos
        </v-tab>
        <v-tab value="texto" class="text-none font-weight-bold">
          <v-icon start>mdi-book-open-page-variant</v-icon> Lectura
        </v-tab>
        <v-tab value="ejemplos" class="text-none font-weight-bold">
          <v-icon start>mdi-lightbulb-on</v-icon> Ejemplos
        </v-tab>
      </v-tabs>

      <v-window v-model="tab" class="pa-6 pa-md-10">
        <v-window-item value="videos">
          <v-row>
            <v-col cols="12" md="6" v-for="n in 2" :key="n">
              <v-card
                class="rounded-xl overflow-hidden border shadow-sm"
                elevation="0"
              >
                <div
                  class="video-placeholder bg-grey-lighten-3 d-flex align-center justify-center"
                  style="aspect-ratio: 16/9"
                >
                  <v-icon size="64" color="primary"
                    >mdi-play-box-outline</v-icon
                  >
                </div>
                <v-card-text class="pa-4">
                  <h3 class="text-h6 font-weight-bold mb-1">
                    Video Lección {{ n }} - Grado 1
                  </h3>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-window-item>

        <v-window-item value="texto">
          <h2 class="text-h4 font-weight-black mb-6">
            Fundamentos del Grado 1°
          </h2>
          <p class="text-body-1 mb-4">
            Aquí va la explicación detallada de los temas del grado 1.
          </p>
          <v-img
            src="/field-bg.png"
            class="rounded-2xl elevation-8 mb-6"
            cover
            max-height="300"
          ></v-img>
        </v-window-item>

        <v-window-item value="ejemplos">
          <v-expansion-panels
            variant="accordion"
            class="rounded-xl overflow-hidden border"
          >
            <v-expansion-panel v-for="i in 3" :key="i">
              <v-expansion-panel-title class="font-weight-bold py-4">
                Ejemplo Resuelto #{{ i }}
              </v-expansion-panel-title>
              <v-expansion-panel-text class="pa-4 bg-grey-lighten-5">
                Explicación paso a paso del ejemplo {{ i }} para el grado 1.
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-window-item>
      </v-window>
    </v-card>

    <div class="mt-12 d-flex justify-end">
      <v-btn
        size="x-large"
        color="primary"
        class="rounded-xl px-8"
        elevation="8"
        :to="`/app/grado1/actividades`"
      >
        Ir a Actividades <v-icon end>mdi-chevron-right</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const tab = ref("videos");
</script>

<style scoped>
.glass-card {
  background: rgba(255, 255, 255, 0.8) !important;
  backdrop-filter: blur(10px);
}
</style>
