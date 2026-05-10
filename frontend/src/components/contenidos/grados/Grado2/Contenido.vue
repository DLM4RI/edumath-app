<template>
  <div class="grade-content">
    <!-- CABECERA -->
    <header class="mb-8">
      <v-chip color="primary" variant="tonal" class="mb-2 font-weight-bold">
        GRADO 2° • MATEMÁTICAS
      </v-chip>
      <h1 class="text-h3 font-weight-black tracking-tight">¡Explora!</h1>
      <p class="text-h6 text-medium-emphasis">Aprende multiplicando y agrupando. 🧮</p>
    </header>

    <!-- UNIDAD 1 -->
    <section class="mb-10">
      <v-chip color="deep-orange" variant="tonal" class="mb-4 font-weight-bold text-body-1">
        La Máquina de Sumas Rápidas
      </v-chip>

      <v-row align="stretch">
        <!-- Video -->
        <v-col cols="12" md="7">
          <v-card class="rounded-2xl overflow-hidden" elevation="3" height="100%">
            <div class="video-container bg-black">
              <video controls class="w-100 h-100" preload="metadata">
                <source :src="getVideoSrc(2, 1)" type="video/mp4" />
                Tu navegador no soporta videos.
              </video>
            </div>
          </v-card>
        </v-col>

        <!-- Frases clave: tarjetas icónicas, sin texto largo -->
        <v-col cols="12" md="5">
          <v-row>
            <v-col cols="12" v-for="(frase, i) in unidad1Frases" :key="i">
              <v-card
                :color="frase.color"
                variant="tonal"
                class="rounded-2xl pa-4 d-flex align-center gap-4"
                elevation="0"
              >
                <span class="text-h3">{{ frase.emoji }}</span>
                <div>
                  <p class="text-h6 font-weight-black mb-0">{{ frase.titulo }}</p>
                  <p class="text-body-2 text-medium-emphasis mb-0">{{ frase.subtitulo }}</p>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </section>

    <v-divider class="mb-10"></v-divider>

    <!-- UNIDAD 2 -->
    <section class="mb-10">
      <v-chip color="blue" variant="tonal" class="mb-4 font-weight-bold text-body-1">
        Arquitectos de Bloques
      </v-chip>

      <v-row align="stretch">
        <!-- Frases clave primero (orden invertido para variedad) -->
        <v-col cols="12" md="5" order="2" order-md="1">
          <v-row>
            <v-col cols="12" v-for="(frase, i) in unidad2Frases" :key="i">
              <v-card
                :color="frase.color"
                variant="tonal"
                class="rounded-2xl pa-4 d-flex align-center gap-4"
                elevation="0"
              >
                <span class="text-h3">{{ frase.emoji }}</span>
                <div>
                  <p class="text-h6 font-weight-black mb-0">{{ frase.titulo }}</p>
                  <p class="text-body-2 text-medium-emphasis mb-0">{{ frase.subtitulo }}</p>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </v-col>

        <!-- Video -->
        <v-col cols="12" md="7" order="1" order-md="2">
          <v-card class="rounded-2xl overflow-hidden" elevation="3" height="100%">
            <div class="video-container bg-black">
              <video controls class="w-100 h-100" preload="metadata">
                <source :src="getVideoSrc(2, 2)" type="video/mp4" />
                Tu navegador no soporta videos.
              </video>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </section>

    <!-- BOTÓN DE NAVEGACIÓN -->
    <div class="mt-12 d-flex justify-end">
      <v-btn
        size="x-large"
        color="primary"
        class="rounded-xl px-8"
        elevation="8"
        :to="`/app/grado/2/actividades`"
      >
        ¡A Practicar! <v-icon end>mdi-chevron-right</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Retorna la ruta como string dinámico para evitar que Vite lo trate como import estático
function getVideoSrc(grado, numero) {
  return `/videos/grado${grado}_video${numero}.mp4`
}

const unidad1Frases = ref([
  { emoji: '➕', titulo: '¡Suma rápido!', subtitulo: 'La multiplicación es sumar grupos iguales', color: 'orange' },
  { emoji: '❌', titulo: 'El signo "veces"', subtitulo: '3 × 5 significa: 3 grupos de 5', color: 'deep-orange' },
  { emoji: '🔄', titulo: '¡El orden no importa!', subtitulo: '3 × 5 es igual a 5 × 3', color: 'amber' },
])

const unidad2Frases = ref([
  { emoji: '5️⃣', titulo: '52 ≠ 25', subtitulo: 'La posición del dígito cambia su valor', color: 'blue' },
  { emoji: '📦', titulo: 'Agrupa de 10 en 10', subtitulo: '10 unidades forman 1 decena', color: 'indigo' },
  { emoji: '💯', titulo: '10 decenas = 1 centena', subtitulo: '¡Llena la caja y sube de nivel!', color: 'cyan' },
])
</script>

<style scoped>
.video-container {
  aspect-ratio: 16/9;
  display: flex;
  align-items: center;
  justify-content: center;
}
.gap-3 { gap: 12px; }
.gap-4 { gap: 16px; }
</style>