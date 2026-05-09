<template>
  <div class="retroalimentacion-page">
    <div v-if="!hasActivity" class="locked-state text-center py-16">
      <v-icon size="100" color="grey-lighten-2" class="mb-6">mdi-lock-outline</v-icon>
      <h2 class="text-h4 font-weight-black text-grey-darken-1 mb-4">Sección Bloqueada</h2>
      <p class="text-h6 text-medium-emphasis mb-8">
        Debes completar al menos una actividad o la evaluación para ver tu retroalimentación.
      </p>
      <v-btn 
        :to="`/app/grado${id}/actividades`" 
        color="primary" 
        size="large" 
        rounded="xl"
        class="px-8 font-weight-bold"
      >
        Ir a Actividades
      </v-btn>
    </div>

    <div v-else class="unlocked-state">
      <header class="mb-10">
        <h1 class="text-h3 font-weight-black mb-2">Tu Progreso en MateCord</h1>
        <p class="text-h6 text-medium-emphasis">Analicemos cómo te fue en tus misiones.</p>
      </header>

      <v-row>
        <!-- Performance Summary -->
        <v-col cols="12" md="4">
          <v-card class="rounded-3xl pa-8 text-center glass-card h-100" border="1">
            <h3 class="text-h5 font-weight-bold mb-6">Desempeño General</h3>
            <v-progress-circular
              :rotate="360"
              :size="150"
              :width="15"
              :model-value="85"
              color="success"
            >
              <template v-slot:default>
                <div class="text-h4 font-weight-black">85%</div>
              </template>
            </v-progress-circular>
            <p class="mt-6 text-body-1 font-weight-medium">¡Vas por muy buen camino, {{ firstName }}!</p>
          </v-card>
        </v-col>

        <!-- Concepts to Improve -->
        <v-col cols="12" md="8">
          <v-card class="rounded-3xl pa-8 glass-card h-100" border="1">
            <h3 class="text-h5 font-weight-bold mb-6 d-flex align-center">
              <v-icon color="warning" class="mr-2">mdi-lightbulb-on</v-icon>
              Conceptos por mejorar
            </h3>
            
            <v-list class="bg-transparent">
              <v-list-item 
                v-for="(concept, i) in conceptsToImprove" 
                :key="i"
                class="mb-4 rounded-xl border pa-4"
              >
                <template v-slot:prepend>
                  <v-avatar color="warning-lighten-4" class="mr-4">
                    <v-icon color="warning">mdi-alert-circle-outline</v-icon>
                  </v-avatar>
                </template>
                <v-list-item-title class="font-weight-bold mb-1">{{ concept.title }}</v-list-item-title>
                <v-list-item-subtitle class="text-wrap">{{ concept.description }}</v-list-item-subtitle>
                <template v-slot:append>
                  <v-btn 
                    variant="tonal" 
                    color="primary" 
                    rounded="lg" 
                    size="small"
                    :to="concept.link"
                  >
                    Reforzar
                  </v-btn>
                </template>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
      </v-row>

      <!-- Action Footer -->
      <div class="mt-12 text-center">
        <v-btn 
          :to="`/app/grado${id}`" 
          variant="flat" 
          color="primary" 
          size="x-large" 
          rounded="xl" 
          class="px-12 font-weight-bold"
        >
          Volver al Contenido
          <v-icon end>mdi-book-open-page-variant</v-icon>
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useDashboard } from '../../composables/useDashboard'

const route = useRoute()
const id = ref(route.params.id || '1')
const { userName } = useDashboard()

const firstName = computed(() => userName.value.split(' ')[0])

// Simulación de estado. En una app real esto vendría de un store o backend.
const hasActivity = ref(true) 

const conceptsToImprove = [
  { 
    title: 'Suma de Decenas', 
    description: 'Recuerda que al sumar decenas, estamos agrupando grupos de 10 elementos.',
    link: `/app/grado${id.value}?tab=texto` 
  },
  { 
    title: 'Identificación de Triángulos', 
    description: 'Los triángulos tienen 3 lados y 3 vértices. ¡Busca formas similares en el campo!',
    link: `/app/grado${id.value}?tab=videos` 
  }
]
</script>

<style scoped>
.retroalimentacion-page {
  animation: fadeIn 0.8s ease-out;
}

.glass-card {
  background: rgba(255, 255, 255, 0.8) !important;
  backdrop-filter: blur(10px);
}

.locked-state {
  background: rgba(255, 255, 255, 0.5);
  border-radius: 32px;
  border: 2px dashed rgba(0, 0, 0, 0.1);
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
