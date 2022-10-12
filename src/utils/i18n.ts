import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(Backend)
  .use(initReactI18next)
  .init({
    supportedLngs: ['en', 'cs'],
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: [
        'navigator', // browser language first
        'querystring',
        'cookie',
        'localStorage',
        'sessionStorage',
        'htmlTag',
        'path',
        'subdomain',
      ],
    },
  });

export default i18n;

