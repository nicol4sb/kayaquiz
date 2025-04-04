import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

if (!i18n.isInitialized || i18n.isInitialized === false) {
  i18n
    .use(initReactI18next)
    .use(HttpBackend)
    .use(LanguageDetector)
    .init({
      fallbackLng: 'en',
      debug: false,

      detection: {
        order: ['querystring', 'cookie', 'localStorage', 'navigator', 'htmlTag'],
        lookupQuerystring: 'lng',
        lookupCookie: 'i18next',
        lookupLocalStorage: 'i18nextLng',
        caches: ['localStorage', 'cookie'],
        htmlTag: document.documentElement,
      },

      backend: {
        loadPath: '/locales/{{lng}}/{{ns}}.json',
      },

      ns: ['translation'],
      defaultNS: 'translation',
      interpolation: {
        escapeValue: false,
      },

      react: {
        useSuspense: true,
      }
    });
} else {
  console.log('[i18n] Already initialized — skipping');
}

export default i18n;
