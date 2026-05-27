<template>
  <v-app class="matecord-app">
    <!-- Redesigned Educational Navbar (Floating Style) -->
    <div class="navbar-wrapper">
      <nav
        class="matecord-nav glass-navbar animate__animated animate__fadeInDown"
      >
        <!-- Brand / Logo -->
        <div class="nav-brand">
          <div class="logo-container">
            <v-img src="logo-matecord.png" class="nav-logo"></v-img>
            <div class="logo-glow"></div>
          </div>
          <div class="brand-text d-none d-sm-block">
            <h1 class="text-h5 font-weight-black mb-0">EduMath</h1>
            <span class="text-caption font-weight-bold">1,2,3 Aprende!</span>
          </div>
        </div>

        <v-spacer></v-spacer>

        <!-- Desktop Navigation Items -->
        <div v-if="$vuetify.display.mdAndUp" class="nav-links">
          <router-link
            v-for="item in navItems"
            :key="item.to"
            :to="item.to"
            class="nav-item"
            active-class="nav-item-active"
          >
            <v-icon size="20" class="nav-icon">{{ item.icon }}</v-icon>
            <span class="nav-label">{{ item.title }}</span>
          </router-link>
        </div>

        <v-spacer></v-spacer>

        <!-- User Section / Grade Badge -->
        <div class="nav-user">
          <div
            class="grade-badge d-none d-md-flex"
            :style="{ backgroundColor: currentTheme.primary }"
          >
            <span class="text-caption font-weight-black"
              >{{ selectedGrade }}°</span
            >
          </div>

          <!-- menu tipo mobil pelaos aqui estan los links como cambiar grado informacion y salir -->
          <!-- los que dicen title es el "titulo o lo q se vera en la etiqueta" -->

          <v-menu location="bottom end" transition="scale-transition">
            <template v-slot:activator="{ props }">
              <div v-bind="props" class="user-pill hover-scale cursor-pointer">
                <v-avatar
                  size="32"
                  :color="currentTheme.primary"
                  class="elevation-2"
                >
                  <v-icon color="white" size="18">mdi-account</v-icon>
                </v-avatar>
                <span class="userName d-none d-lg-block ml-2">{{
                  firstName
                }}</span>
                <v-icon size="16" class="ml-1">mdi-chevron-down</v-icon>
              </div>
            </template>
            <v-list class="rounded-xl mt-4 pa-2" elevation="12" width="220">
              <v-list-item
                prepend-icon="mdi-school"
                title="Cambiar Grado"
                to="/"
                rounded="lg"
              ></v-list-item>
              <v-list-item
                prepend-icon="mdi-information"
                title="Información"
                @click="showAboutDialog = true"
                rounded="lg"
              ></v-list-item>
              <v-divider class="my-2"></v-divider>
              <v-list-item
                prepend-icon="mdi-logout"
                title="Salir"
                color="error"
                @click="logout"
                rounded="lg"
              ></v-list-item>
            </v-list>
          </v-menu>

          <v-btn
            v-if="!$vuetify.display.mdAndUp"
            icon="mdi-menu"
            variant="text"
            :color="currentTheme.primary"
            class="ml-2"
            @click="drawer = !drawer"
          ></v-btn>
        </div>
      </nav>
    </div>

    <!-- Mobile Navigation Drawer -->
    <v-navigation-drawer
      v-model="drawer"
      location="right"
      temporary
      class="rounded-l-3xl"
      width="300"
    >
      <div class="pa-8 text-center">
        <v-avatar
          :color="currentTheme.primary"
          size="80"
          class="elevation-6 mb-4"
        >
          <v-img src="logo-matecord.png"></v-img>
        </v-avatar>
        <h3 class="text-h5 font-weight-black">{{ userName }}</h3>
        <p class="text-subtitle-2 text-medium-emphasis mb-6">
          {{ currentTheme.label }}
        </p>

        <v-divider class="mb-6"></v-divider>

        <v-list nav class="text-left pa-0">
          <v-list-item
            v-for="item in navItems"
            :key="item.to"
            :to="item.to"
            :prepend-icon="item.icon"
            :title="item.title"
            rounded="xl"
            class="mb-3 py-3"
            active-color="primary"
          ></v-list-item>
        </v-list>
      </div>
      <template v-slot:append>
        <div class="pa-8">
          <v-btn
            block
            color="error"
            variant="tonal"
            rounded="xl"
            @click="logout"
            size="large"
          >
            Cerrar Sesión
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <!-- Main Content -->
    <v-main class="matecord-main">
      <div class="content-wrapper">
        <router-view v-slot="{ Component }">
          <transition name="page-fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </v-main>

    <!-- Bottom Navigation for Mobile -->
    <v-bottom-navigation
      v-if="!$vuetify.display.mdAndUp"
      v-model="activeTab"
      color="primary"
      grow
      class="rounded-t-xl"
      elevation="10"
    >
      <v-btn
        v-for="item in navItems"
        :key="item.to"
        :to="item.to"
        :value="item.to"
      >
        <v-icon>{{ item.icon }}</v-icon>
        <span class="text-caption font-weight-bold">{{ item.title }}</span>
      </v-btn>
    </v-bottom-navigation>

    <!-- TARJETA TIPO DIALOG QUE ES SOBRE NOSOTROS -->
    <v-dialog v-model="showAboutDialog" max-width="600">
      <v-card class="rounded-3xl overflow-hidden border">
        <div
          class="pa-10 text-center text-white cordoba-bg"
          :style="{ backgroundColor: currentTheme.primary }"
        >
          <v-img
            src="logo-matecord.png"
            max-width="120"
            class="mx-auto mb-6"
          ></v-img>
          <h2 class="text-h3 font-weight-black mb-2">Edumath</h2>
          <p class="text-h6 opacity-80">1,2,3 Aprende!</p>
        </div>
        <v-card-text class="pa-10">
          <h3 class="text-h5 font-weight-bold mb-4">Pensar Numéricamente</h3>
          <p class="text-body-1 text-medium-emphasis mb-6">
            Transforma la enseñanza de las matemáticas integrando herramientas
            tecnológicas, creando una conexión real entre el estudiante, las
            matemáticas y la tecnología.
          </p>
          <div class="d-flex flex-wrap gap-2">
            <v-chip
              v-for="tag in ['Digital', 'Educativo', 'Cordobés']"
              :key="tag"
              variant="tonal"
              :color="currentTheme.primary"
              class="mr-2 mb-2"
            >
              {{ tag }}
            </v-chip>
          </div>
        </v-card-text>
        <v-card-actions class="pa-8 pt-0">
          <v-btn
            block
            :color="currentTheme.primary"
            size="large"
            variant="flat"
            rounded="xl"
            @click="showAboutDialog = false"
            >¡Vamos allá!</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-app>
  </template>
  
  <script setup>
  import { ref, onMounted, watch, computed } from "vue";
  import { useRouter, useRoute } from "vue-router";
  import { useDashboard } from "../composables/useDashboard";
  
  const router = useRouter();
  const route = useRoute();
  const drawer = ref(false);
  const showAboutDialog = ref(false);
  const activeTab = ref(null);
  
  const { userName, selectedGrade, currentTheme } = useDashboard();
  
  const firstName = computed(() => userName.value.split(" ")[0]);
  
  const navItems = computed(() => [
    {
      title: "Contenido",
      to: `/app/grado/${selectedGrade.value}`,
      icon: "mdi-auto-fix",
    },
    {
      title: "Actividades",
      to: `/app/grado/${selectedGrade.value}/actividades`,
      icon: "mdi-controller-classic",
    },
    {
      title: "Evaluación",
      to: `/app/grado/${selectedGrade.value}/evaluacion`,
      icon: "mdi-trophy-variant",
    },
    {
      title: "Retroalimentación",
      to: `/app/grado/${selectedGrade.value}/retroalimentacion`,
      icon: "mdi-heart-pulse",
    },
  ]);
  
  onMounted(() => {
    userName.value = localStorage.getItem("user_name") || "Estudiante";
    activeTab.value = route.path;
  });

  watch(() => route.path, (newPath) => {
    activeTab.value = newPath;
  });
  
  const logout = () => {
    localStorage.removeItem("user_name");
    localStorage.removeItem("user_grade");
    router.push("/");
  };
  </script>
  
  <style>
  @import url("https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;600;800&family=Outfit:wght@300;400;600;800&display=swap");
  
  :root {
    --primary: v-bind("currentTheme.primary");
    --secondary: v-bind("currentTheme.secondary");
  }
  
  .matecord-app {
    font-family: "Outfit", sans-serif !important;
    background-color: #f1f5f9 !important;
  }
  
  /* Redesigned Educational Navbar */
  .navbar-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    padding: 1.5rem;
    z-index: 2000;
    display: flex;
    justify-content: center;
    pointer-events: none;
  }
  
  @media (max-width: 600px) {
    .navbar-wrapper {
      padding: 0.75rem;
    }
  }
  
  .matecord-nav {
    width: 100%;
    max-width: 1200px;
    height: 70px;
    padding: 0 1.5rem;
    display: flex;
    align-items: center;
    border-radius: 20px;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(15px);
    border: 2px solid rgba(255, 255, 255, 0.5);
    box-shadow:
      0 10px 25px -5px rgba(0, 0, 0, 0.05),
      0 8px 10px -6px rgba(0, 0, 0, 0.05);
    position: relative;
    overflow: hidden;
    pointer-events: auto;
  }
  
  @media (max-width: 600px) {
    .matecord-nav {
      height: 56px;
      padding: 0 0.8rem;
      border-radius: 12px;
    }
    .brand-text h1 {
      font-size: 1.1rem !important;
    }
    .nav-logo {
      width: 36px;
      height: 36px;
    }
  }
  
  /* Subtle Sombrero Pattern Border */
  .matecord-nav::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: repeating-linear-gradient(
      45deg,
      #000,
      #000 4px,
      #fff 4px,
      #fff 8px
    );
    opacity: 0.1;
  }
  
  .nav-brand {
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: transform 0.2s ease;
  }
  
  .nav-brand:hover {
    transform: scale(1.02);
  }
  
  .logo-container {
    position: relative;
    margin-right: 12px;
  }
  
  .nav-logo {
    width: 45px;
    height: 45px;
    z-index: 2;
  }
  
  .logo-glow {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 30px;
    height: 30px;
    background: var(--primary);
    filter: blur(15px);
    opacity: 0.4;
    z-index: 1;
  }
  
  .brand-text h1 {
    font-family: "Bricolage Grotesque", sans-serif !important;
    font-size: 1.4rem !important;
    line-height: 1;
    color: #1e293b;
  }
  
  .brand-text span {
    letter-spacing: 2px;
    color: var(--primary);
    font-size: 0.65rem !important;
  }
  
  /* Educational Navigation Links */
  .nav-links {
    display: flex;
    gap: 8px;
    background: rgba(0, 0, 0, 0.03);
    padding: 6px;
    border-radius: 16px;
  }
  
  .nav-item {
    display: flex;
    align-items: center;
    padding: 0.6rem 1.2rem;
    border-radius: 12px;
    text-decoration: none;
    color: #64748b;
    font-weight: 700;
    font-size: 0.9rem;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .nav-item:hover {
    background: rgba(255, 255, 255, 0.5);
    color: #1e293b;
  }
  
  .nav-item-active {
    background: white !important;
    color: var(--primary) !important;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    transform: translateY(-2px);
  }
  
  .nav-icon {
    margin-right: 8px;
    transition: transform 0.3s ease;
  }
  
  .nav-item-active .nav-icon {
    transform: scale(1.2) rotate(-10deg);
  }
  
  /* User Pill & Grade Badge */
  .nav-user {
    display: flex;
    align-items: center;
  }
  
  .grade-badge {
    width: 32px;
    height: 32px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    margin-right: 12px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }
  
  .user-pill {
    display: flex;
    align-items: center;
    background: white;
    padding: 4px 12px 4px 4px;
    border-radius: 50px;
    border: 1px solid rgba(0, 0, 0, 0.05);
    transition: all 0.2s ease;
  }
  
  .user-pill:hover {
    background: #f8fafc;
    border-color: var(--primary);
  }
  
  .userName {
    font-weight: 800;
    color: #334155;
    font-size: 0.85rem;
  }
  
  /* Layout Specifics */
  .matecord-main {
    padding-top: 100px !important;
    padding-bottom: 70px !important; /* Spacing for bottom nav */
    background-image: url("@/assets/field-bg.png");
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    min-height: 100vh;
  }
  
  @media (max-width: 600px) {
    .matecord-main {
      padding-top: 80px !important;
    }
  }

  .matecord-main::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(241, 245, 249, 0.9);
    z-index: 0;
  }
  
  .content-wrapper {
    position: relative;
    z-index: 1;
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
  }

  @media (max-width: 600px) {
    .content-wrapper {
      padding: 1rem 0.5rem;
    }
  }
  
  /* Animations */
  .page-fade-enter-active,
  .page-fade-leave-active {
    transition: all 0.4s ease;
  }
  
  .page-fade-enter-from {
    opacity: 0;
    transform: translateY(15px) scale(0.98);
  }
  
  .page-fade-leave-to {
    opacity: 0;
    transform: translateY(-15px) scale(1.02);
  }
  
  .hover-scale:hover {
    transform: scale(1.05);
  }
  
  .rounded-3xl {
    border-radius: 30px !important;
  }
  
  .rounded-l-3xl {
    border-radius: 30px 0 0 30px !important;
  }

  /* Typography adjustment for mobile */
  @media (max-width: 600px) {
    .text-h1 { font-size: 2.5rem !important; }
    .text-h2 { font-size: 2.1rem !important; }
    .text-h3 { font-size: 1.8rem !important; }
    .text-h4 { font-size: 1.5rem !important; }
    .text-h5 { font-size: 1.2rem !important; }
    .text-h6 { font-size: 1rem !important; }
  }
  </style>
