import YandexLogin from '~/src/modules/YandexLogin';

export async function yandexLogin() {
  try {
    const access_token = await YandexLogin.login('dasha.box@yandex.ru');
    __DEV__ && console.log('[YandexLogin/success]', access_token);
  } catch (e) {
    __DEV__ && console.log('[YandexLogin/error]', e);
  }
}
