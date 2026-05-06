<template>
  <v-container fluid class="pa-0">
    <!-- Hero Header -->
    <div class="hero-section pa-8 pa-md-12 mb-6" :style="{ borderBottom: `4px solid ${currentTheme.primary}22` }">
      <v-row align="center">
        <v-col cols="12" md="8">
          <v-chip :color="currentTheme.primary" variant="flat" size="small" class="mb-4 font-weight-bold">
            MATEMÁTICAS • GRADO {{ selectedGrade }}°
          </v-chip>
          <h1 class="text-h4 text-md-h2 font-weight-black mb-4 tracking-tight">
            ¡Hola, <span class="text-gradient" :style="{ background: `linear-gradient(135deg, ${currentTheme.primary} 0%, ${currentTheme.secondary} 100%)`, webkitBackgroundClip: 'text', webkitTextFillColor: 'transparent' }">{{ firstName }}</span>!
          </h1>
          <p class="text-body-1 text-md-h6 text-medium-emphasis max-width-600 font-weight-regular">
            Bienvenido a tu aventura matemática. Explora los DBA para el grado {{ selectedGrade }}°.
          </p>
        </v-col>
        <v-col cols="12" md="4" class="d-none d-md-flex justify-end">
          <v-img
            :src="currentTheme.hero"
            max-width="400"
            class="hero-illustration animate__animated animate__pulse animate__infinite"
          ></v-img>
        </v-col>
      </v-row>
    </div>

    <!-- Components Tabs -->
    <v-container class="px-8 pb-12">
      <v-card flat class="rounded-xl mb-8 glass-tabs overflow-hidden" elevation="0">
        <v-tabs
          v-model="activeTab"
          bg-color="transparent"
          :color="currentTheme.primary"
          grow
          height="80"
          class="custom-tabs"
          show-arrows
        >
          <v-tab v-for="tab in thinkingTypes" :key="tab.value" :value="tab.value" class="text-none">
            <v-icon size="28" class="mr-3">{{ tab.icon }}</v-icon>
            <div class="d-flex flex-column align-start">
              <span class="text-caption text-uppercase font-weight-bold opacity-60">Pensamiento</span>
              <span class="text-subtitle-1 font-weight-black">{{ tab.label }}</span>
            </div>
          </v-tab>
        </v-tabs>
      </v-card>

      <!-- DBA Grid -->
      <v-window v-model="activeTab">
        <v-window-item v-for="tab in thinkingTypes" :key="tab.value" :value="tab.value">
          <v-row v-if="filteredDbas.length > 0">
            <v-col
              v-for="dba in filteredDbas"
              :key="dba.id"
              cols="12"
              md="6"
              lg="4"
              class="d-flex"
            >
              <v-card
                class="dba-card rounded-xl overflow-hidden"
                elevation="4"
                :class="{ 'dba-card-large': currentTheme.density === 'playful' }"
              >
                <div class="card-gradient" :style="{ background: `linear-gradient(135deg, ${dba.color}11 0%, ${dba.color}33 100%)` }"></div>
                
                <v-card-item class="pt-6">
                  <div class="d-flex justify-space-between align-center mb-4">
                    <v-avatar :color="dba.color" size="48" class="elevation-4">
                      <span class="text-h6 font-weight-black text-white">#{{ dba.dbaNumber }}</span>
                    </v-avatar>
                    <v-chip size="x-small" :color="dba.color" variant="tonal" class="font-weight-bold">
                      DBA • V2
                    </v-chip>
                  </div>
                  
                  <v-card-title class="text-h6 font-weight-black text-wrap mb-2" style="line-height: 1.3;">
                    {{ dba.statement }}
                  </v-card-title>
                </v-card-item>

                <v-card-text class="flex-grow-1">
                  <div class="text-caption text-uppercase font-weight-bold text-medium-emphasis mb-2">Evidencias clave</div>
                  <div class="evidences-list">
                    <div v-for="(ev, i) in dba.evidences.slice(0, 2)" :key="i" class="evidence-item mb-2 d-flex">
                      <v-icon size="14" :color="dba.color" class="mr-2 mt-1">mdi-check-circle-outline</v-icon>
                      <span class="text-body-2 text-medium-emphasis">{{ ev }}</span>
                    </div>
                  </div>
                </v-card-text>

                <v-divider class="opacity-10"></v-divider>

                <v-card-actions class="pa-4">
                  <v-btn
                    block
                    variant="flat"
                    :color="dba.color"
                    class="text-white font-weight-bold py-6 rounded-lg text-none"
                    prepend-icon="mdi-rocket-launch"
                    @click="openActivity(dba)"
                  >
                    Iniciar Actividades
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
          
          <v-row v-else class="justify-center py-12">
            <v-col cols="12" md="6" class="text-center">
              <div class="empty-state-container">
                <v-icon size="80" color="grey-lighten-2">mdi-math-log</v-icon>
                <h3 class="text-h5 text-medium-emphasis mt-4">Contenido en desarrollo</h3>
                <p class="text-body-1 text-grey">Pronto añadiremos más DBA para esta categoría.</p>
              </div>
            </v-col>
          </v-row>
        </v-window-item>
      </v-window>
    </v-container>

    <v-snackbar v-model="snackbar.show" :color="snackbar.color" rounded="pill" elevation="10">
      <div class="text-center font-weight-bold">{{ snackbar.text }}</div>
    </v-snackbar>
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { dbasDatabase } from '../utils/DbaData'
import { useDashboard } from '../composables/useDashboard'

const router = useRouter()
const { userName, selectedGrade, currentTheme } = useDashboard()

const activeTab = ref('numerico')
const snackbar = ref({ show: false, text: '', color: 'success' })

const firstName = computed(() => userName.value.split(' ')[0])

const thinkingTypes = [
  { value: 'numerico', label: 'Numérico', icon: 'mdi-numeric-9-plus-box-outline' },
  { value: 'geometrico', label: 'Geométrico', icon: 'mdi-shape-plus' },
  { value: 'estadistico', label: 'Estadístico', icon: 'mdi-chart-box-outline' }
]

const filteredDbas = computed(() => {
  return dbasDatabase.filter(
    dba => dba.grade === selectedGrade.value && dba.type === activeTab.value
  )
})

const openActivity = (dba) => {
  router.push(`/app/grado${selectedGrade.value}/actividades?dba=${dba.dbaNumber}`)
}
</script>

<style scoped>
.hero-section {
  background: white;
}

.hero-illustration {
  filter: drop-shadow(0 20px 30px rgba(99, 102, 241, 0.2));
  animation: floating 6s ease-in-out infinite;
}

@keyframes floating {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
}

.glass-tabs {
  background: rgba(255, 255, 255, 0.5) !important;
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255,255,255,0.8);
}

.dba-card {
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  border: none !important;
  background: white !important;
  position: relative;
  width: 100%;
}

.dba-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15) !important;
}

.dba-card-large {
  min-height: 450px;
}

.dba-card-large .v-card-title {
  font-size: 1.5rem !important;
}

.card-gradient {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100px;
  z-index: 0;
}

.evidence-item {
  line-height: 1.4;
}

.tracking-tight {
  letter-spacing: -0.05em !important;
}
</style>
