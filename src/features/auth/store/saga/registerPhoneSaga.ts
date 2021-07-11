import { call, ForkEffect, put, takeLatest } from 'redux-saga/effects';
import * as RootNavigation from '~/src/navigation/helpers/RootNavigation';
import routes from '~/src/navigation/helpers/routes';
import { ICredential, VerifyPayload } from '~/src/app/models/user';
import { methods, tokenToHeaders } from '~/src/app/api';
import { getErrorStrings } from '~/src/app/utils/error';
import {
  setPersistUserData,
  setPersistToken,
} from '~/src/features/persist/store/appPersistActions';
import {
  requestSuccess,
  setAuthUserData,
} from '~/src/features/auth/store/authActions';
import { EMAIL_REGISTER, VERIFY, COMPLETE_REGISTER } from '../authConstants';
import { showAlert } from '~/src/app/common/components/showAlert';
import { log, logline } from '~/src/app/utils/debug';
import axios, { AxiosResponse } from 'axios';
import { Fail } from '~/src/app/models/response';
import { isSuccessStatus } from '../../../../app/models/response';

// any - what we pass to call
// second - what we return: void or string(return "done")
// third - what return call

// const NOT_CONFIRMED = 'Registration not confirmed';

interface IAction {
  type: string;
  payload: ICredential;
}

function* registerPhoneSaga({
  payload,
}: IAction) /* : Generator<Promise<ICredential>, void, IResult> */ {
  try {
    //__DEV__ && console.log('payload *************', payload);

    const { name, email, phone, agreement, device_name } = payload;

    const result: AxiosResponse = yield call(
      methods.register,
      { name, email, phone, agreement, device_name },
      null,
    );
    log('[registerEmailSaga] result', result);
    if (isSuccessStatus(result.status)) {
      yield put(requestSuccess());
      yield RootNavigation.navigate(routes.authNavigator.VerifyScreen, null);
      /* if (token) {
        yield tokenToHeaders(token);
        yield put(setPersistToken(token));
        yield put(setPersistUserData({ email, name, phone }));
        yield put(setAuthUserData({ token, email, name }));
        yield RootNavigation.navigate(routes.navigators.DrawerNavigator, null);
      } */
    }
  } catch (e) {
    //if (axios.isAxiosError(e)) {
    //const error: AxiosResponse<Fail> = e;
    log('[registerEmailSaga/error]', e);

    let [errors, message, allErrors] = getErrorStrings(e);

    logline('[registerEmailSaga/error]', [errors, message]);

    const errorMessage = allErrors
      ? allErrors
      : 'Введен неверный логин или пароль';

    yield showAlert('Ошибка', errorMessage);
  }
}

type CompleteRegisterPayload = {
  phone: string;
  password: string;
  password_confirmation: string;
  device_name: string;
};

export default function* listener() {
  yield takeLatest(EMAIL_REGISTER, registerPhoneSaga);
}

/* {
  "message": "The given data was invalid.",
  "errors": {
      "name": [
          "Имя должно содержать только буквы"
      ],
      "phone": [
        "Пользователь с данным телефоном уже зарегистрирован"
      ]
  }
}
{
    "message": "The given data was invalid.",
    "errors": {
        "phone": [
            "Пользователь с данным телефоном уже зарегистрирован"
        ],
        "email": [
            "Пользователь с данным электронным адресом уже зарегистрирован"
        ]
    }
}
*/
