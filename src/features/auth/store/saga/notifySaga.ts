import { Action } from '~/src/app/common/constants';
import { call, put, takeLatest } from 'redux-saga/effects';
import { NOTIFY } from '../authConstants';
import { AxiosResponse } from 'axios';
import { methods } from '~/src/app/api';
import { isSuccessStatus } from '~/src/app/models/response';
import { requestSuccess } from '../authActions';
import routes from '~/src/navigation/helpers/routes';
import * as RootNavigation from '~/src/navigation/helpers/RootNavigation';
import { log, logline } from '~/src/app/utils/debug';
import { getErrorStrings } from '~/src/app/utils/error';
import { showAlert } from '~/src/app/common/components/showAlert';

export type NotifyPaylaod = {
  phone: string;
  action: Action;
};

function* notifySaga({ payload }: { type: string; payload: NotifyPaylaod }) {
  try {
    const { status }: AxiosResponse = yield call(methods.notify, payload, null);
    if (isSuccessStatus(status)) {
      const { action } = payload;
      yield put(requestSuccess());
      if (action === Action.Registration) {
        yield RootNavigation.reset(routes.authNavigator.RegisterCompleteScreen);
      }
    }
  } catch (e) {
    log('[notifySaga/error]', e);

    let [errors, message, allErrors] = getErrorStrings(e);

    logline('[notifySaga/error]', [errors, message]);

    const errorMessage = allErrors ? allErrors : 'Ошибка при верификации кода';

    yield showAlert('Ошибка', errorMessage);
}

export default function* notify() {
  yield takeLatest(NOTIFY, notifySaga);
}
