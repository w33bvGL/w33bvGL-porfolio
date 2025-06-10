export interface Education {
  title: string
  description: string
  image: string
}

export interface TranslatedEducation {
  ru: Education[]
  en: Education[]
  hy: Education[]
}
