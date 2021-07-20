import { call, put, select, takeLatest } from 'redux-saga/effects';
import DeviceInfo from 'react-native-device-info';
import { methods } from '~/src/app/api';
import { log, logline } from '~/src/app/utils/debug';
import { VERIFY } from '../authConstants';
import { AxiosResponse } from 'axios';
import { getErrorStrings } from '~/src/app/utils/error';
import { showAlert } from '~/src/app/common/components/showAlert';
import { isSuccessStatus } from '~/src//app/models/response';
import {
  initRegisterCompleteInputs,
  requestFail,
  requestSuccess,
} from '../authActions';
import { routes } from '~/src/navigation/helpers/routes';
import { Action } from '~/src/app/common/constants';
import * as RootNavigation from '~/src/navigation/helpers/RootNavigation';
import { IRootState } from '~/src/app/store/rootReducer';

export type VerifyPayload = {
  //phone: string;
  action: Action;
  code: string;
};

interface IBody {
  phone: string;
  action: Action;
  code: string;
}

function* verifySaga({ payload }: { type: string; payload: VerifyPayload }) {
  try {
    //logline('[verifySaga]', payload);
    const { action, code } = payload;
    const { phone } = yield select(({ auth }: IRootState) => auth.currentUser);
    const body: IBody = { action, code, phone };
    const { status }: AxiosResponse = yield call(methods.verify, body, null);

    if (isSuccessStatus(status)) {
      yield put(requestSuccess());
      const device_name: string = yield call(DeviceInfo.getDeviceName);
      yield put(
        initRegisterCompleteInputs({
          phone,
          device_name,
          password: '',
          password_confirmation: '',
        }),
      );
      yield RootNavigation.reset(routes.authNavigator.RegisterCompleteScreen, {
        action,
      });
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
