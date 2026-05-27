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
            <span class="grado-chip">GRADO 1° • PENSAMIENTO NUMÉRICO</span>
          </div>
          <div class="header-centered">
            <h1 class="title-main">{{ unidades[activeUnit].titulo }}</h1>
            <p class="subtitle-hero">{{ unidades[activeUnit].descripcion }}</p>
          </div>
        </header>

        <!-- UNIDAD 1: CONTEO -->
        <transition name="fade-slide" mode="out-in">
          <section v-if="activeUnit === 0" key="u1" class="mb-10">
            <div class="section-label label-blue">
              {{ unidades[0].emoji }} ¡Exploradores Numéricos!
            </div>

            <v-row align="stretch" class="mb-6">
              <v-col cols="12" md="7">
                <v-card class="rounded-3xl overflow-hidden card-shadow" elevation="0" height="100%">
                  <div class="video-container bg-black">
                    <video controls class="w-100 h-100" preload="metadata">
                      <source :src="getVideoSrc(1, 1)" type="video/mp4" />
                    </video>
                  </div>
                </v-card>
              </v-col>

              <v-col cols="12" md="5">
                <v-card class="rounded-3xl pa-6 kid-card h-100 d-flex flex-column justify-center" style="border-color: #90CAF9; background: #E3F2FD;" elevation="0">
                  <span class="text-h2 mb-3">🖐️</span>
                  <p class="kid-card-title title-blue text-h5 mb-3">Manos a la obra</p>
                  <p class="kid-card-body text-body-1">Nuestras manos son las mejores herramientas para contar. Cada dedo es una unidad. ¿Cuántos dedos tienes en total?</p>
                </v-card>
              </v-col>
            </v-row>

            <div class="section-box box-blue mb-6">
              <p class="box-title title-blue">Agrupando de 10 en 10 (Decenas)</p>
              <v-row>
                <v-col cols="12" sm="4" v-for="(g, i) in decenasDatos" :key="i">
                  <v-card class="rounded-3xl pa-5 kid-card h-100 text-center" elevation="0">
                    <span class="resultado-chip chip-blue mb-3">{{ g.grupo }}</span>
                    <p class="text-h1 mb-2">{{ g.emoji }}</p>
                    <p class="kid-card-body font-weight-bold mb-2">{{ g.titulo }}</p>
                    <p class="kid-card-body text-body-2 text-grey-darken-1">{{ g.desc }}</p>
                  </v-card>
                </v-col>
              </v-row>
            </div>

            <div class="section-box box-teal mb-6">
              <p class="box-title title-teal">Trucos para contar rápido</p>
              <v-row>
                <v-col cols="12" sm="6" md="4" v-for="(t, i) in trucosConteo" :key="i">
                  <v-card class="rounded-3xl pa-5 kid-card h-100" elevation="0">
                    <p class="kid-example-icon">{{ t.emoji }}</p>
                    <p class="kid-card-title title-teal">{{ t.titulo }}</p>
                    <p class="kid-card-body mb-4">{{ t.descripcion }}</p>
                    <div class="d-flex flex-wrap gap-2">
                       <v-chip v-for="num in t.secuencia" :key="num" color="teal" size="small">{{ num }}</v-chip>
                    </div>
                  </v-card>
                </v-col>
              </v-row>
            </div>

            <div class="divider-kids my-8">✦ ✦ ✦</div>
            <div class="d-flex justify-end">
              <button class="btn-practica" @click="selectUnit(1)">Siguiente: La Suma →</button>
            </div>
          </section>
        </transition>

        <!-- UNIDAD 2: LA SUMA -->
        <transition name="fade-slide" mode="out-in">
          <section v-if="activeUnit === 1" key="u2" class="mb-10">
            <div class="section-label label-green">
              {{ unidades[1].emoji }} La Magia de Juntar (Suma)
            </div>

            <v-row align="stretch" class="mb-6">
              <v-col cols="12" md="5" order="2" order-md="1">
                <div class="section-box box-green h-100">
                  <p class="box-title title-green">¿Qué significa sumar?</p>
                  <div class="d-flex align-center gap-3 mb-3 bg-white pa-3 rounded-xl border">
                    <v-avatar color="green-darken-2" class="text-white font-weight-bold text-h5" size="48">+</v-avatar>
                    <div>
                      <p class="font-weight-bold mb-0 text-body-1">Sumar es JUNTAR</p>
                      <p class="text-body-2 text-grey-darken-1 mb-0">Unimos dos grupos para tener uno más grande.</p>
                    </div>
                  </div>
                  <v-card class="pa-4 bg-green-lighten-5 rounded-xl border mt-4" elevation="0">
                    <p class="font-weight-bold mb-2">Palabras Clave:</p>
                    <div class="d-flex flex-wrap gap-2">
                      <v-chip color="green" size="small">Añadir</v-chip>
                      <v-chip color="green" size="small">Total</v-chip>
                      <v-chip color="green" size="small">Más</v-chip>
                      <v-chip color="green" size="small">Comprar</v-chip>
                    </div>
                  </v-card>
                </div>
              </v-col>
              <v-col cols="12" md="7" order="1" order-md="2">
                <v-card class="rounded-3xl overflow-hidden card-shadow" elevation="0" height="100%">
                  <div class="video-container bg-black">
                    <video controls class="w-100 h-100" preload="metadata">
                      <source :src="getVideoSrc(1, 2)" type="video/mp4" />
                    </video>
                  </div>
                </v-card>
              </v-col>
            </v-row>

            <div class="section-box box-orange mb-6">
              <p class="box-title title-orange">Estrategias mágicas</p>
              <v-row>
                <v-col cols="12" sm="6" md="4" v-for="(est, i) in estrategiasSuma" :key="i">
                  <v-card class="rounded-3xl pa-5 kid-card h-100" elevation="0">
                    <p class="kid-example-icon">{{ est.emoji }}</p>
                    <p class="kid-card-title title-orange">{{ est.titulo }}</p>
                    <p class="kid-card-body mb-3">{{ est.descripcion }}</p>
                    <span class="resultado-chip chip-orange">{{ est.ejemplo }}</span>
                  </v-card>
                </v-col>
              </v-row>
            </div>

            <div class="section-box box-purple mb-6">
              <p class="box-title title-purple">La familia del 10 (Amigos del 10)</p>
              <p class="text-body-1 mb-4">Aprender qué números suman 10 te hará calcular rapidísimo.</p>
              <v-row>
                <v-col cols="6" sm="4" md="2" v-for="(amigo, i) in amigosDel10" :key="i">
                  <v-card class="rounded-xl pa-3 kid-card text-center border elevation-0">
                    <div class="d-flex justify-center align-center gap-1">
                      <span class="text-h5 font-weight-black text-purple">{{ amigo.a }}</span>
                      <span class="text-grey-darken-1">+</span>
                      <span class="text-h5 font-weight-black text-purple">{{ amigo.b }}</span>
                    </div>
                    <div style="height: 2px; background: #E1BEE7; margin: 4px 0;"></div>
                    <span class="font-weight-black text-h6 text-purple-darken-3">10</span>
                  </v-card>
                </v-col>
              </v-row>
            </div>

            <div class="divider-kids my-8">✦ ✦ ✦</div>
            <div class="d-flex flex-wrap gap-4 justify-space-between">
              <v-btn variant="text" color="grey-darken-2" @click="selectUnit(0)" class="font-weight-bold">← Conteo</v-btn>
              <button class="btn-practica" @click="selectUnit(2)">La Resta →</button>
            </div>
          </section>
        </transition>

        <!-- UNIDAD 3: LA RESTA -->
        <transition name="fade-slide" mode="out-in">
          <section v-if="activeUnit === 2" key="u3" class="mb-10">
            <div class="section-label label-red">
              {{ unidades[2].emoji }} El Poder de Quitar (Resta)
            </div>

            <v-row align="stretch" class="mb-6">
              <v-col cols="12" md="7">
                <v-card class="rounded-3xl overflow-hidden card-shadow" elevation="0" height="100%">
                  <div class="video-container bg-black">
                    <video controls class="w-100 h-100" preload="metadata">
                      <source :src="getVideoSrc(1, 3)" type="video/mp4" />
                    </video>
                  </div>
                </v-card>
              </v-col>
              <v-col cols="12" md="5">
                <div class="section-box box-red h-100">
                  <p class="box-title title-red">¿Qué significa restar?</p>
                  <div class="d-flex align-center gap-3 mb-3 bg-white pa-3 rounded-xl border">
                    <v-avatar color="red-darken-2" class="text-white font-weight-bold text-h5" size="48">-</v-avatar>
                    <div>
                      <p class="font-weight-bold mb-0 text-body-1">Restar es QUITAR</p>
                      <p class="text-body-2 text-grey-darken-1 mb-0">Separamos o quitamos elementos de un grupo.</p>
                    </div>
                  </div>
                  <v-card class="pa-4 bg-red-lighten-5 rounded-xl border mt-4" elevation="0">
                    <p class="font-weight-bold mb-2">Palabras Clave:</p>
                    <div class="d-flex flex-wrap gap-2">
                      <v-chip color="red" size="small">Quitar</v-chip>
                      <v-chip color="red" size="small">Sobran</v-chip>
                      <v-chip color="red" size="small">Faltan</v-chip>
                      <v-chip color="red" size="small">Gastar</v-chip>
                    </div>
                  </v-card>
                </div>
              </v-col>
            </v-row>

            <div class="section-box box-orange mb-6">
              <p class="box-title title-orange">Estrategias mágicas para Restar</p>
              <v-row>
                <v-col cols="12" sm="6" md="4" v-for="(est, i) in estrategiasResta" :key="i">
                  <v-card class="rounded-3xl pa-5 kid-card h-100" elevation="0">
                    <p class="kid-example-icon">{{ est.emoji }}</p>
                    <p class="kid-card-title title-orange">{{ est.titulo }}</p>
                    <p class="kid-card-body mb-3">{{ est.descripcion }}</p>
                    <span class="resultado-chip chip-orange">{{ est.ejemplo }}</span>
                  </v-card>
                </v-col>
              </v-row>
            </div>

            <div class="section-box box-amber">
              <div class="d-flex gap-3 align-start">
                <span class="text-h4">💡</span>
                <div>
                  <p class="box-title title-amber">Suma y Resta son hermanas</p>
                  <p class="box-body mb-0">Si sabes que <strong>3 + 2 = 5</strong>, entonces automáticamente sabes que <strong>5 - 2 = 3</strong> y que <strong>5 - 3 = 2</strong>. ¡Son la misma familia de números!</p>
                </div>
              </div>
            </div>

            <div class="divider-kids my-8">✦ ✦ ✦</div>
            <div class="d-flex flex-wrap gap-4 justify-space-between">
              <v-btn variant="text" color="grey-darken-2" @click="selectUnit(1)" class="font-weight-bold">← La Suma</v-btn>
              <button class="btn-practica" @click="selectUnit(3)">Relaciones de Orden →</button>
            </div>
          </section>
        </transition>

        <!-- UNIDAD 4: SECUENCIAS NUMÉRICAS -->
        <transition name="fade-slide" mode="out-in">
          <section v-if="activeUnit === 3" key="u4" class="mb-10">
            <div class="section-label label-purple">
              {{ unidades[3].emoji }} Saltos de Rana (Secuencias)
            </div>

            <div class="section-box box-purple mb-6">
              <p class="box-title title-purple">Contar saltando</p>
              <p class="box-body">A veces no necesitamos contar de uno en uno. ¡Podemos dar saltos largos para contar más rápido!</p>
              
              <v-row>
                <v-col cols="12" md="4" v-for="(sec, i) in secuenciasDatos" :key="i">
                  <v-card class="rounded-3xl pa-6 kid-card h-100 text-center bg-purple-lighten-5" elevation="0">
                    <p class="text-h2 font-weight-black text-purple-darken-4 mb-2">{{ sec.salto }}</p>
                    <p class="font-weight-bold text-h6 text-purple-darken-3 mb-2">{{ sec.titulo }}</p>
                    <div class="d-flex justify-center align-center gap-1 flex-wrap">
                      <template v-for="(num, j) in sec.numeros" :key="j">
                        <v-chip :color="sec.color" size="large" class="font-weight-black">{{ num }}</v-chip>
                        <span v-if="j < sec.numeros.length - 1" class="font-weight-bold">→</span>
                      </template>
                    </div>
                  </v-card>
                </v-col>
              </v-row>
            </div>

            <div class="section-box box-teal mb-6">
              <div class="d-flex gap-3 align-start">
                <span class="text-h4">🐸</span>
                <div>
                  <p class="box-title title-teal">El truco de la rana</p>
                  <p class="box-body mb-0">Imagina una rana saltando sobre las rocas del río. Si la rana salta de 2 en 2, sólo pisa las rocas con números pares. ¡Intenta dibujar tu propia rana saltarina!</p>
                </div>
              </div>
            </div>

            <div class="divider-kids my-8">✦ ✦ ✦</div>
            <div class="d-flex flex-wrap gap-4 justify-space-between">
              <v-btn variant="text" color="grey-darken-2" @click="selectUnit(2)" class="font-weight-bold">← La Resta</v-btn>
              <button class="btn-practica" @click="selectUnit(4)">Retos Numéricos →</button>
            </div>
          </section>
        </transition>

        <!-- UNIDAD 5: RETOS NUMÉRICOS -->
        <transition name="fade-slide" mode="out-in">
          <section v-if="activeUnit === 4" key="u5" class="mb-10">
            <div class="section-label label-indigo">
              {{ unidades[4].emoji }} Pequeños Detectives
            </div>

            <div class="section-box box-indigo mb-6">
              <p class="box-title title-indigo">Los 3 pasos del Detective Matemático</p>
              <p class="box-body">Para resolver un problema, imagina que eres un detective buscando pistas.</p>
              <v-row>
                <v-col cols="12" sm="4" v-for="(paso, i) in pasosDetective" :key="i">
                  <v-card class="rounded-3xl pa-5 kid-card h-100 text-center" elevation="0">
                    <v-avatar color="#3949AB" class="text-white font-weight-bold mb-3" size="40">{{ i+1 }}</v-avatar>
                    <p class="kid-card-title title-indigo">{{ paso.titulo }}</p>
                    <p class="kid-card-body text-body-2">{{ paso.descripcion }}</p>
                  </v-card>
                </v-col>
              </v-row>
            </div>

            <div class="section-box box-blue mb-6">
              <p class="box-title title-blue">Resuelve los Retos Numéricos</p>
              <v-row>
                <v-col cols="12" md="6" v-for="(r, i) in retosRapidos" :key="i">
                  <v-card class="rounded-3xl pa-5 kid-card mb-4 text-center" elevation="0" style="border-top: 6px solid #1976D2;">
                    <p class="text-h3 mb-3">{{ r.emoji }}</p>
                    <p class="text-body-1 font-weight-bold mb-4">{{ r.pregunta }}</p>
                    <v-img :src="r.img" class="rounded-3xl mb-4" height="180" cover border></v-img>
                    <v-btn
                      v-if="!revealedAnswers[i]"
                      block
                      variant="tonal"
                      color="blue-darken-2"
                      class="rounded-xl font-weight-bold mt-2"
                      prepend-icon="mdi-eye"
                      @click="revealedAnswers[i] = true"
                    >
                      Ver Respuesta
                    </v-btn>
                    <v-expand-transition>
                      <div v-if="revealedAnswers[i]" class="mt-4 pa-3 rounded-xl bg-blue-lighten-5 border">
                        <div class="text-blue-darken-4 text-h6 font-weight-black">
                          {{ r.respuesta }}
                        </div>
                      </div>
                    </v-expand-transition>
                  </v-card>
                </v-col>
              </v-row>
            </div>

            <div class="divider-kids my-8">✦ ✦ ✦</div>
            <div class="d-flex justify-start">
              <v-btn variant="text" color="grey-darken-2" @click="selectUnit(3)" class="font-weight-bold">← Relaciones de Orden</v-btn>
            </div>
          </section>
        </transition>

        <div class="mt-6 mb-12 d-flex justify-center">
          <button class="btn-practica" @click="$router.push('/app/grado/1/actividades')">
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
const revealedAnswers = ref({})

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
  { titulo: 'Exploradores Numéricos', emoji: '🔢', color: '#1976D2', descripcion: 'Contar, agrupar e identificar números del 0 al 99' },
  { titulo: 'La Magia de Juntar',     emoji: '➕', color: '#2E7D32', descripcion: 'Estrategias visuales para sumar (juntar cantidades)' },
  { titulo: 'El Poder de Quitar',     emoji: '➖', color: '#D32F2F', descripcion: 'Estrategias visuales para restar (quitar cantidades)' },
  { titulo: 'Saltos de Rana',         emoji: '🐸', color: '#7B1FA2', descripcion: 'Secuencias numéricas de 2 en 2, 5 en 5 y 10 en 10' },
  { titulo: 'Pequeños Detectives',    emoji: '🔍', color: '#3949AB', descripcion: 'Resolución de problemas numéricos paso a paso' }
]

/* -- DATOS U1 -- */
const decenasDatos = ref([
  { grupo: '1 Unidad', emoji: '🍎', titulo: 'Uno solito', desc: 'Es una sola cosa. ¡Fácil de contar!' },
  { grupo: '1 Decena', emoji: '🧺', titulo: 'Grupo de 10', desc: 'Son 10 unidades juntas en una bolsita o canasta.' },
  { grupo: 'Conteo',   emoji: '🖐️🖐️', titulo: 'Contando de a 10', desc: '10, 20, 30, 40... ¡Llegamos más rápido al 100!' }
])
const trucosConteo = ref([
  { emoji:'👉', titulo:'Señalar', descripcion:'Toca cada objeto una vez mientras dices el número. ¡Así no te saltas ninguno!', secuencia:[1,2,3,4] },
  { emoji:'🎨', titulo:'Agrupar por color', descripcion:'Si hay muchas cosas, cuenta primero las rojas y luego las azules.', secuencia:['Rojas: 3','Azules: 2'] },
  { emoji:'🐰', titulo:'Saltos en la recta', descripcion:'Imagina que eres un conejito dando saltos en una línea de números.', secuencia:[2,4,6,8] }
])

/* -- DATOS U2 -- */
const estrategiasSuma = ref([
  { emoji:'🖐️', titulo:'Usa tus dedos', descripcion:'Pon el número más grande en tu cabeza y usa tus dedos para contar lo que falta.', ejemplo:'5 + 3 = 8' },
  { emoji:'👯', titulo:'Usa los dobles', descripcion:'Si sabes que 3+3=6, entonces 3+4 será uno más, ¡es decir 7!', ejemplo:'3 + 4 = 7' },
  { emoji:'📏', titulo:'La recta numérica', descripcion:'Avanza hacia la derecha para sumar.', ejemplo:'Avanza 2 pasos' }
])
const amigosDel10 = ref([
  { a:1, b:9 }, { a:2, b:8 }, { a:3, b:7 }, { a:4, b:6 }, { a:5, b:5 }, { a:0, b:10 }
])

/* -- DATOS U3 -- */
const estrategiasResta = ref([
  { emoji:'🙈', titulo:'Ocultar dedos', descripcion:'Pon el total en tus dedos y esconde los que vas a restar.', ejemplo:'10 - 4 = 6' },
  { emoji:'🎨', titulo:'Tachar dibujos', descripcion:'Dibuja la cantidad mayor y tacha los que debes quitar.', ejemplo:'X X O O O' },
  { emoji:'⏪', titulo:'Contar hacia atrás', descripcion:'Como un cohete. 8... 7... 6...', ejemplo:'Retrocede 2 pasos' }
])

/* -- DATOS U4 -- */
const secuenciasDatos = ref([
  { salto: '+2', titulo: 'De 2 en 2', numeros: [2, 4, 6, 8, 10], color: 'purple' },
  { salto: '+5', titulo: 'De 5 en 5', numeros: [5, 10, 15, 20, 25], color: 'blue' },
  { salto: '+10', titulo: 'De 10 en 10', numeros: [10, 20, 30, 40, 50], color: 'green' }
])

/* -- DATOS U5 -- */
const pasosDetective = ref([
  { titulo:'1. Busca los números', descripcion:'Lee o escucha la historia. ¿Cuáles son los números importantes?' },
  { titulo:'2. ¿Juntar o Quitar?', descripcion:'Si te dan más cosas, suma (+). Si te quitan o gastas, resta (-).' },
  { titulo:'3. Resuelve', descripcion:'Usa tus dedos, dibujos o la mente para hallar la respuesta.' }
])
const retosRapidos = ref([
  {
    emoji:'🐦',
    pregunta:'Había 5 pajaritos en un árbol. Llegaron 3 más. ¿Cuántos pajaritos hay ahora?',
    img:'https://images.unsplash.com/photo-1555169062-013468b47731?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    respuesta:'Juntamos: 5 + 3 = 8 pajaritos.'
  },
  {
    emoji:'🎈',
    pregunta:'Tenías 7 globos, pero se volaron 2. ¿Cuántos globos te quedan?',
    img:'https://images.unsplash.com/photo-1530103862676-de8892bf74f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    respuesta:'Quitamos: 7 - 2 = 5 globos.'
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
  /* Ya no hay padding lateral izquierdo porque no hay menú fijo */
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
.label-indigo { background: #3949AB; color: white; }

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
.box-indigo { border-color: #C5CAE9; }
.box-amber { border-color: #FFECB3; }

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
.title-indigo { color: #283593; }
.title-amber { color: #FF8F00; }

.box-body {
  font-size: 1.1rem;
  color: #455A64;
  margin-bottom: 24px;
}

/* KID CARDS (Estructura estándar modular) */
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
