export interface Experience {
  year: string
  company: string
  title: string
  period: string
  description: string
}

export interface TranslatedExperiences {
  ru: Experience[]
  en: Experience[]
  hy: Experience[]
}
