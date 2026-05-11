<template>
  <div class="grade-wrapper" :class="{ 'menu-open': isMenuOpen }">

    <div class="nav-overlay" :class="{ 'is-active': isMenuOpen }" @click="toggleMenu(false)"></div>

    <nav class="floating-menu-container">
      <div class="menu-items">
        <button
          v-for="(u, i) in unidades"
          :key="i"
          class="nav-btn"
          :class="{ 'nav-btn--active': activeUnit === i }"
          :style="`--accent: ${u.color}`"
          @click="selectUnit(i)"
        >
          <div class="nav-circle" :style="`background-color: ${u.color}`">{{ i + 1 }}</div>
          
          <transition name="fade-simple">
            <div v-if="isMenuOpen" class="nav-text-box">
              <span class="text-title">{{ u.titulo }}</span>
              <span class="text-emoji">{{ u.emoji }}</span>
            </div>
          </transition>
        </button>
      </div>
    </nav>

    <button class="menu-toggle" :class="{ active: isMenuOpen }" @click="toggleMenu()">
      <div class="menu-toggle-icon-wrap">
        <div class="hamburger-icon">
          <span></span><span></span><span></span>
        </div>
      </div>
      <span class="menu-text">Menú</span>
    </button>

    <main class="unit-stage">
      <div class="grade-content">

        <header class="mb-8 header-hero">
          <div class="header-chip-wrap">
            <span class="grado-chip">GRADO 5° • MATEMÁTICAS</span>
          </div>
          <div class="header-centered">
            <h1 class="title-main">{{ unidades[activeUnit].titulo }}</h1>
            <p class="subtitle-hero">{{ unidades[activeUnit].descripcion }}</p>
          </div>
        </header>

        <!-- UNIDAD 0: POTENCIACIÓN -->
        <transition name="fade-slide" mode="out-in">
          <section v-if="activeUnit === 0" key="u0" class="mb-10">
            <div class="section-label label-orange">
              💥 Potenciación: Multiplicación Acelerada
            </div>
            <v-row align="stretch" class="mb-6">
              <v-col cols="12" md="6">
                <v-card class="rounded-3xl overflow-hidden card-shadow" elevation="0" height="100%">
                  <div class="video-container bg-black">
                    <video controls class="w-100 h-100" preload="metadata">
                      <source :src="'/videos/grado5_video1.mp4'" type="video/mp4" />
                    </video>
                  </div>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="rounded-3xl pa-6 h-100 kid-card" elevation="0">
                  <p class="text-overline font-weight-black title-orange mb-3">¿Qué es una potencia?</p>
                  <p class="kid-card-body mb-4">
                    Es una forma abreviada de escribir una multiplicación donde el mismo número se repite.
                  </p>
                  <v-card class="rounded-xl pa-5 mb-4 text-center" color="red-lighten-5" elevation="0">
                    <div class="d-flex align-center justify-center gap-4">
                      <div class="text-h2 font-weight-black text-red">2³</div>
                      <div class="text-left text-body-2">
                        <p class="mb-1"><strong class="text-red">2</strong> Base</p>
                        <p class="mb-1"><strong class="text-red">3</strong> Exponente</p>
                        <p class="mb-0"><strong>= 8</strong></p>
                      </div>
                    </div>
                  </v-card>
                  <v-alert type="info" variant="tonal" class="rounded-xl text-body-2">
                    Cualquier número elevado a <strong>0</strong> es <strong>1</strong>.
                  </v-alert>
                </v-card>
              </v-col>
            </v-row>
            <div class="divider-kids my-8">✦ ✦ ✦</div>
            <div class="d-flex justify-end">
              <button class="btn-practica" @click="selectUnit(1)">Radicación →</button>
            </div>
          </section>
        </transition>

        <!-- UNIDAD 1: RADICACIÓN -->
        <transition name="fade-slide" mode="out-in">
          <section v-if="activeUnit === 1" key="u1" class="mb-10">
            <div class="section-label label-blue">
              🔄 Radicación: Operación Inversa
            </div>
            <v-row align="stretch" class="mb-6">
              <v-col cols="12" md="6" order="2" order-md="1">
                <v-card class="rounded-3xl pa-6 h-100 kid-card" elevation="0">
                  <p class="text-overline font-weight-black title-blue mb-3">¿Qué es la raíz cuadrada?</p>
                  <p class="kid-card-body mb-4">
                    Hallar qué número multiplicado por sí mismo produce el resultado.
                  </p>
                  <div class="d-flex justify-center gap-4 mb-4">
                    <v-card class="pa-3 rounded-xl text-center" border elevation="0">4² = 16</v-card>
                    <v-icon color="blue">mdi-swap-horizontal</v-icon>
                    <v-card class="pa-3 rounded-xl text-center" border elevation="0">√16 = 4</v-card>
                  </div>
                  <v-alert type="success" variant="tonal" class="rounded-xl text-body-2">
                    <strong>Conexión:</strong> √A es el lado de un cuadrado de área A.
                  </v-alert>
                </v-card>
              </v-col>
              <v-col cols="12" md="6" order="1" order-md="2">
                <v-card class="rounded-3xl overflow-hidden card-shadow" elevation="0" height="100%">
                  <div class="video-container bg-black">
                    <video controls class="w-100 h-100" preload="metadata">
                      <source :src="'/videos/grado5_video2.mp4'" type="video/mp4" />
                    </video>
                  </div>
                </v-card>
              </v-col>
            </v-row>
            <div class="divider-kids my-8">✦ ✦ ✦</div>
            <div class="d-flex justify-space-between">
              <v-btn variant="text" color="grey-darken-2" @click="selectUnit(0)" class="font-weight-bold">← Potenciación</v-btn>
              <button class="btn-practica" @click="selectUnit(2)">Geometría →</button>
            </div>
          </section>
        </transition>

        <!-- UNIDAD 2: GEOMETRÍA -->
        <transition name="fade-slide" mode="out-in">
          <section v-if="activeUnit === 2" key="u2" class="mb-10">
            <div class="section-label label-green">
              📐 Espacio y Medida
            </div>
            <v-row align="stretch" class="mb-6">
              <v-col cols="12" md="6">
                <v-card class="rounded-3xl overflow-hidden card-shadow" elevation="0" height="100%">
                  <div class="video-container bg-black">
                    <video controls class="w-100 h-100" preload="metadata">
                      <source :src="'/videos/grado5_video3.mp4'" type="video/mp4" />
                    </video>
                  </div>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="rounded-3xl pa-5 h-100 kid-card" elevation="0">
                  <p class="text-overline font-weight-black title-green mb-4">Fórmulas Mágicas</p>
                  <div class="table-wrap">
                    <table class="data-table">
                      <thead class="bg-green-lighten-4">
                        <tr>
                          <th class="pa-2">Figura</th>
                          <th class="pa-2">Área</th>
                          <th class="pa-2">Perímetro</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="f in formulasGeo" :key="f.figura">
                          <td class="pa-2 font-weight-bold">{{ f.figura }}</td>
                          <td class="pa-2 text-body-2">{{ f.area }}</td>
                          <td class="pa-2 text-body-2">{{ f.perimetro }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </v-card>
              </v-col>
            </v-row>
            <div class="divider-kids my-8">✦ ✦ ✦</div>
            <div class="d-flex justify-space-between">
              <v-btn variant="text" color="grey-darken-2" @click="selectUnit(1)" class="font-weight-bold">← Radicación</v-btn>
              <button class="btn-practica" @click="selectUnit(3)">Estadística →</button>
            </div>
          </section>
        </transition>

        <!-- UNIDAD 3: ESTADÍSTICA -->
        <transition name="fade-slide" mode="out-in">
          <section v-if="activeUnit === 3" key="u3" class="mb-10">
            <div class="section-label label-purple">
              📊 Mundo de Datos
            </div>
            <v-row align="stretch" class="mb-6">
              <v-col cols="12" md="6" order="2" order-md="1">
                <v-card class="rounded-3xl pa-6 h-100 kid-card" elevation="0">
                  <p class="text-overline font-weight-black title-purple mb-3">Tendencia Central</p>
                  <v-expansion-panels variant="accordion" class="rounded-xl overflow-hidden border">
                    <v-expansion-panel v-for="m in medidas" :key="m.nombre">
                      <v-expansion-panel-title class="font-weight-bold">{{ m.nombre }}</v-expansion-panel-title>
                      <v-expansion-panel-text class="text-body-2">{{ m.definicion }}</v-expansion-panel-text>
                    </v-expansion-panel>
                  </v-expansion-panels>
                </v-card>
              </v-col>
              <v-col cols="12" md="6" order="1" order-md="2">
                <v-card class="rounded-3xl overflow-hidden card-shadow" elevation="0" height="100%">
                  <div class="video-container bg-black">
                    <video controls class="w-100 h-100" preload="metadata">
                      <source :src="'/videos/grado5_video4.mp4'" type="video/mp4" />
                    </video>
                  </div>
                </v-card>
              </v-col>
            </v-row>
            <div class="divider-kids my-8">✦ ✦ ✦</div>
            <div class="d-flex justify-start">
              <v-btn variant="text" color="grey-darken-2" @click="selectUnit(2)" class="font-weight-bold">← Geometría</v-btn>
            </div>
          </section>
        </transition>

        <div class="mt-12 mb-12 d-flex justify-center">
          <button class="btn-practica" @click="$router.push('/app/grado/5/actividades')">
            ¡A Practicar Misiones! 🚀
          </button>
        </div>

      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'

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
  { titulo: 'Potenciación', emoji: '💥', color: '#E64A19', descripcion: 'Multiplicación acelerada y sus secretos' },
  { titulo: 'Radicación', emoji: '🔄', color: '#1565C0', descripcion: 'La operación inversa y su magia geométrica' },
  { titulo: 'Geometría', emoji: '📐', color: '#2E7D32', descripcion: 'Área, perímetro y volumen en el espacio' },
  { titulo: 'Estadística', emoji: '📊', color: '#7B1FA2', descripcion: 'Análisis de datos y medidas centrales' }
]

const formulasGeo = [
  { figura: 'Rectángulo', area: 'b × a', perimetro: '2(b + a)' },
  { figura: 'Cuadrado', area: 'lado²', perimetro: '4 × lado' },
  { figura: 'Triángulo', area: '(b × a) / 2', perimetro: 'l1 + l2 + l3' },
  { figura: 'Círculo', area: 'π × r²', perimetro: '2 × π × r' }
]

const medidas = [
  { nombre: 'Media', definicion: 'Promedio de todos los datos.' },
  { nombre: 'Moda', definicion: 'El valor que más se repite.' },
  { nombre: 'Mediana', definicion: 'El valor central de los datos ordenados.' }
]
</script>

<style scoped>
/* ═══════════════════════════════════════════════
   ESTILOS COPIADOS DE GRADO 3 PARA CONSISTENCIA
═══════════════════════════════════════════════ */
.grade-wrapper {
  font-family: 'Nunito', 'Trebuchet MS', system-ui, sans-serif;
  font-size: 16px;
  line-height: 1.7;
  background: transparent;
  min-height: 100vh;
  overflow-x: hidden;
  position: relative;
}

.nav-overlay {
  position: fixed; inset: 0; background: rgba(0, 0, 0, 0.65); backdrop-filter: blur(4px); z-index: 900; 
  opacity: 0; visibility: hidden; transition: opacity 0.4s ease, visibility 0.4s; pointer-events: none;
}
.nav-overlay.is-active { opacity: 1; visibility: visible; pointer-events: auto; }

.floating-menu-container {
  position: fixed; top: 0; left: 0; height: 100vh; width: 100%; display: flex; flex-direction: column; justify-content: center; z-index: 1000; pointer-events: none;
}
.menu-items { display: flex; flex-direction: column; gap: 20px; padding-left: 24px; }

.nav-btn {
  display: flex; align-items: center; gap: 16px; background: transparent; border: none; padding: 0; cursor: pointer; position: relative; opacity: 0; pointer-events: none; transition: opacity 0.2s ease;
}
.menu-open .nav-btn { opacity: 1; pointer-events: auto; }
.menu-open .nav-btn:nth-child(1) { transition-delay: 0.05s; }
.menu-open .nav-btn:nth-child(2) { transition-delay: 0.10s; }
.menu-open .nav-btn:nth-child(3) { transition-delay: 0.15s; }
.menu-open .nav-btn:nth-child(4) { transition-delay: 0.20s; }

.nav-circle { width: 46px; height: 46px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #fff; font-weight: 900; font-size: 1.2rem; box-shadow: 0 4px 10px rgba(0,0,0,0.15); flex-shrink: 0; }
.nav-btn--active .nav-circle { outline: 3px dashed var(--accent, #2E7D32); outline-offset: 4px; }
.nav-text-box { background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(8px); border: 2px solid var(--accent, #c0c0c0); border-radius: 14px; padding: 10px 18px; display: flex; align-items: center; gap: 12px; box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15); white-space: nowrap; }
.text-title { font-weight: 800; font-size: 0.95rem; color: #222222; }
.text-emoji { font-size: 1.2rem; }

.menu-toggle {
  position: fixed; bottom: 24px; left: 24px; z-index: 1001; height: 46px; background-color: #ffffff; border: 2px solid #E0E0D8; border-radius: 23px; cursor: pointer; display: flex; align-items: center; padding: 0; box-shadow: 0 4px 15px rgba(0,0,0,0.15); max-width: 120px; overflow: hidden; transition: max-width 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.2s ease;
}
.menu-toggle.active { max-width: 46px; }
.menu-toggle-icon-wrap { width: 42px; height: 42px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.menu-text { font-weight: 900; font-size: 0.95rem; color: #333; padding-left: 4px; padding-right: 18px; white-space: nowrap; opacity: 1; transition: opacity 0.2s ease; }
.menu-toggle.active .menu-text { opacity: 0; pointer-events: none; }
.hamburger-icon { width: 22px; height: 16px; position: relative; }
.hamburger-icon span { display: block; position: absolute; height: 2.5px; width: 100%; background: #333; border-radius: 4px; left: 0; transition: .25s ease-in-out; }
.hamburger-icon span:nth-child(1) { top: 0px; }
.hamburger-icon span:nth-child(2) { top: 7px; }
.hamburger-icon span:nth-child(3) { top: 14px; }
.menu-toggle.active .hamburger-icon span:nth-child(1) { top: 7px; transform: rotate(135deg); }
.menu-toggle.active .hamburger-icon span:nth-child(2) { opacity: 0; left: -20px; }
.menu-toggle.active .hamburger-icon span:nth-child(3) { top: 7px; transform: rotate(-135deg); }

.unit-stage { margin: 0 auto; width: 100%; padding: 40px 50px 100px 50px; max-width: 1200px; }
.grade-content { width: 100%; }
.header-hero { padding: 1rem 0 2rem; }
.header-chip-wrap { text-align: left; margin-bottom: 1.5rem; }
.grado-chip { display: inline-block; background: #E8EAF6; color: #304FFE; border-radius: 999px; padding: 6px 18px; font-size: 0.9rem; font-weight: 900; font-family: 'Roboto', sans-serif; letter-spacing: 0.05em; line-height: 1.6; }
.header-centered { text-align: center; }
.title-main { font-size: clamp(2rem, 5vw, 3rem); font-weight: 900; line-height: 1.15; background: linear-gradient(90deg, #111 0%, #1565C0 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 0.5rem; }
.subtitle-hero { font-size: clamp(1rem, 3vw, 1.15rem); color: #444; max-width: 600px; margin: 0 auto; }

.section-label { display: inline-flex; align-items: center; gap: 8px; border-radius: 16px; padding: 10px 22px; font-size: 1.1rem; font-weight: 900; margin-bottom: 1.25rem; }
.label-orange { background: #FFF3E0; color: #E64A19; border: 2px solid #FFAB91; }
.label-blue { background: #E3F2FD; color: #1565C0; border: 2px solid #90CAF9; }
.label-green  { background: #E8F5E9; color: #2E7D32; border: 2px solid #A5D6A7; }
.label-purple { background: #F3E5F5; color: #7B1FA2; border: 2px solid #CE93D8; }

.kid-card { background: #FFFFFF; border: 2.5px solid #EAEAEA; transition: transform 0.18s, box-shadow 0.18s; }
.kid-card:hover { transform: translateY(-4px); box-shadow: 0 8px 24px rgba(0,0,0,0.08); }
.card-shadow { box-shadow: 0 4px 20px rgba(0,0,0,0.12); }
.rounded-3xl { border-radius: 24px !important; }

.section-box { border-radius: 24px; padding: 1.8rem; }
.box-title { font-size: 1.15rem; font-weight: 900; margin-bottom: 8px; }
.box-body { font-size: 1rem; color: #444; margin-bottom: 1.2rem; line-height: 1.6; }
.title-orange { color: #E64A19 !important; }
.title-blue { color: #1565C0 !important; }
.title-green { color: #2E7D32 !important; }
.title-purple { color: #6A1B9A !important; }

.table-wrap { border-radius: 12px; overflow-x: auto; border: 1.5px solid #E0E0DC; margin-bottom: 8px; }
.data-table { width: 100%; min-width: 500px; border-collapse: collapse; background: white; }

.video-container { aspect-ratio: 16/9; display: flex; align-items: center; justify-content: center; }
.h-100 { height: 100%; }
.divider-kids { text-align: center; font-size: 1.4rem; color: #D0D0D0; letter-spacing: 12px; }

.btn-practica {
  background: linear-gradient(135deg, #1565C0, #0D47A1); color: #fff; font-family: inherit; font-size: clamp(1rem, 4vw, 1.25rem); font-weight: 900; padding: 16px 42px; border: none; border-radius: 20px; cursor: pointer; box-shadow: 0 6px 20px rgba(13, 71, 161, 0.35); transition: transform 0.15s, box-shadow 0.15s;
}
.btn-practica:hover { transform: translateY(-3px) scale(1.03); box-shadow: 0 10px 28px rgba(13, 71, 161, 0.45); }
.btn-practica:active { transform: translateY(0); }

@media (max-width: 768px) {
  .unit-stage { padding: 20px 16px 110px 16px; }
  .menu-toggle { bottom: 20px; left: 20px; }
  .menu-items { padding-left: 20px; }
}
</style>