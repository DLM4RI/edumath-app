<template>
  <div class="grade-content">
    <!-- CABECERA -->
    <header class="mb-8">
      <v-chip color="green-darken-2" variant="tonal" class="mb-2 font-weight-bold">
        GRADO 3° • MATEMÁTICAS
      </v-chip>
      <h1 class="text-h3 font-weight-black tracking-tight">Arquitectos del Sistema Numérico</h1>
      <p class="text-h6 text-medium-emphasis">Descubre patrones y relaciones multiplicativas. 🔍📐</p>
    </header>

    <!-- UNIDAD 1 -->
    <section class="mb-10">
      <v-chip color="green" variant="tonal" class="mb-4 font-weight-bold text-body-1">
        Desafío del Inventario
      </v-chip>

      <!-- Video arriba, ancho completo -->
      <v-card class="rounded-2xl overflow-hidden mb-6" elevation="3">
        <div class="video-container bg-black">
          <video controls class="w-100 h-100" preload="metadata">
            <source :src="getVideoSrc(3, 1)" type="video/mp4" />
            Tu navegador no soporta videos.
          </video>
        </div>
      </v-card>

      <!-- Pregunta disparadora + tabla de conceptos -->
      <v-row class="mb-4">
        <v-col cols="12" md="5">
          <v-card class="rounded-2xl pa-6 h-100" color="green-lighten-5" elevation="0" border="1">
            <p class="text-overline font-weight-bold text-green-darken-3 mb-2">Pregunta para pensar</p>
            <p class="text-h5 font-weight-black mb-4">¿Qué pasa si <em>duplicas</em> una fila del arreglo?</p>
            <p class="text-body-1 text-medium-emphasis">
              Observa el video y anota cuántas cajas hay en cada arreglo. Luego, compara los resultados.
            </p>
          </v-card>
        </v-col>

        <v-col cols="12" md="7">
          <v-card class="rounded-2xl overflow-hidden" elevation="0" border="1">
            <v-table density="comfortable">
              <thead>
                <tr class="bg-green-lighten-4">
                  <th class="text-center font-weight-black text-body-1">Relación</th>
                  <th class="text-center font-weight-black text-body-1">Ejemplo</th>
                  <th class="text-center font-weight-black text-body-1">¿Por qué?</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(fila, i) in tablaUnidad1" :key="i">
                  <td class="text-center font-weight-bold">{{ fila.relacion }}</td>
                  <td class="text-center">{{ fila.ejemplo }}</td>
                  <td class="text-center text-medium-emphasis text-body-2">{{ fila.razon }}</td>
                </tr>
              </tbody>
            </v-table>
          </v-card>
        </v-col>
      </v-row>
    </section>

    <v-divider class="mb-10"></v-divider>

    <!-- UNIDAD 2 -->
    <section class="mb-10">
      <v-chip color="teal" variant="tonal" class="mb-4 font-weight-bold text-body-1">
        Detectives de Secuencias
      </v-chip>

      <v-row align="stretch" class="mb-6">
        <!-- Video -->
        <v-col cols="12" md="7">
          <v-card class="rounded-2xl overflow-hidden" elevation="3" height="100%">
            <div class="video-container bg-black">
              <video controls class="w-100 h-100" preload="metadata">
                <source :src="getVideoSrc(3, 2)" type="video/mp4" />
                Tu navegador no soporta videos.
              </video>
            </div>
          </v-card>
        </v-col>

        <!-- Diagrama de flujo de patrones -->
        <v-col cols="12" md="5">
          <v-card class="rounded-2xl pa-5 h-100" elevation="0" border="1">
            <p class="text-overline font-weight-bold text-teal-darken-2 mb-4">📊 Tipos de Patrón</p>

            <!-- Patrón aditivo -->
            <v-card class="rounded-xl pa-4 mb-4" color="teal-lighten-5" elevation="0">
              <p class="text-body-1 font-weight-black mb-2">➕ Patrón Aditivo</p>
              <div class="d-flex align-center gap-2 flex-wrap">
                <v-chip v-for="n in [2, 5, 8, 11, 14]" :key="n" color="teal" variant="tonal" size="small" class="font-weight-bold">{{ n }}</v-chip>
              </div>
              <p class="text-body-2 text-medium-emphasis mt-2 mb-0">Regla: <strong>+ 3</strong> cada vez</p>
            </v-card>

            <!-- Patrón multiplicativo -->
            <v-card class="rounded-xl pa-4" color="orange-lighten-5" elevation="0">
              <p class="text-body-1 font-weight-black mb-2">✖️ Patrón Multiplicativo</p>
              <div class="d-flex align-center gap-2 flex-wrap">
                <v-chip v-for="n in [2, 4, 8, 16, 32]" :key="n" color="orange" variant="tonal" size="small" class="font-weight-bold">{{ n }}</v-chip>
              </div>
              <p class="text-body-2 text-medium-emphasis mt-2 mb-0">Regla: <strong>× 2</strong> cada vez</p>
            </v-card>
          </v-card>
        </v-col>
      </v-row>
    </section>

    <!-- BOTÓN DE NAVEGACIÓN -->
    <div class="mt-12 d-flex justify-end">
      <v-btn
        size="x-large"
        color="green-darken-2"
        class="rounded-xl px-8"
        elevation="8"
        :to="`/app/grado/3/actividades`"
      >
        ¡A Practicar! <v-icon end>mdi-chevron-right</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

function getVideoSrc(grado, numero) {
  return `/videos/grado${grado}_video${numero}.mp4`
}

const tablaUnidad1 = ref([
  { relacion: 'Doble', ejemplo: 'Tabla del 6 = 2 × tabla del 3', razon: 'Cada producto se duplica' },
  { relacion: 'Triple', ejemplo: 'Tabla del 9 = 3 × tabla del 3', razon: 'Cada producto se triplica' },
  { relacion: 'Mitad', ejemplo: 'Tabla del 4 = ½ × tabla del 8', razon: 'Cada producto se divide en 2' },
])
</script>

<style scoped>
.video-container {
  aspect-ratio: 16/9;
  display: flex;
  align-items: center;
  justify-content: center;
}
.gap-2 { gap: 8px; }
.gap-3 { gap: 12px; }
</style>