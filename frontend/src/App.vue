<template>
  <v-app>
    <router-view />
    
    <!-- Easter Egg Modal -->
    <v-dialog v-model="showEasterEgg" max-width="500" persistent>
      <v-card class="bg-black rounded-xl overflow-hidden" elevation="24">
        <v-card-text class="pa-0 position-relative">
          <v-btn
            icon="mdi-close"
            variant="tonal"
            color="white"
            class="position-absolute z-index-10"
            style="top: 10px; right: 10px; z-index: 100;"
            @click="showEasterEgg = false"
            size="small"
          ></v-btn>
          <v-img
            src="/nexus.jpg"
            cover
            class="w-100"
            style="min-height: 400px; animation: pulseGlow 2s infinite alternate;"
          >
            <template v-slot:placeholder>
              <div class="d-flex align-center justify-center fill-height">
                <v-progress-circular color="primary" indeterminate></v-progress-circular>
              </div>
            </template>
          </v-img>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from "vue";

let pingInterval;

// Easter Egg Logic
const showEasterEgg = ref(false);
const secretCode = ['n', 'e', 'x', 'u', 's'];
let keyPresses = [];

const handleKeyDown = (e) => {
  if (!e.key) return;
  keyPresses.push(e.key.toLowerCase());
  if (keyPresses.length > secretCode.length) {
    keyPresses.shift();
  }
  if (keyPresses.join('') === secretCode.join('')) {
    showEasterEgg.value = true;
    keyPresses = []; // reset
  }
};

onMounted(() => {
  // Easter egg listener
  window.addEventListener('keydown', handleKeyDown);

  // Solo enviar latidos si no estamos en un entorno movil (Capacitor)
  // Esto evita errores innecesarios cuando corres la app como APK
  const isCapacitor = window.hasOwnProperty("Capacitor");

  if (!isCapacitor) {
    pingInterval = setInterval(() => {
      fetch("/api/ping").catch(() => {});
    }, 5000);
  }
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown);
  
  if (pingInterval) {
    clearInterval(pingInterval);
  }
});
</script>

<style>
@keyframes pulseGlow {
  0% { filter: drop-shadow(0 0 10px rgba(138, 43, 226, 0.5)); }
  100% { filter: drop-shadow(0 0 30px rgba(0, 255, 128, 0.8)); }
}
.z-index-10 {
  z-index: 10 !important;
}
</style>
