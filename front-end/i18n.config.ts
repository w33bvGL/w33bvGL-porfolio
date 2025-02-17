import en from './i18n/locales/en-US.json';
import hy from './i18n/locales/hy-AM.json';
import ru from './i18n/locales/ru-RU.json';

export default defineI18nConfig(() => ({
    messages: {
        en,
        hy,
        ru,
    },
}));
