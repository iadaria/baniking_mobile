import { call, put, takeLatest } from 'redux-saga/effects';
import { methods } from '~/src/app/api';
import { GET_CABINET_DATA } from '../profileConstants';
import { IResponseCabinet } from '~/src/app/models/profile';
import { setCabinetData } from '../profileActions';
import { getErrorStrings } from '~/src/app/utils/error';
import { showAlert } from '~/src/app/common/components/showAlert';

function* getCabinetDataSaga() {
  try {
    const cabinet: IResponseCabinet = yield call(methods.getCabinet, null, null);
    console.log('[getCabinetSaga] **********');
    yield put(setCabinetData(cabinet));
  } catch (e) {
    console.log(JSON.stringify(e, null, 4));
    let [errors, message, allErrors] = getErrorStrings(e);

    console.log([errors, message, allErrors]);

    const errorMessage =
      allErrors && message ? allErrors || message : 'Ошибка при получении данных личного профиля';

    yield showAlert('Ошибка', errorMessage);
  }
}

export default function* listener() {
  yield takeLatest(GET_CABINET_DATA, getCabinetDataSaga);
}
