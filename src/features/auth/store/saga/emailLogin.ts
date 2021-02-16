import { ForkEffect, put, takeLatest } from 'redux-saga/effects';
import { EMAIL_LOGIN } from '../authConstants';
import { ICredential } from '~/src/app/models/user';
import { methods } from '~/src/app/api';
import { getErrorStrings } from '~/src/app/utils/error';
import { showMessage } from 'react-native-flash-message';
import { setPersistUserData } from '~/src/features/persist/store/persistActions';
import { setAuthUserData } from '~/src/features/auth/store/authActions';

// any - what we pass to call
// second - what we return: void or string(return "done")
// third - what return call

// const NOT_CONFIRMED = 'Registration not confirmed';

interface IAction {
  type: string;
  payload: ICredential;
}

interface IResult {
  token: string;
}

function* emailLoginSaga({
  payload: { login, password },
}: IAction) /* : Generator<Promise<ICredential>, void, IResult> */ {
  try {
    // For test
    /* const response = {
      message: 'The given data was invalid.',
      errors: {
        email: ['Введите email'],
        password: ['Неверный пароль'],
        device_name: ['Девайся обязатлеьное поле'],
      },
    };
    throw response; */
    const { token }: IResult = yield methods.login({ email: login, password }, null);
    yield put(setPersistUserData({ email: login, token }));
    yield put(setAuthUserData({ email: login, token }));
    // yield put(logInSuccess());
    // RootNavigate.navigate('BottomNavigator', null);
  } catch (e) {
    let [errors, message] = getErrorStrings(e);
    let errorMessage = errors.length ? `${message}` || errors[0] : 'Error connection';

    if (errorMessage.includes('The given data was invalid')) {
      errorMessage = 'Введены неверный логин и пароль';
    }

    // console.log(`error/[catch] message = ${message}\n`, JSON.stringify(errors, null, 4));
    // console.log(`error/[catch] message = ${message}\n`);
    // console.log(errorMessage);

    showMessage({
      message: `${errorMessage}`,
      type: 'warning',
    });

    console.log(e);
  }
}

export default function* listener(): Generator<ForkEffect<never>, void, unknown> {
  yield takeLatest(EMAIL_LOGIN, emailLoginSaga);
}