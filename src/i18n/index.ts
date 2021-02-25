import i18n from 'i18next';
// import { initReactI18next } from 'react-i18next';
import * as RNLocalize from 'react-native-localize';
//import en from './en';
import ru from './ru';

// the translations
const resources = {
  // en,
  ru,
};

console.log(RNLocalize.getLocales());
console.log(RNLocalize.getCurrencies());

// RNLocalize.addEventListener('change', () => {
//   // do localization related stuff…
// });
// const { language } = await store.getState().persist;

//.use(initReactI18next) // passes i18n down to react-i18next
export const initLanguage = () =>
  i18n.init({
    resources,
    lng: 'ru',
    fallbackLng: 'ru', // use ru if detected lng is not available
    keySeparator: false, // we do not use keys in form messages.welcome
    debug: true,
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

// export default i18n;
