import { put, select, takeEvery } from 'redux-saga/effects';
import Geolocation from 'react-native-geolocation-service';

import { methods } from '~/src/app/api';
import { showAlert } from '~/src/app/common/components/showAlert';
import { IPermissionState } from '~/src/app/store/permission/permissionReducer';
import { IRootState } from '~/src/app/store/rootReducer';
import { log, logline } from '~/src/app/utils/debug';
import { getErrorStrings } from '~/src/app/utils/error';
import { mapRequest } from '../mapActions';

interface IAction {
  type: string;
}

interface IResult {
  id: string;
}

function* detectGeoSaga(_: IAction) {
  logline('[detectGeoSaga]', '***');
  try {
    const { location }: IPermissionState = yield select(
      ({ permission }: IRootState) => permission,
    );
    const [granted, permit] = location;
    if (granted) {
      yield put(mapRequest());
      yield Geolocation.getCurrentPosition()
      const r: IResult = yield methods.name(paylaod, params);
    }
  } catch (e) {
    log('[detectGeoSaga/error]', e);

    let [errors, message, allErrors] = getErrorStrings(e);
    yield put(Fail());

    logline('[detectGeoSaga/error]', [errors, message]);

    const errorMessage = allErrors ? allErrors : 'Ошибка ...';

    yield showAlert('Ошибка', errorMessage);
  }
}

export default function* listener() {
  yield takeEvery(CONSTANT, detectGeoSaga);
}
