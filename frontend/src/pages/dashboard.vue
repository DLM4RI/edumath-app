<template>
  <div class="dashboard-content">
    <v-container fluid class="pa-0">
      <!-- Hero Header -->
      <div class="hero-section pa-8 pa-md-12 mb-6">
        <v-row align="center">
          <v-col cols="12" md="8">
            <v-chip color="primary" variant="flat" size="small" class="mb-4 font-weight-bold">
              MATEMÁTICAS • PANEL PRINCIPAL
            </v-chip>
            <h1 class="text-h4 text-md-h2 font-weight-black mb-4 tracking-tight">
              ¡Hola, <span class="text-gradient">{{ firstName }}</span>!
            </h1>
            <p class="text-body-1 text-md-h6 text-medium-emphasis max-width-600 font-weight-regular">
              Bienvenido a tu aventura matemática. Selecciona un grado en el menú lateral para comenzar.
            </p>
          </v-col>
          <v-col cols="12" md="4" class="d-none d-md-flex justify-end">
            <v-img
              src="/images/hero.png"
              max-width="300"
              class="hero-illustration animate__animated animate__pulse animate__infinite"
            ></v-img>
          </v-col>
        </v-row>
      </div>

      <!-- Quick Start -->
      <v-container class="px-8 pb-12">
        <h2 class="text-h4 font-weight-black mb-6">Grados Disponibles</h2>
        <v-row>
          <v-col v-for="grade in gradesList" :key="grade" cols="12" sm="6" md="4" lg="2.4">
            <v-card
              @click="goToGrade(grade)"
              class="grade-selection-card rounded-xl pa-6 text-center transition-swing"
              elevation="2"
              hover
            >
              <v-avatar color="primary" size="64" class="mb-4 elevation-4">
                <span class="text-h4 font-weight-black text-white">{{ grade }}°</span>
              </v-avatar>
              <div class="text-h6 font-weight-bold">Grado {{ grade }}</div>
              <div class="text-caption text-medium-emphasis">Primaria</div>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-container>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useDashboardStore } from '../store/dashboard'
import { storeToRefs } from 'pinia'

// --- STATE ---
const router = useRouter()
const store = useDashboardStore()
const { userName, selectedGrade } = storeToRefs(store)

onMounted(() => {
  if (!userName.value) {
    userName.value = localStorage.getItem('user_name') || 'Estudiante'
  }
})

const firstName = computed(() => userName.value.split(' ')[0])

const gradesList = [1, 2, 3, 4, 5]

const goToGrade = (grade) => {
  store.setGrade(grade)
  router.push(`/app/grado${grade}`)
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;800&display=swap');

:root {
  --primary: #6366f1;
  --secondary: #ec4899;
}

.edumath-app {
  font-family: 'Outfit', sans-serif !important;
}

.text-gradient {
  background: linear-gradient(135deg, #6366f1 0%, #ec4899 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.glass-sidebar {
  background: rgba(255, 255, 255, 0.8) !important;
  backdrop-filter: blur(10px);
}

.grade-item {
  transition: all 0.3s ease;
}

.grade-number {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f1f5f9;
  border-radius: 8px;
  font-weight: 800;
  color: #64748b;
  margin-right: 12px;
  transition: all 0.3s ease;
}

.active-grade {
  background: #6366f115 !important;
}

.active-grade .grade-number {
  background: #6366f1;
  color: white;
  transform: scale(1.1);
}

.hero-section {
  background: white;
  border-bottom: 1px solid rgba(0,0,0,0.05);
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

.sticky-card {
  position: sticky;
  top: 24px;
}

.glass-card {
  background: rgba(255, 255, 255, 0.7) !important;
  backdrop-filter: blur(10px);
}

.option-btn {
  border-width: 2px !important;
  font-weight: 600 !important;
  transition: all 0.2s ease;
}

.option-btn:hover {
  background: rgba(0,0,0,0.02);
}

.tracking-tight {
  letter-spacing: -0.05em !important;
}

.max-width-600 {
  max-width: 600px;
}

.max-width-200 {
  max-width: 200px;
}

.animate__fadeIn {
  animation: fadeIn 0.5s ease;
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

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Scrollbar styling */
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  background: #f1f5f9;
}
::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>