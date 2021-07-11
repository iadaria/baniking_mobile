import { ForkEffect, put, takeLatest } from 'redux-saga/effects';
import * as RootNavigation from '~/src/navigation/helpers/RootNavigation';
import routes from '~/src/navigation/helpers/routes';
import { ICredential } from '~/src/app/models/user';
import { methods, tokenToHeaders } from '~/src/app/api';
import { getErrorStrings } from '~/src/app/utils/error';
import {
  setPersistUserData,
  setPersistToken,
} from '~/src/features/persist/store/appPersistActions';
import { setAuthUserData } from '~/src/features/auth/store/authActions';
import { PHONE_REGISTER } from '../authConstants';
import { showAlert } from '~/src/app/common/components/showAlert';
import { log, logline } from '~/src/app/utils/debug';

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

function* registerPhoneSaga({
  payload,
}: IAction) /* : Generator<Promise<ICredential>, void, IResult> */ {
  try {
    log('payload *************', payload);

    const { name, email, phone, agreement, device_name } = payload;

    const { token }: IResult = yield methods.register(
      { name, email, phone, agreement, device_name },
      null,
    );
    if (token) {
      yield tokenToHeaders(token);
      yield put(setPersistToken(token));
      yield put(setPersistUserData({ email, name, phone }));
      yield put(setAuthUserData({ token, email, name }));
      yield RootNavigation.navigate(routes.navigators.DrawerNavigator, null);
    }
  } catch (e) {
    log('[registerPhoneSaga]', e);

    let [errors, message, allErrors] = getErrorStrings(e);

    logline('[registerPhoneSaga]', [errors, message]);

    const errorMessage = allErrors
      ? allErrors
      : 'Введен неверный логин или пароль';

    yield showAlert('Ошибка', errorMessage);
  }
}

export default function* listener() {
  yield takeLatest(PHONE_REGISTER, registerPhoneSaga);
  //yield takeLatest(VERIFY, VerifySaga);
  //yield takeLatest(COMPLETE_REGISER, registerCompleteSaga);
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
} */
