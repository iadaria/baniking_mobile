import { showMessage } from 'react-native-flash-message';
import { ForkEffect, put, takeLatest } from 'redux-saga/effects';
import { methods } from '~/src/app/api';
import { ICredential } from '~/src/app/models/user';
import { getErrorStrings } from '~/src/app/utils/error';
import { authFail, authSuccess } from '../authActions';
import { RESET_PASSWORD } from '../authConstants';

interface IAction {
  type: string;
  payload: ICredential;
}

function* resetPasswordSaga({ payload: { email } }: IAction) {
  try {
    const response = yield methods.reset({ email }, null);
    console.log('[Auth reset password] response = ', response);
    yield put(authSuccess());
  } catch (e) {
    console.log(JSON.stringify(e, null, 4));
    let [errors, message] = getErrorStrings(e);
    let errorMessage = errors.length ? `${message}` || errors[0] : 'Error connection';

    yield showMessage({
      message: `${errorMessage}`,
      type: 'warning',
    });

    yield authFail();
  }
}

export default function* listener(): Generator<ForkEffect<never>, void, unknown> {
  yield takeLatest(RESET_PASSWORD, resetPasswordSaga);
}
