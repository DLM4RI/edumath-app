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
            <span class="grado-chip">GRADO 2° • MATEMÁTICAS</span>
          </div>
          <div class="header-centered">
            <h1 class="title-main">{{ unidades[activeUnit].titulo }}</h1>
            <p class="subtitle-hero">{{ unidades[activeUnit].descripcion }}</p>
          </div>
        </header>

        <!-- UNIDAD 0: MULTIPLICACIÓN -->
        <transition name="fade-slide" mode="out-in">
          <section v-if="activeUnit === 0" key="u0" class="mb-10">
            <div class="section-label label-orange">
              ✖️ La Máquina de Sumas Rápidas
            </div>
            <v-row align="stretch" class="mb-6">
              <v-col cols="12" md="7">
                <v-card class="rounded-3xl overflow-hidden card-shadow" elevation="0" height="100%">
                  <div class="video-container bg-black">
                    <video controls class="w-100 h-100" preload="metadata">
                      <source :src="'/videos/grado2_video1.mp4'" type="video/mp4" />
                    </video>
                  </div>
                </v-card>
              </v-col>
              <v-col cols="12" md="5">
                <v-row>
                  <v-col cols="12" v-for="(f, i) in unidad1Frases" :key="i">
                    <v-card class="rounded-3xl pa-5 kid-card" elevation="0">
                      <p class="kid-card-title title-orange">{{ f.titulo }}</p>
                      <p class="kid-card-body">{{ f.subtitulo }}</p>
                    </v-card>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <div class="section-box box-orange mb-6">
              <p class="box-title title-orange">¡Lo vemos todos los días!</p>
              <v-row>
                <v-col cols="12" sm="4" v-for="(ej, i) in unidad1Ejemplos" :key="i">
                  <v-card class="rounded-3xl pa-5 kid-card h-100 text-center" elevation="0">
                    <p class="kid-example-icon">{{ ej.emoji }}</p>
                    <p class="kid-card-body font-weight-bold mb-3">{{ ej.situacion }}</p>
                    <span class="resultado-chip chip-orange">{{ ej.operacion }}</span>
                  </v-card>
                </v-col>
              </v-row>
            </div>
            <div class="divider-kids my-8">✦ ✦ ✦</div>
            <div class="d-flex justify-end">
              <button class="btn-practica" @click="selectUnit(1)">Números Grandes →</button>
            </div>
          </section>
        </transition>

        <!-- UNIDAD 1: NÚMEROS GRANDES -->
        <transition name="fade-slide" mode="out-in">
          <section v-if="activeUnit === 1" key="u1" class="mb-10">
            <div class="section-label label-purple">
              🔢 Arquitectos de Números
            </div>
            <v-row align="stretch" class="mb-6">
              <v-col cols="12" md="5" order="2" order-md="1">
                <v-row>
                  <v-col cols="12" v-for="(f, i) in unidad2Frases" :key="i">
                    <v-card class="rounded-3xl pa-5 kid-card" elevation="0">
                      <p class="kid-card-title title-purple">{{ f.titulo }}</p>
                      <p class="kid-card-body">{{ f.subtitulo }}</p>
                    </v-card>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12" md="7" order="1" order-md="2">
                <v-card class="rounded-3xl overflow-hidden card-shadow" elevation="0" height="100%">
                  <div class="video-container bg-black">
                    <video controls class="w-100 h-100" preload="metadata">
                      <source :src="'/videos/grado2_video2.mp4'" type="video/mp4" />
                    </video>
                  </div>
                </v-card>
              </v-col>
            </v-row>
            <div class="section-box box-blue mb-6">
              <p class="box-title title-blue">¿Cómo se arma un número?</p>
              <v-row justify="center">
                <v-col cols="12" sm="4" v-for="(nivel, i) in valorPosicional" :key="i">
                  <v-card class="rounded-3xl pa-5 text-center kid-card h-100" elevation="0">
                    <div class="posicion-icon">{{ nivel.icono }}</div>
                    <p class="kid-card-title title-blue">{{ nivel.nombre }}</p>
                    <p class="kid-card-body mb-3">{{ nivel.descripcion }}</p>
                    <span class="resultado-chip chip-blue">{{ nivel.ejemplo }}</span>
                  </v-card>
                </v-col>
              </v-row>
            </div>
            <div class="divider-kids my-8">✦ ✦ ✦</div>
            <div class="d-flex justify-space-between">
              <v-btn variant="text" color="grey-darken-2" @click="selectUnit(0)" class="font-weight-bold">← Multiplicación</v-btn>
              <button class="btn-practica" @click="selectUnit(2)">¡Ver Logros! →</button>
            </div>
          </section>
        </transition>

        <!-- UNIDAD 2: REPASO -->
        <transition name="fade-slide" mode="out-in">
          <section v-if="activeUnit === 2" key="u2" class="mb-10">
            <div class="section-label label-green">
              🏆 ¡Misión Cumplida!
            </div>
            <v-row>
              <v-col cols="12" sm="6" md="3" v-for="(logro, i) in logros" :key="i">
                <v-card class="rounded-3xl pa-5 h-100 kid-card text-center" elevation="0">
                  <div class="text-h3 mb-3">{{ logro.emoji }}</div>
                  <p class="kid-card-title" :style="`color: ${logroColors[i]}`">{{ logro.titulo }}</p>
                  <p class="kid-card-body">{{ logro.descripcion }}</p>
                </v-card>
              </v-col>
            </v-row>
            <div class="section-box box-cyan mt-6">
              <p class="box-title title-teal">¿Sabías esto?</p>
              <p class="box-body mb-0">
                ¡Los números no terminan nunca! Siempre puedes agregar uno más. Por eso los organizamos en grupos: unidades, decenas, centenas... Se llama el <strong>sistema decimal</strong>.
              </p>
            </div>
            <div class="divider-kids my-8">✦ ✦ ✦</div>
            <div class="d-flex justify-start">
              <v-btn variant="text" color="grey-darken-2" @click="selectUnit(1)" class="font-weight-bold">← Números Grandes</v-btn>
            </div>
          </section>
        </transition>

        <div class="mt-12 mb-12 d-flex justify-center">
          <button class="btn-practica" @click="$router.push('/app/grado/2/actividades')">
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
  { titulo: 'Multiplicación', emoji: '✖️', color: '#E64A19', descripcion: 'Aprende a sumar rápido con grupos iguales' },
  { titulo: 'Números Grandes', emoji: '🔢', color: '#7B1FA2', descripcion: 'Descubre el valor de cada número según su lugar' },
  { titulo: 'Logros', emoji: '🏆', color: '#2E7D32', descripcion: 'Repasa todo lo que has aprendido en esta aventura' }
]

const unidad1Frases = [
  { titulo: 'Multiplicar es sumar grupos', subtitulo: '4 + 4 + 4 es lo mismo que 3 × 4. ¡Los dos dan 12!' },
  { titulo: 'El signo × significa "grupos de"', subtitulo: '3 × 5 se lee "3 grupos de 5". El resultado es el producto.' },
  { titulo: 'Da igual el orden', subtitulo: '3 × 5 es igual a 5 × 3. ¡Siempre dan 15!' }
]

const unidad1Ejemplos = [
  { emoji: '🍬', situacion: '3 bolsas con 4 dulces cada una', operacion: '3 × 4 = 12' },
  { emoji: '🐾', situacion: '4 animales con 4 patas cada uno', operacion: '4 × 4 = 16' },
  { emoji: '✏️', situacion: '5 cajas con 8 lápices cada una', operacion: '5 × 8 = 40' }
]

const unidad2Frases = [
  { titulo: 'El lugar importa', subtitulo: 'En 52, el 5 vale 50. En 25, el 5 vale solo 5. ¡El lugar cambia el valor!' },
  { titulo: 'Las decenas', subtitulo: 'Si juntamos 10 unidades, formamos 1 decena. ¡Es como cambiar monedas!' },
  { titulo: 'Las centenas', subtitulo: 'Si juntamos 10 decenas, formamos 1 centena. ¡Eso son 100 unidades!' }
]

const valorPosicional = [
  { icono: '1️⃣', nombre: 'Unidades', descripcion: 'Números del 0 al 9. Lado derecho.', ejemplo: 'el 3 en 43' },
  { icono: '🔟', nombre: 'Decenas', descripcion: 'Grupos de 10. En el medio.', ejemplo: 'el 4 en 43 vale 40' },
  { icono: '💯', nombre: 'Centenas', descripcion: 'Grupos de 100. A la izquierda.', ejemplo: 'el 1 en 143 vale 100' }
]

const logros = [
  { emoji: '✖️', titulo: '¡Entiendo la multiplicación!', descripcion: 'Sé que es una forma rápida de sumar grupos iguales.' },
  { emoji: '📍', titulo: '¡Sé el valor de cada número!', descripcion: 'Puedo decir cuánto vale cada dígito según su lugar.' },
  { emoji: '🌍', titulo: '¡Lo veo en mi vida!', descripcion: 'Reconozco la multiplicación y los números grandes.' },
  { emoji: '🧠', titulo: '¡Pienso como matemático!', descripcion: 'Encuentro patrones y puedo explicar mis soluciones.' }
]

const logroColors = ['#E64A19', '#1565C0', '#00796B', '#7B1FA2']
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
.label-purple { background: #F3E5F5; color: #7B1FA2; border: 2px solid #CE93D8; }
.label-green  { background: #E8F5E9; color: #2E7D32; border: 2px solid #A5D6A7; }
.label-blue   { background: #E3F2FD; color: #1565C0; border: 2px solid #90CAF9; }

.kid-card { background: #FFFFFF; border: 2.5px solid #EAEAEA; transition: transform 0.18s, box-shadow 0.18s; }
.kid-card:hover { transform: translateY(-4px); box-shadow: 0 8px 24px rgba(0,0,0,0.08); }
.card-shadow { box-shadow: 0 4px 20px rgba(0,0,0,0.12); }
.rounded-3xl { border-radius: 24px !important; }

.section-box { border-radius: 24px; padding: 1.8rem; }
.box-orange { background: #FFF8E1; border: 2px solid #FFE082; }
.box-blue { background: #E3F2FD; border: 2px solid #BBDEFB; }
.box-cyan { background: #E0F7FA; border: 2px solid #B2EBF2; }

.box-title { font-size: 1.15rem; font-weight: 900; margin-bottom: 8px; }
.box-body { font-size: 1rem; color: #444; margin-bottom: 1.2rem; line-height: 1.6; }
.title-orange { color: #E64A19 !important; }
.title-purple { color: #6A1B9A !important; }
.title-blue { color: #1565C0 !important; }
.title-teal { color: #00695C !important; }

.resultado-chip { display: inline-block; padding: 6px 18px; border-radius: 999px; font-size: 1rem; font-weight: 900; color: #111; margin-top: 8px; }
.chip-orange { background: #FFE0B2; }
.chip-blue { background: #BBDEFB; }
.chip-indigo { background: #C5CAE9; }

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