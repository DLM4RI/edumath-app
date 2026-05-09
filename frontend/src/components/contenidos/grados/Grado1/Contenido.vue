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

          <v-row>
            <!-- TARJETA CONTEO -->
            <v-col cols="12" md="4">
              <v-hover v-slot="{ isHovering, props }">
                <v-card
                  v-bind="props"
                  :elevation="isHovering ? 12 : 2"
                  class="rounded-2xl transition-swing pa-4 text-center h-100"
                  :class="{ 'on-hover': isHovering }"
                  border
                >
                  <v-img
                    src="/imagenes/grado1_conteo.png"
                    height="180"
                    class="rounded-xl mb-4 bg-blue-lighten-5"
                    cover
                  >
                    <template v-slot:placeholder>
                      <div
                        class="d-flex align-center justify-center fill-height"
                      >
                        <v-icon size="48" color="blue-lighten-3"
                          >mdi-image-outline</v-icon
                        >
                      </div>
                    </template>
                  </v-img>
                  <h3 class="text-h5 font-weight-bold mb-2 blue--text">
                    ¡A Contar!
                  </h3>
                  <p class="text-body-2 mb-4">
                    Usa tus dedos o agrupa objetos para saber cuánto hay.
                  </p>
                  <v-chip color="blue" size="small" variant="tonal"
                    >1, 2, 3, 4...</v-chip
                  >
                </v-card>
              </v-hover>
            </v-col>

            <!-- TARJETA SUMA -->
            <v-col cols="12" md="4">
              <v-hover v-slot="{ isHovering, props }">
                <v-card
                  v-bind="props"
                  :elevation="isHovering ? 12 : 2"
                  class="rounded-2xl transition-swing pa-4 text-center h-100"
                  border
                >
                  <v-img
                    src="/imagenes/grado1_suma.png"
                    height="180"
                    class="rounded-xl mb-4 bg-green-lighten-5"
                    cover
                  >
                    <template v-slot:placeholder>
                      <div
                        class="d-flex align-center justify-center fill-height"
                      >
                        <v-icon size="48" color="green-lighten-3"
                          >mdi-image-outline</v-icon
                        >
                      </div>
                    </template>
                  </v-img>
                  <h3 class="text-h5 font-weight-bold mb-2 green--text">
                    La Suma (+)
                  </h3>
                  <p class="text-body-2 mb-4">
                    ¡Cuando juntamos cosas, el grupo se hace más grande!
                  </p>
                  <v-chip color="green" size="small" variant="tonal"
                    >Juntar y Ganar</v-chip
                  >
                </v-card>
              </v-hover>
            </v-col>

            <!-- TARJETA RESTA -->
            <v-col cols="12" md="4">
              <v-hover v-slot="{ isHovering, props }">
                <v-card
                  v-bind="props"
                  :elevation="isHovering ? 12 : 2"
                  class="rounded-2xl transition-swing pa-4 text-center h-100"
                  border
                >
                  <v-img
                    src="/imagenes/grado1_resta.png"
                    height="180"
                    class="rounded-xl mb-4 bg-red-lighten-5"
                    cover
                  >
                    <template v-slot:placeholder>
                      <div
                        class="d-flex align-center justify-center fill-height"
                      >
                        <v-icon size="48" color="red-lighten-3"
                          >mdi-image-outline</v-icon
                        >
                      </div>
                    </template>
                  </v-img>
                  <h3 class="text-h5 font-weight-bold mb-2 red--text">
                    La Resta (-)
                  </h3>
                  <p class="text-body-2 mb-4">
                    ¡Cuando quitamos cosas, buscamos lo que queda!
                  </p>
                  <v-chip color="red" size="small" variant="tonal"
                    >Quitar y Buscar</v-chip
                  >
                </v-card>
              </v-hover>
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
                  src="grado1-imagen1-resuelta-1.png"
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
                  src="grado1-imagen2-resuelta-2.png"
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
