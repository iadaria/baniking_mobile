import { call, ForkEffect, put, takeLatest } from 'redux-saga/effects';
import * as RootNavigation from '~/src/navigation/helpers/RootNavigation';
import { routes } from '~/src/navigation/helpers/routes';
import { methods, tokenToHeaders } from '~/src/app/api';
import { getErrorStrings } from '~/src/app/utils/error';
import {
  setPersistUserData,
  setPersistToken,
} from '~/src/features/persist/store/appPersistActions';
import { setAuthUserData } from '~/src/features/auth/store/authActions';
import { LOGIN_PHONE } from '../authConstants';
import { showAlert } from '~/src/app/common/components/showAlert';
import { log, logline } from '~/src/app/utils/debug';
import { authSuccess } from '../authActions';

export type LoginPhonePayload = {
  phone: string;
  password: string;
  remember: boolean;
  device_name: string;
};

interface IAction {
  type: string;
  payload: LoginPhonePayload;
}

interface IResult {
  token: string;
}

function* loginPhoneSaga({ payload }: IAction) {
  try {
    logline('[loginPhoneSaga] payload', payload);

    const { token }: IResult = yield call(methods.login, payload, null);

    if (token) {
      yield put(authSuccess());
      yield tokenToHeaders(token);

      const { phone, remember } = payload;
      yield put(setAuthUserData({ phone, token }));
      if (remember) {
        yield put(setPersistToken(token));
        yield put(setPersistUserData({ phone }));
      }
      RootNavigation.reset(routes.navigators.DrawerNavigator);
    }
  } catch (e) {
    log('[loginPhoneSaga/error]', e);

    let [errors, message, allErrors] = getErrorStrings(e);
    logline('[loginPhoneSaga/error]', [errors, message, allErrors]);

    const errorMessage = allErrors
      ? allErrors
      : message
      ? message
      : 'Ошибка при получении qr кода';

    yield showAlert('Ошибка', errorMessage);
  }
}

export default function* listener(): Generator<
  ForkEffect<never>,
  void,
  unknown
> {
  yield takeLatest(LOGIN_PHONE, loginPhoneSaga);
}

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
