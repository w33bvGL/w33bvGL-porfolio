import type { TranslatedAchievements } from '~/types/achievements'

export default defineEventHandler((): TranslatedAchievements => {
  return {
    ru: [
      { year: '2025', description: 'Запустил проекты OTA-KU, HentaiVoice, Sora.QL и Aira' },
      { year: '2025', description: 'Запустили Anidzen и начал строить экосистему аниме в Армении' },
      { year: '2025', description: '1-е место среди GitHub-контрибьюторов в Армении 🇦🇲' }
    ],
    en: [
    ],
    hy: [
    ]
  }
})
