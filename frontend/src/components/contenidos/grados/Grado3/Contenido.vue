<template>
  <div class="grade-wrapper" :class="{ 'menu-open': isMenuOpen }">

    <div class="nav-overlay" :class="{ 'is-active': isMenuOpen }" @click="toggleMenu(false)"></div>

    <!-- Menú Desplegable (Hamburguesa) -->
    <transition name="menu-slide">
      <nav v-if="isMenuOpen" class="popup-menu-container">
        <div class="menu-items-vertical">
          <button
            v-for="(u, i) in unidades"
            :key="i"
            class="nav-btn-vertical"
            :class="{ 'nav-btn-vertical--active': activeUnit === i }"
            :style="`--accent: ${u.color}`"
            @click="selectUnit(i)"
          >
            <div class="nav-circle-vertical" :style="`background-color: ${u.color}`">{{ i + 1 }}</div>
            <div class="nav-text-box-vertical">
              <span class="text-title">{{ u.titulo }}</span>
              <span class="text-emoji">{{ u.emoji }}</span>
            </div>
          </button>
        </div>
      </nav>
    </transition>

    <button class="menu-toggle" :class="{ active: isMenuOpen }" @click="toggleMenu()">
      <div class="menu-toggle-icon-wrap">
        <div class="hamburger-icon">
          <span></span><span></span><span></span>
        </div>
      </div>
      <span class="menu-text">Temas</span>
    </button>

    <main class="unit-stage" :class="{ 'unit-stage-shifted': false }">
      <div class="grade-content">

        <header class="mb-8 header-hero">
          <div class="header-chip-wrap">
            <span class="grado-chip">GRADO 3° • PENSAMIENTO NUMÉRICO</span>
          </div>
          <div class="header-centered">
            <h1 class="title-main">{{ unidades[activeUnit].titulo }}</h1>
            <p class="subtitle-hero">{{ unidades[activeUnit].descripcion }}</p>
          </div>
        </header>

        <!-- UNIDAD 1: SUMA Y RESTA AVANZADA -->
        <transition name="fade-slide" mode="out-in">
          <section v-if="activeUnit === 0" key="u1" class="mb-10">
            <div class="section-label label-blue">
              {{ unidades[0].emoji }} Sumando y Restando Miles
            </div>

            <v-row align="stretch" class="mb-6">
              <v-col cols="12" md="7">
                <v-card class="rounded-3xl overflow-hidden card-shadow" elevation="0" height="100%">
                  <div class="video-container bg-black">
                    <video controls class="w-100 h-100" preload="metadata">
                      <source :src="getVideoSrc(3, 1)" type="video/mp4" />
                    </video>
                  </div>
                </v-card>
              </v-col>

              <v-col cols="12" md="5">
                <v-card class="rounded-3xl pa-6 kid-card h-100 d-flex flex-column justify-center" style="border-color: #90CAF9; background: #E3F2FD;" elevation="0">
                  <span class="text-h2 mb-3">📈</span>
                  <p class="kid-card-title title-blue text-h5 mb-3">Cantidades Grandes</p>
                  <p class="kid-card-body text-body-1">En tercero ya trabajamos con números de hasta 4 o 5 cifras. Las reglas son las mismas: empieza siempre por las unidades, luego decenas, centenas y unidades de mil.</p>
                </v-card>
              </v-col>
            </v-row>

            <div class="section-box box-blue mb-6">
              <p class="box-title title-blue">Alineando los Números</p>
              <v-row align="center">
                <v-col cols="12" sm="6">
                  <v-card class="rounded-3xl pa-5 kid-card h-100" elevation="0">
                    <p class="text-body-1 mb-2">Para sumar o restar números grandes, es muy importante que cada número esté en su columna correcta.</p>
                    <div class="bg-blue-lighten-5 pa-4 rounded-xl mb-4 border text-center">
                      <p class="font-weight-bold mb-0 text-blue-darken-4">U de Mil con U de Mil<br>Centenas con Centenas<br>Decenas con Decenas<br>Unidades con Unidades</p>
                    </div>
                  </v-card>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-card class="rounded-3xl pa-6 chalkboard h-100 d-flex flex-column justify-center" elevation="0">
                    <div class="text-center text-white mb-4 font-weight-bold">Ejemplo: 4.250 + 1.835</div>
                    <div class="chalk-line chalk-num" style="position:relative;">
                      <span style="position:absolute; top:-20px; left:45%; color:#FFEB3B; font-size:1.2rem;">+1</span>
                      4 . 2 5 0
                    </div>
                    <div class="chalk-line chalk-op">+ 1 . 8 3 5</div>
                    <div class="chalk-sep"></div>
                    <div class="chalk-result">
                      <v-chip color="blue" size="large" variant="flat" class="text-h6 px-6">= 6 . 0 8 5</v-chip>
                    </div>
                  </v-card>
                </v-col>
              </v-row>
            </div>

            <div class="divider-kids my-8">✦ ✦ ✦</div>
            <div class="d-flex justify-end">
              <button class="btn-practica" @click="selectUnit(1)">Siguiente: Tablas de Multiplicar →</button>
            </div>
          </section>
        </transition>

        <!-- UNIDAD 2: TABLAS DE MULTIPLICAR -->
        <transition name="fade-slide" mode="out-in">
          <section v-if="activeUnit === 1" key="u2" class="mb-10">
            <div class="section-label label-green">
              {{ unidades[1].emoji }} El Mundo de las Tablas
            </div>

            <div class="section-box box-green mb-6">
              <p class="box-title title-green">Trucos Infalibles</p>
              <v-row>
                <v-col cols="12" sm="6" md="4" v-for="(t, i) in trucosTablas" :key="i">
                  <v-card class="rounded-3xl pa-5 kid-card h-100" elevation="0">
                    <p class="kid-example-icon">{{ t.emoji }}</p>
                    <p class="kid-card-title title-green">{{ t.titulo }}</p>
                    <p class="kid-card-body mb-4">{{ t.descripcion }}</p>
                    <span class="resultado-chip chip-green">{{ t.ejemplo }}</span>
                  </v-card>
                </v-col>
              </v-row>
            </div>

            <div class="section-box box-teal mb-6">
              <p class="box-title title-teal">A Multiplicar Grandes (Por 1 Cifra)</p>
              <v-row align="center">
                <v-col cols="12" sm="6">
                  <div v-for="(paso, i) in pasosMult" :key="i" class="d-flex align-center gap-3 mb-3 bg-white pa-3 rounded-xl border">
                    <v-avatar color="teal" class="text-white font-weight-bold" size="36">{{ i+1 }}</v-avatar>
                    <div>
                      <p class="font-weight-bold mb-0 text-body-1">{{ paso.titulo }}</p>
                      <p class="text-body-2 text-grey-darken-1 mb-0">{{ paso.descripcion }}</p>
                    </div>
                  </div>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-card class="rounded-3xl pa-6 chalkboard h-100 d-flex flex-column justify-center" elevation="0">
                    <div class="chalk-line chalk-num">1 2 4</div>
                    <div class="chalk-line chalk-op">× &nbsp; 3</div>
                    <div class="chalk-sep"></div>
                    <div class="chalk-note text-left">3 × 4 = 12 (llevo 1)</div>
                    <div class="chalk-note text-left">3 × 2 = 6 + 1 = 7</div>
                    <div class="chalk-note text-left">3 × 1 = 3</div>
                    <div class="chalk-sep"></div>
                    <div class="chalk-result">
                      <v-chip color="teal" size="large" variant="flat" class="text-h6 px-6">= 3 7 2</v-chip>
                    </div>
                  </v-card>
                </v-col>
              </v-row>
            </div>

            <div class="divider-kids my-8">✦ ✦ ✦</div>
            <div class="d-flex flex-wrap gap-4 justify-space-between">
              <v-btn variant="text" color="grey-darken-2" @click="selectUnit(0)" class="font-weight-bold">← Suma y Resta Avanzada</v-btn>
              <button class="btn-practica" @click="selectUnit(2)">Propiedades →</button>
            </div>
          </section>
        </transition>

        <!-- UNIDAD 3: PROPIEDADES DE LA MULTIPLICACIÓN -->
        <transition name="fade-slide" mode="out-in">
          <section v-if="activeUnit === 2" key="u3" class="mb-10">
            <div class="section-label label-orange">
              {{ unidades[2].emoji }} Reglas Mágicas (Propiedades)
            </div>

            <div class="section-box box-orange mb-6">
              <p class="box-title title-orange">Los 3 Superpoderes de la Multiplicación</p>
              <p class="box-body">Estos trucos te ayudarán a hacer los cálculos en tu mente mucho más rápido.</p>
              <v-row>
                <v-col cols="12" v-for="(p, i) in propiedades" :key="i">
                  <v-card class="rounded-3xl pa-6 kid-card mb-4" elevation="0" :style="`border-top: 6px solid ${p.colorCode};`">
                    <div class="d-flex align-center gap-3 mb-2">
                      <v-icon :color="p.color" size="40">{{ p.icon }}</v-icon>
                      <p class="kid-card-title mb-0 text-h5" :class="`text-${p.color}`">{{ p.nombre }}</p>
                    </div>
                    <div :class="`bg-${p.color}-lighten-5`" class="pa-4 rounded-xl mb-4 border">
                      <p class="text-body-1 mb-0">{{ p.explicacion }}</p>
                    </div>
                    <div class="text-center">
                      <span class="resultado-chip px-6 text-h6 font-weight-black" :class="`bg-${p.color}-lighten-4 text-${p.color}-darken-4`">{{ p.ejemplo }}</span>
                    </div>
                  </v-card>
                </v-col>
              </v-row>
            </div>

            <div class="divider-kids my-8">✦ ✦ ✦</div>
            <div class="d-flex flex-wrap gap-4 justify-space-between">
              <v-btn variant="text" color="grey-darken-2" @click="selectUnit(1)" class="font-weight-bold">← Tablas</v-btn>
              <button class="btn-practica" @click="selectUnit(3)">La División →</button>
            </div>
          </section>
        </transition>

        <!-- UNIDAD 4: LA DIVISIÓN -->
        <transition name="fade-slide" mode="out-in">
          <section v-if="activeUnit === 3" key="u4" class="mb-10">
            <div class="section-label label-purple">
              {{ unidades[3].emoji }} Repartiendo en Partes Iguales
            </div>

            <v-row align="stretch" class="mb-6">
              <v-col cols="12" md="7">
                <v-card class="rounded-3xl overflow-hidden card-shadow" elevation="0" height="100%">
                  <div class="video-container bg-black">
                    <video controls class="w-100 h-100" preload="metadata">
                      <source :src="getVideoSrc(3, 4)" type="video/mp4" />
                    </video>
                  </div>
                </v-card>
              </v-col>

              <v-col cols="12" md="5">
                <v-card class="rounded-3xl pa-6 kid-card h-100 d-flex flex-column justify-center" style="border-color: #E1BEE7; background: #F3E5F5;" elevation="0">
                  <span class="text-h2 mb-3">➗</span>
                  <p class="kid-card-title title-purple text-h5 mb-3">¿Qué es Dividir?</p>
                  <p class="kid-card-body text-body-1">Dividir es agarrar una cantidad grande y repartirla en grupos iguales. Es exactamente lo contrario a multiplicar.</p>
                </v-card>
              </v-col>
            </v-row>

            <div class="section-box box-purple mb-6">
              <p class="box-title title-purple">Divisiones Exactas e Inexactas</p>
              <v-row>
                <v-col cols="12" sm="6">
                  <v-card class="rounded-3xl pa-5 kid-card h-100 text-center bg-green-lighten-5 border-green" elevation="0">
                    <p class="text-h2 mb-2">✅</p>
                    <p class="kid-card-title text-green-darken-3">División Exacta</p>
                    <p class="kid-card-body text-body-2 mb-3">Todos reciben lo mismo y no sobra nada.</p>
                    <v-chip color="green-darken-2" variant="flat">Ej: 12 ÷ 4 = 3 (Sobran 0)</v-chip>
                  </v-card>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-card class="rounded-3xl pa-5 kid-card h-100 text-center bg-red-lighten-5 border-red" elevation="0">
                    <p class="text-h2 mb-2">🛑</p>
                    <p class="kid-card-title text-red-darken-3">División Inexacta</p>
                    <p class="kid-card-body text-body-2 mb-3">Todos reciben lo mismo, pero sobra algo que no alcanza a repartirse entero.</p>
                    <v-chip color="red-darken-2" variant="flat">Ej: 13 ÷ 4 = 3 (Sobra 1)</v-chip>
                  </v-card>
                </v-col>
              </v-row>
            </div>

            <div class="divider-kids my-8">✦ ✦ ✦</div>
            <div class="d-flex flex-wrap gap-4 justify-space-between">
              <v-btn variant="text" color="grey-darken-2" @click="selectUnit(2)" class="font-weight-bold">← Propiedades</v-btn>
              <button class="btn-practica" @click="selectUnit(4)">Problemas Combinados →</button>
            </div>
          </section>
        </transition>

        <!-- UNIDAD 5: PROBLEMAS COMBINADOS -->
        <transition name="fade-slide" mode="out-in">
          <section v-if="activeUnit === 4" key="u5" class="mb-10">
            <div class="section-label label-red">
              {{ unidades[4].emoji }} Los Súper Detectives
            </div>

            <div class="section-box box-red mb-6">
              <p class="box-title title-red">Problemas de 2 Operaciones</p>
              <p class="box-body">A veces un solo cálculo no basta. Hay problemas donde tienes que multiplicar primero y luego sumar.</p>
              <v-row>
                <v-col cols="12">
                  <v-card class="rounded-3xl pa-6 kid-card" elevation="0" style="border-top: 6px solid #D32F2F;">
                    <div class="d-flex align-center gap-3 mb-4">
                      <span class="text-h3">🚗</span>
                      <p class="kid-card-title title-red mb-0 text-h6">La fábrica de juguetes</p>
                    </div>
                    <div class="bg-red-lighten-5 pa-4 rounded-xl mb-4 border">
                      <p class="font-weight-bold mb-0 text-red-darken-4">Una fábrica hizo 5 cajas con 8 carritos cada una. Luego, hicieron 10 carritos sueltos más. ¿Cuántos carritos hicieron en total?</p>
                    </div>
                    <div class="d-flex align-start gap-2 mb-2">
                      <v-avatar color="red" class="text-white mt-1" size="24" style="font-size: 0.8rem; font-weight: bold;">1</v-avatar>
                      <p class="text-body-2 mb-0 mt-1"><strong>Primero Multiplicamos:</strong> 5 cajas × 8 carritos = 40 carritos en las cajas.</p>
                    </div>
                    <div class="d-flex align-start gap-2 mb-4">
                      <v-avatar color="red" class="text-white mt-1" size="24" style="font-size: 0.8rem; font-weight: bold;">2</v-avatar>
                      <p class="text-body-2 mb-0 mt-1"><strong>Luego Sumamos:</strong> 40 carritos + 10 sueltos = 50 carritos.</p>
                    </div>
                    <div class="mt-4 text-center">
                      <span class="resultado-chip chip-red bg-red-lighten-4 px-6 text-red-darken-4 font-weight-black">R: 50 carritos en total.</span>
                    </div>
                  </v-card>
                </v-col>
              </v-row>
            </div>

            <div class="divider-kids my-8">✦ ✦ ✦</div>
            <div class="d-flex justify-start">
              <v-btn variant="text" color="grey-darken-2" @click="selectUnit(3)" class="font-weight-bold">← La División</v-btn>
            </div>
          </section>
        </transition>

        <div class="mt-6 mb-12 d-flex justify-center">
          <button class="btn-practica" @click="$router.push('/app/grado/3/actividades')">
            ¡A Practicar Misiones Numéricas! 🚀
          </button>
        </div>

      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'

function getVideoSrc(grado, numero) {
  return `/videos/grado${grado}_video${numero}.mp4`
}

const activeUnit = ref(0)
const isMenuOpen = ref(false)

const toggleMenu = (force = null) => {
  if (force !== null) {
    isMenuOpen.value = force
  } else {
    isMenuOpen.value = !isMenuOpen.value
  }
}

function selectUnit(i) {
  activeUnit.value = i
  toggleMenu(false)
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const unidades = [
  { titulo: 'Sumando y Restando Miles',emoji: '📈', color: '#1976D2', descripcion: 'Algoritmos con números de 4 cifras' },
  { titulo: 'El Mundo de las Tablas', emoji: '✖️', color: '#2E7D32', descripcion: 'Multiplicación y sus trucos' },
  { titulo: 'Reglas Mágicas',         emoji: '✨', color: '#E64A19', descripcion: 'Propiedades conmutativa, asociativa y distributiva' },
  { titulo: 'La División',            emoji: '➗', color: '#7B1FA2', descripcion: 'Repartos equitativos y divisiones exactas/inexactas' },
  { titulo: 'Problemas Combinados',   emoji: '🕵️', color: '#D32F2F', descripcion: 'Resolución de problemas con 2 operaciones' }
]

/* -- DATOS U2 -- */
const trucosTablas = ref([
  { emoji:'🖐️', titulo:'Tabla del 9', descripcion:'Usa tus 10 dedos. Baja el dedo que multiplicas por 9. Los dedos de la izquierda son decenas, los de la derecha unidades.', ejemplo:'9 × 4 = 36' },
  { emoji:'👯', titulo:'Tabla del 4', descripcion:'Es el doble del doble. Si quieres 4 × 5, saca el doble de 5 (10) y luego el doble de eso (20).', ejemplo:'4 × 5 = 20' },
  { emoji:'0️⃣', titulo:'Tabla del 10', descripcion:'¡Es la más fácil! Solo ponle un cero a la derecha del número que estás multiplicando.', ejemplo:'10 × 7 = 70' }
])
const pasosMult = ref([
  { titulo:'Multiplica Unidades', descripcion:'Empieza de derecha a izquierda multiplicando el número de abajo por las unidades del de arriba.' },
  { titulo:'Lleva si hace falta', descripcion:'Si el número es mayor a 9, anota la unidad abajo y lleva las decenas a la siguiente columna.' },
  { titulo:'Suma lo que llevas', descripcion:'Multiplica por las decenas y SÚMALE lo que llevabas del paso anterior.' }
])

/* -- DATOS U3 -- */
const propiedades = ref([
  { 
    nombre: 'Conmutativa', 
    explicacion: 'El orden de los números NO cambia el resultado. (Puedes darles la vuelta)', 
    ejemplo: '4 × 3 = 3 × 4 = 12',
    icon: 'mdi-swap-horizontal',
    color: 'orange',
    colorCode: '#FF9800'
  },
  { 
    nombre: 'Asociativa', 
    explicacion: 'Si multiplicas 3 números, puedes agruparlos como quieras y el resultado será el mismo.', 
    ejemplo: '(2 × 3) × 4 = 2 × (3 × 4) = 24',
    icon: 'mdi-group',
    color: 'blue',
    colorCode: '#2196F3'
  },
  { 
    nombre: 'Distributiva', 
    explicacion: 'Para multiplicar un número por una suma, multiplicas cada uno por separado y luego sumas.', 
    ejemplo: '2 × (3 + 4) = (2 × 3) + (2 × 4) = 14',
    icon: 'mdi-call-split',
    color: 'green',
    colorCode: '#4CAF50'
  }
])
</script>

<style scoped>
.grade-wrapper {
  position: relative;
  min-height: 100vh;
  background-color: #F8F9FA;
}

/* MENÚ DESPLEGABLE TIPO HAMBURGUESA */
.popup-menu-container {
  position: fixed;
  bottom: 100px;
  left: 30px;
  background: white;
  border-radius: 24px;
  padding: 20px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.2);
  z-index: 100;
  display: flex;
  flex-direction: column;
  gap: 16px;
  border: 2px solid #EEEEEE;
}
.menu-items-vertical {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.nav-btn-vertical {
  display: flex;
  align-items: center;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 50px;
  transition: background 0.3s;
}
.nav-btn-vertical:hover {
  background: #F5F5F5;
}
.nav-btn-vertical--active {
  background: #E3F2FD;
}
.nav-circle-vertical {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 900;
  font-size: 1rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  margin-right: 12px;
  flex-shrink: 0;
}
.nav-btn-vertical--active .nav-circle-vertical {
  box-shadow: 0 0 0 3px var(--accent), 0 4px 12px rgba(0,0,0,0.2);
}
.nav-text-box-vertical {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
}
.nav-text-box-vertical .text-title {
  font-weight: 800;
  color: #333;
  font-size: 0.9rem;
}
.nav-text-box-vertical .text-emoji {
  font-size: 1rem;
}

/* ANIMACIÓN DEL MENÚ DESPLEGABLE */
.menu-slide-enter-active, .menu-slide-leave-active {
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  transform-origin: bottom left;
}
.menu-slide-enter-from, .menu-slide-leave-to {
  opacity: 0;
  transform: scale(0.5) translateY(50px);
}

/* BOTÓN HAMBURGUESA */
.menu-toggle {
  position: fixed;
  bottom: 30px;
  left: 30px;
  width: 60px;
  height: 60px;
  background: #2C3E50;
  border-radius: 50%;
  border: none;
  color: white;
  z-index: 101;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: all 0.3s;
}
.menu-toggle:hover {
  background: #34495E;
  transform: scale(1.05);
}
.hamburger-icon {
  width: 24px;
  height: 18px;
  position: relative;
  margin-bottom: 2px;
}
.hamburger-icon span {
  display: block;
  position: absolute;
  height: 3px;
  width: 100%;
  background: white;
  border-radius: 3px;
  left: 0;
  transition: .25s ease-in-out;
}
.hamburger-icon span:nth-child(1) { top: 0px; }
.hamburger-icon span:nth-child(2) { top: 7px; }
.hamburger-icon span:nth-child(3) { top: 14px; }
.menu-toggle.active .hamburger-icon span:nth-child(1) { top: 7px; transform: rotate(135deg); }
.menu-toggle.active .hamburger-icon span:nth-child(2) { opacity: 0; left: -20px; }
.menu-toggle.active .hamburger-icon span:nth-child(3) { top: 7px; transform: rotate(-135deg); }
.menu-text {
  font-size: 0.6rem;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.nav-overlay {
  position: fixed;
  inset: 0;
  background: rgba(255,255,255,0.8);
  backdrop-filter: blur(5px);
  z-index: 90;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
}
.nav-overlay.is-active {
  opacity: 1;
  pointer-events: auto;
}

/* ÁREA DE CONTENIDO */
.unit-stage {
  transition: padding 0.3s;
  min-height: 100vh;
}
.grade-content {
  max-width: 1100px;
  margin: 0 auto;
  padding: 40px 20px 100px;
}

/* HERO HEADER */
.header-hero {
  text-align: center;
  margin-bottom: 40px;
}
.header-chip-wrap {
  margin-bottom: 16px;
}
.grado-chip {
  background: #E0E0E0;
  color: #424242;
  padding: 6px 16px;
  border-radius: 20px;
  font-weight: 800;
  font-size: 0.85rem;
  letter-spacing: 1px;
}
.title-main {
  font-size: 3rem;
  font-weight: 900;
  color: #1A237E;
  margin-bottom: 10px;
  line-height: 1.2;
}
.subtitle-hero {
  font-size: 1.2rem;
  color: #546E7A;
  max-width: 600px;
  margin: 0 auto;
}

/* LABELS & BOXES */
.section-label {
  display: inline-block;
  padding: 8px 20px;
  border-radius: 12px 12px 0 0;
  font-weight: 800;
  font-size: 1.1rem;
  margin-bottom: -1px;
  position: relative;
  z-index: 2;
}
.label-blue { background: #1976D2; color: white; }
.label-green { background: #2E7D32; color: white; }
.label-teal { background: #00796B; color: white; }
.label-orange { background: #E64A19; color: white; }
.label-purple { background: #7B1FA2; color: white; }
.label-red { background: #D32F2F; color: white; }

.section-box {
  background: white;
  border-radius: 0 24px 24px 24px;
  padding: 30px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.04);
  border: 2px solid;
}
.box-blue { border-color: #BBDEFB; }
.box-green { border-color: #C8E6C9; }
.box-teal { border-color: #B2DFDB; }
.box-orange { border-color: #FFCCBC; }
.box-purple { border-color: #E1BEE7; }
.box-red { border-color: #FFCDD2; }

.box-title {
  font-size: 1.5rem;
  font-weight: 900;
  margin-bottom: 16px;
}
.title-blue { color: #1565C0; }
.title-green { color: #2E7D32; }
.title-teal { color: #00695C; }
.title-orange { color: #D84315; }
.title-purple { color: #6A1B9A; }
.title-red { color: #C62828; }

.box-body {
  font-size: 1.1rem;
  color: #455A64;
  margin-bottom: 24px;
}

/* KID CARDS & CHALKBOARD */
.kid-card {
  border: 3px solid #EEEEEE;
  transition: transform 0.3s;
}
.kid-card:hover {
  transform: translateY(-5px);
  border-color: #BDBDBD;
}
.kid-example-icon {
  font-size: 3rem;
  margin-bottom: 12px;
}
.kid-card-title {
  font-weight: 800;
  font-size: 1.2rem;
  margin-bottom: 8px;
}
.kid-card-body {
  color: #546E7A;
  line-height: 1.5;
}

.chalkboard {
  background-color: #2E4B31 !important;
  color: white;
  border: 8px solid #795548 !important;
  box-shadow: inset 0 0 20px rgba(0,0,0,0.5);
  font-family: 'Courier New', Courier, monospace;
}
.chalk-line {
  font-size: 2.5rem;
  font-weight: bold;
  letter-spacing: 12px;
  text-align: center;
}
.chalk-sep {
  height: 4px;
  background: white;
  width: 60%;
  margin: 10px auto;
  border-radius: 2px;
}
.chalk-result {
  text-align: center;
  margin-top: 10px;
}
.chalk-note {
  font-size: 1.2rem;
  margin: 5px 0;
  color: #FFEB3B;
}

.resultado-chip {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 12px;
  font-weight: 800;
  font-size: 0.9rem;
}
.chip-green { background: #E8F5E9; color: #2E7D32; }
.chip-teal { background: #E0F2F1; color: #00695C; }
.chip-orange { background: #FBE9E7; color: #D84315; }
.chip-blue { background: #E3F2FD; color: #1565C0; }
.chip-red { background: #FFEBEE; color: #C62828; }

/* REPRODUCTOR */
.video-container {
  aspect-ratio: 16/9;
  border-radius: 24px;
  overflow: hidden;
}

/* DIVIDER & BTN */
.divider-kids {
  text-align: center;
  color: #B0BEC5;
  letter-spacing: 8px;
  font-size: 1.2rem;
}
.btn-practica {
  background: linear-gradient(135deg, #FF9800, #F57C00);
  color: white;
  font-weight: 900;
  font-size: 1.2rem;
  padding: 16px 32px;
  border-radius: 50px;
  border: none;
  box-shadow: 0 8px 20px rgba(230, 81, 0, 0.3);
  cursor: pointer;
  transition: all 0.3s;
}
.btn-practica:hover {
  transform: scale(1.05);
  box-shadow: 0 12px 25px rgba(230, 81, 0, 0.4);
}

/* TRANSITIONS */
.fade-slide-enter-active, .fade-slide-leave-active { transition: all 0.4s ease; }
.fade-slide-enter-from { opacity: 0; transform: translateY(20px); }
.fade-slide-leave-to { opacity: 0; transform: translateY(-20px); }
</style>