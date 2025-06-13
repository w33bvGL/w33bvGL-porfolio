export type ShopItem = {
  name: string
  description: string
  image: string
  price: number
  url?: string
}

export interface TranslatedShopItems {
  ru: ShopItem[]
  en: ShopItem[]
  hy: ShopItem[]
}
