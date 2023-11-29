import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ru from './ru.js';
import en from './en.js';

i18n.use(initReactI18next).init({
  debug: true,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
  resources: {
    en,
    ru,
  },
});

export default i18n;
