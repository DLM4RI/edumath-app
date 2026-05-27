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
            <span class="grado-chip">GRADO 2° • PENSAMIENTO NUMÉRICO</span>
          </div>
          <div class="header-centered">
            <h1 class="title-main">{{ unidades[activeUnit].titulo }}</h1>
            <p class="subtitle-hero">{{ unidades[activeUnit].descripcion }}</p>
          </div>
        </header>

        <!-- UNIDAD 1: NÚMEROS HASTA 999 -->
        <transition name="fade-slide" mode="out-in">
          <section v-if="activeUnit === 0" key="u1" class="mb-10">
            <div class="section-label label-blue">
              {{ unidades[0].emoji }} Números Grandes
            </div>

            <v-row align="stretch" class="mb-6">
              <v-col cols="12" md="7">
                <v-card class="rounded-3xl overflow-hidden card-shadow" elevation="0" height="100%">
                  <div class="video-container bg-black">
                    <video controls class="w-100 h-100" preload="metadata">
                      <source :src="getVideoSrc(2, 1)" type="video/mp4" />
                    </video>
                  </div>
                </v-card>
              </v-col>

              <v-col cols="12" md="5">
                <v-card class="rounded-3xl pa-6 kid-card h-100 d-flex flex-column justify-center" style="border-color: #90CAF9; background: #E3F2FD;" elevation="0">
                  <span class="text-h2 mb-3">💯</span>
                  <p class="kid-card-title title-blue text-h5 mb-3">Conociendo las Centenas</p>
                  <p class="kid-card-body text-body-1">¡Ya pasamos del 99! Cuando juntas 10 decenas, formas <strong>1 Centena</strong> (100). Es como tener una bolsa gigante llena de bloques.</p>
                </v-card>
              </v-col>
            </v-row>

            <div class="section-box box-blue mb-6">
              <p class="box-title title-blue">Valor Posicional</p>
              <v-row justify="center">
                <v-col cols="12" sm="4" v-for="(v, i) in valorPosicional" :key="i">
                  <v-card class="rounded-3xl pa-5 kid-card h-100 text-center" elevation="0">
                    <div class="text-h1 mb-2">{{ v.emoji }}</div>
                    <p class="kid-card-title title-blue">{{ v.nombre }}</p>
                    <p class="kid-card-body font-weight-bold mb-2">{{ v.valor }}</p>
                    <v-chip :color="v.color" variant="flat">{{ v.ejemplo }}</v-chip>
                  </v-card>
                </v-col>
              </v-row>
            </div>

            <div class="section-box box-teal mb-6">
              <p class="box-title title-teal">Desarmando Números (Descomposición)</p>
              <v-row align="center">
                <v-col cols="12" md="6">
                  <v-card class="rounded-3xl pa-5 kid-card h-100 text-center bg-teal-lighten-5" elevation="0">
                    <p class="text-h2 font-weight-black text-teal-darken-3 mb-2">345</p>
                    <p class="text-h6 text-teal-darken-4 mb-4">Trescientos cuarenta y cinco</p>
                    <div class="d-flex justify-center align-center gap-2">
                      <v-chip color="green" size="large" class="font-weight-black">300</v-chip>
                      <span class="text-h5 font-weight-bold">+</span>
                      <v-chip color="blue" size="large" class="font-weight-black">40</v-chip>
                      <span class="text-h5 font-weight-bold">+</span>
                      <v-chip color="orange" size="large" class="font-weight-black">5</v-chip>
                    </div>
                  </v-card>
                </v-col>
                <v-col cols="12" md="6">
                  <div v-for="(ej, i) in ejemplosDescomposicion" :key="i" class="d-flex align-center justify-space-between mb-3 bg-white pa-4 rounded-xl border">
                    <span class="text-h5 font-weight-black">{{ ej.num }}</span>
                    <span class="text-h5 font-weight-black text-grey-darken-1">=</span>
                    <span class="resultado-chip chip-teal text-body-1">{{ ej.desc }}</span>
                  </div>
                </v-col>
              </v-row>
            </div>

            <div class="divider-kids my-8">✦ ✦ ✦</div>
            <div class="d-flex justify-end">
              <button class="btn-practica" @click="selectUnit(1)">Siguiente: Sumar Llevando →</button>
            </div>
          </section>
        </transition>

        <!-- UNIDAD 2: SUMA CON LLEVADAS -->
        <transition name="fade-slide" mode="out-in">
          <section v-if="activeUnit === 1" key="u2" class="mb-10">
            <div class="section-label label-green">
              {{ unidades[1].emoji }} Sumar Llevando
            </div>

            <v-row class="mb-6">
              <v-col cols="12" md="6">
                <div class="section-box box-green h-100">
                  <p class="box-title title-green">¿Qué pasa si me paso de 9?</p>
                  <p class="box-body">Si al sumar unidades te da 10 o más, ¡no caben en su cuarto! Tienes que "llevar" el 1 a la columna de las Decenas.</p>
                  <div class="d-flex align-center gap-3 mb-3 bg-white pa-3 rounded-xl border">
                    <v-avatar color="green-darken-2" class="text-white font-weight-bold" size="36">1</v-avatar>
                    <div>
                      <p class="font-weight-bold mb-0 text-body-1">Sumo Unidades</p>
                      <p class="text-body-2 text-grey-darken-1 mb-0">8 + 5 = 13. ¡Ups! 13 no cabe en las unidades.</p>
                    </div>
                  </div>
                  <div class="d-flex align-center gap-3 mb-3 bg-white pa-3 rounded-xl border">
                    <v-avatar color="green-darken-2" class="text-white font-weight-bold" size="36">2</v-avatar>
                    <div>
                      <p class="font-weight-bold mb-0 text-body-1">Dejo y Llevo</p>
                      <p class="text-body-2 text-grey-darken-1 mb-0">Dejo el 3 abajo, y el 1 (que vale 10) me lo "llevo" arriba al techo de las decenas.</p>
                    </div>
                  </div>
                </div>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="rounded-3xl pa-6 chalkboard h-100 d-flex flex-column justify-center" elevation="0">
                  <div class="text-center text-white mb-4 font-weight-bold">Ejemplo: 48 + 25</div>
                  <div class="chalk-line chalk-num" style="position:relative;">
                    <span style="position:absolute; top:-20px; left:60%; color:#FFEB3B; font-size:1.2rem;">+1</span>
                    4 8
                  </div>
                  <div class="chalk-line chalk-op">+ 2 5</div>
                  <div class="chalk-sep"></div>
                  <div class="chalk-result">
                    <v-chip color="green" size="large" variant="flat" class="text-h6 px-6">= 7 3</v-chip>
                  </div>
                </v-card>
              </v-col>
            </v-row>

            <div class="divider-kids my-8">✦ ✦ ✦</div>
            <div class="d-flex flex-wrap gap-4 justify-space-between">
              <v-btn variant="text" color="grey-darken-2" @click="selectUnit(0)" class="font-weight-bold">← Números Grandes</v-btn>
              <button class="btn-practica" @click="selectUnit(2)">Restar Desagrupando →</button>
            </div>
          </section>
        </transition>

        <!-- UNIDAD 3: RESTA DESAGRUPANDO -->
        <transition name="fade-slide" mode="out-in">
          <section v-if="activeUnit === 2" key="u3" class="mb-10">
            <div class="section-label label-red">
              {{ unidades[2].emoji }} Restar Desagrupando
            </div>

            <div class="section-box box-red mb-6">
              <p class="box-title title-red">Pidiendo Prestado al Vecino</p>
              <v-row align="center">
                <v-col cols="12" sm="6">
                  <v-card class="rounded-3xl pa-5 kid-card h-100" elevation="0">
                    <p class="text-body-1 mb-2">A veces el número de arriba es menor que el de abajo (ej. 2 - 5 no se puede restar sin dar números negativos).</p>
                    <p class="text-body-1 mb-3">¡La Decena vecina es buena y te presta 1! Pero ese 1 vale 10 unidades. Así el 2 se convierte en 12.</p>
                    <div class="d-flex justify-center my-3">
                      <v-chip color="red-darken-3" variant="flat" size="x-large" class="font-weight-black px-6">Toca la puerta del vecino 🚪</v-chip>
                    </div>
                  </v-card>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-card class="rounded-3xl pa-6 chalkboard h-100 d-flex flex-column justify-center" elevation="0">
                    <div class="text-center text-white mb-4 font-weight-bold">Ejemplo: 52 - 18</div>
                    <div class="chalk-line chalk-num" style="position:relative;">
                      <span style="position:absolute; top:-20px; left:30%; color:#FF5252; text-decoration:line-through; font-size:1.2rem;">5</span>
                      <span style="position:absolute; top:-40px; left:30%; color:#4CAF50; font-size:1.2rem;">4</span>
                      <span style="position:absolute; top:-20px; left:60%; color:#4CAF50; font-size:1.2rem;">12</span>
                      5 2
                    </div>
                    <div class="chalk-line chalk-op">- 1 8</div>
                    <div class="chalk-sep"></div>
                    <div class="chalk-result">
                      <v-chip color="red" size="large" variant="flat" class="text-h6 px-6">= 3 4</v-chip>
                    </div>
                  </v-card>
                </v-col>
              </v-row>
            </div>

            <div class="divider-kids my-8">✦ ✦ ✦</div>
            <div class="d-flex flex-wrap gap-4 justify-space-between">
              <v-btn variant="text" color="grey-darken-2" @click="selectUnit(1)" class="font-weight-bold">← Sumar Llevando</v-btn>
              <button class="btn-practica" @click="selectUnit(3)">A Multiplicar →</button>
            </div>
          </section>
        </transition>

        <!-- UNIDAD 4: INTRODUCCIÓN A LA MULTIPLICACIÓN -->
        <transition name="fade-slide" mode="out-in">
          <section v-if="activeUnit === 3" key="u4" class="mb-10">
            <div class="section-label label-orange">
              {{ unidades[3].emoji }} Intro a la Multiplicación
            </div>

            <v-row align="stretch" class="mb-6">
              <v-col cols="12" md="7">
                <v-card class="rounded-3xl overflow-hidden card-shadow" elevation="0" height="100%">
                  <div class="video-container bg-black">
                    <video controls class="w-100 h-100" preload="metadata">
                      <source :src="getVideoSrc(2, 4)" type="video/mp4" />
                    </video>
                  </div>
                </v-card>
              </v-col>

              <v-col cols="12" md="5">
                <v-card class="rounded-3xl pa-6 kid-card h-100 d-flex flex-column justify-center" style="border-color: #FFAB91; background: #FBE9E7;" elevation="0">
                  <span class="text-h2 mb-3">🔄</span>
                  <p class="kid-card-title title-orange text-h5 mb-3">¡Multiplicar es sumar lo mismo!</p>
                  <p class="kid-card-body text-body-1">En vez de decir "2 + 2 + 2 + 2", puedes decirlo más rápido: <strong>"4 veces el 2"</strong>, y eso se escribe matemáticamente como <strong>4 × 2</strong>.</p>
                </v-card>
              </v-col>
            </v-row>

            <div class="section-box box-orange mb-6">
              <p class="box-title title-orange">Suma Iterada vs. Multiplicación</p>
              <v-row>
                <v-col cols="12" sm="4" v-for="(m, i) in introMultiplicacion" :key="i">
                  <v-card class="rounded-3xl pa-5 kid-card h-100 text-center" elevation="0">
                    <p class="kid-card-body text-body-2 mb-2">Si sumas:</p>
                    <div class="d-flex flex-wrap justify-center gap-1 mb-2">
                       <v-chip color="orange-lighten-4" class="font-weight-black text-orange-darken-4">{{ m.suma }}</v-chip>
                    </div>
                    <p class="text-caption text-grey-darken-1 mb-2">Se dice: {{ m.veces }}</p>
                    <v-chip color="deep-orange" variant="flat" size="x-large" class="font-weight-black">
                      {{ m.mult }}
                    </v-chip>
                  </v-card>
                </v-col>
              </v-row>
            </div>

            <div class="section-box box-teal">
              <div class="d-flex gap-3 align-start">
                <span class="text-h4">🧊</span>
                <div>
                  <p class="box-title title-teal">Filas y Columnas (Arreglos)</p>
                  <p class="box-body mb-0">Imagina una cubeta de hielo o las sillas del cine. Si hay 3 filas y 4 columnas, ¡solo multiplica 3 × 4 y sabrás que hay 12 sillas sin contar una por una!</p>
                </div>
              </div>
            </div>

            <div class="divider-kids my-8">✦ ✦ ✦</div>
            <div class="d-flex flex-wrap gap-4 justify-space-between">
              <v-btn variant="text" color="grey-darken-2" @click="selectUnit(2)" class="font-weight-bold">← Resta Desagrupando</v-btn>
              <button class="btn-practica" @click="selectUnit(4)">La Tiendita →</button>
            </div>
          </section>
        </transition>

        <!-- UNIDAD 5: LA TIENDITA (PROBLEMAS NUMÉRICOS) -->
        <transition name="fade-slide" mode="out-in">
          <section v-if="activeUnit === 4" key="u5" class="mb-10">
            <div class="section-label label-purple">
              {{ unidades[4].emoji }} Pequeños Comerciantes
            </div>

            <div class="section-box box-purple mb-6">
              <p class="box-title title-purple">Problemas de la Tiendita</p>
              <p class="box-body">Si vas a la tienda, tienes que saber sumar para pagar y restar para pedir el cambio (vuelto).</p>
              <v-row>
                <v-col cols="12" md="6" v-for="(prob, i) in problemasTienda" :key="i">
                  <v-card class="rounded-3xl pa-5 kid-card mb-4" elevation="0" style="border-top: 6px solid #7B1FA2;">
                    <div class="d-flex align-center gap-3 mb-4">
                      <span class="text-h3">{{ prob.emoji }}</span>
                      <p class="kid-card-title title-purple mb-0 text-h6">{{ prob.titulo }}</p>
                    </div>
                    <div class="bg-purple-lighten-5 pa-4 rounded-xl mb-4 border">
                      <p class="font-weight-bold mb-0 text-purple-darken-4">{{ prob.enunciado }}</p>
                    </div>
                    <div class="mt-4 text-center">
                      <p class="text-body-2 mb-2 font-weight-bold">Operación: {{ prob.operacion }}</p>
                      <span class="resultado-chip chip-purple bg-purple-lighten-4 px-6 text-purple-darken-4 font-weight-black">R: {{ prob.respuesta }}</span>
                    </div>
                  </v-card>
                </v-col>
              </v-row>
            </div>

            <div class="divider-kids my-8">✦ ✦ ✦</div>
            <div class="d-flex justify-start">
              <v-btn variant="text" color="grey-darken-2" @click="selectUnit(3)" class="font-weight-bold">← Intro Multiplicación</v-btn>
            </div>
          </section>
        </transition>

        <div class="mt-6 mb-12 d-flex justify-center">
          <button class="btn-practica" @click="$router.push('/app/grado/2/actividades')">
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
  return `videos/grado${grado}_video${numero}.mp4`
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
  { titulo: 'Números Grandes',          emoji: '💯', color: '#1976D2', descripcion: 'Centenas, lectura y descomposición de números hasta 999' },
  { titulo: 'Sumar Llevando',           emoji: '✍️', color: '#2E7D32', descripcion: 'Algoritmo vertical de suma reagrupando' },
  { titulo: 'Restar Desagrupando',      emoji: '🚪', color: '#D32F2F', descripcion: 'Resta pidiendo prestado al vecino' },
  { titulo: 'Intro a la Multiplicación',emoji: '🔄', color: '#E64A19', descripcion: 'Sumas iteradas y arreglos rectangulares' },
  { titulo: 'La Tiendita',              emoji: '🛒', color: '#7B1FA2', descripcion: 'Problemas numéricos de compra y venta' }
]

/* -- DATOS U1 -- */
const valorPosicional = ref([
  { emoji: '🎒', nombre: 'Centena', valor: 'Vale 100', color: 'green', ejemplo: '1 bolsa grande' },
  { emoji: '🖍️', nombre: 'Decena', valor: 'Vale 10', color: 'blue', ejemplo: '1 caja de 10' },
  { emoji: '✏️', nombre: 'Unidad', valor: 'Vale 1', color: 'orange', ejemplo: '1 lápiz suelto' }
])
const ejemplosDescomposicion = ref([
  { num: '428', desc: '400 + 20 + 8' },
  { num: '705', desc: '700 + 0 + 5' },
  { num: '999', desc: '900 + 90 + 9' }
])

/* -- DATOS U4 -- */
const introMultiplicacion = ref([
  { suma: '5 + 5 + 5', veces: '3 veces el 5', mult: '3 × 5 = 15' },
  { suma: '2 + 2 + 2 + 2', veces: '4 veces el 2', mult: '4 × 2 = 8' },
  { suma: '10 + 10', veces: '2 veces el 10', mult: '2 × 10 = 20' }
])

/* -- DATOS U5 -- */
const problemasTienda = ref([
  {
    emoji: '🍬',
    titulo: 'Comprando dulces',
    enunciado: 'Juan compra unos chocolates por $150 y unos chicles por $85. ¿Cuánto paga en total?',
    operacion: '150 + 85',
    respuesta: '$235'
  },
  {
    emoji: '💵',
    titulo: 'El vuelto (cambio)',
    enunciado: 'Ana compró un jugo de $320 y pagó con un billete de $500. ¿Cuánto le sobra?',
    operacion: '500 - 320',
    respuesta: '$180'
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

.resultado-chip {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 12px;
  font-weight: 800;
  font-size: 0.9rem;
}
.chip-blue { background: #E3F2FD; color: #1565C0; }
.chip-orange { background: #FBE9E7; color: #D84315; }
.chip-amber { background: #FFF8E1; color: #F57F17; }
.chip-teal { background: #E0F2F1; color: #00695C; }
.chip-purple { background: #F3E5F5; color: #7B1FA2; }

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