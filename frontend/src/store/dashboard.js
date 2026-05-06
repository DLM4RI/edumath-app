import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useDashboardStore = defineStore('dashboard', () => {
  const userName = ref(localStorage.getItem('user_name') || 'Estudiante')
  const selectedGrade = ref(Number(localStorage.getItem('user_grade')) || 1)

  const themes = {
    1: { primary: '#F59E0B', secondary: '#FCD34D', hero: '/images/hero-1.png', label: 'Nivel Inicial', density: 'playful' },
    2: { primary: '#10B981', secondary: '#34D399', hero: '/images/hero-2.png', label: 'Crecimiento', density: 'playful' },
    3: { primary: '#6366F1', secondary: '#818CF8', hero: '/images/hero-3.png', label: 'Exploración', density: 'standard' },
    4: { primary: '#8B5CF6', secondary: '#A78BFA', hero: '/images/hero-4.png', label: 'Abstracción', density: 'standard' },
    5: { primary: '#0D9488', secondary: '#2DD4BF', hero: '/images/hero-5.png', label: 'Análisis Avanzado', density: 'academic' }
  }

  const currentTheme = computed(() => themes[selectedGrade.value] || themes[3])

  function setUserName(name) {
    userName.value = name
    localStorage.setItem('user_name', name)
  }

  function setGrade(grade) {
    selectedGrade.value = Number(grade)
    localStorage.setItem('user_grade', grade.toString())
  }

  return {
    userName,
    selectedGrade,
    currentTheme,
    themes,
    setUserName,
    setGrade
  }
})
