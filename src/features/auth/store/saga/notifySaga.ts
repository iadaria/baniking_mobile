import { Action } from '~/src/app/common/constants';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { NOTIFY } from '../authConstants';
import { AxiosResponse } from 'axios';
import { methods } from '~/src/app/api';
import { isSuccessStatus } from '~/src/app/models/response';
import { requestFail, requestSuccess } from '../authActions';
import { log, logline } from '~/src/app/utils/debug';
import { getErrorStrings } from '~/src/app/utils/error';
import { showAlert } from '~/src/app/common/components/showAlert';
import { IRootState } from '~/src/app/store/rootReducer';

export type NotifyPayload = {
  action: Action;
};

interface IBody {
  action: Action;
  phone: string;
}

function* notifySaga({ payload }: { type: string; payload: NotifyPayload }) {
  try {
    //logline('[notifySaga] paylaod', payload);
    const { action } = payload;
    const { phone } = yield select(({ auth }: IRootState) => auth.currentUser);
    const body: IBody = { action, phone };
    const { status }: AxiosResponse = yield call(methods.notify, body, null);
    //log('[notifySaga] result', result);

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
