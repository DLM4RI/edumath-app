<template>
  <v-card class="pa-4 pa-md-8 rounded-3xl glass-card overflow-hidden" border="1">
    <div class="text-center mb-6">
      <v-chip color="deep-orange-darken-2" variant="flat" class="mb-4 px-6 font-weight-black">
        🏷️ EL DESAFÍO DEL PORCENTAJE
      </v-chip>
      <h2 class="text-h4 font-weight-black mb-2">¡Gran Rebaja Galáctica!</h2>
      <p class="text-h6 text-medium-emphasis">
        Calcula el precio final del producto aplicando el descuento.
      </p>
    </div>

    <!-- AREA DE JUEGO -->
    <v-row justify="center">
      <!-- Producto -->
      <v-col cols="12" md="5">
        <v-card variant="flat" class="pa-6 rounded-2xl bg-deep-orange-lighten-5 border-md border-deep-orange-lighten-3 text-center h-100">
          <v-icon size="100" color="deep-orange">{{ currentChallenge.icon }}</v-icon>
          <div class="text-h4 font-weight-black mt-4">{{ currentChallenge.name }}</div>
          <div class="text-h3 font-weight-black text-grey-darken-1 mt-2" style="text-decoration: line-through;">
            ${{ currentChallenge.price }}
          </div>
          <v-chip color="error" variant="flat" class="mt-4 font-weight-black text-h5 py-6 px-8" rounded="xl">
            - {{ currentChallenge.discount }}% OFF
          </v-chip>
        </v-card>
      </v-col>

      <!-- Panel de Cálculo -->
      <v-col cols="12" md="7">
        <v-card variant="outlined" class="pa-8 rounded-2xl bg-white border-dashed h-100">
          <div class="text-h5 font-weight-black mb-6">¿Cuál es el precio final?</div>
          
          <v-text-field
            v-model="userAnswer"
            label="Precio con descuento"
            variant="outlined"
            prefix="$"
            type="number"
            class="text-h4 font-weight-black mb-6"
            @keyup.enter="checkAnswer"
          ></v-text-field>

          <v-btn
            block
            color="deep-orange-darken-2"
            size="x-large"
            class="rounded-xl font-weight-black py-8"
            @click="checkAnswer"
          >
            Comprar ahora
          </v-btn>

          <v-expand-transition>
            <div v-if="feedback" class="mt-6">
              <v-alert :type="feedback.type" variant="tonal" class="rounded-xl">
                {{ feedback.text }}
              </v-alert>
            </div>
          </v-expand-transition>
        </v-card>
      </v-col>
    </v-row>

    <!-- FEEDBACK FINAL -->
    <v-fade-transition>
      <div v-if="isComplete" class="text-center mt-10">
        <v-alert
          type="success"
          variant="flat"
          class="rounded-xl mb-6 py-6"
          icon="mdi-cart-percent"
        >
          <div class="text-h5 font-weight-black">¡Comprador Inteligente!</div>
          <div class="text-body-1">Manejas los descuentos y porcentajes como un profesional.</div>
        </v-alert>

        <v-btn
          color="success"
          size="x-large"
          class="rounded-xl px-12 font-weight-black"
          elevation="8"
          @click="$emit('completada')"
        >
          ¡Siguiente Misión! <v-icon end>mdi-chevron-right</v-icon>
        </v-btn>
      </div>
    </v-fade-transition>
  </v-card>
</template>

<script setup>
import { ref, computed } from "vue";

defineEmits(["completada"]);

const challenges = [
  { name: "Casco Espacial", icon: "mdi-racing-helmet", price: 100, discount: 10, answer: 90 },
  { name: "Botas Magnéticas", icon: "mdi-shoe-sneaker", price: 200, discount: 25, answer: 150 },
  { name: "Mochila Jet", icon: "mdi-bag-personal", price: 500, discount: 50, answer: 250 },
  { name: "Guantes Térmicos", icon: "mdi-mitten", price: 80, discount: 20, answer: 64 },
];

const currentIndex = ref(0);
const userAnswer = ref("");
const solvedCount = ref(0);
const feedback = ref(null);

const shuffledChallenges = ref([...challenges].sort(() => Math.random() - 0.5));
const currentChallenge = computed(() => shuffledChallenges.value[currentIndex.value]);
const isComplete = computed(() => solvedCount.value === challenges.length);

const checkAnswer = () => {
  if (parseInt(userAnswer.value) === currentChallenge.value.answer) {
    feedback.value = { type: "success", text: "¡Excelente! Cálculo exacto." };
    setTimeout(() => {
      solvedCount.value++;
      if (currentIndex.value < challenges.length - 1) {
        currentIndex.value++;
        userAnswer.value = "";
        feedback.value = null;
      }
    }, 1500);
  } else {
    feedback.value = { type: "error", text: "Ups, revisa el descuento." };
    setTimeout(() => {
      feedback.value = null;
    }, 2000);
  }
};
</script>

<style scoped>
.glass-card {
  background: rgba(255, 255, 255, 0.9) !important;
  backdrop-filter: blur(10px);
}
</style>
