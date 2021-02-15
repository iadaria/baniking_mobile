import { ForkEffect, takeLatest } from 'redux-saga/effects';
import { EMAIL_LOGIN } from '../authConstants';
import { ICredential } from '~/src/app/models/user';
import { methods } from '~/src/app/api';

interface IAction {
  type: string;
  payload: ICredential;
}

interface IResult {
  token: string;
}

// any - what we pass to call
// second - what we return: void or string(return "done")
// third - what return call

// const NOT_CONFIRMED = 'Registration not confirmed';

function* emailLoginSaga({
  payload: { login, password },
}: IAction): Generator<Promise<ICredential>, void, IResult> {
  console.log('!!!!! login');
  try {
    const { token }: IResult = yield methods.login({ email: login, password }, null);
    console.log('[emailLoginSaga] **** token *****', token);
    // yield put(setUserData({ token }));
    // yield put(logInSuccess());
    // RootNavigate.navigate('BottomNavigator', null);
  } catch (e) {
    console.log(e);
  }
}

export default function* listener(): Generator<ForkEffect<never>, void, unknown> {
  yield takeLatest(EMAIL_LOGIN, emailLoginSaga);
}
