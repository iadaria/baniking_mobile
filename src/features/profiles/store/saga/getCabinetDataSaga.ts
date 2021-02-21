import { call, put, takeLatest } from 'redux-saga/effects';
import { methods } from '~/src/app/api';
import { GET_CABINET_DATA } from '../profileConstants';
import { ICabinet } from '~/src/app/models/profile';
import { setCabinetData } from '../profileActions';
import { getErrorStrings } from '~/src/app/utils/error';
import { showAlert } from '~/src/app/common/components/showAlert';

function* getCabinetDataSaga() {
  try {
    const cabinet: ICabinet = yield call(methods.getProfile, null, null);
    yield put(setCabinetData(cabinet));
  } catch (e) {
    console.log(JSON.stringify(e, null, 4));
    let [errors, message] = getErrorStrings(e);
    let errorMessage = errors.length ? `${message}` || errors[0] : 'Error connection';

    yield showAlert('Ошибка', errorMessage);
  }
}

export default function* listener() {
  yield takeLatest(GET_CABINET_DATA, getCabinetDataSaga);
}
