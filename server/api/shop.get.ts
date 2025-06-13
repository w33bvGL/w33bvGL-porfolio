import type { TranslatedShopItems } from '~/types/shop'

export default defineEventHandler((): TranslatedShopItems => {
  return <TranslatedShopItems>{
    en: [
      {}
    ],
    hy: [
      {}
    ],
    ru: [
      {
        name: 'Sora Graph-ql API',
        description: 'Sora.QL — быстрый GraphQL API для аниме. Получите всю информацию о аниме, персонажах и эпизодах через мощный API с поддержкой нескольких языков.',
        image: '/projects/anidzen-sora.png',
        url: 'https://sora.anidzen.com',
        price: 18000,
        discount: 5
      },
      {
        name: 'W33bv.gl Portfolio',
        description: 'Мой персональный сайт-портфолио с открытым исходным кодом. Демонстрация проектов, навыков и опыта full-stack разработчика.',
        image: '/projects/portfolio.png',
        url: 'https://vahe.anidzen.com',
        repository: 'https://github.com/w33bvGL/w33bvGL-porfolio',
        price: 0
      },
      {
        name: 'Drive Fit',
        description: 'Сайт фитнес-клуба с продажей программ тренировок: йога, кардио и силовые. Упор на здоровье, выносливость и улучшение физической формы.',
        image: '/projects/drive-fit.png',
        url: 'http://wdwdwd/drive-fit.png',
        discount: 25,
        price: 25
      }
    ]
  }
})
