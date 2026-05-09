<template>
  <div class="grade-content">
    <!-- CABECERA: Título y Grado -->
    <header class="mb-8">
      <v-chip color="primary" variant="tonal" class="mb-2 font-weight-bold">
        GRADO 1° • MATEMÁTICAS
      </v-chip>
      <h1 class="text-h3 font-weight-black tracking-tight">Explora y Aprende</h1>
      <p class="text-h6 text-medium-emphasis">Descubre nuevos conceptos para el Grado 1.</p>
    </header>

    <v-card class="rounded-2xl overflow-hidden glass-card" border="1">
      <!-- PESTAÑAS: Navegación interna del contenido -->
      <v-tabs v-model="tab" color="primary" grow class="content-tabs" height="70">
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
        <!-- SECCIÓN 1: VIDEOS -->
        <v-window-item value="videos">
          <v-row>
            <v-col cols="12" md="6" v-for="n in 2" :key="n">
              <v-card class="rounded-xl overflow-hidden border shadow-sm" elevation="0">
                <div class="video-container bg-black">
                  <!-- INSTRUCCIÓN: Cambia el 'src' por la ruta de tu video en public/videos/ -->
                  <video controls class="w-100 h-100">
                    <source :src="`/videos/grado1_video${n}.mp4`" type="video/mp4" />
                    Tu navegador no soporta videos.
                  </video>
                </div>
                <v-card-text class="pa-4">
                  <h3 class="text-h6 font-weight-bold mb-1">Lección {{n}}: Título del Video</h3>
                  <p class="text-body-2 text-medium-emphasis">Breve descripción de lo que se enseña en este video.</p>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-window-item>

        <!-- SECCIÓN 2: TEXTO E IMÁGENES -->
        <v-window-item value="texto">
          <h2 class="text-h4 font-weight-black mb-6">Conceptos Clave de Grado 1°</h2>
          
          <!-- INSTRUCCIÓN: Escribe aquí el contenido teórico -->
          <p class="text-body-1 mb-4">
            Las matemáticas en el grado 1 se enfocan en fortalecer tus habilidades de razonamiento. 
            Aquí puedes añadir párrafos explicativos sobre los temas del currículo.
          </p>

          <v-row align="center" class="mt-8">
            <v-col cols="12" md="7">
              <v-alert border="start" color="primary" variant="tonal" class="rounded-xl">
                <p class="mb-0"><strong>Dato Curioso:</strong> ¿Sabías que en Córdoba usamos las matemáticas para calcular las cosechas?</p>
              </v-alert>
            </v-col>
            <v-col cols="12" md="5">
              <!-- INSTRUCCIÓN: Cambia el 'src' por una imagen representativa -->
              <v-img src="/field-bg.png" class="rounded-2xl elevation-8" cover max-height="250"></v-img>
            </v-col>
          </v-row>
        </v-window-item>

        <!-- SECCIÓN 3: EJERCICIOS RESUELTOS -->
        <v-window-item value="ejemplos">
          <h2 class="text-h4 font-weight-black mb-6">Aprende con Ejemplos</h2>
          <v-expansion-panels variant="accordion" class="rounded-xl overflow-hidden border">
            <!-- INSTRUCCIÓN: Añade aquí los pasos de resolución de problemas -->
            <v-expansion-panel v-for="i in 3" :key="i">
              <v-expansion-panel-title class="font-weight-bold py-4">
                Reto Resuelto #{{i}}: Título del Problema
              </v-expansion-panel-title>
              <v-expansion-panel-text class="pa-4 bg-grey-lighten-5">
                <div class="mb-4">
                  <strong class="text-primary">Situación:</strong>
                  <p>Planteamiento del problema matemático de la vida real.</p>
                </div>
                <v-divider class="mb-4"></v-divider>
                <div>
                  <strong class="text-success">Solución:</strong>
                  <p>Explicación paso a paso de cómo se llegó al resultado.</p>
                </div>
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-window-item>
      </v-window>
    </v-card>

    <!-- BOTÓN DE NAVEGACIÓN -->
    <div class="mt-12 d-flex justify-end">
      <v-btn size="x-large" color="primary" class="rounded-xl px-8" elevation="8" :to="`/app/grado/1/actividades`">
        Ir a Practicar <v-icon end>mdi-chevron-right</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
// Estado para controlar qué pestaña está activa
const tab = ref('videos')
</script>

<style scoped>
.glass-card {
  background: rgba(255, 255, 255, 0.8) !important;
  backdrop-filter: blur(10px);
}
.video-container {
  aspect-ratio: 16/9;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
