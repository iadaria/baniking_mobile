import { AxiosResponse } from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import * as RootNavigation from '~/src/navigation/helpers/RootNavigation';
import { routes } from '~/src/navigation/helpers/routes';
import { getErrorStrings } from '~/src/app/utils/error';
import {
  initVerifyInputs,
  requestSuccess,
  setAuthUserData,
} from '~/src/features/auth/store/authActions';
import { showAlert } from '~/src/app/common/components/showAlert';
import { isSuccessStatus } from '~/src/app/models/response';
import { methods } from '~/src/app/api';
import { log, logline } from '~/src/app/utils/debug';
import { PHONE_REGISTER } from '../authConstants';
import { Action } from '~/src/app/common/constants';

export type RegisterPayload = {
  phone: string;
  name: string;
  email: string;
  agreement: boolean;
};

interface IAction {
  type: string;
  payload: RegisterPayload;
}

function* registerPhoneSaga({
  payload,
}: IAction) /* : Generator<Promise<ICredential>, void, IResult> */ {
  try {
    log('[registerPhoneSaga] result payload', payload);

    const { status }: AxiosResponse = yield call(
      methods.register,
      payload,
      null,
    );
    //log('[registerPhoneSaga] result', result);
    if (isSuccessStatus(status)) {
      yield put(requestSuccess()); // not authenticated
      const { name, email, phone } = payload;
      yield put(setAuthUserData({ phone, email, name }));
      yield RootNavigation.navigate(routes.authNavigator.VerifyScreen, {
        action: Action.Registration,
      });
    }
  } catch (e) {
    //if (axios.isAxiosError(e)) {
    //const error: AxiosResponse<Fail> = e;
    //log('[registerEmailSaga/error]', e);

    let [errors, message, allErrors] = getErrorStrings(e);

    logline('[registerEmailSaga/error]', [errors, message]);

    const errorMessage = allErrors
      ? allErrors
      : 'Введен неверный логин или пароль';

    yield showAlert('Ошибка', errorMessage);
  }
}

export default function* listener() {
  yield takeLatest(PHONE_REGISTER, registerPhoneSaga);
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
