export type Project = {
  name: string
  image: string
  description: string
  url?: string
}

export interface TranslatedProjects {
  ru: Project[]
  en: Project[]
  hy: Project[]
}
