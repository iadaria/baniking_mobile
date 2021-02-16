import { GoogleSignin } from '@react-native-community/google-signin';
import { ForkEffect, takeLatest } from 'redux-saga/effects';
import { ICredential } from '~/src/app/models/user';
import { SOCIAL_LOGIN } from '../authConstants';

/**
 * Google signin
 *
 * https://developers.google.com/identity/sign-in/android/start?authuser=1
 */

interface IAction {
  type: string;
  payload: ICredential;
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

function* socialLoginSaga({ payload: { provider } }: IAction) {
  try {
    if (provider === 'google') {
      const userInfo = yield GoogleSignin.signIn();
      const tokens = yield GoogleSignin.getTokens();
      console.log('*****', userInfo);
      console.log('!!!!!!', tokens);
    }
  } catch (e) {
    console.log(e);
  }
}

export default function* listener(): Generator<ForkEffect<never>, void, unknown> {
  yield takeLatest(SOCIAL_LOGIN, socialLoginSaga);
}
