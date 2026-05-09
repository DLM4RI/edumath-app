<template>
  <v-container fluid class="login-app-content pa-0 ma-0">
    <v-row class="fill-height ma-0" align="center" justify="center">
      <v-col
        cols="12"
        sm="11"
        md="10"
        lg="8"
        class="d-flex justify-center pa-4"
      >
        <v-card
          class="login-card rounded-3xl overflow-hidden"
          elevation="24"
          width="100%"
          max-width="1000"
        >
          <v-row no-gutters>
            <!-- Left Side: Branding/Illustration -->
            <v-col
              cols="12"
              md="5"
              class="d-none d-md-flex flex-column justify-center align-center branding-side pa-10"
            >
              <v-img
                src="/logo-matecord.png"
                width="180"
                class="mb-6 animate-bounce-soft"
              ></v-img>
              <h2 class="text-h3 font-weight-black text-white text-center mb-2">
                EduMath
              </h2>
              <p class="text-h6 text-white text-center opacity-80 px-4">
                1,2,3 Aprende!
              </p>
              <div class="mt-8 d-flex gap-4">
                <v-icon color="white" size="32" class="opacity-60"
                  >mdi-cow</v-icon
                >
                <v-icon color="white" size="32" class="opacity-60"
                  >mdi-sprout</v-icon
                >
                <v-icon color="white" size="32" class="opacity-60"
                  >mdi-pickaxe</v-icon
                >
              </div>
            </v-col>

            <!-- Right Side: Login Form -->
            <v-col cols="12" md="7" class="pa-6 pa-md-12 bg-white">
              <div class="text-center text-md-left mb-8">
                <v-avatar
                  color="primary"
                  size="64"
                  class="mb-4 elevation-4 d-md-none"
                >
                  <v-img src="/logo-matecord.png"></v-img>
                </v-avatar>
                <h1 class="text-h4 font-weight-black tracking-tight mb-2">
                  ¡Bienvenidos!
                </h1>
                <p class="text-body-1 text-medium-emphasis">
                  Ingresa tus datos para comenzar tu aventura matemática.
                </p>
              </div>

              <v-form @submit.prevent="handleLogin" v-model="isFormValid">
                <v-text-field
                  v-model="fullName"
                  label="¿Cómo te llamas?"
                  placeholder="Ej. Manuelita"
                  variant="outlined"
                  color="primary"
                  rounded="xl"
                  persistent-placeholder
                  prepend-inner-icon="mdi-account-circle"
                  :rules="[(v) => !!v || 'Dinos tu nombre para empezar']"
                  required
                  class="mb-6"
                />

                <p
                  class="text-subtitle-2 font-weight-bold text-uppercase text-grey-darken-1 mb-4 ml-1"
                >
                  Selecciona tu grado escolar
                </p>

                <v-item-group v-model="selectedGrade" mandatory class="mb-8">
                  <div class="grade-selector-grid">
                    <v-item
                      v-for="n in 5"
                      :key="n"
                      v-slot="{ isSelected, toggle }"
                      :value="n"
                    >
                      <v-card
                        :color="isSelected ? 'primary' : 'grey-lighten-4'"
                        :class="[
                          'grade-card d-flex align-center justify-center rounded-xl cursor-pointer transition-all',
                          isSelected ? 'elevation-8' : 'elevation-0',
                        ]"
                        @click="toggle"
                      >
                        <span
                          :class="[
                            'text-h6 font-weight-black',
                            isSelected ? 'text-white' : 'text-grey-darken-1',
                          ]"
                        >
                          {{ n }}°
                        </span>
                      </v-card>
                    </v-item>
                  </div>
                </v-item-group>

                <v-btn
                  block
                  size="x-large"
                  color="primary"
                  type="submit"
                  class="text-none font-weight-bold rounded-xl py-8 mt-4"
                  :disabled="!isFormValid || loading"
                  :loading="loading"
                  elevation="8"
                >
                  ¡Empezar Clase!
                  <v-icon end class="ml-2">mdi-arrow-right-circle</v-icon>
                </v-btn>
              </v-form>

              <div class="text-center mt-10">
                <p class="text-caption font-weight-bold text-grey-lighten-1">
                  INSTITUCIÓN EDUCATIVA DE CÓRDOBA
                </p>
              </div>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

    <!-- Decorative Elements -->
    <div class="decoration-cow d-none d-lg-block">
      <v-icon size="120" color="grey" class="opacity-10">mdi-cow</v-icon>
    </div>
    <div class="decoration-tree d-none d-lg-block">
      <v-icon size="100" color="secondary" class="opacity-10"
        >mdi-tree-outline</v-icon
      >
    </div>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useDashboard } from "../composables/useDashboard";

const router = useRouter();
const { userName, selectedGrade: dashboardGrade } = useDashboard();

const fullName = ref("");
const selectedGrade = ref(1);
const isFormValid = ref(false);
const loading = ref(false);

onMounted(() => {
  const savedName = localStorage.getItem("user_name");
  const savedGrade = localStorage.getItem("user_grade");

  if (savedName) fullName.value = savedName;
  if (savedGrade) selectedGrade.value = Number(savedGrade);
});

const handleLogin = async () => {
  if (fullName.value.trim() && isFormValid.value) {
    loading.value = true;

    try {
      // Guardar en el store y localStorage
      userName.value = fullName.value;
      dashboardGrade.value = selectedGrade.value;
      localStorage.setItem("user_name", fullName.value);
      localStorage.setItem("user_grade", selectedGrade.value.toString());

      // Redirección inmediata (con la ruta corregida para producción)
      await router.push(`/app/grado/${selectedGrade.value}`);
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    } finally {
      loading.value = false;
    }
  }
};
</script>

<style scoped>
.login-app-content {
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  background: #f1f5f9;
  background-image: url("/field-bg.png");
  background-size: cover;
  background-position: center;
}

.login-app-content::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(4px);
  z-index: 0;
}

.login-card {
  background: rgba(255, 255, 255, 0.95) !important;
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  z-index: 2;
  position: relative;
}

.branding-side {
  background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
  position: relative;
  overflow: hidden;
}

.branding-side::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url("/field-bg.png");
  opacity: 0.15;
  background-size: cover;
  background-position: center;
}

.grade-selector-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(64px, 1fr));
  gap: 12px;
}

@media (max-width: 600px) {
  .grade-selector-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.grade-card {
  height: 60px;
  min-width: 60px;
}

.grade-card:hover {
  transform: translateY(-4px);
}

.animate-bounce-soft {
  animation: bounce-soft 3s infinite ease-in-out;
}

@keyframes bounce-soft {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-15px);
  }
}

.decoration-cow {
  position: absolute;
  bottom: 5%;
  left: 5%;
  z-index: 1;
}

.decoration-tree {
  position: absolute;
  top: 5%;
  right: 5%;
  z-index: 1;
}

.tracking-tight {
  letter-spacing: -0.05em !important;
}

.rounded-3xl {
  border-radius: 32px !important;
}
</style>
