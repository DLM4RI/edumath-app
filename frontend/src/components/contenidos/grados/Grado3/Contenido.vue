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
            <span class="grado-chip">GRADO 3° • MATEMÁTICAS</span>
          </div>
          <div class="header-centered">
            <h1 class="title-main">{{ unidades[activeUnit].titulo }}</h1>
            <p class="subtitle-hero">{{ unidades[activeUnit].descripcion }}</p>
          </div>
        </header>

        <transition name="fade-slide" mode="out-in">
          <section v-if="activeUnit === 0" key="u1" class="mb-10">

            <div class="section-label label-green">
              {{ unidades[0].emoji }} La Máquina de Sumas Rápidas
            </div>

            <v-row align="stretch" class="mb-6">
              <v-col cols="12" md="7">
                <v-card class="rounded-3xl overflow-hidden card-shadow" elevation="0" height="100%">
                  <div class="video-container bg-black">
                    <video controls class="w-100 h-100" preload="metadata">
                      <source :src="getVideoSrc(3, 1)" type="video/mp4" />
                      Tu navegador no soporta videos.
                    </video>
                  </div>
                </v-card>
              </v-col>

              <v-col cols="12" md="5">
                <v-card class="rounded-3xl pa-6 kid-card h-100 d-flex flex-column justify-center" style="border-color: #81C784; background: #E8F5E9;" elevation="0">
                  <span class="text-h2 mb-3">🤔</span>
                  <p class="kid-card-title title-green text-h5 mb-3">Pregunta para pensar</p>
                  <p class="kid-card-body text-body-1">¿Qué pasa si <em>duplicas</em> una fila del arreglo? Anota cuántas cajas hay en cada arreglo y busca la relación.</p>
                </v-card>
              </v-col>
            </v-row>

            <div class="section-box box-teal mb-6">
              <p class="box-title title-teal">Relaciones multiplicativas</p>
              <v-row>
                <v-col cols="12" sm="4" v-for="(f, i) in tablaUnidad1" :key="i">
                  <v-card class="rounded-3xl pa-5 kid-card h-100 text-center" elevation="0">
                    <span class="resultado-chip chip-teal mb-3">{{ f.relacion }}</span>
                    <p class="kid-card-body font-weight-bold mb-2">{{ f.ejemplo }}</p>
                    <p class="kid-card-body text-body-2 text-grey-darken-1">{{ f.razon }}</p>
                  </v-card>
                </v-col>
              </v-row>
            </div>

            <div class="section-box box-orange mb-6">
              <p class="box-title title-orange">Trucos para recordar las tablas</p>
              <v-row>
                <v-col cols="12" sm="6" md="4" v-for="(t, i) in trucosTablas" :key="i">
                  <v-card class="rounded-3xl pa-5 kid-card h-100" elevation="0">
                    <p class="kid-example-icon">{{ t.emoji }}</p>
                    <p class="kid-card-title title-orange">{{ t.titulo }}</p>
                    <p class="kid-card-body mb-4">{{ t.descripcion }}</p>
                    <span class="resultado-chip chip-orange">{{ t.ejemplo }}</span>
                  </v-card>
                </v-col>
              </v-row>
            </div>

            <v-row class="mb-6">
              <v-col cols="12" md="6">
                <div class="section-box box-blue h-100">
                  <p class="box-title title-blue">Propiedades</p>
                  <v-card v-for="(p, i) in propiedades" :key="i" class="rounded-xl pa-4 mb-3 border elevation-0">
                    <p class="font-weight-bold title-blue mb-1">{{ p.nombre }}</p>
                    <p class="text-body-2 mb-2">{{ p.explicacion }}</p>
                    <v-chip color="blue-darken-2" variant="flat">{{ p.ejemplo }}</v-chip>
                  </v-card>
                </div>
              </v-col>
              <v-col cols="12" md="6">
                <div class="section-box box-purple h-100">
                  <p class="box-title title-purple">¿Cómo multiplicamos por una cifra?</p>
                  <div v-for="(paso, i) in pasosMult" :key="i" class="d-flex align-center gap-3 mb-3 bg-white pa-3 rounded-xl border">
                    <v-avatar color="purple" class="text-white font-weight-bold" size="36">{{ i+1 }}</v-avatar>
                    <div>
                      <p class="font-weight-bold mb-0 text-body-1">{{ paso.titulo }}</p>
                      <p class="text-body-2 text-grey-darken-1 mb-0">{{ paso.descripcion }}</p>
                    </div>
                  </div>
                </div>
              </v-col>
            </v-row>

            <div class="section-box box-indigo mb-6">
              <p class="box-title title-indigo">Ejemplo resuelto: 34 × 6</p>
              <v-row align="center">
                <v-col cols="12" sm="6">
                  <v-card class="rounded-3xl pa-6 chalkboard h-100 d-flex flex-column justify-center" elevation="0">
                    <div class="chalk-line chalk-num">3 4</div>
                    <div class="chalk-line chalk-op">× &nbsp; 6</div>
                    <div class="chalk-sep"></div>
                    <div class="chalk-note text-left">6 × 4 = 24 → escribo 4, llevo 2</div>
                    <div class="chalk-note text-left">6 × 3 = 18 + 2 (llevada) = 20</div>
                    <div class="chalk-sep"></div>
                    <div class="chalk-result"><v-chip color="green" size="large" variant="flat" class="text-h6 px-6">= 204</v-chip></div>
                  </v-card>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-card class="rounded-3xl pa-6 kid-card h-100" elevation="0">
                    <p class="font-weight-bold text-h6 mb-3">También con propiedad distributiva:</p>
                    <p class="text-body-1 mb-1">34 = 30 + 4</p>
                    <p class="text-body-1 mb-1">6 × 30 = 180</p>
                    <p class="text-body-1 mb-3">6 × 4 = 24</p>
                    <p class="text-h6 font-weight-bold text-green-darken-3 mb-4">180 + 24 = 204 ✓</p>
                    <p class="text-body-2 text-grey">¡Dos caminos, el mismo resultado!</p>
                  </v-card>
                </v-col>
              </v-row>
            </div>

            <div class="section-box box-amber mb-6">
              <p class="box-title title-amber">Situaciones problema</p>
              <v-row>
                <v-col cols="12" sm="6" md="4" v-for="(pr, i) in problemasMultiplicacion" :key="i">
                  <v-card class="rounded-3xl pa-5 kid-card h-100" elevation="0">
                    <p class="kid-example-icon">{{ pr.emoji }}</p>
                    <p class="kid-card-body font-weight-bold mb-3">{{ pr.enunciado }}</p>
                    <p class="text-body-2 mb-3 text-grey-darken-2">Operación: <strong>{{ pr.operacion }}</strong></p>
                    <span class="resultado-chip chip-amber">R: {{ pr.resultado }}</span>
                  </v-card>
                </v-col>
              </v-row>
            </div>

            <div class="section-box box-green">
              <div class="d-flex gap-3 align-start">
                <span class="text-h4">💡</span>
                <div>
                  <p class="box-title title-green">¿Sabías esto?</p>
                  <p class="box-body mb-0">Las tablas de multiplicar están conectadas. La tabla del 6 es el doble de la del 3, y la del 9 es el triple. ¡Si conoces unas, ya casi sabes las demás!</p>
                </div>
              </div>
            </div>

            <div class="divider-kids my-8">✦ ✦ ✦</div>
            <div class="d-flex justify-end">
              <button class="btn-practica" @click="selectUnit(1)">Siguiente: Patrones →</button>
            </div>
          </section>
        </transition>

        <transition name="fade-slide" mode="out-in">
          <section v-if="activeUnit === 1" key="u2" class="mb-10">

            <div class="section-label label-teal">
              {{ unidades[1].emoji }} Detectives de Números
            </div>

            <v-row align="stretch" class="mb-6">
              <v-col cols="12" md="5" order="2" order-md="1">
                <div class="section-box box-cyan h-100">
                  <p class="box-title title-teal">¿Cómo descubro la regla?</p>
                  <div v-for="(paso, i) in pasosPatron" :key="i" class="d-flex align-center gap-3 mb-3 bg-white pa-3 rounded-xl border">
                    <v-avatar color="teal-darken-2" class="text-white font-weight-bold" size="36">{{ i+1 }}</v-avatar>
                    <div>
                      <p class="font-weight-bold mb-0 text-body-1">{{ paso.titulo }}</p>
                      <p class="text-body-2 text-grey-darken-1 mb-0">{{ paso.descripcion }}</p>
                    </div>
                  </div>
                </div>
              </v-col>
              <v-col cols="12" md="7" order="1" order-md="2">
                <v-card class="rounded-3xl overflow-hidden card-shadow" elevation="0" height="100%">
                  <div class="video-container bg-black">
                    <video controls class="w-100 h-100" preload="metadata">
                      <source :src="getVideoSrc(3, 2)" type="video/mp4" />
                    </video>
                  </div>
                </v-card>
              </v-col>
            </v-row>

            <v-row class="mb-6">
              <v-col cols="12" sm="6">
                <v-card class="rounded-3xl pa-6 kid-card h-100" style="border-color: #80CBC4; background: #E0F2F1;" elevation="0">
                  <p class="kid-card-title title-teal mb-4">Patrón que suma</p>
                  <div class="d-flex flex-wrap gap-2 mb-4">
                    <v-chip v-for="n in [2,5,8,11,14]" :key="n" color="teal-darken-2" variant="flat" size="large">{{ n }}</v-chip>
                  </div>
                  <p class="kid-card-body text-body-1">Regla: <strong>+ 3</strong> cada vez</p>
                </v-card>
              </v-col>
              <v-col cols="12" sm="6">
                <v-card class="rounded-3xl pa-6 kid-card h-100" style="border-color: #FFCC80; background: #FFF3E0;" elevation="0">
                  <p class="kid-card-title title-orange mb-4">Patrón que multiplica</p>
                  <div class="d-flex flex-wrap gap-2 mb-4">
                    <v-chip v-for="n in [2,4,8,16,32]" :key="n" color="orange-darken-3" variant="flat" size="large">{{ n }}</v-chip>
                  </div>
                  <p class="kid-card-body text-body-1">Regla: <strong>× 2</strong> cada vez</p>
                </v-card>
              </v-col>
            </v-row>

            <div class="section-box box-indigo mb-6">
              <p class="box-title title-indigo">¡Encuentra el número que falta!</p>
              <v-row>
                <v-col cols="12" sm="6" md="3" v-for="(sec, i) in secuenciasEjemplo" :key="i">
                  <v-card class="rounded-3xl pa-5 kid-card text-center h-100" elevation="0">
                    <p class="text-overline text-indigo font-weight-bold mb-3">Secuencia {{ i+1 }}</p>
                    <div class="d-flex justify-center flex-wrap gap-1 mb-4">
                      <v-chip v-for="(n, j) in sec.numeros" :key="j" :color="n === '?' ? 'orange' : 'indigo-lighten-4'" :class="n === '?' ? 'text-white' : 'text-indigo-darken-4'" variant="flat">
                        {{ n }}
                      </v-chip>
                    </div>
                    <p class="kid-card-body text-body-2 mb-1">Regla: <strong>{{ sec.regla }}</strong></p>
                    <p class="kid-card-body text-green-darken-3 font-weight-bold">Falta: {{ sec.faltante }}</p>
                  </v-card>
                </v-col>
              </v-row>
            </div>

            <div class="section-box box-blue mb-6">
              <p class="box-title title-blue">Patrones en la tabla del 100</p>
              <v-row>
                <v-col cols="12" sm="4" v-for="(pat, i) in patronesTabla100" :key="i">
                  <v-card class="rounded-3xl pa-5 kid-card h-100 text-center" elevation="0">
                    <div class="text-h3 mb-2">{{ pat.emoji }}</div>
                    <p class="kid-card-title title-blue">{{ pat.titulo }}</p>
                    <p class="text-body-2 mb-3">{{ pat.descripcion }}</p>
                    <div class="d-flex justify-center flex-wrap gap-1">
                      <v-chip v-for="n in pat.numeros" :key="n" color="blue" size="small">{{ n }}</v-chip>
                    </div>
                  </v-card>
                </v-col>
              </v-row>
            </div>

            <div class="section-box box-purple mb-6">
              <p class="box-title title-purple">Los patrones están en todas partes</p>
              <v-row>
                <v-col cols="12" sm="4" v-for="(ej, i) in patronesVida" :key="i">
                  <v-card class="rounded-3xl pa-5 kid-card h-100 text-center" elevation="0">
                    <p class="kid-example-icon">{{ ej.emoji }}</p>
                    <p class="kid-card-title title-purple">{{ ej.lugar }}</p>
                    <p class="text-body-2 mb-0">{{ ej.descripcion }}</p>
                  </v-card>
                </v-col>
              </v-row>
            </div>

            <div class="section-box box-amber">
              <div class="d-flex gap-3 align-start">
                <span class="text-h4">💡</span>
                <div>
                  <p class="box-title title-amber">¿Sabías esto?</p>
                  <p class="box-body mb-0">Los patrones están en la música, en la naturaleza (pétalos de flores) y en las ciudades. Cuando encuentras la regla, puedes predecir cualquier número.</p>
                </div>
              </div>
            </div>

            <div class="divider-kids my-8">✦ ✦ ✦</div>
            <div class="d-flex flex-wrap gap-4 justify-space-between">
              <v-btn variant="text" color="grey-darken-2" @click="selectUnit(0)" class="font-weight-bold">← Multiplicación</v-btn>
              <button class="btn-practica" @click="selectUnit(2)">Números Grandes →</button>
            </div>
          </section>
        </transition>

        <transition name="fade-slide" mode="out-in">
          <section v-if="activeUnit === 2" key="u3" class="mb-10">

            <div class="section-label label-blue">
              {{ unidades[2].emoji }} Arquitectos de Números
            </div>

            <div class="section-box box-blue mb-6">
              <p class="box-title title-blue">¿Cómo se construye un número grande?</p>
              <p class="box-body">Cada número ocupa un lugar especial. ¡Ese lugar le da su valor posicional!</p>
              <v-row justify="center">
                <v-col cols="12" sm="6" md="3" v-for="(nivel, i) in valorPosicional" :key="i">
                  <v-card class="rounded-3xl pa-5 text-center kid-card h-100" elevation="0">
                    <div class="posicion-icon">{{ nivel.icono }}</div>
                    <p class="kid-card-title title-blue">{{ nivel.nombre }}</p>
                    <p class="kid-card-body mb-3 text-body-2">{{ nivel.descripcion }}</p>
                    <span class="resultado-chip chip-blue">{{ nivel.ejemplo }}</span>
                  </v-card>
                </v-col>
              </v-row>
            </div>

            <div class="section-box box-indigo mb-6">
              <p class="box-title title-indigo">Descomposición por valor posicional</p>
              <div class="table-wrap">
                <table class="data-table">
                  <thead>
                    <tr class="bg-indigo-darken-3 text-white">
                      <th class="pa-3 text-center">Número</th>
                      <th class="pa-3 text-center">Millares</th>
                      <th class="pa-3 text-center">Centenas</th>
                      <th class="pa-3 text-center">Decenas</th>
                      <th class="pa-3 text-center">Unidades</th>
                      <th class="pa-3 text-left">Descomposición</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(f, i) in descomposicionNumeros" :key="i" class="border-bottom">
                      <td class="pa-3 text-center font-weight-black text-h6">{{ f.numero }}</td>
                      <td class="pa-3 text-center">{{ f.m }}</td>
                      <td class="pa-3 text-center">{{ f.c }}</td>
                      <td class="pa-3 text-center">{{ f.d }}</td>
                      <td class="pa-3 text-center">{{ f.u }}</td>
                      <td class="pa-3 text-left text-grey-darken-1" style="min-width: 180px;">{{ f.desc }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <v-row class="mb-6">
              <v-col cols="12" md="6">
                <div class="section-box box-green h-100">
                  <p class="box-title title-green">Comparamos números</p>
                  <p class="text-body-2 mb-4">Compara de izquierda a derecha (primero millares, luego centenas...).</p>
                  <div v-for="(comp, i) in ejemplosComparacion" :key="i" class="d-flex align-center justify-space-between mb-3 bg-white pa-3 rounded-xl border">
                    <span class="resultado-chip chip-green numero-grande">{{ comp.a }}</span>
                    <span class="text-h4 font-weight-black" :class="comp.colorClase">{{ comp.signo }}</span>
                    <span class="resultado-chip chip-green numero-grande">{{ comp.b }}</span>
                  </div>
                  <p class="text-center text-body-2 mt-2 text-grey-darken-1">El cocodrilo siempre se come al más grande (&gt;).</p>
                </div>
              </v-col>
              <v-col cols="12" md="6">
                <div class="section-box box-orange h-100">
                  <p class="box-title title-orange">Números Romanos & Ordinales</p>
                  <p class="text-body-2 mb-3">¡Formas diferentes de representar posiciones e historia!</p>
                  
                  <p class="font-weight-bold text-body-2 text-orange-darken-3 mb-1">Ordinales (Posición):</p>
                  <div class="d-flex flex-wrap gap-2 mb-4">
                    <v-chip v-for="ord in ordinales" :key="ord" color="orange-darken-4" variant="flat">{{ ord }}</v-chip>
                  </div>

                  <p class="font-weight-bold text-body-2 text-orange-darken-3 mb-1">Romanos:</p>
                  <v-card class="pa-4 rounded-xl border elevation-0 d-flex flex-wrap gap-4 justify-center">
                    <div v-for="r in numerosRomanos" :key="r.n1" class="text-center">
                      <span class="text-h5 font-weight-black text-red-darken-4">{{ r.r1 }}</span><br>
                      <span class="text-body-2 text-grey-darken-2">= {{ r.n1 }}</span>
                    </div>
                  </v-card>
                </div>
              </v-col>
            </v-row>

            <div class="section-box box-teal mb-6">
              <p class="box-title title-teal">Números en la vida real</p>
              <v-row>
                <v-col cols="12" sm="4" v-for="(ej, i) in numerosGrandes" :key="i">
                  <v-card class="rounded-3xl pa-5 kid-card h-100 text-center" elevation="0">
                    <p class="kid-example-icon">{{ ej.emoji }}</p>
                    <p class="text-body-2 mb-2">{{ ej.contexto }}</p>
                    <span class="resultado-chip chip-teal numero-grande mb-2">{{ ej.numero }}</span>
                    <p class="text-caption text-grey-darken-1 mb-0">{{ ej.lectura }}</p>
                  </v-card>
                </v-col>
              </v-row>
            </div>

            <div class="divider-kids my-8">✦ ✦ ✦</div>
            <div class="d-flex flex-wrap gap-4 justify-space-between">
              <v-btn variant="text" color="grey-darken-2" @click="selectUnit(1)" class="font-weight-bold">← Patrones</v-btn>
              <button class="btn-practica" @click="selectUnit(3)">Fracciones →</button>
            </div>
          </section>
        </transition>

        <transition name="fade-slide" mode="out-in">
          <section v-if="activeUnit === 3" key="u4" class="mb-10">

            <div class="section-label label-orange">
              {{ unidades[3].emoji }} Cortando en partes iguales
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
                <v-card class="rounded-3xl pa-6 kid-card h-100 d-flex flex-column justify-center" style="border-color: #FFAB91; background: #FBE9E7;" elevation="0">
                  <p class="kid-card-title title-orange text-center text-h5 mb-6">¿Qué es una fracción?</p>
                  <p class="text-center text-body-1 mb-4">Es una <em>parte de un todo</em>.</p>
                  <div class="d-flex justify-center align-center gap-6">
                    <div class="d-flex flex-column align-center">
                      <span class="text-h2 font-weight-black text-deep-orange-darken-3">3</span>
                      <div style="width: 60px; height: 6px; background: #D84315; border-radius: 4px; margin: 4px 0;"></div>
                      <span class="text-h2 font-weight-black text-deep-orange-darken-3">4</span>
                    </div>
                    <div class="text-body-2 text-grey-darken-3">
                      <p class="mb-2"><strong class="text-deep-orange-darken-3">3</strong> Numerador<br>(partes que tomamos)</p>
                      <p class="mb-0"><strong class="text-deep-orange-darken-3">4</strong> Denominador<br>(partes totales)</p>
                    </div>
                  </div>
                </v-card>
              </v-col>
            </v-row>

            <v-row class="mb-6">
              <v-col cols="12" md="4">
                <div class="table-wrap h-100 border rounded-xl overflow-hidden">
                  <table class="data-table">
                    <thead>
                      <tr class="bg-deep-orange-darken-1 text-white">
                        <th class="pa-3 text-center">Fracción</th>
                        <th class="pa-3 text-left">Se lee</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(f, i) in tablaFracciones" :key="i" class="border-bottom">
                        <td class="pa-3 text-center font-weight-black text-h6 text-deep-orange-darken-3">{{ f.fraccion }}</td>
                        <td class="pa-3 text-left text-body-2" style="min-width: 140px;">{{ f.lectura }}<br><span class="text-caption text-grey">{{ f.significado }}</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </v-col>
              <v-col cols="12" md="8">
                <div class="section-box box-orange h-100">
                  <p class="box-title title-orange">Fracciones cotidianas</p>
                  <v-row>
                    <v-col cols="12" sm="6" v-for="(ej, i) in fraccionesVida" :key="i">
                      <v-card class="rounded-3xl pa-4 kid-card h-100 text-center" elevation="0">
                        <p class="kid-example-icon">{{ ej.emoji }}</p>
                        <p class="kid-card-title title-orange">{{ ej.titulo }}</p>
                        <p class="kid-card-body text-body-2 mb-3">{{ ej.descripcion }}</p>
                        <v-chip color="deep-orange" variant="flat" size="large" class="font-weight-bold">{{ ej.fraccion }}</v-chip>
                      </v-card>
                    </v-col>
                  </v-row>
                </div>
              </v-col>
            </v-row>

            <div class="section-box box-green mb-6">
              <p class="box-title title-green">Fracciones Equivalentes</p>
              <p class="box-body">Representan la misma cantidad, aunque se escriban diferente.</p>
              <v-row>
                <v-col cols="12" sm="6" md="4" v-for="(eq, i) in fraccionesEquivalentes" :key="i">
                  <v-card class="rounded-3xl pa-5 kid-card h-100 text-center" elevation="0">
                    <div class="d-flex align-center justify-center gap-3 mb-3">
                      <div class="d-flex flex-column align-center font-weight-black text-h5 text-green-darken-3">
                        <span>{{ eq.n1 }}</span><div style="width: 30px; height: 3px; background: currentColor; margin: 2px 0;"></div><span>{{ eq.d1 }}</span>
                      </div>
                      <span class="text-h4 font-weight-black text-green-darken-3">=</span>
                      <div class="d-flex flex-column align-center font-weight-black text-h5 text-green-darken-3">
                        <span>{{ eq.n2 }}</span><div style="width: 30px; height: 3px; background: currentColor; margin: 2px 0;"></div><span>{{ eq.d2 }}</span>
                      </div>
                    </div>
                    <p class="text-body-2 text-grey-darken-2 mb-0">{{ eq.explicacion }}</p>
                  </v-card>
                </v-col>
              </v-row>
            </div>

            <div class="section-box box-amber">
              <p class="box-title title-amber">¿Cuál fracción es mayor? (Truco de la Pizza 🍕)</p>
              <v-row align="center">
                <v-col cols="12" md="6">
                  <v-card class="rounded-3xl pa-5 kid-card h-100" elevation="0">
                    <p class="text-body-1 mb-2">Si la pizza se divide en 8 partes (mismo denominador):</p>
                    <p class="text-body-1 mb-3">Recibir <strong>5/8</strong> es mejor que recibir <strong>3/8</strong>, porque te dan más pedazos del mismo tamaño.</p>
                    <div class="d-flex justify-center my-3">
                      <v-chip color="orange-darken-3" variant="flat" size="x-large" class="font-weight-black px-6">5/8 &gt; 3/8</v-chip>
                    </div>
                  </v-card>
                </v-col>
                <v-col cols="12" md="6">
                  <div v-for="(comp, i) in comparacionFracciones" :key="i" class="d-flex align-center justify-space-between mb-3 bg-white pa-4 rounded-xl border">
                    <span class="resultado-chip chip-amber numero-grande">{{ comp.f1 }}</span>
                    <span class="text-h4 font-weight-black text-orange-darken-3">{{ comp.signo }}</span>
                    <span class="resultado-chip chip-amber numero-grande">{{ comp.f2 }}</span>
                  </div>
                  <p class="text-center text-body-2 mt-2 text-grey-darken-1">Mismo denominador → ¡Solo mira el numerador!</p>
                </v-col>
              </v-row>
            </div>

            <div class="divider-kids my-8">✦ ✦ ✦</div>
            <div class="d-flex flex-wrap gap-4 justify-space-between">
              <v-btn variant="text" color="grey-darken-2" @click="selectUnit(2)" class="font-weight-bold">← Números Grandes</v-btn>
              <button class="btn-practica" @click="selectUnit(4)">Resolución de Problemas →</button>
            </div>
          </section>
        </transition>

        <transition name="fade-slide" mode="out-in">
          <section v-if="activeUnit === 4" key="u5" class="mb-10">

            <div class="section-label label-purple">
              {{ unidades[4].emoji }} ¡Desafíos Mentales!
            </div>

            <div class="section-box box-purple mb-6">
              <p class="box-title title-purple">Los 4 pasos mágicos (Método Pólya)</p>
              <p class="box-body">¡Aprende este método y ningún problema te ganará!</p>
              <v-row>
                <v-col cols="12" sm="6" md="3" v-for="(paso, i) in pasosPolya" :key="i">
                  <v-card class="rounded-3xl pa-5 kid-card h-100 text-center" elevation="0">
                    <v-avatar color="#7B1FA2" class="text-white font-weight-bold mb-3" size="40">{{ i+1 }}</v-avatar>
                    <p class="kid-card-title title-purple">{{ paso.titulo }}</p>
                    <p class="kid-card-body text-body-2 mb-4">{{ paso.descripcion }}</p>
                    <v-chip color="purple-darken-2" variant="tonal" size="small">{{ paso.pregunta }}</v-chip>
                  </v-card>
                </v-col>
              </v-row>
            </div>

            <v-row class="mb-6">
              <v-col cols="12" md="7">
                <div class="section-box box-indigo h-100">
                  <p class="box-title title-indigo">Problema resuelto paso a paso</p>
                  <v-card v-for="(prob, i) in problemasResueltos" :key="i" class="rounded-3xl pa-5 kid-card h-100" elevation="0" style="border-top: 6px solid #3949AB;">
                    <div class="d-flex align-center gap-3 mb-4">
                      <span class="text-h3">{{ prob.emoji }}</span>
                      <p class="kid-card-title title-indigo mb-0 text-h6">{{ prob.titulo }}</p>
                    </div>
                    <div class="bg-indigo-lighten-5 pa-4 rounded-xl mb-4 border">
                      <p class="font-weight-bold mb-0 text-indigo-darken-4">{{ prob.enunciado }}</p>
                    </div>
                    <div v-for="(paso, j) in prob.pasos" :key="j" class="d-flex align-start gap-2 mb-2">
                      <v-avatar color="indigo" class="text-white mt-1" size="24" style="font-size: 0.8rem; font-weight: bold;">{{ j+1 }}</v-avatar>
                      <p class="text-body-2 mb-0 mt-1">{{ paso }}</p>
                    </div>
                    <div class="mt-4 text-center">
                      <span class="resultado-chip chip-indigo px-6">R: {{ prob.respuesta }}</span>
                    </div>
                  </v-card>
                </div>
              </v-col>
              
              <v-col cols="12" md="5">
                <div class="section-box box-teal h-100">
                  <p class="box-title title-teal">Cálculo mental: ¡Calcula sin lápiz!</p>
                  <p class="box-body">Estrategias para ser más veloz.</p>
                  <v-row>
                    <v-col cols="12" v-for="(est, i) in estrategiasCalculo" :key="i">
                      <v-card class="rounded-3xl pa-4 kid-card" elevation="0">
                        <div class="d-flex align-center gap-2 mb-2">
                          <span class="text-h5">{{ est.emoji }}</span>
                          <p class="kid-card-title title-teal mb-0">{{ est.titulo }}</p>
                        </div>
                        <p class="kid-card-body text-body-2 mb-3">{{ est.descripcion }}</p>
                        <div class="d-flex flex-wrap gap-2">
                           <v-chip v-for="ej in est.ejemplos" :key="ej" color="teal-darken-3" variant="flat" size="small">{{ ej }}</v-chip>
                        </div>
                      </v-card>
                    </v-col>
                  </v-row>
                </div>
              </v-col>
            </v-row>

            <div class="divider-kids my-8">✦ ✦ ✦</div>
            <div class="d-flex justify-start">
              <v-btn variant="text" color="grey-darken-2" @click="selectUnit(3)" class="font-weight-bold">← Fracciones</v-btn>
            </div>
          </section>
        </transition>

        <div class="mt-6 mb-12 d-flex justify-center">
          <button class="btn-practica" @click="$router.push('/app/grado/3/actividades')">
            ¡A Practicar Misiones! 🚀
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
  { titulo: 'Multiplicación',          emoji: '✖️', color: '#2E7D32', descripcion: 'Tablas, propiedades y trucos para multiplicar' },
  { titulo: 'Patrones',                emoji: '🔍', color: '#00796B', descripcion: 'Secuencias, reglas y patrones numéricos' },
  { titulo: 'Números Grandes',         emoji: '🔢', color: '#1565C0', descripcion: 'Valor posicional, comparación y números hasta 9.999' },
  { titulo: 'Fracciones',              emoji: '🍕', color: '#E64A19', descripcion: 'Partes de un todo, equivalencias y comparación' },
  { titulo: 'Resolución de Problemas', emoji: '🧩', color: '#7B1FA2', descripcion: 'Método Pólya y estrategias de cálculo mental' }
]

/* ── DATOS U1 ── */
const tablaUnidad1 = ref([
  { relacion: 'Doble', ejemplo: 'Tabla del 6 = 2 × tabla del 3', razon: 'Cada producto se duplica' },
  { relacion: 'Triple', ejemplo: 'Tabla del 9 = 3 × tabla del 3', razon: 'Cada producto se triplica' },
  { relacion: 'Mitad', ejemplo: 'Tabla del 4 = ½ × tabla del 8', razon: 'Cada producto se divide en 2' },
])
const trucosTablas = ref([
  { emoji:'✌️', titulo:'Tabla del 2', descripcion:'Multiplicar por 2 es sumar el número dos veces. ¡Es el doble!', ejemplo:'2 × 7 = 14' },
  { emoji:'✋', titulo:'Tabla del 5', descripcion:'Los resultados siempre terminan en 0 o 5. Cuenta de 5 en 5.', ejemplo:'5, 10, 15...' },
  { emoji:'🔟', titulo:'Tabla del 10', descripcion:'Solo agrega un cero al final del número.', ejemplo:'10 × 6 = 60' },
  { emoji:'🔄', titulo:'Tabla del 9', descripcion:'Multiplica por 10 y quita el número original.', ejemplo:'9 × 7 = 63' },
  { emoji:'🪞', titulo:'Conmutativa', descripcion:'Si ya sabes 3 × 8, ya sabes 8 × 3. ¡Solo las volteas!', ejemplo:'3 × 8 = 24' },
  { emoji:'✂️', titulo:'Descomponer', descripcion:'Descompone un factor en partes más fáciles.', ejemplo:'7 × 6 = 42' },
])
const propiedades = ref([
  { nombre:'Conmutativa', explicacion:'El orden de los factores no cambia el producto.', ejemplo:'4 × 6 = 6 × 4 = 24' },
  { nombre:'Asociativa', explicacion:'Podemos agrupar los factores de distinta forma.', ejemplo:'(2×3)×4 = 2×(3×4) = 24' },
  { nombre:'Distributiva', explicacion:'Podemos descomponer un factor para calcular más fácil.', ejemplo:'6×7 = 6×5 + 6×2 = 42' },
])
const pasosMult = ref([
  { titulo:'Escribe los números', descripcion:'Coloca unidades bajo unidades y decenas bajo decenas.' },
  { titulo:'Multiplica las unidades', descripcion:'Multiplica el dígito de abajo por las unidades del número de arriba.' },
  { titulo:'Multiplica las decenas', descripcion:'Ahora multiplica por las decenas. Si hay "llevada", súmala.' },
  { titulo:'Escribe el resultado', descripcion:'Suma los resultados parciales para obtener el producto final.' },
])
const problemasMultiplicacion = ref([
  { emoji:'🍊', enunciado:'En la finca hay 6 naranjos. Cada uno tiene 48 naranjas. ¿Cuántas naranjas hay en total?', operacion:'6 × 48', resultado:'288 naranjas' },
  { emoji:'📚', enunciado:'La biblioteca recibió 9 cajas con 35 libros cada una. ¿Cuántos libros llegaron?', operacion:'9 × 35', resultado:'315 libros' },
  { emoji:'🚌', enunciado:'Hay 7 buses y cada uno lleva 42 estudiantes. ¿Cuántos estudiantes viajan?', operacion:'7 × 42', resultado:'294 estudiantes' },
])

/* ── DATOS U2 ── */
const pasosPatron = ref([
  { titulo:'Observa la secuencia', descripcion:'Mira bien todos los números o figuras en orden.' },
  { titulo:'Encuentra la diferencia', descripcion:'Compara cada término con el siguiente: ¿sumas, restas o multiplicas siempre lo mismo?' },
  { titulo:'Escribe la regla', descripcion:'Anota la operación que se repite y úsala para predecir.' },
])
const secuenciasEjemplo = ref([
  { numeros:[3,6,9,'?',15], regla:'+ 3 cada vez', faltante:12 },
  { numeros:[100,90,80,'?',60], regla:'− 10 cada vez', faltante:70 },
  { numeros:[1,3,'?',27,81], regla:'× 3 cada vez', faltante:9 },
  { numeros:[50,45,40,35,'?'], regla:'− 5 cada vez', faltante:30 },
])
const patronesTabla100 = ref([
  { emoji:'🔵', titulo:'Múltiplos de 2', descripcion:'Todos terminan en 0, 2, 4, 6 u 8.', numeros:[2,4,6,8,10,12,14] },
  { emoji:'🟡', titulo:'Múltiplos de 5', descripcion:'Siempre terminan en 0 o 5.', numeros:[5,10,15,20,25,30] },
  { emoji:'🟣', titulo:'Múltiplos de 10', descripcion:'Siempre terminan en 0, la columna más fácil.', numeros:[10,20,30,40,50,60] },
])
const patronesVida = ref([
  { emoji:'🎵', lugar:'En la música', descripcion:'Los compases tienen un patrón rítmico que se repite en toda la canción.' },
  { emoji:'🌸', lugar:'En la naturaleza', descripcion:'Los pétalos de muchas flores siguen la secuencia 1, 1, 2, 3, 5, 8... ¡Se llama Fibonacci!' },
  { emoji:'🏙️', lugar:'En las ciudades', descripcion:'Las calles numeradas siguen patrones: pares a un lado, impares al otro.' },
])

/* ── DATOS U3 ── */
const valorPosicional = ref([
  { icono:'🔷', nombre:'Millares', descripcion:'Grupos de 1.000. Primera posición desde la izquierda.', ejemplo:'1.000' },
  { icono:'💯', nombre:'Centenas', descripcion:'Grupos de 100. Segunda posición.', ejemplo:'200' },
  { icono:'🔟', nombre:'Decenas', descripcion:'Grupos de 10. Tercera posición.', ejemplo:'30' },
  { icono:'1️⃣', nombre:'Unidades', descripcion:'Del 0 al 9. Última posición a la derecha.', ejemplo:'4' },
])
const descomposicionNumeros = ref([
  { numero:'3.472', m:3, c:4, d:7, u:2, desc:'3.000 + 400 + 70 + 2' },
  { numero:'5.908', m:5, c:9, d:0, u:8, desc:'5.000 + 900 + 0 + 8' },
  { numero:'1.060', m:1, c:0, d:6, u:0, desc:'1.000 + 0 + 60 + 0' },
  { numero:'7.315', m:7, c:3, d:1, u:5, desc:'7.000 + 300 + 10 + 5' },
])
const pasosComparacion = ref([
  { titulo:'Compara los millares', descripcion:'El número con más millares es mayor. Si son iguales, continúa.' },
  { titulo:'Compara las centenas', descripcion:'Si los millares son iguales, mira las centenas.' },
  { titulo:'Decenas y unidades', descripcion:'Sigue comparando cifra por cifra hasta encontrar diferencia.' },
])
const ejemplosComparacion = ref([
  { a:'4.520', signo:'>', b:'3.890', razon:'4 millares > 3 millares', colorClase:'text-green-darken-2' },
  { a:'2.316', signo:'<', b:'2.450', razon:'3 centenas < 4 centenas', colorClase:'text-blue-darken-2' },
  { a:'6.780', signo:'=', b:'6.780', razon:'Todas las cifras son iguales', colorClase:'text-orange-darken-2' },
])
const numerosGrandes = ref([
  { emoji:'🏟️', contexto:'Un estadio de fútbol tiene esta capacidad:', numero:'4.800', lectura:'Cuatro mil ochocientos' },
  { emoji:'📖', contexto:'Un libro de cuentos tiene esta cantidad de palabras:', numero:'2.356', lectura:'Dos mil trescientas cincuenta y seis' },
  { emoji:'🌳', contexto:'Un parque nacional tiene esta cantidad de árboles:', numero:'9.120', lectura:'Nueve mil ciento veinte' },
])
const ordinales = ref(['1° primero','2° segundo','3° tercero','4° cuarto','5° quinto','6° sexto','7° séptimo','8° octavo','9° noveno','10° décimo'])
const numerosRomanos = ref([
  { n1:1, r1:'I' }, { n1:2, r1:'II' }, { n1:3, r1:'III' }, { n1:4, r1:'IV' }, { n1:5, r1:'V' }, { n1:10, r1:'X' }
])

/* ── DATOS U4 ── */
const tablaFracciones = ref([
  { fraccion:'1/2', lectura:'Un medio',       significado:'1 parte de 2 iguales' },
  { fraccion:'1/3', lectura:'Un tercio',      significado:'1 parte de 3 iguales' },
  { fraccion:'2/4', lectura:'Dos cuartos',    significado:'2 partes de 4 iguales' },
  { fraccion:'3/5', lectura:'Tres quintos',   significado:'3 partes de 5 iguales' },
  { fraccion:'4/8', lectura:'Cuatro octavos', significado:'4 partes de 8 iguales' },
])
const fraccionesVida = ref([
  { emoji:'🍕', titulo:'Pizza compartida', descripcion:'Si una pizza se corta en 8 partes iguales y te comes 3, comiste tres octavos.', fraccion:'3/8 de pizza' },
  { emoji:'🧃', titulo:'Jugo en vasos', descripcion:'Si llenas medio vaso de jugo, tienes 1 mitad. Si llenas 3 de 4 partes, tienes 3 cuartos.', fraccion:'1/2 o 3/4 vaso' },
  { emoji:'🎽', titulo:'El recreo', descripcion:'Si el recreo dura 30 minutos y ya pasaron 15, quedó la mitad del recreo.', fraccion:'1/2 del recreo' },
])
const fraccionesEquivalentes = ref([
  { n1:1, d1:2, n2:2, d2:4, explicacion:'La mitad es igual a dos cuartos. Representan la misma cantidad.' },
  { n1:1, d1:3, n2:2, d2:6, explicacion:'Un tercio equivale a dos sextos. Más partes, más pequeñas.' },
  { n1:2, d1:4, n2:4, d2:8, explicacion:'Dos cuartos son iguales a cuatro octavos.' },
])
const comparacionFracciones = ref([
  { f1:'5/8', signo:'>', f2:'3/8', razon:'5 > 3 partes del mismo tamaño', colorClase:'signo-mayor' },
  { f1:'2/7', signo:'<', f2:'6/7', razon:'2 < 6 partes del mismo tamaño', colorClase:'signo-menor' },
  { f1:'4/6', signo:'=', f2:'4/6', razon:'Mismo numerador y denominador', colorClase:'signo-igual' },
])

/* ── DATOS U5 ── */
const pasosPolya = ref([
  { titulo:'Comprendo', descripcion:'Leo el problema varias veces. Identifico qué me piden y qué datos tengo.', pregunta:'¿Qué me piden?' },
  { titulo:'Planifico', descripcion:'Decido qué operación o estrategia voy a usar para resolver el problema.', pregunta:'¿Qué hago primero?' },
  { titulo:'Ejecuto', descripcion:'Realizo los cálculos necesarios paso a paso, con cuidado y orden.', pregunta:'¡Manos a la obra!' },
  { titulo:'Verifico', descripcion:'Reviso si mi respuesta tiene sentido y si responde lo que me pedían.', pregunta:'¿Tiene sentido?' },
])
const problemasResueltos = ref([
  {
    emoji:'🌽',
    titulo:'Problema de multiplicación',
    enunciado:'En el mercado hay 8 puestos y cada uno vende 45 mazorcas por día. ¿Cuántas mazorcas se venden en total?',
    pasos:[
      'Comprendo: tengo 8 puestos con 45 mazorcas cada uno. Me piden el total.',
      'Planifico: como todas las cantidades son iguales, uso la multiplicación.',
      'Ejecuto: 8 × 45 = 8 × 40 + 8 × 5 = 320 + 40 = 360.',
      'Verifico: 360 ÷ 8 = 45 ✓ Tiene sentido.',
    ],
    respuesta:'360 mazorcas en total'
  },
  {
    emoji:'🏫',
    titulo:'Problema con números grandes',
    enunciado:'Una escuela tiene 1.250 estudiantes. Otra tiene 2.340. ¿Cuántos estudiantes hay entre las dos?',
    pasos:[
      'Comprendo: tengo dos cantidades de estudiantes. Me piden el total de ambas.',
      'Planifico: como junto dos grupos, uso la suma.',
      'Ejecuto: 1.250 + 2.340 = 3.590.',
      'Verifico: 3.590 − 2.340 = 1.250 ✓ Correcto.',
    ],
    respuesta:'3.590 estudiantes en total'
  },
])
const estrategiasCalculo = ref([
  { emoji:'🎯', titulo:'Redondear y ajustar', descripcion:'Redondea al número más fácil y luego ajusta.', ejemplos:['29 × 4 → 30×4=120 → 120−4=116'] },
  { emoji:'✂️', titulo:'Descomposición', descripcion:'Parte los números en decenas y unidades para calcular por separado.', ejemplos:['23 + 45 = 20+40 + 3+5 = 68'] },
  { emoji:'🔄', titulo:'Dobles y mitades', descripcion:'Si un factor es par, divídelo y luego duplica el resultado.', ejemplos:['6 × 8 = 3×8=24 → ×2 = 48'] },
])
</script>

<style scoped>
/* ═══════════════════════════════════════════════
   ESTILOS BASE
═══════════════════════════════════════════════ */
:root {
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 18px;
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

.grade-wrapper {
  font-family: 'Nunito', 'Trebuchet MS', system-ui, sans-serif;
  font-size: 16px;
  line-height: 1.7;
  background: transparent;
  min-height: 100vh;
  overflow-x: hidden;
  position: relative;
}

/* ═══════════════════════════════════════════════
   OVERLAY TRANSLÚCIDO
═══════════════════════════════════════════════ */
.nav-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.65);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
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

/* ═══════════════════════════════════════════════
   CONTENEDOR DEL MENÚ INVISIBLE
═══════════════════════════════════════════════ */
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

/* ═══════════════════════════════════════════════
   BOTONES Y ALINEACIÓN (Estáticos, sin movimientos extraños)
═══════════════════════════════════════════════ */
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
  
  /* ESTADO CERRADO */
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s ease;
}

/* ESTADO ABIERTO */
.menu-open .nav-btn {
  opacity: 1;
  pointer-events: auto;
}

/* EFECTO CASCADA AL ABRIR (Solo en la opacidad) */
.menu-open .nav-btn:nth-child(1) { transition-delay: 0.05s; }
.menu-open .nav-btn:nth-child(2) { transition-delay: 0.10s; }
.menu-open .nav-btn:nth-child(3) { transition-delay: 0.15s; }
.menu-open .nav-btn:nth-child(4) { transition-delay: 0.20s; }
.menu-open .nav-btn:nth-child(5) { transition-delay: 0.25s; }

/* EFECTO CASCADA INVERSO AL CERRAR */
.nav-btn:nth-child(1) { transition-delay: 0.20s; }
.nav-btn:nth-child(2) { transition-delay: 0.15s; }
.nav-btn:nth-child(3) { transition-delay: 0.10s; }
.nav-btn:nth-child(4) { transition-delay: 0.05s; }
.nav-btn:nth-child(5) { transition-delay: 0.00s; }

.nav-circle {
  width: 46px; height: 46px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  color: #fff; font-weight: 900; font-size: 1.2rem;
  box-shadow: 0 4px 10px rgba(0,0,0,0.15);
  flex-shrink: 0; 
  /* Totalmente estático, sin transiciones extrañas */
}

/* Indicador de seleccionado (Anillo) */
.nav-btn--active .nav-circle {
  outline: 3px dashed var(--accent, #2E7D32);
  outline-offset: 4px;
}

.nav-text-box {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
  border: 2px solid var(--accent, #c0c0c0); border-radius: 14px;
  padding: 10px 18px; display: flex; align-items: center; gap: 12px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15); white-space: nowrap; 
}
.text-title { font-weight: 800; font-size: 0.95rem; color: #222222; }
.text-emoji { font-size: 1.2rem; }

/* ═══════════════════════════════════════════════
   BOTÓN HAMBURGUESA PÍLDORA CON TEXTO
═══════════════════════════════════════════════ */
.menu-toggle {
  position: fixed;
  bottom: 24px;
  left: 24px; 
  z-index: 1001; 
  height: 46px; 
  background-color: #ffffff;
  border: 2px solid #E0E0D8; 
  border-radius: 23px; /* Forma de píldora */
  cursor: pointer;
  display: flex; 
  align-items: center; 
  padding: 0; /* Controlado internamente por el icon-wrap */
  box-shadow: 0 4px 15px rgba(0,0,0,0.15); 
  max-width: 120px; /* Suficiente para que quepa "Menú" */
  overflow: hidden;
  transition: max-width 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.2s ease;
}

/* Al abrir, se encoge a un círculo perfecto */
.menu-toggle.active {
  max-width: 46px; 
}

/* Contenedor del icono fijo de 42px para centrarlo dentro de los 46px del botón */
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
  padding-right: 18px; /* Espaciado extra al final de la píldora */
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

/* Animación simple (Fade) */
.fade-simple-enter-active,
.fade-simple-leave-active { transition: opacity 0.3s ease; }
.fade-simple-enter-from, 
.fade-simple-leave-to { opacity: 0; }

/* ═══════════════════════════════════════════════
   CONTENIDO PRINCIPAL (Centrado Total)
═══════════════════════════════════════════════ */
.unit-stage {
  margin: 0 auto; 
  width: 100%;
  padding: 40px 50px 100px 50px; 
  max-width: 1200px;
}

.grade-content { width: 100%; }

/* --- CABECERA Y CHIP GLOBAL --- */
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

/* --- ETIQUETAS DE SECCIÓN --- */
.section-label {
  display: inline-flex; align-items: center; gap: 8px;
  border-radius: 16px; padding: 10px 22px;
  font-size: 1.1rem; font-weight: 900; margin-bottom: 1.25rem;
}
.label-orange { background: #FFF3E0; color: #E64A19; border: 2px solid #FFAB91; }
.label-purple { background: #F3E5F5; color: #7B1FA2; border: 2px solid #CE93D8; }
.label-green  { background: #E8F5E9; color: #2E7D32; border: 2px solid #A5D6A7; }
.label-blue   { background: #E3F2FD; color: #1565C0; border: 2px solid #90CAF9; }
.label-teal   { background: #E0F2F1; color: #00796B; border: 2px solid #80CBC4; }

/* --- TARJETAS (Kid Cards) --- */
.kid-card {
  background: #FFFFFF;
  border: 2.5px solid #EAEAEA;
  transition: transform 0.18s, box-shadow 0.18s;
}
.kid-card:hover { transform: translateY(-4px); box-shadow: 0 8px 24px rgba(0,0,0,0.08); }
.card-shadow { box-shadow: 0 4px 20px rgba(0,0,0,0.12); }
.rounded-3xl { border-radius: 24px !important; }

.kid-card-title { font-size: 1.05rem; font-weight: 900; margin-bottom: 6px; line-height: 1.3; }
.kid-card-body { font-size: 1rem; color: #333; line-height: 1.6; margin-bottom: 0; }
.kid-example-icon { font-size: 2.2rem; margin-bottom: 8px; line-height: 1; }
.posicion-icon { font-size: 2.5rem; margin-bottom: 8px; }

/* --- CAJAS DE SECCIÓN --- */
.section-box { border-radius: 24px; padding: 1.8rem; }
.box-orange { background: #FFF8E1; border: 2px solid #FFE082; }
.box-amber  { background: #FFF3E0; border: 2px solid #FFCCBC; }
.box-blue   { background: #E3F2FD; border: 2px solid #BBDEFB; }
.box-indigo { background: #E8EAF6; border: 2px solid #C5CAE9; }
.box-cyan   { background: #E0F7FA; border: 2px solid #B2EBF2; }
.box-purple { background: #F3E5F5; border: 2px solid #CE93D8; }
.box-green  { background: #E8F5E9; border: 2px solid #A5D6A7; }
.box-teal   { background: #E0F2F1; border: 2px solid #80CBC4; }

.box-title { font-size: 1.15rem; font-weight: 900; margin-bottom: 8px; }
.box-body { font-size: 1rem; color: #444; margin-bottom: 1.2rem; line-height: 1.6; }

/* --- CHIPS DE RESULTADO --- */
.resultado-chip {
  display: inline-block; padding: 6px 18px; border-radius: 999px;
  font-size: 1rem; font-weight: 900; color: #111; margin-top: 8px;
}
.chip-orange { background: #FFE0B2; }
.chip-amber  { background: #FFECB3; }
.chip-blue   { background: #BBDEFB; }
.chip-indigo { background: #C5CAE9; }
.chip-teal   { background: #B2DFDB; }
.chip-green  { background: #C8E6C9; }
.numero-grande { font-size: clamp(1rem, 3vw, 1.4rem); padding: 6px 20px; }

/* --- COLORES DE TÍTULOS --- */
.title-orange { color: #E64A19 !important; }
.title-amber  { color: #E65100 !important; }
.title-blue   { color: #1565C0 !important; }
.title-indigo { color: #283593 !important; }
.title-teal   { color: #00695C !important; }
.title-purple { color: #6A1B9A !important; }
.title-green  { color: #2E7D32 !important; }

/* --- TABLAS (Responsivas) --- */
.table-wrap { border-radius: var(--radius-md); overflow-x: auto; border: 1.5px solid #E0E0DC; margin-bottom: 8px; }
.data-table { width: 100%; min-width: 500px; border-collapse: collapse; background: white; }

/* --- PIZARRA --- */
.chalkboard {
  background: #162616; font-family: 'Courier New', monospace; text-align: right;
  box-shadow: inset 0 1px 0 rgba(255,255,255,.05), var(--shadow-card);
}
.chalk-line  { font-size: clamp(1.4rem, 4vw, 1.7rem); font-weight: 900; color: #A5D6A7; padding: 2px 0; }
.chalk-op    { color: #90CAF9; }
.chalk-sep   { border-bottom: 2px solid #2E7D32; margin: 8px 0; }
.chalk-note  { font-size: 0.8rem; text-align: left; color: #90A4AE; padding: 2px 0; }
.chalk-result { text-align: center; padding-top: 10px; }

/* --- UTILIDADES Y VIDEO --- */
.video-container { aspect-ratio: 16/9; display: flex; align-items: center; justify-content: center; }
.h-100 { height: 100%; }
.gap-1 { gap: 4px; }
.gap-2 { gap: 8px; }
.gap-3 { gap: 12px; }
.gap-4 { gap: 16px; }
.gap-6 { gap: 24px; }

.divider-kids { text-align: center; font-size: 1.4rem; color: #D0D0D0; letter-spacing: 12px; }

.btn-practica {
  background: linear-gradient(135deg, #1565C0, #0D47A1);
  color: #fff; font-family: inherit; font-size: clamp(1rem, 4vw, 1.25rem); font-weight: 900;
  padding: 16px 42px; border: none; border-radius: 20px; cursor: pointer;
  box-shadow: 0 6px 20px rgba(13, 71, 161, 0.35); transition: transform 0.15s, box-shadow 0.15s;
}
.btn-practica:hover { transform: translateY(-3px) scale(1.03); box-shadow: 0 10px 28px rgba(13, 71, 161, 0.45); }
.btn-practica:active { transform: translateY(0); }

/* ═══════════════════════════════════════════════
   RESPONSIVE
═══════════════════════════════════════════════ */
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

  .two-col, .pos-row { grid-template-columns: 1fr; }
  .steps-row--4 { flex-wrap: wrap; }
  .card-grid, .card-grid--2, .card-grid--3 { grid-template-columns: 1fr; }
  .chip-row { flex-wrap: wrap; }
}

@media (max-width: 480px) {
  .pos-row { grid-template-columns: 1fr 1fr; }
}
</style>