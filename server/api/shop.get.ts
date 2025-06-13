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
        name: 'Drive Fit',
        description: 'Сайт фитнес-клуба с продажей программ тренировок: йога, кардио и силовые. Упор на здоровье, выносливость и улучшение физической формы.',
        image: '/projects/drive-fit.png',
        price: 15
      }
    ]
  }
})
