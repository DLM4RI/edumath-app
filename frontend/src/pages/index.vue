<template>
  <v-container fluid class="login-app-content pa-0 ma-0">
    <v-row class="fill-height ma-0" align="center" justify="center">
      <v-col cols="12" sm="10" md="6" lg="4" class="d-flex justify-center">
        <v-card
          class="login-card pa-6 pa-md-10 rounded-xl"
          elevation="12"
          width="100%"
          max-width="520"
        >
          <div class="text-center mb-6">
            <v-avatar color="primary" size="64" class="mb-4 elevation-4">
              <v-icon size="32" color="white">mdi-math-compass</v-icon>
            </v-avatar>

            <h1 class="text-h4 font-weight-black tracking-tight mb-2">
              Aventura Matemática
            </h1>

            <p class="text-body-1 text-medium-emphasis">
              Ingresa tus datos para comenzar a aprender
            </p>
          </div>

          <v-form @submit.prevent="handleLogin" v-model="isFormValid">
            <v-text-field
              v-model="fullName"
              label="Tu Nombre"
              placeholder="Ej. Juan Pérez"
              variant="outlined"
              color="primary"
              rounded="lg"
              prepend-inner-icon="mdi-account"
              :rules="[(v) => !!v || 'El nombre es obligatorio']"
              required
              class="mb-4"
            />

            <p
              class="text-caption font-weight-bold text-uppercase text-grey mb-2 ml-1"
            >
              Selecciona tu grado
            </p>

            <v-item-group v-model="selectedGrade" mandatory class="mb-8">
              <v-row dense>
                <v-col
                  v-for="n in 5"
                  :key="n"
                  cols="4"
                  sm="2"
                  class="flex-grow-1"
                >
                  <v-item v-slot="{ isSelected, toggle }" :value="n">
                    <v-card
                      :color="isSelected ? 'primary' : 'grey-lighten-4'"
                      :class="[
                        'd-flex align-center justify-center rounded-lg cursor-pointer transition-swing',
                        isSelected ? 'elevation-4' : 'elevation-0',
                      ]"
                      height="60"
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
                </v-col>
              </v-row>
            </v-item-group>

            <v-btn
              block
              size="x-large"
              color="primary"
              type="submit"
              class="text-none font-weight-bold rounded-xl py-6"
              :disabled="!isFormValid"
              :loading="loading"
              elevation="8"
            >
              ¡Comenzar Clase!
              <v-icon end>mdi-rocket-launch</v-icon>
            </v-btn>
          </v-form>

          <div class="text-center mt-8">
            <v-chip
              variant="tonal"
              color="secondary"
              size="small"
              class="font-weight-bold"
            >
              MINISTERIO DE EDUCACIÓN • COLOMBIA
            </v-chip>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <div class="bg-shape shape-1"></div>
    <div class="bg-shape shape-2"></div>
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

const handleLogin = () => {
  if (fullName.value.trim()) {
    loading.value = true;

    userName.value = fullName.value;
    dashboardGrade.value = selectedGrade.value;

    localStorage.setItem("user_name", fullName.value);
    localStorage.setItem("user_grade", selectedGrade.value.toString());

    setTimeout(() => {
      router.push(`/app/grado${selectedGrade.value}`);
    }, 800);
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
  background-color: #f8fafc !important;
}

.login-card {
  background: rgba(255, 255, 255, 0.9) !important;
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  z-index: 2;
  position: relative;
}

.bg-shape {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.35;
  z-index: 1;
}

.shape-1 {
  width: 400px;
  height: 400px;
  background: #6366f1;
  top: -120px;
  left: -120px;
}

.shape-2 {
  width: 500px;
  height: 500px;
  background: #ec4899;
  bottom: -160px;
  right: -160px;
}

.tracking-tight {
  letter-spacing: -0.05em !important;
}
</style>
