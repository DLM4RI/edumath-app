<template>
  <div class="actividades-wrapper">
    <!-- Fondos dinámicos basados en index.vue -->
    <div class="bg-shape shape-1"></div>
    <div class="bg-shape shape-2"></div>

    <v-container class="py-8 py-md-12 actividades-content" maxWidth="1200">
      <v-fade-transition mode="out-in">
        <!-- VISTA 1: CUADRÍCULA DE MISIONES -->
        <div
          v-if="!selectedMissionId"
          key="grid"
          class="animate__animated animate__fadeIn view-container"
        >
          <!-- Header Gamificado -->
          <div class="text-center mb-10">
            <v-icon
              size="80"
              color="warning"
              class="mb-4 animate__animated animate__pulse animate__infinite"
              >mdi-star-shooting</v-icon
            >
            <h1
              class="text-h3 md-text-h2 font-weight-black tracking-tight mb-4 text-gradient"
            >
              Misiones Espaciales
            </h1>
            <p class="text-h6 text-medium-emphasis">
              Elige tu próxima aventura matemática para el grado
              {{ selectedGrade }}°
            </p>
          </div>

          <!-- Pestañas de Exploración -->
          <v-card flat class="rounded-xl mb-8 glass-tabs border" elevation="0">
            <v-tabs
              v-model="activeTab"
              bg-color="transparent"
              :color="currentTheme.primary"
              grow
              height="80"
              class="custom-tabs"
              show-arrows
            >
              <v-tab
                v-for="tab in thinkingTypes"
                :key="tab.value"
                :value="tab.value"
                class="text-none"
              >
                <v-icon size="28" class="mr-3">{{ tab.icon }}</v-icon>
                <div class="d-flex flex-column align-start">
                  <span
                    class="text-caption text-uppercase font-weight-bold opacity-60"
                    >Exploración</span
                  >
                  <span class="text-subtitle-1 font-weight-black">{{
                    tab.label
                  }}</span>
                </div>
              </v-tab>
            </v-tabs>
          </v-card>

          <!-- Cuadrícula de Tarjetas -->
          <v-window v-model="activeTab" class="bg-transparent">
            <v-window-item
              v-for="tab in thinkingTypes"
              :key="tab.value"
              :value="tab.value"
            >
              <v-row v-if="filteredMissions.length > 0">
                <v-col
                  v-for="mission in filteredMissions"
                  :key="mission.id"
                  cols="12"
                  md="6"
                  lg="4"
                  class="d-flex pa-4"
                >
                  <v-card
                    class="mission-card rounded-xl overflow-hidden d-flex flex-column w-100"
                    elevation="4"
                    hover
                    @click="startMission(mission)"
                    :style="{ '--mission-color': mission.color }"
                  >
                    <div class="card-glow"></div>
                    <div class="card-pattern"></div>

                    <div
                      class="card-header d-flex justify-space-between align-start pa-6 position-relative z-1"
                    >
                      <v-avatar
                        :color="mission.color"
                        size="56"
                        class="elevation-6 avatar-bounce"
                        style="border: 3px solid white"
                      >
                        <v-icon color="white" size="32" v-if="mission.type === 'numerico'">mdi-numeric</v-icon>
                        <v-icon color="white" size="32" v-else-if="mission.type === 'geometrico'">mdi-shape-outline</v-icon>
                        <v-icon color="white" size="32" v-else>mdi-chart-bar</v-icon>
                      </v-avatar>
                      <v-chip
                        size="small"
                        :color="mission.color"
                        variant="elevated"
                        class="font-weight-bold text-white px-4 py-2"
                        style="border-radius: 12px; letter-spacing: 1px"
                      >
                        <v-icon start size="14">mdi-star-shooting</v-icon>
                        MISIÓN
                      </v-chip>
                    </div>

                    <v-card-text
                      class="pt-0 flex-grow-1 position-relative z-1 d-flex flex-column"
                    >
                      <h3
                        class="text-h5 font-weight-black mb-4 text-grey-darken-3"
                        style="line-height: 1.3"
                      >
                        {{ mission.statement }}
                      </h3>

                      <div class="mt-auto">
                        <div
                          class="text-caption text-uppercase font-weight-bold text-medium-emphasis mb-3 d-flex align-center"
                        >
                          <v-icon size="16" class="mr-1">mdi-target</v-icon>
                          Objetivos Principales
                        </div>
                        <div
                          class="evidences-list bg-grey-lighten-4 pa-4 rounded-lg border"
                        >
                          <div
                            v-for="(ev, i) in mission.evidences.slice(0, 2)"
                            :key="i"
                            class="evidence-item d-flex align-start"
                            :class="{ 'mb-3': i === 0 }"
                          >
                            <v-icon
                              size="18"
                              :color="mission.color"
                              class="mr-3 mt-1"
                              >mdi-check-decagram</v-icon
                            >
                            <span
                              class="text-body-2 font-weight-medium text-grey-darken-3"
                              >{{ ev }}</span
                            >
                          </div>
                        </div>
                      </div>
                    </v-card-text>

                    <div class="pa-4 mt-auto position-relative z-1">
                      <v-btn
                        block
                        size="x-large"
                        variant="flat"
                        :color="mission.color"
                        class="text-white font-weight-black rounded-xl text-none mission-btn overflow-hidden"
                        elevation="4"
                        height="56"
                      >
                        <span class="btn-text text-h6">¡Iniciar Misión!</span>
                        <v-icon class="btn-icon ml-2" size="24"
                          >mdi-rocket-launch</v-icon
                        >
                        <div class="btn-hover-effect"></div>
                      </v-btn>
                    </div>
                  </v-card>
                </v-col>
              </v-row>

              <v-row v-else class="justify-center py-12">
                <v-col cols="12" md="6" class="text-center">
                  <div class="empty-state-container">
                    <v-icon
                      size="100"
                      color="grey-lighten-2"
                      class="mb-4 animate__animated animate__float"
                      >mdi-ufo-outline</v-icon
                    >
                    <h3
                      class="text-h4 font-weight-black text-medium-emphasis mt-4"
                    >
                      Sector inexplorado
                    </h3>
                    <p class="text-body-1 text-grey">
                      Pronto descubriremos nuevas misiones en esta área.
                    </p>
                  </div>
                </v-col>
              </v-row>
            </v-window-item>
          </v-window>
        </div>

        <!-- VISTA 2: MISIÓN ACTIVA (CUESTIONARIO GAMIFICADO) -->
        <div
          v-else
          key="mission"
          class="animate__animated animate__fadeInUp view-container"
        >
          <div class="d-flex align-center mb-6">
            <v-btn
              variant="text"
              prepend-icon="mdi-arrow-left"
              class="text-none font-weight-bold text-h6"
              @click="goBackToGrid"
            >
              Volver a la Base
            </v-btn>
          </div>

          <v-row justify="center">
            <v-col cols="12" lg="10">
              <Grado1Actividad
                v-if="selectedGrade === 1"
                :mission="activeMission"
                @back="goBackToGrid"
              />
              <Grado2Actividad
                v-else-if="selectedGrade === 2"
                :mission="activeMission"
                @back="goBackToGrid"
              />
              <Grado3Actividad
                v-else-if="selectedGrade === 3"
                :mission="activeMission"
                @back="goBackToGrid"
              />
              <Grado4Actividad
                v-else-if="selectedGrade === 4"
                :mission="activeMission"
                @back="goBackToGrid"
              />
              <Grado5Actividad
                v-else-if="selectedGrade === 5"
                :mission="activeMission"
                @back="goBackToGrid"
              />
            </v-col>
          </v-row>
        </div>
      </v-fade-transition>

    </v-container>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { dbasDatabase } from "../../utils/DbaData";
import { useDashboard } from "../../composables/useDashboard";
import Grado1Actividad from "../../components/actividades/Grado1Actividad.vue";
import Grado2Actividad from "../../components/actividades/Grado2Actividad.vue";
import Grado3Actividad from "../../components/actividades/Grado3Actividad.vue";
import Grado4Actividad from "../../components/actividades/Grado4Actividad.vue";
import Grado5Actividad from "../../components/actividades/Grado5Actividad.vue";

const route = useRoute();
const router = useRouter();
const { selectedGrade, currentTheme } = useDashboard();

// Grid State
const activeTab = ref("numerico");
const thinkingTypes = [
  {
    value: "numerico",
    label: "Números Mágicos",
    icon: "mdi-numeric-9-plus-box-outline",
  },
  { value: "geometrico", label: "Formas y Figuras", icon: "mdi-shape-plus" },
  {
    value: "estadistico",
    label: "Datos Curiosos",
    icon: "mdi-chart-box-outline",
  },
];

const filteredMissions = computed(() => {
  return dbasDatabase.filter(
    (mission) =>
      mission.grade === selectedGrade.value && mission.type === activeTab.value,
  );
});

// Mission State
const selectedMissionId = ref(null);

const activeMission = computed(() => {
  if (!selectedMissionId.value) return null;
  const mission = dbasDatabase.find((m) => m.id === selectedMissionId.value);
  if (!mission) return null;
  // Enrich exercises with generic hints if missing
  return {
    ...mission,
    exercises: mission.exercises.map((exercise) => ({
      ...exercise,
      hint: exercise.hint || 'Pista de Copiloto: Observa bien las opciones y recuerda las clases de la misión.',
    })),
  };
});

// Navigation & Actions
onMounted(() => {
  if (route.query.dba) {
    const missionNum = parseInt(route.query.dba);
    const found = dbasDatabase.find(
      (d) => d.dbaNumber === missionNum && d.grade === selectedGrade.value,
    );
    if (found) {
      selectedMissionId.value = found.id;
    }
  }
});

const startMission = (mission) => {
  selectedMissionId.value = mission.id;
  router.replace({ query: { dba: mission.dbaNumber } });
};

const goBackToGrid = () => {
  selectedMissionId.value = null;
  router.replace({ query: {} });
};
</script>

<style scoped>
.actividades-wrapper {
  position: relative;
  min-height: 100vh;
  width: 100%;
  overflow: hidden;
  background-color: #f8fafc;
}

.actividades-content {
  position: relative;
  z-index: 2;
}

/* Fondos compartidos con index.vue */
.bg-shape {
  position: fixed;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.35;
  z-index: 0;
  pointer-events: none;
}

.shape-1 {
  width: 400px;
  height: 400px;
  background: #6366f1; /* Indigo */
  top: -120px;
  left: -120px;
}

.shape-2 {
  width: 500px;
  height: 500px;
  background: #ec4899; /* Pink */
  bottom: -160px;
  right: -160px;
}

.text-gradient {
  background: linear-gradient(135deg, #6366f1 0%, #ec4899 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.glass-tabs {
  background: rgba(255, 255, 255, 0.8) !important;
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.5) !important;
  box-shadow: 0 10px 30px -10px rgba(99, 102, 241, 0.1) !important;
}

.glass-card {
  background: rgba(255, 255, 255, 0.9) !important;
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.5) !important;
}

/* Solución a elementos cortados en v-window y animaciones */
:deep(.v-window),
:deep(.v-window__container) {
  overflow: visible !important;
}

.view-container {
  padding-bottom: 2rem;
}

.mission-card {
  transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
  border: 1px solid rgba(255, 255, 255, 0.8) !important;
  background: white !important;
  position: relative;
  cursor: pointer;
  box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.1) !important;
  --mission-color: #6366f1; /* fallback */
}

.mission-card:hover {
  transform: translateY(-10px) scale(1.02);
  box-shadow: 0 25px 50px -12px var(--mission-color) !important;
  border-color: var(--mission-color) !important;
}

.card-glow {
  position: absolute;
  top: -50px;
  right: -50px;
  width: 150px;
  height: 150px;
  background: var(--mission-color);
  border-radius: 50%;
  filter: blur(60px);
  opacity: 0.15;
  transition: all 0.5s ease;
  z-index: 0;
}

.mission-card:hover .card-glow {
  opacity: 0.4;
  transform: scale(1.5);
}

.card-pattern {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: radial-gradient(var(--mission-color) 1px, transparent 1px);
  background-size: 20px 20px;
  opacity: 0.03;
  z-index: 0;
}

.z-1 {
  z-index: 1;
}

/* Animaciones del botón */
.mission-btn {
  position: relative;
  transition: all 0.3s ease;
}

.btn-icon {
  transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.mission-card:hover .btn-icon {
  transform: translate(8px, -8px) scale(1.2);
}

.btn-hover-effect {
  position: absolute;
  top: 0;
  left: -100%;
  width: 50%;
  height: 100%;
  background: linear-gradient(
    to right,
    transparent,
    rgba(255, 255, 255, 0.4),
    transparent
  );
  transform: skewX(-25deg);
  transition: all 0.7s ease;
}

.mission-card:hover .btn-hover-effect {
  left: 200%;
}

.avatar-bounce {
  animation: bounceAvatar 3s ease-in-out infinite;
}

@keyframes bounceAvatar {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-6px);
  }
}

.interactive-option {
  border-width: 3px !important;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  background: rgba(255, 255, 255, 0.9) !important;
  border: 3px solid transparent !important;
}

.interactive-option:hover:not(.active-option) {
  transform: scale(1.03);
  background: white !important;
  border-color: #cbd5e1 !important;
  box-shadow: 0 10px 25px -5px rgba(99, 102, 241, 0.15) !important;
}

.active-option {
  transform: scale(1.05);
}

.progress-rocket :deep(.v-progress-linear__determinate) {
  background-image: linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.25) 25%,
    transparent 25%,
    transparent 50%,
    rgba(255, 255, 255, 0.25) 50%,
    rgba(255, 255, 255, 0.25) 75%,
    transparent 75%,
    transparent
  );
  background-size: 1rem 1rem;
  animation: progress-stripes 1s linear infinite;
}

@keyframes progress-stripes {
  from {
    background-position: 1rem 0;
  }
  to {
    background-position: 0 0;
  }
}

.max-width-600 {
  max-width: 600px;
}

@keyframes float {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-15px);
  }
  100% {
    transform: translateY(0px);
  }
}

.animate__float {
  animation: float 4s ease-in-out infinite;
}

/* Los estilos de la misión activa ahora están en:
   components/actividades/actividad-styles.css */
</style>
