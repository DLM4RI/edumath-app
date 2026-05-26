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
            <span class="grado-chip">GRADO 5° • PENSAMIENTO NUMÉRICO</span>
          </div>
          <div class="header-centered">
            <h1 class="title-main">{{ unidades[activeUnit].titulo }}</h1>
            <p class="subtitle-hero">{{ unidades[activeUnit].descripcion }}</p>
          </div>
        </header>

        <!-- UNIDAD 1: MÚLTIPLOS Y DIVISORES -->
        <transition name="fade-slide" mode="out-in">
          <section v-if="activeUnit === 0" key="u1" class="mb-10">
            <div class="section-label label-blue">
              {{ unidades[0].emoji }} MCM y MCD
            </div>

            <v-row align="stretch" class="mb-6">
              <v-col cols="12" md="7">
                <v-card class="rounded-3xl overflow-hidden card-shadow" elevation="0" height="100%">
                  <div class="video-container bg-black">
                    <video controls class="w-100 h-100" preload="metadata">
                      <source :src="getVideoSrc(5, 1)" type="video/mp4" />
                    </video>
                  </div>
                </v-card>
              </v-col>

              <v-col cols="12" md="5">
                <div class="section-box box-blue h-100">
                  <p class="box-title title-blue">¿Qué son?</p>
                  <div class="bg-blue-lighten-5 pa-4 rounded-xl mb-4 border">
                    <p class="font-weight-bold text-blue-darken-3 mb-1">Múltiplos (Saltos Hacia Adelante)</p>
                    <p class="text-body-2 mb-0">Resultan de multiplicar un número. Ej: Múltiplos de 3 son 3, 6, 9, 12, 15...</p>
                  </div>
                  <div class="bg-teal-lighten-5 pa-4 rounded-xl border">
                    <p class="font-weight-bold text-teal-darken-3 mb-1">Divisores (Partes Exactas)</p>
                    <p class="text-body-2 mb-0">Números que dividen a otro exactamente (residuo 0). Ej: Divisores de 10 son 1, 2, 5, 10.</p>
                  </div>
                </div>
              </v-col>
            </v-row>

            <div class="section-box box-teal mb-6">
              <p class="box-title title-teal">Reglas de Divisibilidad (Trucos mentales)</p>
              <div class="table-wrap mb-4">
                <table class="data-table">
                  <thead>
                    <tr class="bg-teal-darken-3 text-white">
                      <th class="pa-3 text-left">Un número es divisible por...</th>
                      <th class="pa-3 text-left">Regla (Truco)</th>
                      <th class="pa-3 text-left">Ejemplo</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(regla, i) in reglasDivisibilidad" :key="i" class="border-bottom">
                      <td class="pa-3 font-weight-bold text-teal-darken-4 text-h6 text-center">{{ regla.num }}</td>
                      <td class="pa-3">{{ regla.regla }}</td>
                      <td class="pa-3">
                        <v-chip color="teal-lighten-4" class="font-weight-black text-teal-darken-4">{{ regla.ejemplo }}</v-chip>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div class="divider-kids my-8">✦ ✦ ✦</div>
            <div class="d-flex justify-end">
              <button class="btn-practica" @click="selectUnit(1)">Siguiente: Fracciones Heterogéneas →</button>
            </div>
          </section>
        </transition>

        <!-- UNIDAD 2: FRACCIONES HETEROGÉNEAS -->
        <transition name="fade-slide" mode="out-in">
          <section v-if="activeUnit === 1" key="u2" class="mb-10">
            <div class="section-label label-green">
              {{ unidades[1].emoji }} Suma y Resta Heterogénea
            </div>

            <div class="section-box box-green mb-6">
              <p class="box-title title-green">Distinto Denominador</p>
              <p class="box-body">Si los pedazos de pizza son de diferente tamaño (diferente número abajo), ¡NO los puedes sumar directamente! Primero tienes que igualar los tamaños usando el <strong>Mínimo Común Múltiplo (MCM)</strong>.</p>
              
              <v-row align="center">
                <v-col cols="12" md="6">
                  <v-card class="rounded-3xl pa-5 kid-card h-100" elevation="0">
                    <p class="font-weight-bold text-h6 mb-3 text-green-darken-3">Pasos para sumar 1/2 + 1/3</p>
                    <div class="d-flex align-start gap-3 mb-3 bg-white pa-3 rounded-xl border">
                      <v-avatar color="green" class="text-white font-weight-bold" size="24" style="font-size:0.8rem">1</v-avatar>
                      <p class="text-body-2 mb-0">Halla el MCM de los denominadores (2 y 3). El MCM es <strong>6</strong>.</p>
                    </div>
                    <div class="d-flex align-start gap-3 mb-3 bg-white pa-3 rounded-xl border">
                      <v-avatar color="green" class="text-white font-weight-bold" size="24" style="font-size:0.8rem">2</v-avatar>
                      <p class="text-body-2 mb-0">Convierte las fracciones: <br>1/2 = <strong>3/6</strong> <br>1/3 = <strong>2/6</strong></p>
                    </div>
                    <div class="d-flex align-start gap-3 mb-3 bg-white pa-3 rounded-xl border">
                      <v-avatar color="green" class="text-white font-weight-bold" size="24" style="font-size:0.8rem">3</v-avatar>
                      <p class="text-body-2 mb-0">Suma normalmente: 3/6 + 2/6 = <strong>5/6</strong></p>
                    </div>
                  </v-card>
                </v-col>
                <v-col cols="12" md="6">
                  <v-card class="rounded-3xl pa-6 chalkboard h-100 d-flex flex-column justify-center" elevation="0">
                    <div class="d-flex align-center justify-center gap-4 text-h4 font-weight-black text-white">
                      <div class="d-flex flex-column align-center"><span>1</span><div style="width:40px; height:4px; background:currentColor; margin:4px 0;"></div><span>2</span></div>
                      <span>+</span>
                      <div class="d-flex flex-column align-center"><span>1</span><div style="width:40px; height:4px; background:currentColor; margin:4px 0;"></div><span>3</span></div>
                      <span>=</span>
                      <span class="text-yellow">?</span>
                    </div>
                    <div class="chalk-sep my-6"></div>
                    <div class="text-center text-green-accent-2 font-weight-bold text-h6">MCM(2,3) = 6</div>
                    <div class="chalk-sep my-6"></div>
                    <div class="d-flex align-center justify-center gap-4 text-h4 font-weight-black text-white">
                      <div class="d-flex flex-column align-center"><span>3</span><div style="width:40px; height:4px; background:currentColor; margin:4px 0;"></div><span>6</span></div>
                      <span>+</span>
                      <div class="d-flex flex-column align-center"><span>2</span><div style="width:40px; height:4px; background:currentColor; margin:4px 0;"></div><span>6</span></div>
                      <span>=</span>
                      <div class="d-flex flex-column align-center text-green-accent-2"><span>5</span><div style="width:40px; height:4px; background:currentColor; margin:4px 0;"></div><span>6</span></div>
                    </div>
                  </v-card>
                </v-col>
              </v-row>
            </div>

            <div class="divider-kids my-8">✦ ✦ ✦</div>
            <div class="d-flex flex-wrap gap-4 justify-space-between">
              <v-btn variant="text" color="grey-darken-2" @click="selectUnit(0)" class="font-weight-bold">← MCM y MCD</v-btn>
              <button class="btn-practica" @click="selectUnit(2)">Números Decimales →</button>
            </div>
          </section>
        </transition>

        <!-- UNIDAD 3: NÚMEROS DECIMALES -->
        <transition name="fade-slide" mode="out-in">
          <section v-if="activeUnit === 2" key="u3" class="mb-10">
            <div class="section-label label-orange">
              {{ unidades[2].emoji }} El Punto Decimal
            </div>

            <v-row class="mb-6">
              <v-col cols="12" md="5">
                <div class="section-box box-orange h-100">
                  <p class="box-title title-orange">¿Qué hay después del punto?</p>
                  <p class="box-body">Los decimales representan pedazos más pequeños que una unidad entera (como los centavos en el dinero).</p>
                  <div class="d-flex flex-column gap-3">
                    <v-chip color="orange-darken-2" variant="tonal" size="large" class="justify-center">1 Décima = 0.1</v-chip>
                    <v-chip color="deep-orange-darken-2" variant="tonal" size="large" class="justify-center">1 Centésima = 0.01</v-chip>
                    <v-chip color="red-darken-2" variant="tonal" size="large" class="justify-center">1 Milésima = 0.001</v-chip>
                  </div>
                </div>
              </v-col>
              <v-col cols="12" md="7">
                <div class="section-box box-teal h-100">
                  <p class="box-title title-teal">Valor Posicional Decimal</p>
                  <v-card class="rounded-3xl pa-6 text-center bg-teal-lighten-5 border" elevation="0">
                    <div class="d-flex justify-center align-end gap-2 mb-2">
                      <span class="text-h3 font-weight-black text-blue-darken-3">4</span>
                      <span class="text-h3 font-weight-black text-red">.</span>
                      <span class="text-h3 font-weight-black text-orange-darken-3">7</span>
                      <span class="text-h3 font-weight-black text-green-darken-3">5</span>
                    </div>
                    <div class="d-flex justify-center align-start gap-3 mt-4">
                      <div class="text-center" style="width: 50px;">
                        <v-icon color="blue-darken-3">mdi-arrow-up</v-icon>
                        <p class="text-caption font-weight-bold text-blue-darken-3">Unidad</p>
                      </div>
                      <div class="text-center" style="width: 20px;">
                        <v-icon color="red">mdi-arrow-up</v-icon>
                        <p class="text-caption font-weight-bold text-red">Punto</p>
                      </div>
                      <div class="text-center" style="width: 50px;">
                        <v-icon color="orange-darken-3">mdi-arrow-up</v-icon>
                        <p class="text-caption font-weight-bold text-orange-darken-3">Décima</p>
                      </div>
                      <div class="text-center" style="width: 60px;">
                        <v-icon color="green-darken-3">mdi-arrow-up</v-icon>
                        <p class="text-caption font-weight-bold text-green-darken-3">Centésima</p>
                      </div>
                    </div>
                    <p class="text-body-1 font-weight-bold mt-4 mb-0">Se lee: "Cuatro unidades y setenta y cinco centésimas"</p>
                  </v-card>
                </div>
              </v-col>
            </v-row>

            <div class="divider-kids my-8">✦ ✦ ✦</div>
            <div class="d-flex flex-wrap gap-4 justify-space-between">
              <v-btn variant="text" color="grey-darken-2" @click="selectUnit(1)" class="font-weight-bold">← Fracciones Heterogéneas</v-btn>
              <button class="btn-practica" @click="selectUnit(3)">Operaciones con Decimales →</button>
            </div>
          </section>
        </transition>

        <!-- UNIDAD 4: OPERACIONES CON DECIMALES -->
        <transition name="fade-slide" mode="out-in">
          <section v-if="activeUnit === 3" key="u4" class="mb-10">
            <div class="section-label label-purple">
              {{ unidades[3].emoji }} Suma y Resta Decimal
            </div>

            <div class="section-box box-purple mb-6">
              <p class="box-title title-purple">Alineando los Puntos</p>
              <v-row align="center">
                <v-col cols="12" sm="6">
                  <v-card class="rounded-3xl pa-5 kid-card h-100" elevation="0">
                    <p class="text-h6 font-weight-bold text-purple-darken-4 mb-3">La Regla de Oro:</p>
                    <p class="text-body-1">Para sumar o restar decimales, los puntos decimales siempre deben estar <strong>uno exactamente debajo del otro</strong>.</p>
                    <p class="text-body-1 mb-0">Si faltan números a la derecha, rellénalos con ceros (0) para que se vea ordenado.</p>
                  </v-card>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-card class="rounded-3xl pa-6 chalkboard h-100 d-flex flex-column justify-center" elevation="0">
                    <div class="text-center text-white mb-4 font-weight-bold">Ej: 12.5 + 3.42</div>
                    <div class="chalk-line chalk-num">1 2 . 5 <span class="text-blue-grey-lighten-2">0</span></div>
                    <div class="chalk-line chalk-op">+ 3 . 4 2</div>
                    <div class="chalk-sep"></div>
                    <div class="chalk-result">
                      <v-chip color="purple" size="large" variant="flat" class="text-h6 px-6">= 1 5 . 9 2</v-chip>
                    </div>
                  </v-card>
                </v-col>
              </v-row>
            </div>

            <div class="divider-kids my-8">✦ ✦ ✦</div>
            <div class="d-flex flex-wrap gap-4 justify-space-between">
              <v-btn variant="text" color="grey-darken-2" @click="selectUnit(2)" class="font-weight-bold">← Números Decimales</v-btn>
              <button class="btn-practica" @click="selectUnit(4)">Fracciones a Decimales →</button>
            </div>
          </section>
        </transition>

        <!-- UNIDAD 5: FRACCIONES A DECIMALES -->
        <transition name="fade-slide" mode="out-in">
          <section v-if="activeUnit === 4" key="u5" class="mb-10">
            <div class="section-label label-red">
              {{ unidades[4].emoji }} Los Gemelos Matemáticos
            </div>

            <v-row align="stretch" class="mb-6">
              <v-col cols="12" md="7">
                <v-card class="rounded-3xl overflow-hidden card-shadow" elevation="0" height="100%">
                  <div class="video-container bg-black">
                    <video controls class="w-100 h-100" preload="metadata">
                      <source :src="getVideoSrc(5, 5)" type="video/mp4" />
                    </video>
                  </div>
                </v-card>
              </v-col>

              <v-col cols="12" md="5">
                <v-card class="rounded-3xl pa-6 kid-card h-100 d-flex flex-column justify-center" style="border-color: #EF9A9A; background: #FFEBEE;" elevation="0">
                  <span class="text-h2 mb-3">🔁</span>
                  <p class="kid-card-title title-red text-h5 mb-3">Son lo mismo</p>
                  <p class="kid-card-body text-body-1">Las fracciones y los decimales son dos formas diferentes de escribir lo mismo. <br>Por ejemplo: <strong>1/2</strong> (la mitad) es exactamente igual a <strong>0.5</strong>.</p>
                </v-card>
              </v-col>
            </v-row>

            <div class="section-box box-red mb-6">
              <p class="box-title title-red">Conversiones Famosas</p>
              <v-row justify="center">
                <v-col cols="6" sm="3" v-for="(conv, i) in conversionesFamosas" :key="i">
                  <v-card class="rounded-3xl pa-4 kid-card text-center h-100 border-red" elevation="0">
                    <div class="text-h5 font-weight-black text-red-darken-3 mb-2">{{ conv.frac }}</div>
                    <v-icon color="grey" class="mb-2">mdi-arrow-down</v-icon>
                    <div class="text-h6 font-weight-bold text-blue-darken-3">{{ conv.dec }}</div>
                  </v-card>
                </v-col>
              </v-row>
              <div class="mt-6 bg-red-lighten-5 pa-4 rounded-xl text-center border">
                <p class="text-body-1 font-weight-bold mb-0 text-red-darken-4">¿Cómo se hace? ¡Divide el numerador entre el denominador!</p>
                <p class="text-body-2 mb-0">Ejemplo: Para 3/4, divides 3 ÷ 4 = 0.75.</p>
              </div>
            </div>

            <div class="divider-kids my-8">✦ ✦ ✦</div>
            <div class="d-flex justify-start">
              <v-btn variant="text" color="grey-darken-2" @click="selectUnit(3)" class="font-weight-bold">← Operaciones con Decimales</v-btn>
            </div>
          </section>
        </transition>

        <div class="mt-6 mb-12 d-flex justify-center">
          <button class="btn-practica" @click="$router.push('/app/grado/5/actividades')">
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
  { titulo: 'MCM y MCD',                 emoji: '🔢', color: '#1976D2', descripcion: 'Múltiplos, divisores y reglas de divisibilidad' },
  { titulo: 'Fracciones Heterogéneas',   emoji: '🍕', color: '#2E7D32', descripcion: 'Suma y resta con distinto denominador' },
  { titulo: 'Números Decimales',         emoji: '🎯', color: '#E64A19', descripcion: 'El valor de las décimas y centésimas' },
  { titulo: 'Operaciones Decimales',     emoji: '➕', color: '#7B1FA2', descripcion: 'Suma y resta alineando el punto decimal' },
  { titulo: 'Fracciones a Decimales',    emoji: '🔁', color: '#D32F2F', descripcion: 'Conversión entre fracciones y decimales' }
]

/* -- DATOS U1 -- */
const reglasDivisibilidad = ref([
  { num: '2', regla: 'Termina en 0, 2, 4, 6 u 8 (número par).', ejemplo: '34, 128' },
  { num: '3', regla: 'La suma de sus cifras es múltiplo de 3.', ejemplo: '45 (4+5=9)' },
  { num: '5', regla: 'Termina en 0 o 5.', ejemplo: '75, 100' },
  { num: '10', regla: 'Termina en 0.', ejemplo: '120, 500' }
])

/* -- DATOS U5 -- */
const conversionesFamosas = ref([
  { frac: '1/2', dec: '0.5' },
  { frac: '1/4', dec: '0.25' },
  { frac: '3/4', dec: '0.75' },
  { frac: '1/10', dec: '0.1' }
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