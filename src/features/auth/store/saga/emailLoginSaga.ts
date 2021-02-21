import { ForkEffect, put, takeLatest } from 'redux-saga/effects';
import * as RootNavigation from '~/src/navigation/helpers/RootNavigation';
import routes from '~/src/navigation/helpers/routes';
import { ICredential } from '~/src/app/models/user';
import { methods, tokenToHeaders } from '~/src/app/api';
import { getErrorStrings } from '~/src/app/utils/error';
import { setPersistUserData } from '~/src/features/persist/store/appPersistActions';
import { setAuthUserData } from '~/src/features/auth/store/authActions';
import { EMAIL_LOGIN } from '../authConstants';
import Reactotron from 'reactotron-react-native';
import { showAlert } from '~/src/app/common/components/showAlert';
import reactotron from 'reactotron-react-native';

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

function* emailLoginSaga({ payload }: IAction) /* : Generator<Promise<ICredential>, void, IResult> */ {
  try {
    console.log('payload', payload);
    const { login, password, device_name, persist } = payload;
    reactotron.log(login!, password!, device_name, persist);
    // For test
    /* const response = {
      data: {
        message: 'The given data was invalid.',
        errors: {
          email: ['Введите email'],
          password: ['Неверный пароль'],
          device_name: ['Девайся обязатлеьное поле'],
        },
      },
    };
    throw response; */
    const { token }: IResult = yield methods.login({ email: login, password, device_name }, null);
    // const token = 'ljljlj';
    tokenToHeaders(token);
    if (persist) {
      yield put(setPersistUserData({ email: login, token }));
    }
    yield put(setAuthUserData({ email: login, token }));

    RootNavigation.navigate(routes.navigators.DrawerNavigator, null);
  } catch (e) {
    console.log(JSON.stringify(e, null, 2));
    let [errors, message] = getErrorStrings(e);
    console.log([errors, message]);
    let errorMessage = errors.length ? `${message}` || errors[0] : 'Error connection';

    if (errorMessage.includes('The given data was invalid')) {
      errorMessage = 'Введен неверный логин или пароль';
    }

    yield showAlert('Ошибка', errorMessage);
  }
}

export default function* listener(): Generator<ForkEffect<never>, void, unknown> {
  yield takeLatest(EMAIL_LOGIN, emailLoginSaga);
}
