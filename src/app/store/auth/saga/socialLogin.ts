import { GoogleSignin } from '@react-native-community/google-signin';
import { ForkEffect, takeLatest } from 'redux-saga/effects';
import { ICredential } from '~/app/models/user';
import { SOCIAL_LOGIN } from '../authConstants';

interface IAction {
  type: string;
  payload: ICredential;
}

interface IResult {
  token: string;
}

GoogleSignin.configure({});

// any - what we pass to call
// second - what we return: void or string(return "done")
// third - what return call

function* socialLoginSaga({ payload: { provider } }: IAction) {
  try {
    if (provider === 'google') {
      const userInfo = yield GoogleSignin.signIn();
      console.log('*****', userInfo);
    }
  } catch (e) {
    console.log(e);
  }
}

export default function* listener(): Generator<
  ForkEffect<never>,
  void,
  unknown
> {
  yield takeLatest(SOCIAL_LOGIN, socialLoginSaga);
}
