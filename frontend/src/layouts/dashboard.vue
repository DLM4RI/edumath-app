<template>
  <div class="edumath-layout">
    <!-- Navigation Drawer (Responsive Sidebar) -->
    <v-navigation-drawer
      v-model="drawer"
      :permanent="$vuetify.display.mdAndUp"
      elevation="0"
      class="border-r-0 glass-sidebar"
      :width="280"
    >
      <div class="pa-6 text-center">
        <v-avatar :color="currentTheme.primary" size="64" class="elevation-4 mb-4">
          <v-icon color="white" size="32">mdi-account</v-icon>
        </v-avatar>
        <h3 class="text-subtitle-1 font-weight-black tracking-tight">{{ userName || 'Estudiante' }}</h3>
        <p class="text-caption text-medium-emphasis">{{ currentTheme.label }}</p>
      </div>

      <v-divider class="mx-4 mb-4 opacity-10"></v-divider>

      <v-list nav class="px-4">
        <v-list-subheader class="text-uppercase font-weight-bold text-caption mb-2">Menú del Grado</v-list-subheader>
        
        <!-- Contenido -->
        <v-list-item
          :to="`/app/grado${selectedGrade}`"
          rounded="lg"
          class="mb-2"
          :active-class="'active-item'"
          :style="route.path === `/app/grado${selectedGrade}` ? { backgroundColor: currentTheme.primary + '15', color: currentTheme.primary } : {}"
        >
          <template v-slot:prepend>
            <v-icon :color="route.path === `/app/grado${selectedGrade}` ? currentTheme.primary : 'grey-lighten-1'">mdi-book-open-variant</v-icon>
          </template>
          <v-list-item-title class="font-weight-bold">Contenido</v-list-item-title>
        </v-list-item>

        <!-- Actividades -->
        <v-list-item
          :to="`/app/grado${selectedGrade}/actividades`"
          rounded="lg"
          class="mb-2"
          :style="route.path.includes('actividades') ? { backgroundColor: currentTheme.primary + '15', color: currentTheme.primary } : {}"
        >
          <template v-slot:prepend>
            <v-icon :color="route.path.includes('actividades') ? currentTheme.primary : 'grey-lighten-1'">mdi-gamepad-variant</v-icon>
          </template>
          <v-list-item-title class="font-weight-bold">Actividades</v-list-item-title>
        </v-list-item>

        <!-- Evaluación -->
        <v-list-item
          :to="`/app/grado${selectedGrade}/evaluacion`"
          rounded="lg"
          class="mb-2"
          :style="route.path.includes('evaluacion') ? { backgroundColor: currentTheme.primary + '15', color: currentTheme.primary } : {}"
        >
          <template v-slot:prepend>
            <v-icon :color="route.path.includes('evaluacion') ? currentTheme.primary : 'grey-lighten-1'">mdi-clipboard-check-outline</v-icon>
          </template>
          <v-list-item-title class="font-weight-bold">Evaluación</v-list-item-title>
        </v-list-item>

        <!-- Retroalimentación -->
        <v-list-item
          :to="`/app/grado${selectedGrade}/retroalimentacion`"
          rounded="lg"
          class="mb-2"
          :style="route.path.includes('retroalimentacion') ? { backgroundColor: currentTheme.primary + '15', color: currentTheme.primary } : {}"
        >
          <template v-slot:prepend>
            <v-icon :color="route.path.includes('retroalimentacion') ? currentTheme.primary : 'grey-lighten-1'">mdi-message-draw</v-icon>
          </template>
          <v-list-item-title class="font-weight-bold">Retroalimentación</v-list-item-title>
        </v-list-item>
      </v-list>

      <template v-slot:append>
        <div class="pa-4">
          <v-btn
            block
            variant="tonal"
            :color="currentTheme.primary"
            prepend-icon="mdi-school"
            to="/"
            rounded="lg"
            class="mb-2"
          >
            Cambiar de Grado
          </v-btn>
          <v-btn
            block
            variant="text"
            color="grey-darken-1"
            prepend-icon="mdi-information-outline"
            @click="showAboutDialog = true"
            rounded="lg"
          >
            Sobre el proyecto
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <!-- Mobile App Bar -->
    <v-app-bar
      v-if="!$vuetify.display.mdAndUp"
      flat
      class="glass-sidebar px-4"
      color="white"
    >
      <v-app-bar-nav-icon :color="currentTheme.primary" @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="font-weight-black" :style="{ color: currentTheme.primary }">EduMath</v-toolbar-title>
    </v-app-bar>

    <!-- Main Content -->
    <v-main class="bg-surface-variant bg-opacity-10">
      <router-view />
    </v-main>

    <!-- Info Dialog -->
    <v-dialog v-model="showAboutDialog" max-width="500">
      <v-card class="rounded-xl overflow-hidden">
        <div class="pa-8 text-center text-white" :style="{ backgroundColor: currentTheme.primary }">
          <v-icon size="64" class="mb-4">mdi-school</v-icon>
          <h2 class="text-h4 font-weight-black">EduMath</h2>
        </div>
        <v-card-text class="pa-8">
          <p class="text-body-1">
            <strong>EduMath Colombia</strong> es un entorno virtual de aprendizaje enfocado en la enseñanza de las matemáticas para primaria.
          </p>
          <v-list density="compact">
            <v-list-item prepend-icon="mdi-check-all" title="Alineado con DBA V2"></v-list-item>
            <v-list-item prepend-icon="mdi-check-all" title="Pensamiento Variacional y Numérico"></v-list-item>
            <v-list-item prepend-icon="mdi-check-all" title="Pensamiento Espacial y Geométrico"></v-list-item>
            <v-list-item prepend-icon="mdi-check-all" title="Pensamiento Aleatorio y Estadístico"></v-list-item>
          </v-list>
        </v-card-text>
        <v-card-actions class="pa-6">
          <v-btn block :color="currentTheme.primary" variant="flat" rounded="lg" @click="showAboutDialog = false">Cerrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useDashboard } from '../composables/useDashboard'

const router = useRouter()
const route = useRoute()
const drawer = ref(true)
const showAboutDialog = ref(false)

const { userName, selectedGrade, currentTheme } = useDashboard()

// Update selected grade when route changes
watch(() => route.path, (newPath) => {
  const nameMatch = newPath.match(/grado(\d+)/)
  if (nameMatch) {
    selectedGrade.value = parseInt(nameMatch[1])
  }
}, { immediate: true })

onMounted(() => {
  userName.value = localStorage.getItem('user_name') || 'Estudiante'
})

const logout = () => {
  localStorage.removeItem('user_name')
  localStorage.removeItem('user_grade')
  router.push('/')
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;800&display=swap');

.edumath-app {
  font-family: 'Outfit', sans-serif !important;
}

.glass-sidebar {
  background: rgba(255, 255, 255, 0.8) !important;
  backdrop-filter: blur(10px);
}

.active-item {
  background-color: rgba(var(--v-theme-primary), 0.1);
}

.tracking-tight {
  letter-spacing: -0.05em !important;
}

.text-gradient {
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
