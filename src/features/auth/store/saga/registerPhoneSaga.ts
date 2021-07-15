import { AxiosResponse } from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import * as RootNavigation from '~/src/navigation/helpers/RootNavigation';
import routes from '~/src/navigation/helpers/routes';
import { getErrorStrings } from '~/src/app/utils/error';
import {
  requestSuccess,
  setAuthUserData,
} from '~/src/features/auth/store/authActions';
import { showAlert } from '~/src/app/common/components/showAlert';
import { isSuccessStatus } from '~/src/app/models/response';
import { methods } from '~/src/app/api';
import { log, logline } from '~/src/app/utils/debug';
import { ICredential } from '~/src/app/models/user';
import { PHONE_REGISTER } from '../authConstants';

interface IAction {
  type: string;
  payload: ICredential;
}

function* registerPhoneSaga({
  payload,
}: IAction) /* : Generator<Promise<ICredential>, void, IResult> */ {
  try {
    log('[registerPhoneSaga] result payload', payload);

    const { name, email, phone, agreement, device_name } = payload;

    const result: AxiosResponse = yield call(
      methods.register,
      { name, email, phone, agreement, device_name },
      null,
    );
    log('[registerPhoneSaga] result', result);
    if (isSuccessStatus(result.status)) {
      yield put(requestSuccess());
      yield put(setAuthUserData({ phone, email, name }));
      yield RootNavigation.reset(routes.authNavigator.VerifyScreen);
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
