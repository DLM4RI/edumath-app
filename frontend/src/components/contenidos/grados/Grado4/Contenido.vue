<template>
  <div class="grade-content">
    <!-- CABECERA -->
    <header class="mb-8">
      <v-chip color="purple-darken-2" variant="tonal" class="mb-2 font-weight-bold">
        GRADO 4° • MATEMÁTICAS
      </v-chip>
      <h1 class="text-h3 font-weight-black tracking-tight">Lógica de Fracciones y Decimales</h1>
      <p class="text-h6 text-medium-emphasis">
        Comprende los decimales en situaciones reales de medida y comercio.
      </p>
    </header>

    <!-- UNIDAD 1 -->
    <section class="mb-10">
      <v-chip color="purple" variant="tonal" class="mb-6 font-weight-bold text-body-1">
        Decimales en el Mundo Real
      </v-chip>

      <v-row align="stretch">
        <!-- Video -->
        <v-col cols="12" md="6">
          <v-card class="rounded-2xl overflow-hidden" elevation="3" height="100%">
            <div class="video-container bg-black">
              <video controls class="w-100 h-100" preload="metadata">
                <source :src="getVideoSrc(4, 1)" type="video/mp4" />
                Tu navegador no soporta videos.
              </video>
            </div>
            <v-card-text class="pa-4">
              <p class="text-body-2 text-medium-emphasis mb-0">
                <v-icon size="small" color="purple">mdi-play-circle</v-icon>
                <em>Uso de decimales en situaciones cotidianas</em> — 4 min
              </p>
            </v-card-text>
          </v-card>
        </v-col>

        <!-- Texto explicativo con imagen -->
        <v-col cols="12" md="6">
          <v-card class="rounded-2xl pa-6 h-100" elevation="0" border="1">
            <p class="text-overline font-weight-bold text-purple-darken-2 mb-3">¿Por qué importan los decimales?</p>
            <p class="text-body-1 mb-4">
              Los números decimales aparecen todo el tiempo en la vida real: en los precios del supermercado, 
              en el peso de los ingredientes de una receta y en la estatura medida en metros. 
              Sin decimales, no podríamos expresar valores "entre" dos números enteros.
            </p>
            <p class="text-body-1 mb-4">
              La <strong>coma decimal</strong> separa la parte entera de la parte fraccionaria. 
              En el precio <strong>$3.250,75</strong>, el número a la derecha de la coma 
              representa centavos: 75 centésimas de peso.
            </p>

            <!-- ESPACIO IMAGEN: recibo o etiqueta de supermercado -->
            <div class="img-placeholder rounded-xl d-flex align-center justify-center" style="min-height:130px; border: 2px dashed #7B1FA2;">
              <p class="text-medium-emphasis text-center pa-4 text-body-2">[ Imagen: Recibo supermercado → /images/grado4_recibo.png ]</p>
            </div>
          </v-card>
        </v-col>
      </v-row>

      <!-- Conceptos clave: tarjetas con más texto (nivel 4°) -->
      <v-row class="mt-6">
        <v-col cols="12" md="4" v-for="(concepto, i) in conceptosUnidad1" :key="i">
          <v-card class="rounded-2xl pa-5 h-100" :color="concepto.color" variant="tonal" elevation="0">
            <p class="text-h5 mb-2">{{ concepto.emoji }}</p>
            <p class="text-body-1 font-weight-black mb-2">{{ concepto.titulo }}</p>
            <p class="text-body-2">{{ concepto.descripcion }}</p>
          </v-card>
        </v-col>
      </v-row>
    </section>

    <v-divider class="mb-10"></v-divider>

    <!-- UNIDAD 2 -->
    <section class="mb-10">
      <v-chip color="deep-purple" variant="tonal" class="mb-6 font-weight-bold text-body-1">
        Anatomía del Número Decimal
      </v-chip>

      <!-- Video arriba + tabla de valor posicional lado a lado -->
      <v-row align="stretch" class="mb-6">
        <v-col cols="12" md="6">
          <v-card class="rounded-2xl overflow-hidden" elevation="3" height="100%">
            <div class="video-container bg-black">
              <video controls class="w-100 h-100" preload="metadata">
                <source :src="getVideoSrc(4, 2)" type="video/mp4" />
                Tu navegador no soporta videos.
              </video>
            </div>
            <v-card-text class="pa-4">
              <p class="text-body-2 text-medium-emphasis mb-0">
                <v-icon size="small" color="deep-purple">mdi-play-circle</v-icon>
                <em>Lectura, escritura y valor de los decimales</em> — 6 min
              </p>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="6">
          <v-card class="rounded-2xl pa-5 h-100" elevation="0" border="1">
            <p class="text-overline font-weight-bold text-deep-purple-darken-2 mb-4">🔎 Tabla de Valor Posicional</p>

            <!-- Tabla posicional extendida -->
            <v-table density="comfortable" class="rounded-xl overflow-hidden border mb-4">
              <thead>
                <tr class="bg-deep-purple-lighten-4">
                  <th v-for="col in tablaPosicional.headers" :key="col" class="text-center font-weight-black text-body-2 pa-2">
                    {{ col }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td v-for="(val, i) in tablaPosicional.valores" :key="i"
                    class="text-center text-h5 font-weight-black pa-3"
                    :class="i >= 3 ? 'text-deep-purple' : ''"
                  >
                    {{ val }}
                  </td>
                </tr>
                <tr>
                  <td v-for="(lbl, i) in tablaPosicional.labels" :key="i"
                    class="text-center text-caption text-medium-emphasis pa-1"
                  >
                    {{ lbl }}
                  </td>
                </tr>
              </tbody>
            </v-table>

            <p class="text-body-2">
              En <strong>95,11</strong>: el 9 vale <em>noventa</em> (decenas), el 5 vale <em>cinco</em> (unidades), 
              el primer 1 vale <em>una décima</em> y el segundo 1 vale <em>una centésima</em>.
            </p>
            <v-alert type="warning" variant="tonal" density="compact" class="rounded-xl text-body-2">
              <strong>¡Alinea siempre la coma!</strong> Es el punto de referencia de todo número decimal.
            </v-alert>
          </v-card>
        </v-col>
      </v-row>

      <!-- ESPACIO IMAGEN: Infografía descomposición decimal -->
      <v-card class="rounded-2xl mb-6" elevation="0" border="1">
        <v-card-text class="pa-4">
          <div class="img-placeholder rounded-xl d-flex align-center justify-center" style="min-height:150px; border: 2px dashed #4527A0;">
            <p class="text-medium-emphasis text-center pa-4 text-body-2">[ Infografía: Descomposición de 95,11 → /images/grado4_posicional.png ]</p>
          </div>
        </v-card-text>
      </v-card>
    </section>

    <!-- BOTÓN DE NAVEGACIÓN -->
    <div class="mt-12 d-flex justify-end">
      <v-btn
        size="x-large"
        color="purple-darken-2"
        class="rounded-xl px-8"
        elevation="8"
        :to="`/app/grado/4/actividades`"
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

const conceptosUnidad1 = ref([
  {
    emoji: '🏷️',
    titulo: 'Decimales en precios',
    descripcion: 'Los precios usan decimales para representar centavos. $3.250,50 significa tres mil doscientos cincuenta pesos con cincuenta centavos.',
    color: 'purple'
  },
  {
    emoji: '📏',
    titulo: 'Decimales en medidas',
    descripcion: 'Una estatura de 1,35 m indica 1 metro entero y 35 centésimas adicionales. Sin decimales, no podríamos ser precisos.',
    color: 'deep-purple'
  },
  {
    emoji: '⚖️',
    titulo: 'Comparar decimales',
    descripcion: 'Para comparar, observa primero la parte entera. Si es igual, compara décima a décima. ¡La posición importa!',
    color: 'indigo'
  },
])

const tablaPosicional = ref({
  headers: ['Decenas', 'Unidades', ',', 'Décimas', 'Centésimas'],
  valores: ['9', '5', ',', '1', '1'],
  labels: ['×10', '×1', '', '÷10', '÷100'],
})
</script>

<style scoped>
.video-container {
  aspect-ratio: 16/9;
  display: flex;
  align-items: center;
  justify-content: center;
}
.gap-3 { gap: 12px; }
</style>