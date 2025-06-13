import type { TranslatedShopItems } from '~/types/shop'

export default defineEventHandler((): TranslatedShopItems => {
  return <TranslatedShopItems>{
    en: [
      {
        name: 'Sora GraphQL API',
        description: 'Sora.QL is a fast GraphQL API for anime. Get all information about anime, characters, and episodes through a powerful multi-language supported API.',
        image: '/projects/anidzen-sora.png',
        url: 'https://sora.anidzen.com',
        price: 18000,
        discount: 5
      },
      {
        name: 'W33bv.gl Portfolio',
        description: 'My personal open-source portfolio website. Showcasing full-stack developer skills, projects, and experience.',
        image: '/projects/portfolio.png',
        url: 'https://vahe.anidzen.com',
        repository: 'https://github.com/w33bvGL/w33bvGL-porfolio',
        price: 0
      },
      {
        name: 'Drive Fit',
        description: 'A fitness club website offering workout programs: yoga, cardio, and strength training. Focused on health, endurance, and physical improvement.',
        image: '/projects/drive-fit.png',
        url: 'http://wdwdwd/drive-fit.png',
        discount: 25,
        price: 25
      }
    ],
    hy: [
      {
        name: 'Sora GraphQL API',
        description: 'Sora.QL՝ արագ և բազմալեզու աջակցությամբ GraphQL API անիմեների համար։ Ստացեք ամբողջական ինֆորմացիա անիմեների, կերպարների և սերիաների մասին՝ հզոր API-ի միջոցով։',
        image: '/projects/anidzen-sora.png',
        url: 'https://sora.anidzen.com',
        price: 18000,
        discount: 5
      },
      {
        name: 'W33bv.gl Պորտֆոլիո',
        description: 'Իմ անձնական պորտֆոլիո կայքը՝ բաց կոդով։ Ներկայացնում է full-stack ծրագրավորողի հմտությունները, նախագծերն ու փորձը։',
        image: '/projects/portfolio.png',
        url: 'https://vahe.anidzen.com',
        repository: 'https://github.com/w33bvGL/w33bvGL-porfolio',
        price: 0
      },
      {
        name: 'Drive Fit',
        description: 'Ֆիտնես ակումբի կայք՝ մարզման ծրագրերով՝ յոգա, կարդիո և ուժային պարապմունքներ։ Ուշադրությունը կենտրոնացված է առողջության, դիմացկունության և ֆիզիկական բարելավման վրա։',
        image: '/projects/drive-fit.png',
        url: 'http://wdwdwd/drive-fit.png',
        discount: 25,
        price: 25
      }
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
