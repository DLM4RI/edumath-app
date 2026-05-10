<template>
  <v-card class="pa-4 pa-md-8 rounded-3xl glass-card overflow-hidden" border="1">
    <div class="text-center mb-6">
      <v-chip color="orange-darken-2" variant="flat" class="mb-4 px-6 font-weight-black">
        🎉 EL FESTIVAL DE LOS CONJUNTOS
      </v-chip>
      <h2 class="text-h4 font-weight-black mb-2">{{ currentMission.title }}</h2>
      <p class="text-h6 text-medium-emphasis">
        {{ currentMission.instruction }} <strong>{{ currentMission.target }} {{ currentMission.itemName }}</strong>.
      </p>
    </div>

    <!-- ZONA DE JUEGO -->
    <v-row>
      <!-- Fuente de Objetos -->
      <v-col cols="12" md="6">
        <v-card variant="outlined" class="pa-4 rounded-2xl bg-grey-lighten-4 border-dashed h-100">
          <div class="text-subtitle-2 font-weight-black mb-4 text-center">Toca para atrapar:</div>
          <div class="d-flex flex-wrap justify-center gap-3">
            <v-btn
              v-for="(item, index) in sourceItems"
              :key="index"
              icon
              size="x-large"
              color="white"
              elevation="2"
              class="emoji-btn"
              @click="moveItem(index)"
              :disabled="isComplete"
            >
              <span class="text-h4">{{ item }}</span>
            </v-btn>
          </div>
        </v-card>
      </v-col>

      <!-- El Conjunto (Destino) -->
      <v-col cols="12" md="6">
        <v-card variant="flat" class="pa-4 rounded-2xl bg-orange-lighten-5 border-sm border-orange-lighten-3 h-100 d-flex flex-column">
          <div class="text-subtitle-2 font-weight-black mb-4 text-center">Tu Conjunto:</div>
          <div class="flex-grow-1 d-flex flex-wrap justify-center align-center gap-3 content-area">
            <v-scale-transition group>
              <div
                v-for="(item, index) in targetItems"
                :key="'target-' + index"
                class="emoji-in-set"
              >
                <span class="text-h4">{{ item }}</span>
              </div>
            </v-scale-transition>
            <div v-if="targetItems.length === 0" class="text-caption text-medium-emphasis">
              El conjunto está vacío...
            </div>
          </div>
          
          <div class="mt-4 text-center">
            <v-chip :color="targetItems.length === currentMission.target ? 'success' : 'primary'" variant="flat" size="large" class="font-weight-black">
              Llevas: {{ targetItems.length }} / {{ currentMission.target }}
            </v-chip>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <!-- FEEDBACK -->
    <v-fade-transition>
      <div v-if="isComplete" class="text-center mt-10">
        <v-alert
          type="success"
          variant="tonal"
          class="rounded-xl mb-6 py-6"
          border="start"
          icon="mdi-party-popper"
        >
          <div class="text-h5 font-weight-black">¡Misión Cumplida!</div>
          <div class="text-body-1">Has formado un conjunto perfecto de {{ currentMission.itemName }}.</div>
        </v-alert>

        <v-btn
          color="success"
          size="x-large"
          class="rounded-xl px-12 font-weight-black"
          elevation="8"
          @click="$emit('completada')"
        >
          ¡Siguiente Desafío! <v-icon end>mdi-chevron-right</v-icon>
        </v-btn>
      </div>
    </v-fade-transition>

    <div v-if="!isComplete && targetItems.length > 0" class="text-center mt-6">
      <v-btn variant="text" color="error" prepend-icon="mdi-refresh" @click="reset">
        Empezar de nuevo
      </v-btn>
    </div>
  </v-card>
</template>

<script setup>
import { ref, computed } from "vue";

defineEmits(["completada"]);

const missions = [
  { title: "El Bosque Mágico", instruction: "Agrega al conjunto", target: 5, itemName: "animalitos", emoji: "🐶" },
  { title: "La Granja de Frutas", instruction: "Agrega al conjunto", target: 8, itemName: "manzanas", emoji: "🍎" },
  { title: "El Cielo de Estrellas", instruction: "Agrega al conjunto", target: 6, itemName: "estrellas", emoji: "⭐" },
];

const currentMissionIndex = ref(0);
const currentMission = computed(() => missions[currentMissionIndex.value]);

const sourceItems = ref(Array(15).fill(currentMission.value.emoji));
const targetItems = ref([]);

const isComplete = computed(() => targetItems.value.length === currentMission.value.target);

const moveItem = (index) => {
  if (targetItems.value.length < currentMission.value.target) {
    const item = sourceItems.value.splice(index, 1)[0];
    targetItems.value.push(item);
  }
};

const reset = () => {
  sourceItems.value = Array(15).fill(currentMission.value.emoji);
  targetItems.value = [];
};
</script>

<style scoped>
.glass-card {
  background: rgba(255, 255, 255, 0.9) !important;
  backdrop-filter: blur(10px);
}
.gap-3 {
  gap: 12px;
}
.emoji-btn {
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.emoji-btn:hover {
  transform: scale(1.1) rotate(5deg);
}
.content-area {
  min-height: 150px;
  border-radius: 16px;
}
.emoji-in-set {
  animation: bounceIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

@keyframes bounceIn {
  from { opacity: 0; transform: scale(0.3); }
  to { opacity: 1; transform: scale(1); }
}
</style>
