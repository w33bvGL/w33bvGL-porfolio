import type { TranslatedAchievements } from '~/types/achievements'

export default defineEventHandler((): TranslatedAchievements => {
  return {
    ru: [
      { year: '2020', description: 'Первый pet-проект — сайт на HTML и CSS' },
      { year: '2021', description: 'Изучил Vue и Laravel, создал первые SPA' },
      { year: '2022', description: 'Первый коммерческий заказ' },
      { year: '2023', description: 'Запустил Animix и начал строить экосистему' },
      { year: '2024', description: 'Коллаб с Zaxari, выход на международный уровень' },
      { year: '2025', description: 'Создание архитектуры микросервисов с GraphQL API' },
      { year: '2025', description: '1-е место среди GitHub-контрибьюторов в Армении 🇦🇲' }
    ],
    en: [
      { year: '2020', description: 'First pet project — site built with HTML and CSS' },
      { year: '2021', description: 'Learned Vue and Laravel, built first SPAs' },
      { year: '2022', description: 'First commercial project completed' },
      { year: '2023', description: 'Launched Animix and started building ecosystem' },
      { year: '2024', description: 'Collab with Zaxari, went international' },
      { year: '2025', description: 'Built microservice architecture with GraphQL API' },
      { year: '2025', description: '1st place among Armenia\'s GitHub contributors 🇦🇲' }
    ],
    hy: [
      { year: '2020', description: 'Առաջին pet-ծրագիր — կայք HTML-ով և CSS-ով' },
      { year: '2021', description: 'Սովորեցի Vue և Laravel, ստեղծեցի SPA-ներ' },
      { year: '2022', description: 'Առաջին առևտրային պատվերը' },
      { year: '2023', description: 'Սկսեցի Animix նախագիծը և սկսեցի կառուցել էկոհամակարգը' },
      { year: '2024', description: 'Գործակցություն Zaxari-ի հետ, միջազգային մակարդակ' },
      { year: '2025', description: 'Ստեղծեցի միկրոսերվիս ճարտարապետություն GraphQL-ով' },
      { year: '2025', description: '1-ին տեղ GitHub-ում՝ Հայաստանի մասնակցողների թվում 🇦🇲' }
    ]
  }
})
