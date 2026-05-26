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
            <span class="grado-chip">GRADO 4° • PENSAMIENTO NUMÉRICO</span>
          </div>
          <div class="header-centered">
            <h1 class="title-main">{{ unidades[activeUnit].titulo }}</h1>
            <p class="subtitle-hero">{{ unidades[activeUnit].descripcion }}</p>
          </div>
        </header>

        <!-- UNIDAD 1: MILLONES -->
        <transition name="fade-slide" mode="out-in">
          <section v-if="activeUnit === 0" key="u1" class="mb-10">
            <div class="section-label label-blue">
              {{ unidades[0].emoji }} Números Enormes
            </div>

            <v-row align="stretch" class="mb-6">
              <v-col cols="12" md="7">
                <v-card class="rounded-3xl overflow-hidden card-shadow" elevation="0" height="100%">
                  <div class="video-container bg-black">
                    <video controls class="w-100 h-100" preload="metadata">
                      <source :src="getVideoSrc(4, 1)" type="video/mp4" />
                    </video>
                  </div>
                </v-card>
              </v-col>

              <v-col cols="12" md="5">
                <v-card class="rounded-3xl pa-6 kid-card h-100 d-flex flex-column justify-center" style="border-color: #90CAF9; background: #E3F2FD;" elevation="0">
                  <span class="text-h2 mb-3">🌍</span>
                  <p class="kid-card-title title-blue text-h5 mb-3">Bienvenidos a los Millones</p>
                  <p class="kid-card-body text-body-1">¡Un millón es un 1 seguido de seis ceros (1.000.000)! Es un número tan grande que si contaras un número por segundo sin dormir, ¡tardarías 11 días en llegar a un millón!</p>
                </v-card>
              </v-col>
            </v-row>

            <div class="section-box box-blue mb-6">
              <p class="box-title title-blue">El Tablero Posicional de los Millones</p>
              <div class="table-wrap mb-4">
                <table class="data-table">
                  <thead>
                    <tr class="bg-blue-darken-3 text-white">
                      <th class="pa-3 text-center" colspan="3">Período de los Millones</th>
                      <th class="pa-3 text-center" colspan="3">Período de los Miles</th>
                      <th class="pa-3 text-center" colspan="3">Período de las Unidades</th>
                    </tr>
                    <tr class="bg-blue-darken-1 text-white">
                      <th class="pa-2">CMi</th><th class="pa-2">DMi</th><th class="pa-2">UMi</th>
                      <th class="pa-2">CM</th><th class="pa-2">DM</th><th class="pa-2">UM</th>
                      <th class="pa-2">C</th><th class="pa-2">D</th><th class="pa-2">U</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="text-center font-weight-black text-h6 border-bottom">
                      <td class="pa-2"></td><td class="pa-2">3</td><td class="pa-2">5</td>
                      <td class="pa-2 text-red-darken-2">8</td><td class="pa-2 text-red-darken-2">2</td><td class="pa-2 text-red-darken-2">0</td>
                      <td class="pa-2 text-green-darken-2">4</td><td class="pa-2 text-green-darken-2">0</td><td class="pa-2 text-green-darken-2">0</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p class="text-center font-weight-bold text-body-1">Se lee: "Treinta y cinco millones, ochocientos veinte mil, cuatrocientos".</p>
            </div>

            <div class="section-box box-teal mb-6">
              <p class="box-title title-teal">¿Dónde vemos números tan grandes?</p>
              <v-row>
                <v-col cols="12" sm="4" v-for="(v, i) in numerosGrandesVida" :key="i">
                  <v-card class="rounded-3xl pa-5 kid-card h-100 text-center" elevation="0">
                    <p class="text-h1 mb-2">{{ v.emoji }}</p>
                    <p class="kid-card-title title-teal">{{ v.titulo }}</p>
                    <p class="kid-card-body text-body-2 mb-2">{{ v.desc }}</p>
                    <v-chip color="teal-darken-2" variant="flat" size="large" class="font-weight-black">{{ v.ejemplo }}</v-chip>
                  </v-card>
                </v-col>
              </v-row>
            </div>

            <div class="divider-kids my-8">✦ ✦ ✦</div>
            <div class="d-flex justify-end">
              <button class="btn-practica" @click="selectUnit(1)">Siguiente: Multiplicar Grandes →</button>
            </div>
          </section>
        </transition>

        <!-- UNIDAD 2: MULTIPLICACIÓN POR 2 CIFRAS -->
        <transition name="fade-slide" mode="out-in">
          <section v-if="activeUnit === 1" key="u2" class="mb-10">
            <div class="section-label label-green">
              {{ unidades[1].emoji }} Multiplicar por 2 cifras
            </div>

            <div class="section-box box-green mb-6">
              <p class="box-title title-green">Multiplicación por dos cifras paso a paso</p>
              <v-row align="center">
                <v-col cols="12" sm="6">
                  <v-card class="rounded-3xl pa-5 kid-card h-100" elevation="0">
                    <p class="text-body-1 mb-2">1. Multiplicas el número de arriba por la Unidad de abajo.</p>
                    <p class="text-body-1 mb-2">2. Multiplicas por la Decena de abajo, ¡pero recuerda dejar un espacio en blanco (o poner un 0) porque estás multiplicando por decenas!</p>
                    <p class="text-body-1 mb-3">3. Sumas los dos resultados obtenidos.</p>
                  </v-card>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-card class="rounded-3xl pa-6 chalkboard h-100 d-flex flex-column justify-center" elevation="0">
                    <div class="chalk-line chalk-num">3 4</div>
                    <div class="chalk-line chalk-op">× 1 2</div>
                    <div class="chalk-sep"></div>
                    <div class="chalk-note text-center">6 8 (34 × 2)</div>
                    <div class="chalk-note text-center">3 4 0 (34 × 10)</div>
                    <div class="chalk-sep"></div>
                    <div class="chalk-result">
                      <v-chip color="orange" size="large" variant="flat" class="text-h6 px-6">4 0 8</v-chip>
                    </div>
                  </v-card>
                </v-col>
              </v-row>
            </div>

            <div class="divider-kids my-8">✦ ✦ ✦</div>
            <div class="d-flex flex-wrap gap-4 justify-space-between">
              <v-btn variant="text" color="grey-darken-2" @click="selectUnit(0)" class="font-weight-bold">← Millones</v-btn>
              <button class="btn-practica" @click="selectUnit(2)">La División →</button>
            </div>
          </section>
        </transition>

        <!-- UNIDAD 3: LA DIVISIÓN -->
        <transition name="fade-slide" mode="out-in">
          <section v-if="activeUnit === 2" key="u3" class="mb-10">
            <div class="section-label label-orange">
              {{ unidades[2].emoji }} Repartiendo en Partes
            </div>

            <v-row class="mb-6">
              <v-col cols="12" md="6">
                <div class="section-box box-orange h-100">
                  <p class="box-title title-orange">Las partes de la División</p>
                  <p class="box-body">Dividir es repartir en partes exactamente iguales.</p>
                  <div v-for="(p, i) in partesDivision" :key="i" class="d-flex align-center gap-3 mb-3 bg-white pa-3 rounded-xl border">
                    <v-chip :color="p.color" variant="flat" class="font-weight-black">{{ p.parte }}</v-chip>
                    <div>
                      <p class="font-weight-bold mb-0 text-body-2">{{ p.desc }}</p>
                    </div>
                  </div>
                </div>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="rounded-3xl pa-6 chalkboard h-100 d-flex flex-column justify-center" elevation="0">
                  <div class="text-center text-white mb-4 font-weight-bold text-h5">14 ÷ 3</div>
                  <div class="d-flex justify-center gap-4 text-white align-center text-h5 mb-4">
                    <span>14 <span class="text-caption d-block">Dividendo</span></span>
                    <span>|</span>
                    <span>3 <span class="text-caption d-block">Divisor</span></span>
                  </div>
                  <div class="d-flex justify-center gap-4 text-white align-center text-h5">
                    <span>2 <span class="text-caption d-block">Residuo (Sobra)</span></span>
                    <span>|</span>
                    <span class="text-green-accent-2 font-weight-black">4 <span class="text-caption d-block">Cociente</span></span>
                  </div>
                  <p class="text-center mt-6 text-caption">14 fresas entre 3 amigos: les tocan 4 a cada uno, y sobran 2.</p>
                </v-card>
              </v-col>
            </v-row>

            <div class="divider-kids my-8">✦ ✦ ✦</div>
            <div class="d-flex flex-wrap gap-4 justify-space-between">
              <v-btn variant="text" color="grey-darken-2" @click="selectUnit(1)" class="font-weight-bold">← Multiplicación</v-btn>
              <button class="btn-practica" @click="selectUnit(3)">Fracciones →</button>
            </div>
          </section>
        </transition>

        <!-- UNIDAD 4: FRACCIONES -->
        <transition name="fade-slide" mode="out-in">
          <section v-if="activeUnit === 3" key="u4" class="mb-10">
            <div class="section-label label-purple">
              {{ unidades[3].emoji }} El Mundo de las Fracciones
            </div>

            <v-row align="stretch" class="mb-6">
              <v-col cols="12" md="7">
                <v-card class="rounded-3xl overflow-hidden card-shadow" elevation="0" height="100%">
                  <div class="video-container bg-black">
                    <video controls class="w-100 h-100" preload="metadata">
                      <source :src="getVideoSrc(4, 3)" type="video/mp4" />
                    </video>
                  </div>
                </v-card>
              </v-col>

              <v-col cols="12" md="5">
                <v-card class="rounded-3xl pa-6 kid-card h-100 d-flex flex-column justify-center" style="border-color: #E1BEE7; background: #F3E5F5;" elevation="0">
                  <p class="kid-card-title title-purple text-center text-h5 mb-4">Propias e Impropias</p>
                  
                  <div class="mb-4 bg-white pa-3 rounded-xl border">
                    <v-chip color="green-darken-2" variant="flat" class="mb-1">Propia: 3/4</v-chip>
                    <p class="text-body-2 mb-0">El numerador (arriba) es menor que el denominador (abajo). Representa menos de un entero (ej. casi toda una pizza).</p>
                  </div>
                  
                  <div class="bg-white pa-3 rounded-xl border">
                    <v-chip color="red-darken-2" variant="flat" class="mb-1">Impropia: 5/4</v-chip>
                    <p class="text-body-2 mb-0">El numerador es mayor. ¡Significa que te pasaste del entero! Necesitas más de una pizza entera para repartir.</p>
                  </div>
                </v-card>
              </v-col>
            </v-row>

            <div class="divider-kids my-8">✦ ✦ ✦</div>
            <div class="d-flex flex-wrap gap-4 justify-space-between">
              <v-btn variant="text" color="grey-darken-2" @click="selectUnit(2)" class="font-weight-bold">← División</v-btn>
              <button class="btn-practica" @click="selectUnit(4)">Operando Fracciones →</button>
            </div>
          </section>
        </transition>

        <!-- UNIDAD 5: SUMA/RESTA DE FRACCIONES -->
        <transition name="fade-slide" mode="out-in">
          <section v-if="activeUnit === 4" key="u5" class="mb-10">
            <div class="section-label label-teal">
              {{ unidades[4].emoji }} Operando con Fracciones
            </div>

            <div class="section-box box-teal mb-6">
              <p class="box-title title-teal">Sumar y Restar Fracciones Homogéneas</p>
              <p class="box-body">Fracciones <strong>homogéneas</strong> significa que tienen el <strong>mismo denominador</strong> (la parte de abajo es igual). ¡El trabajo aquí es muy fácil!</p>
              
              <v-row align="center" justify="center">
                <v-col cols="12" md="6">
                  <v-card class="rounded-3xl pa-6 kid-card text-center mb-4" elevation="0">
                    <p class="font-weight-bold text-teal-darken-3 mb-4">Suma Homogénea</p>
                    <div class="d-flex align-center justify-center gap-4 text-h4 font-weight-black text-teal-darken-4">
                      <div class="d-flex flex-column align-center"><span>2</span><div style="width:40px; height:4px; background:currentColor; margin:4px 0;"></div><span>5</span></div>
                      <span>+</span>
                      <div class="d-flex flex-column align-center"><span>1</span><div style="width:40px; height:4px; background:currentColor; margin:4px 0;"></div><span>5</span></div>
                      <span>=</span>
                      <div class="d-flex flex-column align-center text-green-darken-2"><span>3</span><div style="width:40px; height:4px; background:currentColor; margin:4px 0;"></div><span>5</span></div>
                    </div>
                  </v-card>
                </v-col>
                
                <v-col cols="12" md="6">
                  <v-card class="rounded-3xl pa-6 kid-card text-center mb-4 border-red" elevation="0">
                    <p class="font-weight-bold text-red-darken-3 mb-4">Resta Homogénea</p>
                    <div class="d-flex align-center justify-center gap-4 text-h4 font-weight-black text-red-darken-4">
                      <div class="d-flex flex-column align-center"><span>4</span><div style="width:40px; height:4px; background:currentColor; margin:4px 0;"></div><span>7</span></div>
                      <span>-</span>
                      <div class="d-flex flex-column align-center"><span>2</span><div style="width:40px; height:4px; background:currentColor; margin:4px 0;"></div><span>7</span></div>
                      <span>=</span>
                      <div class="d-flex flex-column align-center text-blue-darken-2"><span>2</span><div style="width:40px; height:4px; background:currentColor; margin:4px 0;"></div><span>7</span></div>
                    </div>
                  </v-card>
                </v-col>
              </v-row>
              <div class="bg-teal-lighten-5 pa-4 rounded-xl text-center border">
                <p class="text-body-1 font-weight-bold mb-0 text-teal-darken-4">Regla de Oro: Solo sumas o restas los numeradores (los de arriba). ¡El denominador se queda igual porque el tamaño del pedazo no cambia!</p>
              </div>
            </div>

            <div class="divider-kids my-8">✦ ✦ ✦</div>
            <div class="d-flex justify-start">
              <v-btn variant="text" color="grey-darken-2" @click="selectUnit(3)" class="font-weight-bold">← Fracciones Propias</v-btn>
            </div>
          </section>
        </transition>

        <div class="mt-6 mb-12 d-flex justify-center">
          <button class="btn-practica" @click="$router.push('/app/grado/4/actividades')">
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
  { titulo: 'Números Enormes',           emoji: '🌍', color: '#1976D2', descripcion: 'Sistema decimal hasta los millones' },
  { titulo: 'Multiplicar 2 cifras',      emoji: '✖️', color: '#2E7D32', descripcion: 'Algoritmo de multiplicación larga' },
  { titulo: 'Repartiendo (División)',    emoji: '➗', color: '#E64A19', descripcion: 'Partes de la división exacta e inexacta' },
  { titulo: 'Mundo de Fracciones',       emoji: '🍕', color: '#7B1FA2', descripcion: 'Fracciones propias e impropias' },
  { titulo: 'Operando Fracciones',       emoji: '➕', color: '#00796B', descripcion: 'Suma y resta de fracciones homogéneas' }
]

/* -- DATOS U1 -- */
const numerosGrandesVida = ref([
  { emoji: '🇨🇴', titulo: 'Población', desc: 'Habitantes en Colombia', ejemplo: '51.000.000' },
  { emoji: '🌌', titulo: 'Distancias', desc: 'Metros de la Tierra a la Luna', ejemplo: '384.400.000 m' },
  { emoji: '💰', titulo: 'Dinero', desc: 'Costo de una casa grande', ejemplo: '$250.000.000' }
])

/* -- DATOS U3 -- */
const partesDivision = ref([
  { parte: 'Dividendo', desc: 'La cantidad total que vas a repartir. (El número más grande).', color: 'blue-lighten-4' },
  { parte: 'Divisor', desc: 'En cuántas partes o grupos vas a dividir.', color: 'green-lighten-4' },
  { parte: 'Cociente', desc: 'El resultado. Cuánto le toca a cada grupo.', color: 'orange-lighten-4' },
  { parte: 'Residuo', desc: 'Lo que sobra cuando la división no es exacta.', color: 'red-lighten-4' }
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

.border-red { border-color: #FFCDD2; }

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

/* DATA TABLES */
.table-wrap {
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid #E0E0E0;
}
.data-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
}
.border-bottom {
  border-bottom: 1px solid #EEEEEE;
}

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
