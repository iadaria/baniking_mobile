import { call, put, takeLatest } from 'redux-saga/effects';
import { methods } from '~/src/app/api';
import { log, logline } from '~/src/app/utils/debug';
import { VERIFY } from '../authConstants';
import { AxiosResponse } from 'axios';
import { getErrorStrings } from '~/src/app/utils/error';
import { showAlert } from '~/src/app/common/components/showAlert';
import { isSuccessStatus } from '~/src//app/models/response';
import { requestFail, requestSuccess } from '../authActions';
import routes from '~/src/navigation/helpers/routes';
import { Action } from '~/src/app/common/constants';
import * as RootNavigation from '~/src/navigation/helpers/RootNavigation';

export type VerifyPayload = {
  phone: string;
  action: Action;
  code: string;
};

function* verifySaga({ payload }: { type: string; payload: VerifyPayload }) {
  try {
    logline('[verifySaga]', payload);
    const { status }: AxiosResponse = yield call(methods.verify, payload, null);
    if (isSuccessStatus(status)) {
      const { action } = payload;
      yield put(requestSuccess());
      if (action === Action.Registration) {
        yield RootNavigation.reset(routes.authNavigator.RegisterCompleteScreen);
      }
    }
  } catch (e) {
    log('[verifySaga/error]', e);

    let [errors, message, allErrors] = getErrorStrings(e);
    yield put(requestFail(errors));

    logline('[verifyaga/error]', [errors, message]);

    const errorMessage = allErrors ? allErrors : 'Ошибка при верификации кода';

    yield showAlert('Ошибка', errorMessage);
  }
}

export default function* listener() {
  yield takeLatest(VERIFY, verifySaga);
}
