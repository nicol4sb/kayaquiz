import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend'; // Ensure this import is correct
import LanguageDetector from 'i18next-browser-languagedetector'; // Import the language detector

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(HttpBackend) // load translation using http
  .use(LanguageDetector) // use LanguageDetector
  .init({
    fallbackLng: 'en',
    debug: true,

    // Automatically determine the user's language
    detection: {
      // Order and from where user language should be detected
      order: ['querystring', 'cookie', 'localStorage', 'sessionStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
      
      // Keys or params to lookup language from
      lookupQuerystring: 'lng',
      lookupCookie: 'i18next',
      lookupLocalStorage: 'i18nextLng',
      lookupSessionStorage: 'i18nextLng',
      lookupFromPathIndex: 0,
      lookupFromSubdomainIndex: 0,

      // Cache user language on
      caches: ['localStorage', 'cookie'],
      excludeCacheFor: ['cimode'], // languages to not persist (cookie, localStorage)

      // Optional htmlTag with lang attribute, e.g. <html lang="en">
      htmlTag: document.documentElement
    },

    backend: {
      // Path where resources load from
      loadPath: '/locales/{{lng}}/{{ns}}.json'
    },

    ns: ['translation'],
    defaultNS: 'translation',

    keySeparator: false, // we use content as keys

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },

    react: {
      useSuspense: false // you can set this to true if you're using Suspense
    }
  });

export default i18n;
