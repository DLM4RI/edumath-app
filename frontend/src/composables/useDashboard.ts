import { storeToRefs } from 'pinia'
import { useDashboardStore } from '../store/dashboard'

export const useDashboard = () => {
  const store = useDashboardStore()
  const { userName, selectedGrade, currentTheme, themes } = storeToRefs(store)

  return {
    userName,
    selectedGrade,
    currentTheme,
    themes
  }
}
