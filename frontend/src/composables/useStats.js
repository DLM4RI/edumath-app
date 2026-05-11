import { ref } from 'vue'

const STORAGE_KEY = 'edumath_stats'

export function useStats() {
  const stats = ref(JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'))

  const saveExamResult = (gradeId, score, total, topicsMap) => {
    const currentStats = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
    
    // topicsMap expected format: { TopicName: { correct: X, total: Y }, ... }
    
    if (!currentStats[gradeId]) {
      currentStats[gradeId] = {
        last_exam: null,
        topics: {}
      }
    }

    currentStats[gradeId].last_exam = {
      score,
      total,
      date: new Date().toISOString()
    }

    // Merge topic stats
    Object.keys(topicsMap).forEach(topicName => {
      if (!currentStats[gradeId].topics[topicName]) {
        currentStats[gradeId].topics[topicName] = { correct: 0, total: 0 }
      }
      currentStats[gradeId].topics[topicName].correct += topicsMap[topicName].correct
      currentStats[gradeId].topics[topicName].total += topicsMap[topicName].total
    })

    localStorage.setItem(STORAGE_KEY, JSON.stringify(currentStats))
    stats.value = currentStats
  }

  const getGradeStats = (gradeId) => {
    return stats.value[gradeId] || null
  }

  const hasStats = (gradeId) => {
    return !!stats.value[gradeId]
  }

  const clearStats = () => {
    localStorage.removeItem(STORAGE_KEY)
    stats.value = {}
  }

  return {
    stats,
    saveExamResult,
    getGradeStats,
    hasStats,
    clearStats
  }
}
