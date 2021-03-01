import { ForkEffect, put, takeLatest } from 'redux-saga/effects';
import * as RootNavigation from '~/src/navigation/helpers/RootNavigation';
import { methods } from '~/src/app/api';
import { showAlert } from '~/src/app/common/components/showAlert';
import { getErrorStrings } from '~/src/app/utils/error';
import { authSuccess } from '../authActions';
import { RESET_PASSWORD } from '../authConstants';
import routes from '~/src/navigation/helpers/routes';

interface IAction {
  type: string;
  payload: string;
}

function* resetPasswordSaga({ payload }: IAction) {
  try {
    const response = yield methods.reset({ email: payload }, null);
    console.log('[Auth reset password] response = ', response);
    yield put(authSuccess());
    yield RootNavigation.navigate(routes.authNavigator.LoginScreen);
  } catch (e) {
    console.log(JSON.stringify(e, null, 4));

    let [errors, message, allErrors] = getErrorStrings(e);

    console.log([errors, message]);

    const errorMessage = allErrors ? allErrors : 'Введен неверный логин или пароль';

    yield showAlert('Ошибка', errorMessage);
  }
}

export default function* listener(): Generator<ForkEffect<never>, void, unknown> {
  yield takeLatest(RESET_PASSWORD, resetPasswordSaga);
}
