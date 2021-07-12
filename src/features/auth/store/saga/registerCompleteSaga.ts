import { call, put, takeLatest } from 'redux-saga/effects';
import { methods } from '~/src/app/api';
import { log, logline } from '~/src/app/utils/debug';
import { COMPLETE_REGISTER } from '../authConstants';
import { AxiosResponse } from 'axios';
import { getErrorStrings } from '~/src/app/utils/error';
import { showAlert } from '~/src/app/common/components/showAlert';
import { authFail } from '../authActions';

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

function* registerCompleteSaga({ payload }: IAction) {
  try {
    log('[registerCompleteSaga] payload', payload);

    const { data, status }: AxiosResponse = yield call(
      methods.registerComplete,
      payload,
      null,
    );
    log('[registerCompleteSaga] response data', data);
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
