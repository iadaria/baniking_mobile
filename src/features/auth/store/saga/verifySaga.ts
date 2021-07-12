import { call, put, takeLatest } from 'redux-saga/effects';
import { methods } from '~/src/app/api';
import { log, logline } from '~/src/app/utils/debug';
import { VERIFY } from '../authConstants';
import { AxiosResponse } from 'axios';
import { getErrorStrings } from '~/src/app/utils/error';
import { showAlert } from '~/src/app/common/components/showAlert';
import { isSuccessStatus } from '~/src//app/models/response';
import * as RootNavigation from '~/src/navigation/helpers/RootNavigation';
import { requestSuccess } from '../authActions';
import routes from '~/src/navigation/helpers/routes';

export const ACTION_REGISTRATION = 0;
export const ACTION_PASSWORD = 1;

export type VerifyPayload = {
  phone: string;
  action: 0 | 1;
  code: string;
};

function* verifySaga({ payload }: { type: string; payload: VerifyPayload }) {
  try {
    const { status }: AxiosResponse = yield call(methods.verify, payload, null);
    if (isSuccessStatus(status)) {
      const { action } = payload;
      yield put(requestSuccess());
      if (Number(action) === ACTION_REGISTRATION) {
        yield RootNavigation.reset(routes.authNavigator.RegisterCompleteScreen);
      }
    }
  } catch (e) {
    log('[verifySaga/error]', e);

    let [errors, message, allErrors] = getErrorStrings(e);

    logline('[verifyaga/error]', [errors, message]);

    const errorMessage = allErrors ? allErrors : 'Ошибка при верификации кода';

    yield showAlert('Ошибка', errorMessage);
  }
}

export default function* listener() {
  yield takeLatest(VERIFY, verifySaga);
}
