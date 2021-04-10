import { GoogleSignin, statusCodes, User as GoogleUser } from '@react-native-community/google-signin';
import { ForkEffect, takeLatest } from 'redux-saga/effects';
import { SocialProvider } from '~/src/app/models/user';
import { isGoogle } from '~/src/app/utils/auth';
import { SOCIAL_LOGIN } from '../authConstants';

/**
 * Google signin
 *
 * https://developers.google.com/identity/sign-in/android/start?authuser=1
 */

interface IAction {
  type: string;
  payload: SocialProvider;
}

interface IResult {
  token: string;
}

GoogleSignin.configure({
  //vscopes: ['https://www.googleapis.com/auth/drive.readonly'],
  androidClientId: '470928467143-adpnffml8vnpov7scado54vbup9usg39.apps.googleusercontent.com',
  iosClientId: '470928467143-ua5tsgmcj384bsdlmetsdd16vnta7tog.apps.googleusercontent.com',
  // offlineAccess: true,
});

// any - what we pass to call
// second - what we return: void or string(return "done")
// third - what return call

interface IGoogleToken {
  idToken: string;
  accessToken: string;
}

function* socialLoginSaga({ payload }: IAction) {
  try {
    if (isGoogle(payload)) {
      const userInfo: GoogleUser = yield GoogleSignin.signIn();
      const access_token: IGoogleToken = yield GoogleSignin.getTokens();
      //yield put(addSo)
      __DEV__ && console.log('*****', userInfo);
      __DEV__ && console.log('!!!!!!', access_token);
    }
  } catch (error) {
    // Google
    if (isGoogle(payload)) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        __DEV__ && console.log('[socialLoginSaga/Google] user canceled the login flow');
      }
    }
    __DEV__ && console.log('[socialLoginSaga/error]', error);
  }
}

export default function* listener(): Generator<ForkEffect<never>, void, unknown> {
  yield takeLatest(SOCIAL_LOGIN, socialLoginSaga);
}
