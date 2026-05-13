<template>
  <div class="grade-wrapper" :class="{ 'menu-open': isMenuOpen }">
    <div
      class="nav-overlay"
      :class="{ 'is-active': isMenuOpen }"
      @click="toggleMenu(false)"
    ></div>

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
          <div class="nav-circle" :style="`background-color: ${u.color}`">
            {{ i + 1 }}
          </div>

          <transition name="fade-simple">
            <div v-if="isMenuOpen" class="nav-text-box">
              <span class="text-title">{{ u.titulo }}</span>
              <span class="text-emoji">{{ u.emoji }}</span>
            </div>
          </transition>
        </button>
      </div>
    </nav>

    <button
      class="menu-toggle"
      :class="{ active: isMenuOpen }"
      @click="toggleMenu()"
    >
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
            <span class="grado-chip">GRADO 4° • MATEMÁTICAS</span>
          </div>
          <div class="header-centered">
            <h1 class="title-main">{{ unidades[activeUnit].titulo }}</h1>
            <p class="subtitle-hero">{{ unidades[activeUnit].descripcion }}</p>
          </div>
        </header>

        <!-- UNIDAD 0: MUNDO REAL -->
        <transition name="fade-slide" mode="out-in">
          <section v-if="activeUnit === 0" key="u0" class="mb-10">
            <div class="section-label label-purple">
              🌍 Decimales en el Mundo Real
            </div>
            <v-row align="stretch" class="mb-6">
              <v-col cols="12" md="6">
                <v-card
                  class="rounded-3xl overflow-hidden card-shadow"
                  elevation="0"
                  height="100%"
                >
                  <div class="video-container bg-black">
                    <video controls class="w-100 h-100" preload="metadata">
                      <source
                        :src="'/videos/grado4_video1.mp4'"
                        type="video/mp4"
                      />
                    </video>
                  </div>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="rounded-3xl pa-6 h-100 kid-card" elevation="0">
                  <p class="text-overline font-weight-black title-purple mb-3">
                    ¿Por qué importan?
                  </p>
                  <p class="kid-card-body mb-4">
                    Los números decimales aparecen en los precios del
                    supermercado, en el peso de los ingredientes y en tu
                    estatura. Sin ellos, no podríamos ser precisos.
                  </p>
                  <p class="kid-card-body mb-4">
                    La <strong>coma decimal</strong> separa la parte entera de
                    la parte fraccionaria. En $3.250,75, el 75 representa
                    centavos.
                  </p>
                  <!-- 📷 IMAGEN UNIDAD 0: coloca grado4-imagen1.png en /public/img/ -->
                  <div class="img-slot img-slot--purple">
                    <img
                      src="/img/grado4-imagen2.png"
                      alt="Decimales en el mundo real"
                      class="content-img"
                      @error="onImgError"
                    />
                  </div>
                </v-card>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="4" v-for="(c, i) in conceptos" :key="i">
                <v-card
                  class="rounded-3xl pa-5 h-100 kid-card"
                  elevation="0"
                  :style="`background-color: ${c.bg}`"
                >
                  <p class="text-h4 mb-2">{{ c.emoji }}</p>
                  <p class="kid-card-title font-weight-black mb-2">
                    {{ c.titulo }}
                  </p>
                  <p class="kid-card-body text-body-2">{{ c.descripcion }}</p>
                </v-card>
              </v-col>
            </v-row>
            <div class="divider-kids my-8">✦ ✦ ✦</div>
            <div class="d-flex justify-end">
              <button class="btn-practica" @click="selectUnit(1)">
                Valor Posicional →
              </button>
            </div>
          </section>
        </transition>

        <!-- UNIDAD 1: ANATOMÍA -->
        <transition name="fade-slide" mode="out-in">
          <section v-if="activeUnit === 1" key="u1" class="mb-10">
            <div class="section-label label-blue">
              🔎 Anatomía del Número Decimal
            </div>
            <v-row align="stretch" class="mb-6">
              <v-col cols="12" md="6">
                <v-card
                  class="rounded-3xl overflow-hidden card-shadow"
                  elevation="0"
                  height="100%"
                >
                  <div class="video-container bg-black">
                    <video controls class="w-100 h-100" preload="metadata">
                      <source
                        :src="'/videos/grado4_video2.mp4'"
                        type="video/mp4"
                      />
                    </video>
                  </div>
                </v-card>
              </v-col>
              <v-col cols="12" md="6">
                <v-card class="rounded-3xl pa-5 h-100 kid-card" elevation="0">
                  <p class="text-overline font-weight-black title-blue mb-4">
                    Tabla de Valor Posicional
                  </p>
                  <div class="table-wrap mb-4">
                    <table class="data-table text-center">
                      <thead class="bg-blue-lighten-4">
                        <tr>
                          <th
                            v-for="h in tablaPosicional.headers"
                            :key="h"
                            class="pa-2 font-weight-black"
                          >
                            {{ h }}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td
                            v-for="(v, i) in tablaPosicional.valores"
                            :key="i"
                            class="pa-3 text-h5 font-weight-black"
                            :class="i >= 3 ? 'text-blue' : ''"
                          >
                            {{ v }}
                          </td>
                        </tr>
                        <tr class="text-caption text-medium-emphasis">
                          <td
                            v-for="l in tablaPosicional.labels"
                            :key="l"
                            class="pa-1"
                          >
                            {{ l }}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <v-alert
                    type="warning"
                    variant="tonal"
                    class="rounded-xl text-body-2"
                  >
                    <strong>¡Alinea siempre la coma!</strong> Es el punto de
                    referencia de todo número decimal.
                  </v-alert>
                </v-card>
              </v-col>
            </v-row>
            <!-- 📷 IMAGEN UNIDAD 1: coloca grado4-imagen2.png en /public/img/ -->
            <div class="img-slot img-slot--blue mb-6">
              <img
                src="/img/grado4-imagen1.png"
                alt="Infografía: Descomposición del número 95,11"
                class="content-img"
                @error="onImgError"
              />
            </div>
            <div class="divider-kids my-8">✦ ✦ ✦</div>
            <div class="d-flex justify-space-between">
              <v-btn
                variant="text"
                color="grey-darken-2"
                @click="selectUnit(0)"
                class="font-weight-bold"
                >← Mundo Real</v-btn
              >
              <button
                class="btn-practica"
                @click="$router.push('/app/grado/4/actividades')"
              >
                ¡A Practicar! 🚀
              </button>
            </div>
          </section>
        </transition>

        <div class="mt-12 mb-12 d-flex justify-center" v-if="activeUnit === 0">
          <button
            class="btn-practica"
            @click="$router.push('/app/grado/4/actividades')"
          >
            ¡Ir a las Misiones! 🚀
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from "vue";

// Muestra un placeholder visual cuando la imagen no se ha cargado aún
function onImgError(e) {
  const img = e.target;
  img.style.display = "none";
  const slot = img.closest(".img-slot");
  if (slot && !slot.querySelector(".img-placeholder")) {
    const ph = document.createElement("div");
    ph.className = "img-placeholder";
    ph.innerHTML = `<span class="img-placeholder-icon">🖼️</span><p class="img-placeholder-text">Imagen pendiente</p>`;
    slot.appendChild(ph);
  }
}

const activeUnit = ref(0);
const isMenuOpen = ref(false);

const toggleMenu = (force = null) => {
  if (force !== null) {
    isMenuOpen.value = force;
  } else {
    isMenuOpen.value = !isMenuOpen.value;
  }
};

function selectUnit(i) {
  activeUnit.value = i;
  toggleMenu(false);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

const unidades = [
  {
    titulo: "Mundo Decimal",
    emoji: "🌍",
    color: "#7B1FA2",
    descripcion:
      "Comprende los decimales en situaciones reales de medida y comercio",
  },
  {
    titulo: "Valor Posicional",
    emoji: "🔎",
    color: "#1565C0",
    descripcion: "Aprende la anatomía de los números y su valor exacto",
  },
];

const conceptos = [
  {
    emoji: "🏷️",
    titulo: "Precios",
    descripcion:
      "Los precios usan decimales para centavos. $3.250,50 son pesos y centavos.",
    bg: "#F3E5F5",
  },
  {
    emoji: "📏",
    titulo: "Medidas",
    descripcion:
      "Una estatura de 1,35 m indica 1 metro y 35 centésimas. ¡Precisión total!",
    bg: "#E8EAF6",
  },
  {
    emoji: "⚖️",
    titulo: "Comparar",
    descripcion:
      "Observa la parte entera, luego décima a décima. ¡La posición importa!",
    bg: "#E3F2FD",
  },
];

const tablaPosicional = {
  headers: ["Decenas", "Unidades", ",", "Décimas", "Centésimas"],
  valores: ["9", "5", ",", "1", "1"],
  labels: ["×10", "×1", "", "÷10", "÷100"],
};
</script>

<style scoped>
/* ═══════════════════════════════════════════════
   ESTILOS COPIADOS DE GRADO 3 PARA CONSISTENCIA
═══════════════════════════════════════════════ */
.grade-wrapper {
  font-family: "Nunito", "Trebuchet MS", system-ui, sans-serif;
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
  transition:
    opacity 0.4s ease,
    visibility 0.4s;
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
.menu-open .nav-btn:nth-child(1) {
  transition-delay: 0.05s;
}
.menu-open .nav-btn:nth-child(2) {
  transition-delay: 0.1s;
}

.nav-circle {
  width: 46px;
  height: 46px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: 900;
  font-size: 1.2rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  flex-shrink: 0;
}
.nav-btn--active .nav-circle {
  outline: 3px dashed var(--accent, #2e7d32);
  outline-offset: 4px;
}
.nav-text-box {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(8px);
  border: 2px solid var(--accent, #c0c0c0);
  border-radius: 14px;
  padding: 10px 18px;
  display: flex;
  align-items: center;
  gap: 12px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
  white-space: nowrap;
}
.text-title {
  font-weight: 800;
  font-size: 0.95rem;
  color: #222222;
}
.text-emoji {
  font-size: 1.2rem;
}

.menu-toggle {
  position: fixed;
  bottom: 24px;
  left: 24px;
  z-index: 1001;
  height: 46px;
  background-color: #ffffff;
  border: 2px solid #e0e0d8;
  border-radius: 23px;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
  max-width: 120px;
  overflow: hidden;
  transition:
    max-width 0.35s cubic-bezier(0.34, 1.56, 0.64, 1),
    background 0.2s ease;
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
.hamburger-icon {
  width: 22px;
  height: 16px;
  position: relative;
}
.hamburger-icon span {
  display: block;
  position: absolute;
  height: 2.5px;
  width: 100%;
  background: #333;
  border-radius: 4px;
  left: 0;
  transition: 0.25s ease-in-out;
}
.hamburger-icon span:nth-child(1) {
  top: 0px;
}
.hamburger-icon span:nth-child(2) {
  top: 7px;
}
.hamburger-icon span:nth-child(3) {
  top: 14px;
}
.menu-toggle.active .hamburger-icon span:nth-child(1) {
  top: 7px;
  transform: rotate(135deg);
}
.menu-toggle.active .hamburger-icon span:nth-child(2) {
  opacity: 0;
  left: -20px;
}
.menu-toggle.active .hamburger-icon span:nth-child(3) {
  top: 7px;
  transform: rotate(-135deg);
}

.unit-stage {
  margin: 0 auto;
  width: 100%;
  padding: 40px 50px 100px 50px;
  max-width: 1200px;
}
.grade-content {
  width: 100%;
}
.header-hero {
  padding: 1rem 0 2rem;
}
.header-chip-wrap {
  text-align: left;
  margin-bottom: 1.5rem;
}
.grado-chip {
  display: inline-block;
  background: #e8eaf6;
  color: #304ffe;
  border-radius: 999px;
  padding: 6px 18px;
  font-size: 0.9rem;
  font-weight: 900;
  font-family: "Roboto", sans-serif;
  letter-spacing: 0.05em;
  line-height: 1.6;
}
.header-centered {
  text-align: center;
}
.title-main {
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 900;
  line-height: 1.15;
  background: linear-gradient(90deg, #111 0%, #1565c0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 0.5rem;
}
.subtitle-hero {
  font-size: clamp(1rem, 3vw, 1.15rem);
  color: #444;
  max-width: 600px;
  margin: 0 auto;
}

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
.label-orange {
  background: #fff3e0;
  color: #e64a19;
  border: 2px solid #ffab91;
}
.label-purple {
  background: #f3e5f5;
  color: #7b1fa2;
  border: 2px solid #ce93d8;
}
.label-green {
  background: #e8f5e9;
  color: #2e7d32;
  border: 2px solid #a5d6a7;
}
.label-blue {
  background: #e3f2fd;
  color: #1565c0;
  border: 2px solid #90caf9;
}

.kid-card {
  background: #ffffff;
  border: 2.5px solid #eaeaea;
  transition:
    transform 0.18s,
    box-shadow 0.18s;
}
.kid-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}
.card-shadow {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12);
}
.rounded-3xl {
  border-radius: 24px !important;
}

.section-box {
  border-radius: 24px;
  padding: 1.8rem;
}
.box-purple {
  background: #f3e5f5;
  border: 2px solid #ce93d8;
}
.box-blue {
  background: #e3f2fd;
  border: 2px solid #bbdefb;
}

/* ── Slots de imagen ── */
.img-slot {
  border-radius: 20px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 180px;
  padding: 8px;
}
.img-slot--purple {
  background: #f3e5f5;
  border: 2px dashed #7b1fa2;
}
.img-slot--blue {
  background: #e3f2fd;
  border: 2px dashed #1565c0;
}
.content-img {
  width: 100%;
  height: auto;
  max-height: 320px;
  object-fit: contain;
  border-radius: 14px;
  display: block;
}
/* Placeholder cuando la imagen no existe aún */
.img-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 24px;
  width: 100%;
}
.img-placeholder-icon {
  font-size: 3rem;
  opacity: 0.5;
}
.img-placeholder-text {
  font-size: 0.95rem;
  color: #999;
  margin: 0;
}

.box-title {
  font-size: 1.15rem;
  font-weight: 900;
  margin-bottom: 8px;
}
.box-body {
  font-size: 1rem;
  color: #444;
  margin-bottom: 1.2rem;
  line-height: 1.6;
}
.title-purple {
  color: #6a1b9a !important;
}
.title-blue {
  color: #1565c0 !important;
}

.table-wrap {
  border-radius: 12px;
  overflow-x: auto;
  border: 1.5px solid #e0e0dc;
  margin-bottom: 8px;
}
.data-table {
  width: 100%;
  min-width: 500px;
  border-collapse: collapse;
  background: white;
}

.video-container {
  aspect-ratio: 16/9;
  display: flex;
  align-items: center;
  justify-content: center;
}
.h-100 {
  height: 100%;
}
.divider-kids {
  text-align: center;
  font-size: 1.4rem;
  color: #d0d0d0;
  letter-spacing: 12px;
}

.btn-practica {
  background: linear-gradient(135deg, #1565c0, #0d47a1);
  color: #fff;
  font-family: inherit;
  font-size: clamp(1rem, 4vw, 1.25rem);
  font-weight: 900;
  padding: 16px 42px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  box-shadow: 0 6px 20px rgba(13, 71, 161, 0.35);
  transition:
    transform 0.15s,
    box-shadow 0.15s;
}
.btn-practica:hover {
  transform: translateY(-3px) scale(1.03);
  box-shadow: 0 10px 28px rgba(13, 71, 161, 0.45);
}
.btn-practica:active {
  transform: translateY(0);
}

@media (max-width: 768px) {
  .unit-stage {
    padding: 20px 16px 110px 16px;
  }
  .menu-toggle {
    bottom: 20px;
    left: 20px;
  }
  .menu-items {
    padding-left: 20px;
  }
}
</style>
