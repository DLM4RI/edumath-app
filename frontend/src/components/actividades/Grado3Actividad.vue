<template>
  <v-card
    class="mission-active-card rounded-xl overflow-hidden glass-card"
    :style="{ '--mission-color': mission.color }"
    elevation="6"
  >
    <!-- Borde animado superior -->
    <div class="active-card-glow"></div>

    <div
      class="pa-4 pa-md-8 position-relative z-1 text-center h-100 d-flex flex-column"
    >
      <!-- Pantalla de Inicio de Misión -->
      <div
        v-if="!practiceStarted"
        class="d-flex flex-column align-center justify-center flex-grow-1 py-10"
      >
        <div class="rocket-container mb-8">
          <div class="rocket-pulse"></div>
          <v-icon
            size="160"
            :color="mission.color"
            class="rocket-icon animate__animated animate__bounceIn"
            >mdi-rocket-launch</v-icon
          >
        </div>
        <h3
          class="text-h2 md-text-h1 font-weight-black mb-4 text-grey-darken-4"
        >
          ¡Preparando Nave!
        </h3>
        <p
          class="text-h5 text-medium-emphasis mb-12 max-width-600 mx-auto font-weight-medium"
        >
          Bienvenido a la misión de Grado 3. Resolverás problemas aditivos, multiplicativos y de comparación en diferentes contextos.
        </p>

        <div class="position-relative">
          <div class="start-btn-glow"></div>
          <v-btn
            size="x-large"
            :color="mission.color"
            class="text-white font-weight-black px-10 rounded-pill text-none text-h6 btn-start-pulse"
            elevation="8"
            height="64"
            @click="practiceStarted = true"
          >
            <v-icon start size="28" class="mr-2">mdi-play-circle</v-icon>
            Comenzar Aventura
          </v-btn>
        </div>
      </div>

      <!-- Pantalla de Preguntas -->
      <div
        v-else-if="!showResults"
        class="d-flex flex-column flex-grow-1 animate__animated animate__fadeIn"
      >
        <div
          class="d-flex flex-column flex-sm-row justify-space-between align-center mb-10 w-100 top-status-bar pa-4 rounded-xl elevation-2"
        >
          <div class="d-flex align-center mb-4 mb-sm-0">
            <v-avatar
              :color="mission.color"
              size="56"
              class="elevation-4 mr-4"
              style="border: 3px solid white"
            >
              <v-icon color="white" size="32">mdi-rocket-launch</v-icon>
            </v-avatar>
            <div class="text-left">
              <div
                class="text-caption font-weight-black text-grey-darken-1 text-uppercase tracking-wide"
              >
                Misión Actual
              </div>
              <div class="text-h6 font-weight-black text-grey-darken-4">
                Nivel {{ currentQuestionIndex + 1 }}
              </div>
            </div>
          </div>

          <div
            class="progress-container flex-grow-1 ml-sm-8"
            style="max-width: 400px; min-width: 250px"
          >
            <div class="d-flex justify-space-between w-100 mb-2">
              <span
                class="text-caption font-weight-bold text-grey-darken-1"
                >Progreso de la misión</span
              >
              <span
                class="text-caption font-weight-black"
                :style="{ color: mission.color }"
                >{{ currentQuestionIndex + 1 }} / 5</span
              >
            </div>
            <div class="custom-progress-track">
              <div
                class="custom-progress-fill"
                :style="{
                  width: `${((currentQuestionIndex + 1) / 5) * 100}%`,
                  backgroundColor: mission.color,
                }"
              >
                <v-icon
                  size="16"
                  color="white"
                  class="progress-star"
                  >mdi-star</v-icon
                >
              </div>
            </div>
          </div>
        </div>

        <div class="exercise-content flex-grow-1 py-4">
          <!-- Holographic Question Panel -->
          <div
            class="question-panel mb-10 pa-8 rounded-xl border-md"
            :style="{ borderColor: `${mission.color}44` }"
          >
            <div
              class="panel-corner top-left"
              :style="{ borderColor: mission.color }"
            ></div>
            <div
              class="panel-corner bottom-right"
              :style="{ borderColor: mission.color }"
            ></div>
            <h4
              class="text-h4 md-text-h3 font-weight-black text-center text-grey-darken-3"
              style="line-height: 1.4"
              v-html="currentQuestion.question"
            ></h4>
            <div v-if="currentQuestion.image" class="mt-6 text-center">
              <v-img :src="currentQuestion.image" max-height="200" contain class="rounded-lg mx-auto"></v-img>
            </div>
          </div>

          <v-expand-transition>
            <div
              v-if="showHint"
              class="mb-10 hint-transmission rounded-xl d-flex align-center text-left"
            >
              <div
                class="hint-icon-wrapper bg-amber pa-4 rounded-s-xl d-flex align-center justify-center h-100"
              >
                <v-icon
                  color="white"
                  size="40"
                  class="animate__animated animate__swing animate__infinite"
                  >mdi-robot-happy</v-icon
                >
              </div>
              <div
                class="pa-5 flex-grow-1 bg-amber-lighten-5 rounded-e-xl border-y border-r border-amber-lighten-3"
              >
                <div
                  class="text-amber-darken-4 font-weight-black text-subtitle-1 mb-1 text-uppercase tracking-wide"
                >
                  <v-icon size="18" class="mr-1"
                    >mdi-radio-tower</v-icon
                  >
                  Transmisión de Copiloto
                </div>
                <p
                  class="text-h6 text-amber-darken-3 mb-0 font-weight-medium"
                  style="line-height: 1.4"
                >
                  {{ currentQuestion.hint }}
                </p>
              </div>
            </div>
          </v-expand-transition>

          <!-- Tipo Input / Rellenar el espacio -->
          <v-row justify="center" class="px-md-4" v-if="currentQuestion.interactionType === 'input'">
            <v-col cols="12" sm="8" md="6">
              <v-text-field
                v-model="selectedOption"
                label="Escribe tu respuesta"
                variant="outlined"
                size="x-large"
                class="text-h4 font-weight-bold game-input"
                :color="mission.color"
                clearable
                @keyup.enter="checkAnswer"
              ></v-text-field>
            </v-col>
          </v-row>

          <!-- Tipo Opciones Múltiples (por defecto) -->
          <v-row justify="center" class="px-md-4" v-else>
            <v-col
              v-for="(opt, i) in currentQuestion.options"
              :key="i"
              cols="12"
              sm="6"
              lg="5"
            >
              <button
                class="game-option-btn w-100"
                :class="{ selected: selectedOption === opt }"
                :style="{ '--opt-color': mission.color }"
                @click="selectedOption = opt"
              >
                <div
                  class="opt-content d-flex align-center justify-center pa-6 rounded-xl"
                >
                  <span class="text-h5 font-weight-black">{{
                    opt
                  }}</span>
                </div>
                <div class="opt-shadow rounded-xl"></div>
              </button>
            </v-col>
          </v-row>
        </div>

        <div class="mt-10 mb-4 text-center">
          <v-btn
            size="x-large"
            :color="
              selectedOption
                ? mission.color
                : 'grey-lighten-2'
            "
            class="px-10 rounded-pill font-weight-black text-none text-h6 confirm-btn"
            :class="{
              'text-white elevation-8 active-confirm':
                selectedOption,
              'text-grey-darken-1': !selectedOption,
            }"
            :disabled="!selectedOption"
            height="64"
            @click="checkAnswer"
          >
            Confirmar Respuesta
            <v-icon end size="28" class="ml-2"
              >mdi-check-decagram</v-icon
            >
          </v-btn>
        </div>
      </div>

      <!-- Pantalla de Resultados -->
      <div
        v-else
        class="results-summary animate__animated animate__zoomIn py-10 d-flex flex-column align-center justify-center flex-grow-1"
      >
        <div class="trophy-container mb-6 position-relative">
          <div class="confetti-bg"></div>
          <v-icon
            size="180"
            color="warning"
            class="animate__animated animate__tada animate__infinite"
            style="
              filter: drop-shadow(
                0 10px 20px rgba(245, 158, 11, 0.4)
              );
            "
            >mdi-trophy-award</v-icon
          >
        </div>

        <h3
          class="text-h2 md-text-h1 font-weight-black mb-4 text-gradient"
        >
          ¡Misión Cumplida!
        </h3>
        <p
          class="text-h5 text-medium-emphasis mb-10 font-weight-medium"
        >
          ¡Felicidades astronauta! Has superado todos los desafíos
          estelares.
        </p>

        <div
          class="score-ring mb-12 d-flex flex-column justify-center align-center"
          :style="{
            borderColor: mission.color,
            boxShadow: `0 0 40px ${mission.color}66`,
          }"
        >
          <div
            class="text-h1 font-weight-black mb-1"
            :style="{ color: mission.color }"
          >
            {{ score }}
            <span class="text-h3 text-grey-lighten-2">/ 5</span>
          </div>
          <div
            class="text-subtitle-1 font-weight-black text-grey-darken-1 text-uppercase tracking-wide"
          >
            Estrellas
          </div>
        </div>

        <v-row justify="center" class="w-100 max-width-600">
          <v-col cols="12" sm="6">
            <v-btn
              block
              size="x-large"
              variant="outlined"
              :color="mission.color"
              class="rounded-xl font-weight-black text-none border-md py-6 text-h6"
              @click="resetPractice"
            >
              <v-icon start class="mr-2">mdi-reload</v-icon> Repetir
            </v-btn>
          </v-col>
          <v-col cols="12" sm="6">
            <v-btn
              block
              size="x-large"
              :color="mission.color"
              class="rounded-xl font-weight-black text-none text-white elevation-6 btn-hover py-6 text-h6"
              @click="$emit('back')"
            >
              <v-icon start class="mr-2">mdi-map-search</v-icon> Más
              Misiones
            </v-btn>
          </v-col>
        </v-row>
      </div>
    </div>
  </v-card>
  <v-snackbar
    v-model="snackbar.show"
    :color="snackbar.color"
    rounded="pill"
    elevation="10"
    location="top"
    timeout="3000"
  >
    <div
      class="text-center font-weight-black text-h6 py-2 d-flex align-center justify-center"
    >
      <v-icon start size="28" class="mr-3">{{ snackbar.icon }}</v-icon>
      {{ snackbar.text }}
    </div>
  </v-snackbar>
</template>

<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  mission: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["back"]);

const practiceStarted = ref(false);
const selectedOption = ref(null);
const currentQuestionIndex = ref(0);
const score = ref(0);
const showResults = ref(false);
const showHint = ref(false);
const snackbar = ref({
  show: false,
  text: "",
  color: "success",
  icon: "mdi-check",
});

const currentQuestion = computed(() => {
  return props.mission?.exercises?.[currentQuestionIndex.value] || {};
});

const checkAnswer = () => {
  if (!selectedOption.value) return;

  const isCorrect = String(selectedOption.value).trim().toLowerCase() === String(currentQuestion.value.answer).trim().toLowerCase()

  if (isCorrect) {
    score.value++;
    showHint.value = false;
    snackbar.value = {
      show: true,
      text: "¡Increíble! Respuesta correcta. 🚀",
      color: "success",
      icon: "mdi-star-shooting",
    };
    nextQuestion();
  } else {
    showHint.value = true;
    snackbar.value = {
      show: true,
      text: "¡Casi! Inténtalo de nuevo.",
      color: "error",
      icon: "mdi-alert-circle",
    };
  }
};

const nextQuestion = () => {
  setTimeout(() => {
    if (currentQuestionIndex.value < props.mission.exercises.length - 1) {
      currentQuestionIndex.value++;
      selectedOption.value = null;
    } else {
      showResults.value = true;
    }
  }, 1000);
};

const resetPractice = () => {
  practiceStarted.value = false;
  currentQuestionIndex.value = 0;
  score.value = 0;
  selectedOption.value = null;
  showResults.value = false;
  showHint.value = false;
};
</script>

<style>
@import './actividad-styles.css';
</style>
