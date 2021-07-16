import { call, ForkEffect, put, takeLatest } from 'redux-saga/effects';
import * as RootNavigation from '~/src/navigation/helpers/RootNavigation';
import { methods } from '~/src/app/api';
import { showAlert } from '~/src/app/common/components/showAlert';
import { getErrorStrings } from '~/src/app/utils/error';
import { authSuccess, requestSuccess, setAuthUserData } from '../authActions';
import { RESET_PASSWORD } from '../authConstants';
import { routes } from '~/src/navigation/helpers/routes';
import { log, logline } from '~/src/app/utils/debug';
import { AxiosResponse } from 'axios';
import { isSuccessStatus } from '~/src/app/models/response';

export type ResetPasswordPayload = {
  phone: string;
};

interface IAction {
  type: string;
  payload: ResetPasswordPayload;
}

function* resetPasswordSaga({ payload }: IAction) {
  try {
    const { phone } = payload;
    const response: AxiosResponse = yield call(methods.reset, { phone }, null);
    //logline('[Auth reset password] response = ', response);
    if (isSuccessStatus(response.status)) {
      yield put(requestSuccess());
      yield put(setAuthUserData({ phone }));
      yield RootNavigation.reset(routes.authNavigator.VerifyScreen);
    }
  } catch (e) {
    //log('[resetPassword]', e);

    let [errors, message, allErrors] = getErrorStrings(e);

    log('[resetPassword]', [errors, message, allErrors]);

    const errorMessage = allErrors
      ? allErrors
      : 'Возникла ошибка при восстановлении пароля';

    yield showAlert('Ошибка', errorMessage);
  }
}

export default function* listener(): Generator<
  ForkEffect<never>,
  void,
  unknown
> {
  yield takeLatest(RESET_PASSWORD, resetPasswordSaga);
}
