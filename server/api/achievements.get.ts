import type { TranslatedAchievements } from '~/types/achievements'

export default defineEventHandler((): TranslatedAchievements => {
  return {
    ru: [
      { year: '2025', description: 'Запустил проекты OTA-KU, HentaiVoice, Sora.QL и Aira' },
      { year: '2025', description: 'Запустили Anidzen и начал строить экосистему аниме в Армении' },
      { year: '2025', description: '1-е место среди GitHub-контрибьюторов в Армении 🇦🇲' }
    ],
    en: [
      { year: '2025', description: 'Launched the projects OTA-KU, HentaiVoice, Sora.QL, and Aira' },
      { year: '2025', description: 'Started Anidzen and began building the anime ecosystem in Armenia' },
      { year: '2025', description: 'Ranked #1 GitHub contributor in Armenia 🇦🇲' }
    ],
    hy: [
      { year: '2025', description: 'Մեկնարկել է OTA-KU, HentaiVoice, Sora.QL և Aira նախագծերը' },
      { year: '2025', description: 'Մեկնարկել է Anidzen-ը և սկսել կառուցել անիմեի էկոհամակարգը Հայաստանում' },
      { year: '2025', description: 'GitHub-ի №1 ներդրողը Հայաստանում 🇦🇲' }
    ]
  }
})
