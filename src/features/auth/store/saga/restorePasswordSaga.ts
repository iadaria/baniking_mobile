import { call, put, select, takeLatest } from 'redux-saga/effects';
import { methods, tokenToHeaders } from '~/src/app/api';
import { getErrorStrings } from '~/src/app/utils/error';
import { authFail, authSuccess, setAuthUserData } from '../authActions';
import * as RootNavigation from '~/src/navigation/helpers/RootNavigation';
import { routes } from '~/src/navigation/helpers/routes';
import { showAlert } from '~/src/app/common/components/showAlert';
import { IRootState } from '~/src/app/store/rootReducer';
import { IUserAuth } from '~/src/app/models/user';
import { IAuthState } from '~/src/features/auth/store/authReducer';
import { RESTORE_PASSWORD } from '../authConstants';
import { log, logline } from '~/src/app/utils/debug';

export type RestorePasswordPayload = {
  phone: string;
  password: string;
  password_confirmation: string;
  device_name: string;
};

interface IAction {
  type: string;
  payload: RestorePasswordPayload;
}

interface IResult {
  token: string;
}

function* restorePasswordSaga({ payload }: IAction) {
  try {
    log('[restorePasswordSaga] payload', payload);

    const { token }: IResult = yield call(methods.restore, payload, null);
    log('[restorePasswordSaga] response data', token);

    if (token) {
      yield put(authSuccess());
      yield tokenToHeaders(token);
      const { currentUser }: IAuthState = yield select(
        ({ auth }: IRootState) => auth,
      );
      const { email, name, phone }: Partial<IUserAuth> = currentUser || {};
      yield put(setAuthUserData({ token, email, name, phone }));
      yield RootNavigation.reset(routes.navigators.DrawerNavigator);
    }
  } catch (e) {
    log('[restorePasswordSaga/error]', e);

    let [errors, message, allErrors] = getErrorStrings(e);
    yield put(authFail(errors));

    logline('[restorePasswordSaga/error]', [errors, message]);

    const errorMessage = allErrors ? allErrors : 'Ошибка при изменении пароля';

    yield showAlert('Ошибка', errorMessage);
  }
}

export default function* listener() {
  yield takeLatest(RESTORE_PASSWORD, restorePasswordSaga);
}
