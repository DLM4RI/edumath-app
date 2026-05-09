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
          <v-icon start>mdi-book-open-page-variant</v-icon> Aprendamos
        </v-tab>
        <v-tab value="ejemplos" class="text-none font-weight-bold">
          <v-icon start>mdi-lightbulb-on</v-icon> Paso a Paso
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
                <div class="video-container bg-black">
                  <video
                    controls
                    class="w-100 h-100"
                    style="aspect-ratio: 16/9"
                  >
                    <source
                      :src="`/videos/grado1_video${n}.mp4`"
                      type="video/mp4"
                    />
                    Tu navegador no soporta videos.
                  </video>
                </div>
                <v-card-text class="pa-4">
                  <h3 class="text-h6 font-weight-bold mb-1">
                    {{
                      n === 1
                        ? "Estrategias de Conteo"
                        : "Aprendiendo a Sumar y Restar"
                    }}
                  </h3>
                  <p class="text-caption text-medium-emphasis">
                    Lección interactiva para Grado 1°
                  </p>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-window-item>

        <v-window-item value="texto">
          <v-slide-y-transition grow>
            <div class="text-center mb-10">
              <h1 class="text-h3 font-weight-black text-primary mb-2">
                ¡Aventura Numérica!
              </h1>
              <p class="text-h6 text-medium-emphasis">
                Toca las tarjetas para descubrir los secretos de los números
              </p>
            </div>
          </v-slide-y-transition>

          <!-- SECCIÓN: APRENDAMOS (REDISEÑO) -->
          <v-row class="mt-4">
            <!-- TEMA 1: CONTEO -->
            <v-col cols="12">
              <v-card
                class="pa-6 rounded-2xl border-none bg-blue-lighten-5 mb-6 overflow-hidden"
                elevation="0"
              >
                <v-row align="center">
                  <v-col cols="12" md="7">
                    <h2 class="text-h4 font-weight-black mb-3 blue--text">
                      1. ¡A Contar Números!
                    </h2>
                    <p class="text-h6 font-weight-regular mb-4">
                      ¡Contar es fácil! Di los números en orden: 1, 2, 3... Cada
                      vez es un número mayor.
                    </p>
                    <v-chip color="blue-darken-2" variant="flat"
                      >Estrategia: Señalar y Nombrar</v-chip
                    >
                  </v-col>
                  <v-col cols="12" md="5" class="d-flex justify-center">
                    <v-img
                      src="/img/grado1-imagen1-conteo.png"
                      width="100%"
                      class="rounded-xl"
                    ></v-img>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>

            <!-- TEMA 2: SUMA -->
            <v-col cols="12">
              <v-card
                class="pa-6 rounded-2xl border-none bg-green-lighten-5 mb-6 overflow-hidden"
                elevation="0"
              >
                <v-row align="center">
                  <v-col cols="12" md="7">
                    <h2 class="text-h4 font-weight-black mb-3 green--text">
                      2. La Suma (+) ¡Juntar es Ganar!
                    </h2>
                    <p class="text-h6 font-weight-regular mb-4">
                      Sumar es juntar. Si tienes 2 pelotas y te dan 1 más,
                      juntas todo. ¡Ahora tienes 3!
                    </p>
                    <v-chip color="green-darken-2" variant="flat"
                      >Estrategia: Usar Dedos o Fichas</v-chip
                    >
                  </v-col>
                  <v-col cols="12" md="5" class="d-flex justify-center">
                    <v-img
                      src="/img/grado1-imagen2-suma.png"
                      width="100%"
                      class="rounded-xl"
                    ></v-img>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>

            <!-- TEMA 3: RESTA -->
            <v-col cols="12">
              <v-card
                class="pa-6 rounded-2xl border-none bg-red-lighten-5 mb-4 overflow-hidden"
                elevation="0"
              >
                <v-row align="center">
                  <v-col cols="12" md="7">
                    <h2 class="text-h4 font-weight-black mb-3 red--text">
                      3. La Resta (-) ¡Quitar y Ver!
                    </h2>
                    <p class="text-h6 font-weight-regular mb-4">
                      Restar es cuando algo se va. Si tienes 5 galletas y te
                      comes 2, ¿cuántas te quedan en el plato?
                    </p>
                    <v-chip color="red-darken-2" variant="flat"
                      >Estrategia: Tachado Visual</v-chip
                    >
                  </v-col>
                  <v-col cols="12" md="5" class="d-flex justify-center">
                    <v-img
                      src="/img/grado1-imagen3-resta.png"
                      width="100%"
                      class="rounded-xl"
                    ></v-img>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>

          <!-- SECCIÓN DINÁMICA DE RECORDATORIO -->
          <v-alert
            color="primary"
            variant="tonal"
            class="mt-10 rounded-2xl border-dashed"
            icon="mdi-auto-fix"
          >
            <div class="text-h6 font-weight-bold">¿Sabías que...?</div>
            Puedes usar tus juguetes favoritos para practicar sumas y restas en
            casa. ¡Es muy divertido!
          </v-alert>
        </v-window-item>

        <v-window-item value="ejemplos">
          <div class="d-flex align-center mb-6">
            <v-icon size="40" color="amber" class="mr-3"
              >mdi-lightbulb-on</v-icon
            >
            <h2 class="text-h4 font-weight-black">Retos Rápidos</h2>
          </div>

          <v-row>
            <v-col cols="12" md="6">
              <v-card
                class="pa-6 rounded-2xl border shadow-none bg-grey-lighten-4 h-100"
              >
                <div class="d-flex align-center mb-4">
                  <v-avatar color="primary" size="40" class="mr-3 text-white"
                    >1</v-avatar
                  >
                  <h4 class="text-h6 font-weight-bold">El Picnic</h4>
                </div>
                <p class="mb-4">
                  Tienes 4 sándwiches y traes 2 más. ¿Cuántos hay?
                </p>
                <v-img
                  src="/img/grado1-imagen1-resuelta-1.png"
                  class="rounded-xl mb-4"
                  height="200"
                  cover
                  border
                ></v-img>
                <div class="text-success font-weight-black">
                  ¡Hay 6 en total! (4 + 2 = 6)
                </div>
              </v-card>
            </v-col>

            <v-col cols="12" md="6">
              <v-card
                class="pa-6 rounded-2xl border shadow-none bg-grey-lighten-4 h-100"
              >
                <div class="d-flex align-center mb-4">
                  <v-avatar color="secondary" size="40" class="mr-3 text-white"
                    >2</v-avatar
                  >
                  <h4 class="text-h6 font-weight-bold">Los Globos</h4>
                </div>
                <p class="mb-4">
                  Había 5 globos y se volaron 2. ¿Cuántos quedaron?
                </p>
                <v-img
                  src="/img/grado1-imagen2-resuelta-2.png"
                  class="rounded-xl mb-4"
                  height="200"
                  cover
                  border
                ></v-img>
                <div class="text-error font-weight-black">
                  ¡Quedaron 3! (5 - 2 = 3)
                </div>
              </v-card>
            </v-col>
          </v-row>
        </v-window-item>
      </v-window>
    </v-card>

    <div class="mt-12 d-flex justify-end">
      <v-btn
        size="x-large"
        color="primary"
        class="rounded-xl px-8"
        elevation="8"
        :to="`/app/grado/1/actividades`"
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
.video-container {
  aspect-ratio: 16/9;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
