<template>
  <div class="grade-content">

    <!-- CABECERA -->
    <header class="mb-8">
      <v-chip color="red-darken-2" variant="tonal" class="mb-2 font-weight-bold">
        GRADO 5° • MATEMÁTICAS
      </v-chip>
      <h1 class="text-h3 font-weight-black tracking-tight">Potencias, Raíces y el Mundo de los Datos</h1>
      <p class="text-h6 text-medium-emphasis">
        Domina la notación potencial, la radicación y el análisis de información estadística y geométrica.
      </p>
    </header>

    <!-- ══════════════════════════════════════════
         UNIDAD 1 — POTENCIACIÓN
    ══════════════════════════════════════════ -->
    <section class="mb-10">
      <v-chip color="red" variant="tonal" class="mb-6 font-weight-bold text-body-1">
        Potenciación: La Multiplicación Acelerada
      </v-chip>

      <v-row align="stretch" class="mb-6">
        <!-- Video -->
        <v-col cols="12" md="6">
          <v-card class="rounded-2xl overflow-hidden" elevation="4" height="100%">
            <div class="video-container bg-black">
              <video controls class="w-100 h-100" preload="metadata">
                <source :src="getVideoSrc(5, 1)" type="video/mp4" />
                Tu navegador no soporta videos.
              </video>
            </div>
            <v-card-text class="pa-4 pb-3">
              <p class="text-body-2 text-medium-emphasis mb-0">
                <v-icon size="small" color="red">mdi-play-circle</v-icon>
                <em>Potenciación: bases, exponentes y potencias</em>
              </p>
            </v-card-text>
          </v-card>
        </v-col>

        <!-- Explicación formal + notación -->
        <v-col cols="12" md="6">
          <v-card class="rounded-2xl pa-6 h-100" elevation="0" border="1">
            <p class="text-overline font-weight-bold text-red-darken-2 mb-3">¿Qué es una potencia?</p>
            <p class="text-body-1 mb-4">
              Una <strong>potencia</strong> es una forma abreviada de escribir una multiplicación
              donde el mismo número se repite como factor. Se compone de dos partes:
              la <strong>base</strong> (el número que se multiplica) y el
              <strong>exponente</strong> (cuántas veces se multiplica por sí mismo).
            </p>
            <v-card class="rounded-xl pa-5 mb-4 text-center" color="red-lighten-5" elevation="0">
              <p class="text-overline mb-1 text-red-darken-3">Anatomía de una Potencia</p>
              <div class="d-flex align-center justify-center gap-4 flex-wrap">
                <div class="text-center">
                  <p class="text-h2 font-weight-black text-red mb-0" style="line-height:1">2³</p>
                  <p class="text-caption text-medium-emphasis mt-1">Se lee: "dos al cubo"</p>
                </div>
                <v-divider vertical class="mx-2" style="height:60px"></v-divider>
                <div class="text-left">
                  <p class="text-body-2 mb-1"><strong class="text-red">2</strong> → Base (número que se multiplica)</p>
                  <p class="text-body-2 mb-1"><strong class="text-red">3</strong> → Exponente (veces que se repite)</p>
                  <p class="text-body-2 mb-0"><strong>= 2 × 2 × 2 = 8</strong></p>
                </div>
              </div>
            </v-card>
            <v-alert type="info" variant="tonal" density="compact" class="rounded-xl text-body-2">
              <strong>Casos especiales:</strong> cualquier número elevado a <strong>0</strong> es igual a <strong>1</strong>.
              Y elevado a <strong>1</strong>, es el mismo número.
            </v-alert>
          </v-card>
        </v-col>
      </v-row>

      <!-- Tablas de potencias -->
      <v-card class="rounded-2xl mb-6" elevation="0" border="1">
        <v-card-text class="pa-5">
          <p class="text-overline font-weight-bold text-red-darken-2 mb-4">Tabla de Potencias Frecuentes</p>
          <v-row>
            <v-col cols="12" md="6">
              <p class="text-body-1 font-weight-bold mb-3 text-center">Potencias de 2</p>
              <v-table density="comfortable" class="rounded-xl overflow-hidden border">
                <thead>
                  <tr class="bg-red-lighten-4">
                    <th class="text-center font-weight-black">Potencia</th>
                    <th class="text-center font-weight-black">Desarrollo</th>
                    <th class="text-center font-weight-black">Resultado</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="p in potencias2" :key="p.exp">
                    <td class="text-center font-weight-bold text-red">2<sup>{{ p.exp }}</sup></td>
                    <td class="text-center text-body-2 text-medium-emphasis">{{ p.desarrollo }}</td>
                    <td class="text-center font-weight-black">{{ p.resultado }}</td>
                  </tr>
                </tbody>
              </v-table>
            </v-col>
            <v-col cols="12" md="6">
              <p class="text-body-1 font-weight-bold mb-3 text-center">Potencias de 10</p>
              <v-table density="comfortable" class="rounded-xl overflow-hidden border">
                <thead>
                  <tr class="bg-red-lighten-4">
                    <th class="text-center font-weight-black">Potencia</th>
                    <th class="text-center font-weight-black">Resultado</th>
                    <th class="text-center font-weight-black">Se llama</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="p in potencias10" :key="p.exp">
                    <td class="text-center font-weight-bold text-red">10<sup>{{ p.exp }}</sup></td>
                    <td class="text-center font-weight-black">{{ p.resultado }}</td>
                    <td class="text-center text-body-2 text-medium-emphasis">{{ p.nombre }}</td>
                  </tr>
                </tbody>
              </v-table>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>

      <!-- ESPACIO IMAGEN -->
      <v-card class="rounded-2xl mb-6" elevation="0" border="1">
        <v-card-text class="pa-4">
          <div class="img-placeholder rounded-xl d-flex align-center justify-center"
               style="min-height:140px; border: 2px dashed #C62828;">
            <p class="text-medium-emphasis text-center pa-4 text-body-2">
              [ Imagen: Comparación multiplicación vs potencia → /images/grado5_potencia.png ]
            </p>
          </div>
        </v-card-text>
      </v-card>
    </section>

    <v-divider class="mb-10"></v-divider>

    <!-- ══════════════════════════════════════════
         UNIDAD 2 — RADICACIÓN
    ══════════════════════════════════════════ -->
    <section class="mb-10">
      <v-chip color="deep-orange" variant="tonal" class="mb-6 font-weight-bold text-body-1">
        Radicación: La Operación Inversa
      </v-chip>

      <v-row align="stretch" class="mb-6">
        <!-- Explicación -->
        <v-col cols="12" md="6" order="2" order-md="1">
          <v-card class="rounded-2xl pa-6 h-100" elevation="0" border="1">
            <p class="text-overline font-weight-bold text-deep-orange-darken-2 mb-3">¿Qué es la raíz cuadrada?</p>
            <p class="text-body-1 mb-4">
              La <strong>radicación</strong> es la operación inversa de la potenciación.
              Encontrar la raíz cuadrada de un número significa hallar qué número,
              multiplicado por sí mismo, produce ese resultado.
            </p>
            <v-card class="rounded-xl pa-5 mb-4" color="orange-lighten-5" elevation="0">
              <p class="text-overline mb-3 text-deep-orange-darken-2 text-center">Relación Inversa</p>
              <div class="d-flex align-center justify-center gap-3 flex-wrap">
                <v-card class="rounded-lg pa-3 text-center" elevation="1" min-width="100">
                  <p class="text-body-2 text-medium-emphasis mb-1">Potencia</p>
                  <p class="text-h5 font-weight-black mb-0">4² = 16</p>
                </v-card>
                <div class="d-flex flex-column align-center gap-1">
                  <v-icon color="deep-orange">mdi-arrow-right</v-icon>
                  <v-icon color="deep-orange">mdi-arrow-left</v-icon>
                </div>
                <v-card class="rounded-lg pa-3 text-center" elevation="1" min-width="100">
                  <p class="text-body-2 text-medium-emphasis mb-1">Raíz</p>
                  <p class="text-h5 font-weight-black mb-0">√16 = 4</p>
                </v-card>
              </div>
            </v-card>
            <p class="text-body-1 mb-3">
              Los números que tienen raíz cuadrada exacta se llaman
              <strong>cuadrados perfectos</strong>: 1, 4, 9, 16, 25, 36, 49, 64, 81, 100...
            </p>
            <v-alert type="success" variant="tonal" density="compact" class="rounded-xl text-body-2">
              <strong>Conexión geométrica:</strong> √A equivale al lado de un cuadrado cuya área es A.
              Si el área es 25 m², el lado mide <strong>5 m</strong>.
            </v-alert>
          </v-card>
        </v-col>

        <!-- Video -->
        <v-col cols="12" md="6" order="1" order-md="2">
          <v-card class="rounded-2xl overflow-hidden" elevation="4" height="100%">
            <div class="video-container bg-black">
              <video controls class="w-100 h-100" preload="metadata">
                <source :src="getVideoSrc(5, 2)" type="video/mp4" />
                Tu navegador no soporta videos.
              </video>
            </div>
            <v-card-text class="pa-4 pb-3">
              <p class="text-body-2 text-medium-emphasis mb-0">
                <v-icon size="small" color="deep-orange">mdi-play-circle</v-icon>
                <em>Radicación y cuadrados perfectos</em>
              </p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- Chips cuadrados perfectos -->
      <v-card class="rounded-2xl mb-6" elevation="0" border="1">
        <v-card-text class="pa-5">
          <p class="text-overline font-weight-bold text-deep-orange-darken-2 mb-4">Cuadrados Perfectos del 1 al 100</p>
          <div class="d-flex flex-wrap gap-2">
            <v-chip
              v-for="cp in cuadradosPerfectos"
              :key="cp.n"
              color="deep-orange"
              variant="tonal"
              class="font-weight-bold"
            >
              √{{ cp.cuadrado }} = {{ cp.n }}
            </v-chip>
          </div>
        </v-card-text>
      </v-card>

      <!-- ESPACIO IMAGEN -->
      <v-card class="rounded-2xl mb-6" elevation="0" border="1">
        <v-card-text class="pa-4">
          <div class="img-placeholder rounded-xl d-flex align-center justify-center"
               style="min-height:140px; border: 2px dashed #E64A19;">
            <p class="text-medium-emphasis text-center pa-4 text-body-2">
              [ Imagen: Cuadrado con área y lado → /images/grado5_radicacion.png ]
            </p>
          </div>
        </v-card-text>
      </v-card>
    </section>

    <v-divider class="mb-10"></v-divider>

    <!-- ══════════════════════════════════════════
         UNIDAD 3 — PENSAMIENTO GEOMÉTRICO
    ══════════════════════════════════════════ -->
    <section class="mb-10">
      <v-chip color="blue-darken-2" variant="tonal" class="mb-6 font-weight-bold text-body-1">
        Geometría: Área, Perímetro y Volumen
      </v-chip>

      <v-row align="stretch" class="mb-6">
        <!-- Video -->
        <v-col cols="12" md="6">
          <v-card class="rounded-2xl overflow-hidden" elevation="4" height="100%">
            <div class="video-container bg-black">
              <video controls class="w-100 h-100" preload="metadata">
                <source :src="getVideoSrc(5, 3)" type="video/mp4" />
                Tu navegador no soporta videos.
              </video>
            </div>
            <v-card-text class="pa-4 pb-3">
              <p class="text-body-2 text-medium-emphasis mb-0">
                <v-icon size="small" color="blue">mdi-play-circle</v-icon>
                <em>Área, perímetro y volumen en figuras planas y sólidos</em>
              </p>
            </v-card-text>
          </v-card>
        </v-col>

        <!-- Tabla fórmulas -->
        <v-col cols="12" md="6">
          <v-card class="rounded-2xl pa-5 h-100" elevation="0" border="1">
            <p class="text-overline font-weight-bold text-blue-darken-2 mb-4">Fórmulas Clave</p>
            <v-table density="comfortable" class="rounded-xl overflow-hidden border">
              <thead>
                <tr class="bg-blue-lighten-4">
                  <th class="font-weight-black">Figura</th>
                  <th class="font-weight-black text-center">Área</th>
                  <th class="font-weight-black text-center">Perímetro</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="f in formulasGeo" :key="f.figura">
                  <td class="font-weight-bold">{{ f.emoji }} {{ f.figura }}</td>
                  <td class="text-center text-body-2"><em>{{ f.area }}</em></td>
                  <td class="text-center text-body-2"><em>{{ f.perimetro }}</em></td>
                </tr>
              </tbody>
            </v-table>
            <v-alert type="warning" variant="tonal" density="compact" class="rounded-xl mt-4 text-body-2">
              <strong>Volumen del cubo:</strong> V = lado³ (¡aquí usamos potenciación!)
            </v-alert>
          </v-card>
        </v-col>
      </v-row>

      <!-- ESPACIO IMAGEN -->
      <v-card class="rounded-2xl mb-6" elevation="0" border="1">
        <v-card-text class="pa-4">
          <div class="img-placeholder rounded-xl d-flex align-center justify-center"
               style="min-height:150px; border: 2px dashed #1565C0;">
            <p class="text-medium-emphasis text-center pa-4 text-body-2">
              [ Infografía: Figuras geométricas con fórmulas → /images/grado5_geometria.png ]
            </p>
          </div>
        </v-card-text>
      </v-card>
    </section>

    <v-divider class="mb-10"></v-divider>

    <!-- ══════════════════════════════════════════
         UNIDAD 4 — PENSAMIENTO ESTADÍSTICO
    ══════════════════════════════════════════ -->
    <section class="mb-10">
      <v-chip color="teal-darken-2" variant="tonal" class="mb-6 font-weight-bold text-body-1">
        Estadística: Leer e Interpretar Datos
      </v-chip>

      <v-row align="stretch" class="mb-6">
        <!-- Acordeón medidas -->
        <v-col cols="12" md="6" order="2" order-md="1">
          <v-card class="rounded-2xl pa-6 h-100" elevation="0" border="1">
            <p class="text-overline font-weight-bold text-teal-darken-2 mb-3">Medidas de Tendencia Central</p>
            <p class="text-body-1 mb-5">
              La estadística permite <strong>resumir y comprender grandes cantidades de datos</strong>.
              Las medidas de tendencia central nos dicen cuál es el valor "representativo" de un conjunto.
            </p>
            <v-expansion-panels variant="accordion" class="rounded-xl overflow-hidden border">
              <v-expansion-panel v-for="medida in medidasEstadisticas" :key="medida.nombre">
                <v-expansion-panel-title class="font-weight-bold py-3">
                  {{ medida.emoji }} {{ medida.nombre }}
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <p class="text-body-2 mb-2">{{ medida.definicion }}</p>
                  <v-card class="rounded-lg pa-3" :color="medida.color" variant="tonal" elevation="0">
                    <p class="text-body-2 mb-0"><strong>Ejemplo:</strong> {{ medida.ejemplo }}</p>
                  </v-card>
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-card>
        </v-col>

        <!-- Video -->
        <v-col cols="12" md="6" order="1" order-md="2">
          <v-card class="rounded-2xl overflow-hidden" elevation="4" height="100%">
            <div class="video-container bg-black">
              <video controls class="w-100 h-100" preload="metadata">
                <source :src="getVideoSrc(5, 4)" type="video/mp4" />
                Tu navegador no soporta videos.
              </video>
            </div>
            <v-card-text class="pa-4 pb-3">
              <p class="text-body-2 text-medium-emphasis mb-0">
                <v-icon size="small" color="teal">mdi-play-circle</v-icon>
                <em>Estadística: gráficas, media, moda y mediana</em>
              </p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- ESPACIO IMAGEN -->
      <v-card class="rounded-2xl mb-6" elevation="0" border="1">
        <v-card-text class="pa-4">
          <p class="text-overline font-weight-bold text-teal-darken-2 mb-3">Tipos de Gráficas Estadísticas</p>
          <div class="img-placeholder rounded-xl d-flex align-center justify-center"
               style="min-height:160px; border: 2px dashed #00695C;">
            <p class="text-medium-emphasis text-center pa-4 text-body-2">
              [ Infografía: Gráfica de barras, pictograma y diagrama de sectores → /images/grado5_estadistica.png ]
            </p>
          </div>
        </v-card-text>
      </v-card>
    </section>

    <!-- BOTÓN DE NAVEGACIÓN -->
    <div class="mt-12 d-flex justify-end">
      <v-btn
        size="x-large"
        color="red-darken-2"
        class="rounded-xl px-8"
        elevation="8"
        :to="`/app/grado/5/actividades`"
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

const potencias2 = ref([
  { exp: 0, desarrollo: '—',                  resultado: 1  },
  { exp: 1, desarrollo: '2',                  resultado: 2  },
  { exp: 2, desarrollo: '2 × 2',              resultado: 4  },
  { exp: 3, desarrollo: '2 × 2 × 2',          resultado: 8  },
  { exp: 4, desarrollo: '2 × 2 × 2 × 2',      resultado: 16 },
  { exp: 5, desarrollo: '2 × 2 × 2 × 2 × 2', resultado: 32 },
])

const potencias10 = ref([
  { exp: 0, resultado: '1',       nombre: 'Uno'      },
  { exp: 1, resultado: '10',      nombre: 'Decena'   },
  { exp: 2, resultado: '100',     nombre: 'Centena'  },
  { exp: 3, resultado: '1.000',   nombre: 'Mil'      },
  { exp: 4, resultado: '10.000',  nombre: 'Diez mil' },
  { exp: 5, resultado: '100.000', nombre: 'Cien mil' },
])

const cuadradosPerfectos = ref([
  { n: 1,  cuadrado: 1   },
  { n: 2,  cuadrado: 4   },
  { n: 3,  cuadrado: 9   },
  { n: 4,  cuadrado: 16  },
  { n: 5,  cuadrado: 25  },
  { n: 6,  cuadrado: 36  },
  { n: 7,  cuadrado: 49  },
  { n: 8,  cuadrado: 64  },
  { n: 9,  cuadrado: 81  },
  { n: 10, cuadrado: 100 },
])

const formulasGeo = ref([
  { emoji: '▭', figura: 'Rectángulo', area: 'base × altura',        perimetro: '2(b + a)'      },
  { emoji: '■', figura: 'Cuadrado',   area: 'lado²',                perimetro: '4 × lado'      },
  { emoji: '▲', figura: 'Triángulo',  area: '(base × altura) ÷ 2', perimetro: 'l₁ + l₂ + l₃' },
  { emoji: '⬡', figura: 'Círculo',    area: 'π × r²',              perimetro: '2 × π × r'     },
])

const medidasEstadisticas = ref([
  {
    emoji: '➕',
    nombre: 'Media (Promedio)',
    definicion: 'Se calcula sumando todos los valores y dividiendo entre la cantidad de datos. Representa el valor equilibrado del conjunto.',
    ejemplo: 'Notas: 3, 4, 5, 4, 4 → Suma = 20 → Media = 20 ÷ 5 = 4,0',
    color: 'teal',
  },
  {
    emoji: '🎯',
    nombre: 'Moda',
    definicion: 'Es el valor que aparece con mayor frecuencia en el conjunto de datos. Puede haber más de una moda o ninguna.',
    ejemplo: 'Datos: 3, 4, 4, 4, 5 → La moda es 4 (aparece 3 veces)',
    color: 'blue',
  },
  {
    emoji: '⚖️',
    nombre: 'Mediana',
    definicion: 'Es el valor central cuando los datos están ordenados de menor a mayor. Divide el conjunto en dos mitades iguales.',
    ejemplo: 'Datos ordenados: 3, 4, 4, 5, 5 → La mediana es 4 (el del centro)',
    color: 'green',
  },
])
</script>

<style scoped>
.video-container {
  aspect-ratio: 16/9;
  display: flex;
  align-items: center;
  justify-content: center;
}
.gap-1 { gap: 4px;  }
.gap-2 { gap: 8px;  }
.gap-3 { gap: 12px; }
.gap-4 { gap: 16px; }
</style>