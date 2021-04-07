import { call, put, takeLatest } from 'redux-saga/effects';
import { methods } from '~/src/app/api';
import { GET_CABINET_DATA } from '../profileConstants';
import { IResponseCabinet } from '~/src/app/models/profile';
import { setCabinetData } from '../profileActions';
import { getErrorStrings } from '~/src/app/utils/error';
import { showAlert } from '~/src/app/common/components/showAlert';
import { setTitlePoints } from '~/src/app/store/system/systemActions';
//import { setAuthUserData } from '~/src/features/auth/store/authActions';

// var countCabinetRequests = 0;

function* getCabinetDataSaga() {
  /* countCabinetRequests++;
  if (countCabinetRequests > 3) {
    __DEV__ && console.log('[getCabinetDataSaga] count > 3');
    setTimeout(function () {
      countCabinetRequests = 0;
    }, 10000);
    return;
  } */
  try {
    const cabinet: IResponseCabinet = yield call(methods.getCabinet, null, null);
    __DEV__ && console.log('\n[getCabinetSaga] **********\n');
    yield put(setCabinetData(cabinet));
    yield put(setTitlePoints(cabinet.user.points));
    //yield put(setAuthUserData({ name: cabinet.user.full_name, avatar: cabinet.user.avatar }));
  } catch (e) {
    __DEV__ && console.log(JSON.stringify(e, null, 4));
    let [errors, message, allErrors] = getErrorStrings(e);

    __DEV__ && console.log([errors, message, allErrors]);

    const errorMessage =
      allErrors || message ? allErrors || message : 'Ошибка при получении данных личного профиля';

    yield showAlert('Ошибка', errorMessage);
  }
}

export default function* listener() {
  yield takeLatest(GET_CABINET_DATA, getCabinetDataSaga);
}
