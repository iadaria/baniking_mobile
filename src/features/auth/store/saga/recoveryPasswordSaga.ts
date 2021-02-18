import { showMessage } from 'react-native-flash-message';
import { ForkEffect, takeLatest } from 'redux-saga/effects';
import { methods } from '~/src/app/api';
import { ICredential } from '~/src/app/models/user';
import { getErrorStrings } from '~/src/app/utils/error';
import { authFail } from '../authActions';
import { AUTH_FAIL, RECOVERY_PASSWORD } from '../authConstants';

interface IAction {
  type: string;
  payload: ICredential;
}

interface IResult {
  token: string;
}

function* recoveryPasswordSaga({ payload: { email } }: IAction) {
  try {
    const response = yield methods.recovery({ email }, null);
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
  yield takeLatest(RECOVERY_PASSWORD, recoveryPasswordSaga);
}
