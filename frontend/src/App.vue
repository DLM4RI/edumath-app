<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<script setup>
import { onMounted, onUnmounted } from "vue";

let pingInterval;

onMounted(() => {
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
  if (pingInterval) {
    clearInterval(pingInterval);
  }
});
</script>
