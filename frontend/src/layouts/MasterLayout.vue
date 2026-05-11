<template>
  <component :is="layout" />
</template>

<script setup>
import { computed } from 'vue';
import { useDisplay } from 'vuetify';
import DesktopLayout from './dashboard.vue';
import MobileLayout from './MobileLayout.vue';

const { mdAndUp } = useDisplay();

const layout = computed(() => {
  return mdAndUp.value ? DesktopLayout : MobileLayout;
});
</script>
