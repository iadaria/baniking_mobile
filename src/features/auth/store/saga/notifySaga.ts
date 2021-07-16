import { Action } from '~/src/app/common/constants';
import { call, put, takeLatest } from 'redux-saga/effects';
import { NOTIFY } from '../authConstants';
import { AxiosResponse } from 'axios';
import { methods } from '~/src/app/api';
import { isSuccessStatus } from '~/src/app/models/response';
import { requestFail, requestSuccess } from '../authActions';
import routes from '~/src/navigation/helpers/routes';
import * as RootNavigation from '~/src/navigation/helpers/RootNavigation';
import { log, logline } from '~/src/app/utils/debug';
import { getErrorStrings } from '~/src/app/utils/error';
import { showAlert } from '~/src/app/common/components/showAlert';

export type NotifyPayload = {
  phone: string;
  action: Action;
};

function* notifySaga({ payload }: { type: string; payload: NotifyPayload }) {
  try {
    logline('[notifySaga] paylaod', payload);
    const result: unknown = yield call(methods.notify, payload, null);
    log('[notifySaga] result', result);

    const status = result?.status;
    if (isSuccessStatus(status)) {
      yield put(requestSuccess());
    }
  } catch (e) {
    log('[notifySaga/error]', e);

    let [errors, message, allErrors] = getErrorStrings(e);
    yield put(requestFail(errors));

    logline('[notifySaga/error]', [errors, message]);

    const errorMessage = allErrors ? allErrors : 'Ошибка при верификации кода';

    yield showAlert('Ошибка', errorMessage);
  }
}

export default function* listener() {
  yield takeLatest(NOTIFY, notifySaga);
}
