import i18next from 'i18next';
import i18n from 'i18next';
import * as RNLocalize from 'react-native-localize';
import ru from './ru';
import en from './en';
// import { initReactI18next } from 'react-i18next';

const resources = {
  en,
  ru,
};

console.log(RNLocalize.getLocales());

//.use(initReactI18next) // passes i18n down to react-i18next
export const initLanguage = async () => {
  const { languageCode } = RNLocalize.getLocales()[0];
  console.log('[i18n] language code is', languageCode);
  /* RNLocalize.addEventListener('change', () => {
    // do localization related stuff…
  }); */
  if (!i18next.isInitialized) {
    // const { language } = await store.getState().persist;
    await i18n.init({
      resources,
      lng: 'ru', //languageCode,
      fallbackLng: 'ru', // use ru if detected lng is not available
      // keySeparator: true, // we do not use keys in form messages.welcome
      debug: true,
      interpolation: {
        escapeValue: false, // react already safes from xss
      },
    });
  }
};
