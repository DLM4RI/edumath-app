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
            Bienvenido a tu aventura matemática. Prepárate para completar las misiones del grado {{ selectedGrade }}°.
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

    <!-- Videos Introductorios -->
    <v-container class="px-8 pb-4">
      <v-card class="rounded-xl overflow-hidden glass-tabs" elevation="2">
        <div class="pa-6 pa-md-8 pb-0">
          <v-chip :color="currentTheme.primary" variant="tonal" size="small" class="mb-4 font-weight-bold">
            <v-icon start size="small">mdi-movie-open-play</v-icon>
            VIDEOS DE EXPLORACIÓN
          </v-chip>
          <h2 class="text-h5 font-weight-black mb-3">
            Conoce más sobre el Grado {{ selectedGrade }}°
          </h2>
          <p class="text-body-1 text-medium-emphasis mb-4">
            Observa estos videos introductorios antes de comenzar con tus misiones y descubre de qué trata nuestra aventura.
          </p>
        </div>
        
        <v-row no-gutters class="px-4 px-md-6 pb-6 pt-2">
          <!-- Video 1 -->
          <v-col cols="12" md="6" class="pa-2">
            <v-card elevation="6" class="rounded-xl overflow-hidden bg-black d-flex align-center justify-center" style="aspect-ratio: 16/9; border: 2px solid rgba(255,255,255,0.1);">
              <video 
                controls 
                style="width: 100%; height: 100%; object-fit: cover;"
              >
                <!-- Ruta dinámica para el video 1 del grado actual -->
                <source :src="`/videos/grado${selectedGrade}_video1.mp4`" type="video/mp4" />
                Tu navegador no soporta el formato de video.
              </video>
            </v-card>
            <div class="text-center mt-3 font-weight-bold text-medium-emphasis">Parte 1: Conceptos Básicos</div>
          </v-col>
          
          <!-- Video 2 -->
          <v-col cols="12" md="6" class="pa-2 mt-4 mt-md-0">
            <v-card elevation="6" class="rounded-xl overflow-hidden bg-black d-flex align-center justify-center" style="aspect-ratio: 16/9; border: 2px solid rgba(255,255,255,0.1);">
              <video 
                controls 
                style="width: 100%; height: 100%; object-fit: cover;"
              >
                <!-- Ruta dinámica para el video 2 del grado actual -->
                <source :src="`/videos/grado${selectedGrade}_video2.mp4`" type="video/mp4" />
                Tu navegador no soporta el formato de video.
              </video>
            </v-card>
            <div class="text-center mt-3 font-weight-bold text-medium-emphasis">Parte 2: Ejemplos Prácticos</div>
          </v-col>
        </v-row>
      </v-card>
    </v-container>

    <!-- Call to Action -->
    <v-container class="px-8 pb-12 pt-4 text-center">
      <v-card flat class="rounded-xl pa-12 glass-tabs border" elevation="0">
        <v-icon size="80" :color="currentTheme.primary" class="mb-6 animate__animated animate__bounce animate__infinite">mdi-rocket-launch</v-icon>
        <h2 class="text-h3 font-weight-black mb-4">¿Listo para jugar?</h2>
        <p class="text-h6 text-medium-emphasis mb-8 max-width-600 mx-auto">
          Pon a prueba lo que has aprendido en nuestras misiones interactivas. ¡Diviértete aprendiendo matemáticas!
        </p>
        <v-btn
          size="x-large"
          :color="currentTheme.primary"
          class="text-white font-weight-bold px-12 py-6 rounded-pill text-none"
          elevation="8"
          @click="goToActivities"
        >
          <v-icon start size="28">mdi-play-circle</v-icon>
          Ir a las Misiones
        </v-btn>
      </v-card>
    </v-container>
  </v-container>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useDashboard } from '../composables/useDashboard'

const router = useRouter()
const { userName, selectedGrade, currentTheme } = useDashboard()

const firstName = computed(() => userName.value.split(' ')[0])

const goToActivities = () => {
  router.push(`/app/grado${selectedGrade.value}/actividades`)
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
