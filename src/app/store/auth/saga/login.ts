import { ForkEffect, takeLatest } from 'redux-saga/effects';
import { ILogInAction } from '../authActions';
import { LOG_IN_WITH_EMAIL, SOCIAL_LOGIN } from '../authConstants';

interface IAction {
  type: string;
  payload: ILogInAction;
}

interface IResult {
  token: string;
}

// any - what we pass to call
// second - what we return: void or string(return "done")
// third - what return call

// const NOT_CONFIRMED = 'Registration not confirmed';

function* logInWithEmail({
  payload: { login, password },
}: IAction): Generator<ILogInAction, void, IResult> {
  try {
    // const { token } : IResult = yield methods.auth({ email: login, password});
    // yield put(setUserData({ token }));
    // yield put(logInSuccess());
    // RootNavigate.navigate('BottomNavigator', null);
  } catch (e) {
    console.log(e);
  }
}

function* socialLogin({ payload: { provider } }: IAction) {
  try {
  } catch (e) {
    console.log(e);
  }
}

export default function* listener(): Generator<
  ForkEffect<never>,
  void,
  unknown
> {
  yield takeLatest(LOG_IN_WITH_EMAIL, logInWithEmail);
  yield takeLatest(SOCIAL_LOGIN, socialLogin);
}
