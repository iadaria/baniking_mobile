import { ForkEffect, put, takeLatest } from 'redux-saga/effects';
import * as RootNavigation from '~/src/navigation/helpers/RootNavigation';
import routes from '~/src/navigation/helpers/routes';
import { ICredential } from '~/src/app/models/user';
import { methods, tokenToHeaders } from '~/src/app/api';
import { getErrorStrings } from '~/src/app/utils/error';
import { setPersistUserData, setPersistToken } from '~/src/features/persist/store/appPersistActions';
import { setAuthUserData } from '~/src/features/auth/store/authActions';
import { EMAIL_REGISTER } from '../authConstants';
import { showAlert } from '~/src/app/common/components/showAlert';

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

function* registerEmailSaga({ payload }: IAction) /* : Generator<Promise<ICredential>, void, IResult> */ {
  try {
    console.log('payload', payload);
    const { name, email, phone, agreement, device_name } = payload;

    // const { token }: IResult = yield methods.register({ name, email, phone, agreement, device_name }, null);
    const token = 'kljlkjkl';
    tokenToHeaders(token);

    yield put(setPersistToken(token));
    // yield put(setPersistUserData({ email, name, phone }));
    // yield put(setAuthUserData({ token, email, name }));

    yield RootNavigation.navigate(routes.navigators.DrawerNavigator, null);
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
  yield takeLatest(EMAIL_REGISTER, registerEmailSaga);
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

/*
return
{
  "data": {
      "token": "11|6nrtwlXwDV58cH7fVRKJ4eX1eUeYSxbftpAScyb3"
  }
}
*/
