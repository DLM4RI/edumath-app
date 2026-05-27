<template>
  <v-app class="mobile-app">
    <!-- Compact Top Bar -->
    <v-app-bar flat class="px-2 glass-navbar" height="64">
      <div class="d-flex align-center w-100">
        <v-avatar size="40" class="mr-3 elevation-2">
          <v-img src="logo-matecord.png"></v-img>
        </v-avatar>
        <div>
          <h1 class="text-subtitle-1 font-weight-black mb-0">EduMath</h1>
          <span class="text-caption text-primary font-weight-bold">Grado {{ selectedGrade }}°</span>
        </div>
        <v-spacer></v-spacer>
        <v-btn icon variant="tonal" color="primary" size="small" @click="showProfile = true">
          <v-icon>mdi-account</v-icon>
        </v-btn>
      </div>
    </v-app-bar>

    <v-main class="mobile-main">
      <v-container class="pa-4">
        <router-view v-slot="{ Component }">
          <transition name="slide-fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </v-container>
    </v-main>

    <!-- Premium Bottom Navigation -->
    <v-bottom-navigation
      v-model="activeTab"
      grow
      active
      color="primary"
      class="mobile-nav"
      elevation="20"
    >
      <v-btn v-for="item in navItems" :key="item.to" :value="item.to" :to="item.to">
        <v-icon size="24">{{ item.icon }}</v-icon>
        <span class="font-weight-bold">{{ item.title }}</span>
      </v-btn>
    </v-bottom-navigation>

    <!-- Profile Bottom Sheet -->
    <v-bottom-sheet v-model="showProfile">
      <v-card class="rounded-t-xl pa-6 pb-10">
        <div class="d-flex align-center mb-6">
          <v-avatar size="64" color="primary" class="mr-4">
            <v-icon size="32" color="white">mdi-account</v-icon>
          </v-avatar>
          <div>
            <h3 class="text-h6 font-weight-black">{{ userName }}</h3>
            <p class="text-caption text-medium-emphasis">Estudiante de Primaria</p>
          </div>
        </div>
        
        <v-list class="pa-0 mb-6">
          <v-list-item
            prepend-icon="mdi-school-outline"
            title="Cambiar de Grado"
            subtitle="Volver al inicio"
            to="/"
            rounded="lg"
            class="mb-2"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-information-outline"
            title="Acerca de"
            subtitle="Versión 1.0.0"
            @click="showAbout = true"
            rounded="lg"
          ></v-list-item>
        </v-list>

        <v-btn block color="error" variant="tonal" rounded="xl" size="large" @click="logout">
          Cerrar Sesión
        </v-btn>
      </v-card>
    </v-bottom-sheet>
  </v-app>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useDashboard } from '../composables/useDashboard';

const router = useRouter();
const route = useRoute();
const activeTab = ref(null);
const showProfile = ref(false);
const showAbout = ref(false);

const { userName, selectedGrade, currentTheme } = useDashboard();

const navItems = computed(() => [
  { title: 'Inicio', to: `/app/grado/${selectedGrade.value}`, icon: 'mdi-home-variant' },
  { title: 'Tareas', to: `/app/grado/${selectedGrade.value}/actividades`, icon: 'mdi-controller-classic' },
  { title: 'Retos', to: `/app/grado/${selectedGrade.value}/evaluacion`, icon: 'mdi-trophy' },
  { title: 'Tú', to: `/app/grado/${selectedGrade.value}/retroalimentacion`, icon: 'mdi-heart-pulse' }
]);

onMounted(() => {
  activeTab.value = route.path;
});

watch(() => route.path, (val) => activeTab.value = val);

const logout = () => {
  localStorage.clear();
  router.push('/');
};
</script>

<style scoped>
.mobile-app {
  background-color: #f8fafc !important;
}

.glass-navbar {
  background: rgba(255, 255, 255, 0.8) !important;
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.05) !important;
}

.mobile-main {
  background: radial-gradient(circle at top right, #f1f5f9, #ffffff);
  min-height: 100vh;
}

.mobile-nav {
  border-top-left-radius: 24px !important;
  border-top-right-radius: 24px !important;
  height: 72px !important;
}

/* Animations */
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter-from {
  transform: translateX(20px);
  opacity: 0;
}
.slide-fade-leave-to {
  transform: translateX(-20px);
  opacity: 0;
}
</style>
