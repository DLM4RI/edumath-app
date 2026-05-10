<template>
  <div class="grade-content">

    <!-- CABECERA -->
    <header class="mb-8 header-hero">
      <div class="header-chip-wrap">
        <span class="grado-chip">GRADO 2° • MATEMÁTICAS</span>
      </div>
      <div class="header-centered">
        <h1 class="title-main">¡Vamos a explorar!</h1>
        <p class="subtitle-hero">Hoy aprendemos a <strong>multiplicar</strong> y a conocer los <strong>números grandes</strong>.</p>
      </div>
    </header>

    <!-- UNIDAD 1 -->
    <section class="mb-10">

      <div class="section-label label-orange">
        La Máquina de Sumas Rápidas
      </div>

      <v-row align="stretch">
        <!-- Video -->
        <v-col cols="12" md="7">
          <v-card class="rounded-3xl overflow-hidden card-shadow" elevation="0" height="100%">
            <div class="video-container bg-black">
              <video controls class="w-100 h-100" preload="metadata">
                <source :src="getVideoSrc(2, 1)" type="video/mp4" />
                Tu navegador no soporta videos.
              </video>
            </div>
          </v-card>
        </v-col>

        <!-- Conceptos clave -->
        <v-col cols="12" md="5">
          <v-row class="h-100">
            <v-col cols="12" v-for="(frase, i) in unidad1Frases" :key="i">
              <v-card class="rounded-3xl pa-5 kid-card" elevation="0">
                <p class="kid-card-title title-orange">{{ frase.titulo }}</p>
                <p class="kid-card-body">{{ frase.subtitulo }}</p>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <!-- Ejemplos aplicados -->
      <div class="section-box box-orange mt-6">
        <p class="box-title title-orange">¡Lo vemos todos los días!</p>
        <p class="box-body">Cuando hay grupos con la misma cantidad de cosas, ¡podemos multiplicar!</p>
        <v-row>
          <v-col cols="12" sm="4" v-for="(ej, i) in unidad1Ejemplos" :key="i">
            <v-card class="rounded-3xl pa-5 kid-card" elevation="0">
              <p class="kid-example-icon">{{ ej.emoji }}</p>
              <p class="kid-card-body font-weight-bold mb-3">{{ ej.situacion }}</p>
              <span class="resultado-chip chip-orange">{{ ej.operacion }}</span>
            </v-card>
          </v-col>
        </v-row>
      </div>

      <!-- Dato curioso -->
      <div class="section-box box-amber mt-4">
        <p class="box-title title-amber">¿Sabías esto?</p>
        <p class="box-body">¡La multiplicación existe desde hace miles de años! La inventaron personas que necesitaban contar muchas cosas rápido: animales, semillas y personas. Hoy tú también la usas sin darte cuenta.</p>
      </div>
    </section>

    <div class="divider-kids my-10">✦ ✦ ✦</div>

    <!-- UNIDAD 2 -->
    <section class="mb-10">

      <div class="section-label label-purple">
        Arquitectos de Números
      </div>

      <v-row align="stretch">
        <!-- Conceptos clave -->
        <v-col cols="12" md="5" order="2" order-md="1">
          <v-row class="h-100">
            <v-col cols="12" v-for="(frase, i) in unidad2Frases" :key="i">
              <v-card class="rounded-3xl pa-5 kid-card" elevation="0">
                <p class="kid-card-title title-purple">{{ frase.titulo }}</p>
                <p class="kid-card-body">{{ frase.subtitulo }}</p>
              </v-card>
            </v-col>
          </v-row>
        </v-col>

        <!-- Video -->
        <v-col cols="12" md="7" order="1" order-md="2">
          <v-card class="rounded-3xl overflow-hidden card-shadow" elevation="0" height="100%">
            <div class="video-container bg-black">
              <video controls class="w-100 h-100" preload="metadata">
                <source :src="getVideoSrc(2, 2)" type="video/mp4" />
                Tu navegador no soporta videos.
              </video>
            </div>
          </v-card>
        </v-col>
      </v-row>

      <!-- Tabla valor posicional -->
      <div class="section-box box-blue mt-6">
        <p class="box-title title-blue">¿Cómo se arma un número?</p>
        <p class="box-body">Cada número ocupa un lugar especial. ¡Ese lugar le da su valor!</p>
        <v-row justify="center">
          <v-col cols="12" sm="4" v-for="(nivel, i) in valorPosicional" :key="i">
            <v-card class="rounded-3xl pa-5 text-center kid-card" elevation="0">
              <div class="posicion-icon">{{ nivel.icono }}</div>
              <p class="kid-card-title title-blue">{{ nivel.nombre }}</p>
              <p class="kid-card-body mb-3">{{ nivel.descripcion }}</p>
              <span class="resultado-chip chip-blue">{{ nivel.ejemplo }}</span>
            </v-card>
          </v-col>
        </v-row>
      </div>

      <!-- Ejemplos aplicados -->
      <div class="section-box box-indigo mt-4">
        <p class="box-title title-indigo">Números que ya conoces</p>
        <p class="box-body">¡Practiquemos! ¿Cuántas decenas y unidades tienen estos números?</p>
        <v-row>
          <v-col cols="12" sm="4" v-for="(ej, i) in unidad2Ejemplos" :key="i">
            <v-card class="rounded-3xl pa-5 kid-card" elevation="0">
              <p class="kid-example-icon">{{ ej.emoji }}</p>
              <p class="kid-card-body font-weight-bold mb-3">{{ ej.texto }}</p>
              <span class="resultado-chip chip-indigo numero-grande">{{ ej.numero }}</span>
            </v-card>
          </v-col>
        </v-row>
      </div>

      <!-- Dato curioso -->
      <div class="section-box box-cyan mt-4">
        <p class="box-title title-teal">¿Sabías esto?</p>
        <p class="box-body">¡Los números no terminan nunca! Siempre puedes agregar uno más. Por eso los organizamos en grupos: unidades, decenas, centenas... Se llama el <strong>sistema decimal</strong> y es como el alfabeto de las matemáticas.</p>
      </div>
    </section>

    <div class="divider-kids my-10">✦ ✦ ✦</div>

    <!-- SECCIÓN: LO QUE APRENDÍ HOY -->
    <section class="mb-10">
      <div class="section-label label-green">
        ¡Mira todo lo que aprendí hoy!
      </div>
      <v-row>
        <v-col cols="12" sm="6" md="3" v-for="(logro, i) in logros" :key="i">
          <v-card class="rounded-3xl pa-5 h-100 kid-card logro-card" elevation="0">
            <div class="logro-icon">{{ logro.emoji }}</div>
            <p class="kid-card-title" :class="logroTitleClasses[i]">{{ logro.titulo }}</p>
            <p class="kid-card-body">{{ logro.descripcion }}</p>
          </v-card>
        </v-col>
      </v-row>
    </section>

    <!-- BOTÓN DE NAVEGACIÓN -->
    <div class="mt-12 d-flex justify-center">
      <button class="btn-practica" @click="$router.push('/app/grado/2/actividades')">
        ¡A Practicar!
      </button>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'

function getVideoSrc(grado, numero) {
  return `/videos/grado${grado}_video${numero}.mp4`
}

const unidad1Frases = ref([
  {
    emoji: '➕',
    titulo: 'Multiplicar es sumar grupos iguales',
    subtitulo: '4 + 4 + 4 es lo mismo que 3 × 4. ¡Los dos dan 12!'
  },
  {
    emoji: '✖️',
    titulo: 'El signo × significa "grupos de"',
    subtitulo: '3 × 5 se lee "3 grupos de 5". El resultado se llama producto.'
  },
  {
    emoji: '🔄',
    titulo: 'Da igual el orden',
    subtitulo: '3 × 5 es igual a 5 × 3. ¡Siempre dan 15! Eso se llama propiedad conmutativa.'
  },
])

const unidad1Ejemplos = ref([
  { emoji: '🍬', situacion: '3 bolsas con 4 dulces cada una', operacion: '3 × 4 = 12' },
  { emoji: '🐾', situacion: '4 animales con 4 patas cada uno', operacion: '4 × 4 = 16' },
  { emoji: '✏️', situacion: '5 cajas con 8 lápices cada una', operacion: '5 × 8 = 40' },
])

const unidad2Frases = ref([
  {
    emoji: '📍',
    titulo: 'El lugar importa',
    subtitulo: 'En 52, el 5 vale 50. En 25, el 5 vale solo 5. ¡El mismo número, diferente valor!'
  },
  {
    emoji: '🔟',
    titulo: 'Las decenas',
    subtitulo: 'Si juntamos 10 unidades, formamos 1 decena. ¡Como cambiar 10 monedas por un billete!'
  },
  {
    emoji: '💯',
    titulo: 'Las centenas',
    subtitulo: 'Si juntamos 10 decenas, formamos 1 centena. ¡Eso son 100 unidades juntas!'
  },
])

const valorPosicional = ref([
  { icono: '1️⃣', nombre: 'Unidades', descripcion: 'Son los números del 0 al 9. Van al lado derecho.', ejemplo: 'el 3 en el número 43' },
  { icono: '🔟', nombre: 'Decenas', descripcion: 'Son grupos de 10. Van en el medio.', ejemplo: 'el 4 en 43 vale 40' },
  { icono: '💯', nombre: 'Centenas', descripcion: 'Son grupos de 100. Van a la izquierda.', ejemplo: 'el 1 en 143 vale 100' },
])

const unidad2Ejemplos = ref([
  { emoji: '🚌', texto: 'Un bus tiene 45 pasajeros: 4 decenas y 5 unidades.', numero: '45' },
  { emoji: '📚', texto: 'Una biblioteca tiene 130 libros: 1 centena y 3 decenas.', numero: '130' },
  { emoji: '🌳', texto: 'En el parque hay 76 árboles: 7 decenas y 6 unidades.', numero: '76' },
])

const logros = ref([
  {
    emoji: '✖️',
    titulo: '¡Entiendo la multiplicación!',
    descripcion: 'Sé que es una forma rápida de sumar grupos iguales.'
  },
  {
    emoji: '📍',
    titulo: '¡Sé el valor de cada número!',
    descripcion: 'Puedo decir cuánto vale cada dígito según su lugar.'
  },
  {
    emoji: '🌍',
    titulo: '¡Lo veo en mi vida!',
    descripcion: 'Reconozco la multiplicación y los números grandes a mi alrededor.'
  },
  {
    emoji: '🧠',
    titulo: '¡Pienso como matemático!',
    descripcion: 'Encuentro patrones y puedo explicar cómo resolví los problemas.'
  },
])

const logroTitleClasses = ['title-orange', 'title-blue', 'title-teal', 'title-purple']
</script>

<style scoped>
/* =============================================
   BASE — tipografía para niños de 7-8 años
   Fuente redondeada, tamaños generosos,
   interlineado amplio para lectores en proceso.
   ============================================= */
.grade-content {
  font-family: 'Nunito', 'Trebuchet MS', 'Comic Sans MS', cursive, sans-serif;
  font-size: 1rem;
  line-height: 1.7;
}

/* CABECERA */
.header-hero {
  padding: 2rem 1rem 1rem;
}
.header-chip-wrap {
  text-align: left;
  margin-bottom: 1rem;
}
.grado-chip {
  display: inline-block;
  background: rgba(98, 0, 238, 0.08);
  color: blue;
  border-radius: 999px;
  padding: 4px 14px;
  font-size: 0.85rem;
  font-weight: 700;
  font-family: 'Roboto', sans-serif;
  letter-spacing: 0.04em;
  line-height: 1.6;
}
.header-centered {
  text-align: center;
}
.header-hero .v-chip {
  display: block;
  width: fit-content;
  text-align: left;
  margin-bottom: 1rem;
}

.header-badge {
  display: inline-block;
  background: #FFF9C4;
  color: #5D4037;
  border: 2.5px solid #F9A825;
  border-radius: 999px;
  padding: 6px 20px;
  font-size: 1rem;
  font-weight: 800;
  letter-spacing: 0.03em;
}

/* H1 — grande, degradado vibrante, accesible */
.title-main {
  font-size: clamp(2rem, 6vw, 3.2rem);
  font-weight: 900;
  line-height: 1.15;
  background: linear-gradient(90deg, #000000 0%, #000000 45%, #1565C0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: #000000; /* fallback */
  margin-bottom: 0.5rem;
}

.subtitle-hero {
  font-size: 1.2rem;
  color: #333;
  max-width: 520px;
  margin: 0 auto;
}

/* ETIQUETAS DE SECCIÓN */
.section-label {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border-radius: 16px;
  padding: 10px 22px;
  font-size: 1.1rem;
  font-weight: 900;
  margin-bottom: 1.25rem;
}
.label-orange { background: #FFE0B2; color: #BF360C; border: 2px solid #FF6D00; }
.label-purple { background: #EDE7F6; color: #4A148C; border: 2px solid #7B1FA2; }
.label-green  { background: #E8F5E9; color: #1B5E20; border: 2px solid #388E3C; }

/* TARJETAS */
.kid-card {
  background: #FFFFFF;
  border: 2.5px solid #E0E0E0;
  transition: transform 0.18s, box-shadow 0.18s;
}
.kid-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.10);
}
.card-shadow {
  box-shadow: 0 4px 20px rgba(0,0,0,0.12);
}

.kid-card-title {
  font-size: 1.05rem;
  font-weight: 900;
  margin-bottom: 6px;
  line-height: 1.3;
}

.kid-card-body {
  font-size: 1rem;
  color: #222;
  line-height: 1.65;
  margin-bottom: 0;
}

.kid-example-icon {
  font-size: 2rem;
  margin-bottom: 8px;
  line-height: 1;
}

.posicion-icon {
  font-size: 2.5rem;
  margin-bottom: 8px;
}

.logro-icon {
  font-size: 2.2rem;
  margin-bottom: 10px;
}

/* CAJAS DE SECCIÓN */
.section-box {
  border-radius: 24px;
  padding: 1.5rem;
}
.box-orange { background: #FFF3E0; border: 2px solid #FFCCBC; }
.box-amber  { background: #FFF8E1; border: 2px solid #FFE082; }
.box-blue   { background: #E3F2FD; border: 2px solid #BBDEFB; }
.box-indigo { background: #E8EAF6; border: 2px solid #C5CAE9; }
.box-cyan   { background: #E0F7FA; border: 2px solid #B2EBF2; }

.box-title {
  font-size: 1.1rem;
  font-weight: 900;
  margin-bottom: 6px;
}

.box-body {
  font-size: 1rem;
  color: #333;
  margin-bottom: 1rem;
  line-height: 1.65;
}

/* CHIPS DE RESULTADO */
.resultado-chip {
  display: inline-block;
  padding: 5px 16px;
  border-radius: 999px;
  font-size: 1rem;
  font-weight: 900;
  color: #000;
}
.chip-orange { background: #FFCCBC; }
.chip-blue   { background: #BBDEFB; }
.chip-indigo { background: #C5CAE9; }

.numero-grande {
  font-size: 1.4rem;
  padding: 6px 20px;
}

/* DIVISOR DECORATIVO */
.divider-kids {
  text-align: center;
  font-size: 1.4rem;
  color: #BDBDBD;
  letter-spacing: 12px;
}

/* LOGROS */
.logro-card {
  border-color: #E8E8E8;
  text-align: center;
}

/* BOTÓN PRINCIPAL */
.btn-practica {
  background: linear-gradient(135deg, #1565C0, #0D47A1);
  color: #fff;
  font-family: inherit;
  font-size: 1.3rem;
  font-weight: 900;
  padding: 18px 48px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  box-shadow: 0 6px 20px rgba(13, 71, 161, 0.35);
  transition: transform 0.15s, box-shadow 0.15s;
  letter-spacing: 0.02em;
}
.btn-practica:hover {
  transform: translateY(-3px) scale(1.03);
  box-shadow: 0 10px 28px rgba(13, 71, 161, 0.45);
}
.btn-practica:active {
  transform: translateY(0);
}

/* =============================================
   TÍTULOS COLORIDOS — WCAG AA+ (contraste >= 4.5:1)
   ============================================= */
.title-orange { color: #BF360C !important; }
.title-amber  { color: #E65100 !important; }
.title-blue   { color: #0D47A1 !important; }
.title-indigo { color: #283593 !important; }
.title-teal   { color: #004D40 !important; }
.title-purple { color: #4A148C !important; }

/* VIDEO */
.video-container {
  aspect-ratio: 16/9;
  display: flex;
  align-items: center;
  justify-content: center;
}
.h-100 { height: 100%; }
</style>