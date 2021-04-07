import { GoogleSignin, statusCodes, User as GoogleUser } from '@react-native-community/google-signin';
import { ForkEffect, put, takeLatest } from 'redux-saga/effects';
import { SocialProvider, ISocialAccount, IUserAuth } from '~/src/app/models/user';
import { addSocialAccount } from '~/src/features/persist/store/appPersistActions';
import { setAuthUserData, socialLoginCanceled } from '~/src/features/auth/store/authActions';
import { GOOGLE_LOGIN } from '../authConstants';
import { authFail } from '../authActions';
/**
 * Google signin
 *
 * https://developers.google.com/identity/sign-in/android/start?authuser=1
 */

GoogleSignin.configure({
  //vscopes: ['https://www.googleapis.com/auth/drive.readonly'],
  androidClientId: '470928467143-adpnffml8vnpov7scado54vbup9usg39.apps.googleusercontent.com',
  iosClientId: '470928467143-ua5tsgmcj384bsdlmetsdd16vnta7tog.apps.googleusercontent.com',
  // offlineAccess: true,
});

interface IGoogleToken {
  idToken: string;
  accessToken: string;
}

function* googleLogInSaga() {
  try {
    const userInfo: GoogleUser = yield GoogleSignin.signIn();
    const access_token: IGoogleToken = yield GoogleSignin.getTokens();

    const newSocialAccount: ISocialAccount = {
      provider: SocialProvider.Google,
      access_token: access_token.accessToken,
      idToken: userInfo.idToken,
      photo: userInfo.user.photo,
      name: userInfo.user.name,
      familyName: userInfo.user.familyName,
      givenName: userInfo.user.givenName,
      email: userInfo.user.email,
      uid: null,
    };
    yield put(addSocialAccount(newSocialAccount));

    const userData = {
      name: userInfo.user.name,
      email: userInfo.user.email,
      socialProvider: SocialProvider.Google,
      avatar: userInfo.user.photo,
    };
    yield put(setAuthUserData(userData as IUserAuth));
    // debug
    __DEV__ && console.log('*****', userInfo);
    __DEV__ && console.log('!!!!!!', access_token);
  } catch (error) {

    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      yield put(socialLoginCanceled());
      __DEV__ && console.log('[googleLoginSaga/Google] user canceled the login flow');
    }

    yield put(authFail(null));
    __DEV__ && console.log('[googleLoginSaga/error]', error);
  }
}

export default function* listener(): Generator<ForkEffect<never>, void, unknown> {
  yield takeLatest(GOOGLE_LOGIN, googleLogInSaga);
}
