<template>
  <div class="contenido-page">
    <component 
      :is="currentContentComponent" 
      :grado="id"
    />
  </div>
</template>

<script setup>
import { ref, computed, defineAsyncComponent } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const id = ref(route.params.id || '1')

// Mapeo explícito de componentes para asegurar que Vite los incluya correctamente en el build
const contentComponents = {
  '1': defineAsyncComponent(() => import('../../components/contenidos/grados/Grado1/Contenido.vue')),
  '2': defineAsyncComponent(() => import('../../components/contenidos/grados/Grado2/Contenido.vue')),
  '3': defineAsyncComponent(() => import('../../components/contenidos/grados/Grado3/Contenido.vue')),
  '4': defineAsyncComponent(() => import('../../components/contenidos/grados/Grado4/Contenido.vue')),
  '5': defineAsyncComponent(() => import('../../components/contenidos/grados/Grado5/Contenido.vue')),
}

const currentContentComponent = computed(() => {
  return contentComponents[id.value] || contentComponents['1']
})
</script>

<style scoped>
.contenido-page {
  animation: fadeIn 0.8s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
