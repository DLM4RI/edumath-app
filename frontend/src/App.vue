<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';

let pingInterval;

onMounted(() => {
  // Enviar un "latido" cada 5 segundos al servidor Go.
  // Si cerramos la pestaña, los latidos se detienen y el backend de Go se apagará solo.
  pingInterval = setInterval(() => {
    fetch('/api/ping').catch(() => {});
  }, 5000);
});

onUnmounted(() => {
  if (pingInterval) {
    clearInterval(pingInterval);
  }
});
</script>