import en from './locales/en.json'
import ru from './locales/ru.json'
import hy from './locales/hy.json'

export default defineI18nConfig(() => ({
  messages: {
    en,
    ru,
    hy
  }
}))
