export type ShopItem = {
  name: string
  description: string
  image: string
  price: number
  discount?: number
  url?: string
  repository: string
}

export interface TranslatedShopItems {
  ru: ShopItem[]
  en: ShopItem[]
  hy: ShopItem[]
}
