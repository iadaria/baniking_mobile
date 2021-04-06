import { methods } from '~/src/app/api';
import { takeLatest } from 'redux-saga/effects';
import { showAlert } from '~/src/app/common/components/showAlert';
import { IOrderCallParams } from '~/src/app/models/bath';
import { getErrorStrings } from '~/src/app/utils/error';
import { ORDER_CALL } from '../bathConstants';

interface IAction {
  type: string;
  payload: IOrderCallParams;
}

function* orderCallSaga({ payload }: IAction) {
  try {
    __DEV__ && console.log('[orderCallSaga]', payload);

    yield methods.orderCall(payload, null);
  } catch (e) {
    console.log(JSON.stringify(e, null, 4));

    let [errors, message] = getErrorStrings(e);

    //yield put(orderCallFail(errors));

    console.log('[sendProfileSettingsSaga]', [errors, message]);

    const errorMessage = 'Ошибка отправки запроса';

    yield showAlert('Ошибка', errorMessage);
  }
}

export default function* listener() {
  yield takeLatest(ORDER_CALL, orderCallSaga);
}
