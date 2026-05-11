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
            <span class="grado-chip">GRADO 1° • MATEMÁTICAS</span>
          </div>
          <div class="header-centered">
            <h1 class="title-main">{{ unidades[activeUnit].titulo }}</h1>
            <p class="subtitle-hero">{{ unidades[activeUnit].descripcion }}</p>
          </div>
        </header>

        <!-- UNIDAD 0: VIDEOS -->
        <transition name="fade-slide" mode="out-in">
          <section v-if="activeUnit === 0" key="u0" class="mb-10">
            <div class="section-label label-blue">
              🎬 Cine de Matemáticas
            </div>
            <v-row>
              <v-col cols="12" md="6" v-for="(v, i) in videos" :key="i">
                <v-card class="rounded-3xl overflow-hidden card-shadow" elevation="0">
                  <div class="video-container bg-black">
                    <video controls class="w-100 h-100" preload="metadata">
                      <source :src="v.src" type="video/mp4" />
                      Tu navegador no soporta videos.
                    </video>
                  </div>
                  <v-card-text class="pa-4">
                    <h3 class="text-h6 font-weight-bold mb-1">{{ v.titulo }}</h3>
                    <p class="text-caption text-medium-emphasis">Lección interactiva para Grado 1°</p>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
            <div class="divider-kids my-8">✦ ✦ ✦</div>
            <div class="d-flex justify-end">
              <button class="btn-practica" @click="selectUnit(1)">Aprendamos a Contar →</button>
            </div>
          </section>
        </transition>

        <!-- UNIDAD 1: CONTEO -->
        <transition name="fade-slide" mode="out-in">
          <section v-if="activeUnit === 1" key="u1" class="mb-10">
            <div class="section-label label-green">
              🔢 ¡A Contar Números!
            </div>
            <v-card class="pa-6 rounded-3xl border-none bg-blue-lighten-5 mb-6 overflow-hidden" elevation="0">
              <v-row align="center">
                <v-col cols="12" md="7">
                  <h2 class="text-h4 font-weight-black mb-3 title-blue">1, 2, 3... ¡Despegue!</h2>
                  <p class="text-h6 font-weight-regular mb-4">
                    ¡Contar es fácil! Di los números en orden: 1, 2, 3... Cada vez es un número mayor.
                  </p>
                  <v-chip color="blue-darken-2" variant="flat">Estrategia: Señalar y Nombrar</v-chip>
                </v-col>
                <v-col cols="12" md="5" class="d-flex justify-center">
                  <v-img src="/img/grado1-imagen1-conteo.png" width="100%" max-height="250" class="rounded-3xl shadow-sm"></v-img>
                </v-col>
              </v-row>
            </v-card>
            <div class="section-box box-blue">
              <p class="box-title title-blue">¿Sabías que...?</p>
              <p class="box-body mb-0">
                Puedes usar tus juguetes favoritos para practicar sumas y restas en casa. ¡Es muy divertido!
              </p>
            </div>
            <div class="divider-kids my-8">✦ ✦ ✦</div>
            <div class="d-flex justify-space-between">
              <v-btn variant="text" color="grey-darken-2" @click="selectUnit(0)" class="font-weight-bold">← Videos</v-btn>
              <button class="btn-practica" @click="selectUnit(2)">Sumas y Restas →</button>
            </div>
          </section>
        </transition>

        <!-- UNIDAD 2: SUMA Y RESTA -->
        <transition name="fade-slide" mode="out-in">
          <section v-if="activeUnit === 2" key="u2" class="mb-10">
            <div class="section-label label-orange">
              ⚖️ Operaciones Mágicas
            </div>
            <v-row>
              <!-- SUMA -->
              <v-col cols="12">
                <v-card class="pa-6 rounded-3xl border-none bg-green-lighten-5 mb-6 overflow-hidden" elevation="0">
                  <v-row align="center">
                    <v-col cols="12" md="7">
                      <h2 class="text-h4 font-weight-black mb-3 title-green">La Suma (+)</h2>
                      <p class="text-h6 font-weight-regular mb-4">
                        Sumar es juntar. Si tienes 2 pelotas y te dan 1 más, juntas todo. ¡Ahora tienes 3!
                      </p>
                      <v-chip color="green-darken-2" variant="flat">Estrategia: Usar Dedos o Fichas</v-chip>
                    </v-col>
                    <v-col cols="12" md="5" class="d-flex justify-center">
                      <v-img src="/img/grado1-imagen2-suma.png" width="100%" max-height="200" class="rounded-3xl"></v-img>
                    </v-col>
                  </v-row>
                </v-card>
              </v-col>
              <!-- RESTA -->
              <v-col cols="12">
                <v-card class="pa-6 rounded-3xl border-none bg-red-lighten-5 mb-6 overflow-hidden" elevation="0">
                  <v-row align="center">
                    <v-col cols="12" md="7">
                      <h2 class="text-h4 font-weight-black mb-3 title-orange" style="color: #D32F2F !important;">La Resta (-)</h2>
                      <p class="text-h6 font-weight-regular mb-4">
                        Restar es cuando algo se va. Si tienes 5 galletas y te comes 2, ¿cuántas te quedan?
                      </p>
                      <v-chip color="red-darken-2" variant="flat">Estrategia: Tachado Visual</v-chip>
                    </v-col>
                    <v-col cols="12" md="5" class="d-flex justify-center">
                      <v-img src="/img/grado1-imagen3-resta.png" width="100%" max-height="200" class="rounded-3xl"></v-img>
                    </v-col>
                  </v-row>
                </v-card>
              </v-col>
            </v-row>
            <div class="divider-kids my-8">✦ ✦ ✦</div>
            <div class="d-flex justify-space-between">
              <v-btn variant="text" color="grey-darken-2" @click="selectUnit(1)" class="font-weight-bold">← Conteo</v-btn>
              <button class="btn-practica" @click="selectUnit(3)">Retos Finales →</button>
            </div>
          </section>
        </transition>

        <!-- UNIDAD 3: RETOS -->
        <transition name="fade-slide" mode="out-in">
          <section v-if="activeUnit === 3" key="u3" class="mb-10">
            <div class="section-label label-purple">
              💡 Retos Rápidos
            </div>
            <v-row>
              <v-col cols="12" md="6" v-for="(r, i) in retos" :key="i">
                <v-card class="pa-6 rounded-3xl kid-card h-100 shadow-sm" elevation="0">
                  <div class="d-flex align-center mb-4">
                    <v-avatar :color="r.color" size="40" class="mr-3 text-white font-weight-black">{{ i+1 }}</v-avatar>
                    <h4 class="text-h5 font-weight-black">{{ r.titulo }}</h4>
                  </div>
                  <p class="text-body-1 mb-4">{{ r.pregunta }}</p>
                  <v-img :src="r.img" class="rounded-3xl mb-4" height="180" cover border></v-img>
                  <div :class="`text-${r.status} text-h6 font-weight-black`" :style="`color: ${r.statusColor}`">
                    {{ r.respuesta }}
                  </div>
                </v-card>
              </v-col>
            </v-row>
            <div class="divider-kids my-8">✦ ✦ ✦</div>
            <div class="d-flex justify-start">
              <v-btn variant="text" color="grey-darken-2" @click="selectUnit(2)" class="font-weight-bold">← Suma y Resta</v-btn>
            </div>
          </section>
        </transition>

        <div class="mt-12 mb-12 d-flex justify-center">
          <button class="btn-practica" @click="$router.push('/app/grado/1/actividades')">
            ¡A Jugar Misiones! 🚀
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
  { titulo: 'Cine Matemático', emoji: '🎬', color: '#1565C0', descripcion: 'Mira videos divertidos sobre números y conteo' },
  { titulo: 'Aprendamos a Contar', emoji: '🔢', color: '#2E7D32', descripcion: 'Descubre cómo contar objetos en tu casa y escuela' },
  { titulo: 'Sumas y Restas', emoji: '⚖️', color: '#E64A19', descripcion: 'Junta y quita elementos para resolver misterios' },
  { titulo: 'Retos Rápidos', emoji: '💡', color: '#7B1FA2', descripcion: '¡Ponte a prueba con estos desafíos de lógica!' }
]

const videos = [
  { titulo: 'Estrategias de Conteo', src: '/videos/grado1_video1.mp4' },
  { titulo: 'Aprendiendo a Sumar y Restar', src: '/videos/grado1_video2.mp4' }
]

const retos = [
  { 
    titulo: 'El Picnic', 
    pregunta: 'Tienes 4 sándwiches y traes 2 más. ¿Cuántos hay?', 
    img: '/img/grado1-imagen1-resuelta-1.png', 
    respuesta: '¡Hay 6 en total! (4 + 2 = 6)', 
    color: 'primary', 
    status: 'success',
    statusColor: '#2E7D32'
  },
  { 
    titulo: 'Los Globos', 
    pregunta: 'Había 5 globos y se volaron 2. ¿Cuántos quedaron?', 
    img: '/img/grado1-imagen2-resuelta-2.png', 
    respuesta: '¡Quedaron 3! (5 - 2 = 3)', 
    color: 'secondary', 
    status: 'error',
    statusColor: '#D32F2F'
  }
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
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.65);
  backdrop-filter: blur(4px);
  z-index: 900; 
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.4s ease, visibility 0.4s;
  pointer-events: none;
}
.nav-overlay.is-active {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
}

.floating-menu-container {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%; 
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: 1000;
  pointer-events: none;
}

.menu-items {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-left: 24px; 
}

.nav-btn {
  display: flex; 
  align-items: center; 
  gap: 16px;
  background: transparent; 
  border: none; 
  padding: 0; 
  cursor: pointer;
  position: relative;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s ease;
}

.menu-open .nav-btn {
  opacity: 1;
  pointer-events: auto;
}

.menu-open .nav-btn:nth-child(1) { transition-delay: 0.05s; }
.menu-open .nav-btn:nth-child(2) { transition-delay: 0.10s; }
.menu-open .nav-btn:nth-child(3) { transition-delay: 0.15s; }
.menu-open .nav-btn:nth-child(4) { transition-delay: 0.20s; }

.nav-circle {
  width: 46px; height: 46px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  color: #fff; font-weight: 900; font-size: 1.2rem;
  box-shadow: 0 4px 10px rgba(0,0,0,0.15);
  flex-shrink: 0; 
}

.nav-btn--active .nav-circle {
  outline: 3px dashed var(--accent, #2E7D32);
  outline-offset: 4px;
}

.nav-text-box {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(8px);
  border: 2px solid var(--accent, #c0c0c0); border-radius: 14px;
  padding: 10px 18px; display: flex; align-items: center; gap: 12px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15); white-space: nowrap; 
}
.text-title { font-weight: 800; font-size: 0.95rem; color: #222222; }
.text-emoji { font-size: 1.2rem; }

.menu-toggle {
  position: fixed;
  bottom: 24px;
  left: 24px; 
  z-index: 1001; 
  height: 46px; 
  background-color: #ffffff;
  border: 2px solid #E0E0D8; 
  border-radius: 23px; 
  cursor: pointer;
  display: flex; 
  align-items: center; 
  padding: 0; 
  box-shadow: 0 4px 15px rgba(0,0,0,0.15); 
  max-width: 120px;
  overflow: hidden;
  transition: max-width 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.2s ease;
}

.menu-toggle.active {
  max-width: 46px; 
}

.menu-toggle-icon-wrap {
  width: 42px; 
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.menu-text {
  font-weight: 900;
  font-size: 0.95rem;
  color: #333;
  padding-left: 4px;
  padding-right: 18px;
  white-space: nowrap;
  opacity: 1;
  transition: opacity 0.2s ease;
}

.menu-toggle.active .menu-text {
  opacity: 0;
  pointer-events: none;
}

.hamburger-icon { width: 22px; height: 16px; position: relative; }
.hamburger-icon span {
  display: block; position: absolute; height: 2.5px; width: 100%;
  background: #333; border-radius: 4px; left: 0; transition: .25s ease-in-out;
}
.hamburger-icon span:nth-child(1) { top: 0px; }
.hamburger-icon span:nth-child(2) { top: 7px; }
.hamburger-icon span:nth-child(3) { top: 14px; }
.menu-toggle.active .hamburger-icon span:nth-child(1) { top: 7px; transform: rotate(135deg); }
.menu-toggle.active .hamburger-icon span:nth-child(2) { opacity: 0; left: -20px; }
.menu-toggle.active .hamburger-icon span:nth-child(3) { top: 7px; transform: rotate(-135deg); }

.fade-simple-enter-active,
.fade-simple-leave-active { transition: opacity 0.3s ease; }
.fade-simple-enter-from, 
.fade-simple-leave-to { opacity: 0; }

.unit-stage {
  margin: 0 auto; 
  width: 100%;
  padding: 40px 50px 100px 50px; 
  max-width: 1200px;
}

.grade-content { width: 100%; }

.header-hero { padding: 1rem 0 2rem; }
.header-chip-wrap { text-align: left; margin-bottom: 1.5rem; }

.grado-chip {
  display: inline-block;
  background: #E8EAF6;
  color: #304FFE;
  border-radius: 999px;
  padding: 6px 18px;
  font-size: 0.9rem;
  font-weight: 900;
  font-family: 'Roboto', sans-serif;
  letter-spacing: 0.05em;
  line-height: 1.6;
}

.header-centered { text-align: center; }
.title-main {
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 900;
  line-height: 1.15;
  background: linear-gradient(90deg, #111 0%, #1565C0 100%);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  margin-bottom: 0.5rem;
}
.subtitle-hero { font-size: clamp(1rem, 3vw, 1.15rem); color: #444; max-width: 600px; margin: 0 auto; }

.section-label {
  display: inline-flex; align-items: center; gap: 8px;
  border-radius: 16px; padding: 10px 22px;
  font-size: 1.1rem; font-weight: 900; margin-bottom: 1.25rem;
}
.label-orange { background: #FFF3E0; color: #E64A19; border: 2px solid #FFAB91; }
.label-purple { background: #F3E5F5; color: #7B1FA2; border: 2px solid #CE93D8; }
.label-green  { background: #E8F5E9; color: #2E7D32; border: 2px solid #A5D6A7; }
.label-blue   { background: #E3F2FD; color: #1565C0; border: 2px solid #90CAF9; }

.kid-card {
  background: #FFFFFF;
  border: 2.5px solid #EAEAEA;
  transition: transform 0.18s, box-shadow 0.18s;
}
.kid-card:hover { transform: translateY(-4px); box-shadow: 0 8px 24px rgba(0,0,0,0.08); }
.card-shadow { box-shadow: 0 4px 20px rgba(0,0,0,0.12); }
.rounded-3xl { border-radius: 24px !important; }

.section-box { border-radius: 24px; padding: 1.8rem; }
.box-blue { background: #E3F2FD; border: 2px solid #BBDEFB; }

.box-title { font-size: 1.15rem; font-weight: 900; margin-bottom: 8px; }
.box-body { font-size: 1rem; color: #444; margin-bottom: 1.2rem; line-height: 1.6; }

.title-blue   { color: #1565C0 !important; }
.title-green  { color: #2E7D32 !important; }

.video-container { aspect-ratio: 16/9; display: flex; align-items: center; justify-content: center; }
.h-100 { height: 100%; }

.divider-kids { text-align: center; font-size: 1.4rem; color: #D0D0D0; letter-spacing: 12px; }

.btn-practica {
  background: linear-gradient(135deg, #1565C0, #0D47A1);
  color: #fff; font-family: inherit; font-size: clamp(1rem, 4vw, 1.25rem); font-weight: 900;
  padding: 16px 42px; border: none; border-radius: 20px; cursor: pointer;
  box-shadow: 0 6px 20px rgba(13, 71, 161, 0.35); transition: transform 0.15s, box-shadow 0.15s;
}
.btn-practica:hover { transform: translateY(-3px) scale(1.03); box-shadow: 0 10px 28px rgba(13, 71, 161, 0.45); }
.btn-practica:active { transform: translateY(0); }

@media (max-width: 768px) {
  .unit-stage { padding: 20px 16px 110px 16px; }
  .menu-toggle { bottom: 20px; left: 20px; }
  .menu-items { padding-left: 20px; }
}
</style>
