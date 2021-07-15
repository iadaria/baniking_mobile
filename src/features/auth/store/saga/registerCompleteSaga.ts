import { call, put, select, takeLatest } from 'redux-saga/effects';
import { methods, tokenToHeaders } from '~/src/app/api';
import { COMPLETE_REGISTER } from '../authConstants';
import { getErrorStrings } from '~/src/app/utils/error';
import { authFail, authSuccess, setAuthUserData } from '../authActions';
import {
  setPersistToken,
  setPersistUserData,
} from '~/src/features/persist/store/appPersistActions';
import * as RootNavigation from '~/src/navigation/helpers/RootNavigation';
import routes from '~/src/navigation/helpers/routes';
import { showAlert } from '~/src/app/common/components/showAlert';
import { log, logline } from '~/src/app/utils/debug';
import { IRootState } from '~/src/app/store/rootReducer';
import { IUserAuth } from '~/src/app/models/user';
import { IAuthState } from '~/src/features/auth/store/authReducer';

export type CompleteRegisterPayload = {
  phone: string;
  password: string;
  password_confirmation: string;
  device_name: string;
};

interface IAction {
  type: string;
  payload: CompleteRegisterPayload;
}

interface IResult {
  token: string;
}

function* registerCompleteSaga({ payload }: IAction) {
  try {
    log('[registerCompleteSaga] payload', payload);

    const { token }: IResult = yield call(
      methods.registerComplete,
      payload,
      null,
    );
    log('[registerCompleteSaga] response data', token);

    if (token) {
      yield put(authSuccess());
      const { currentUser }: IAuthState = yield select(
        ({ auth }: IRootState) => auth,
      );
      const { email, name, phone }: Partial<IUserAuth> = currentUser || {};
      yield tokenToHeaders(token);
      yield put(setPersistToken(token));
      yield put(setPersistUserData({ email, name, phone }));
      yield put(setAuthUserData({ token, email, name }));
      yield RootNavigation.reset(routes.navigators.DrawerNavigator);
    }
  } catch (e) {
    log('[registerCompleteSaga/error]', e);

    let [errors, message, allErrors] = getErrorStrings(e);
    yield put(authFail(errors));

    logline('[registerCompleteSaga/error]', [errors, message]);

    const errorMessage = allErrors ? allErrors : 'Ошибка при изменении пароля';

    yield showAlert('Ошибка', errorMessage);
  }
}

export default function* listener() {
  yield takeLatest(COMPLETE_REGISTER, registerCompleteSaga);
}
