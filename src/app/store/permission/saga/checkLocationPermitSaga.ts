import { takeEvery } from 'redux-saga/effects';
import { showAlert } from '~/src/app/common/components/showAlert';
import { store } from '~/src/app/store';
import {
  AppPermission,
  PERMISSION_TYPE,
} from '~/src/app/common/components/AppPersmission';
import { CHECK_PERMISSION_LOCATION } from '../permissionConstants';
import { log, logline } from '~/src/app/utils/debug';
import { setPermissionLocation } from '../permissionActions';
import { Permit } from '~/src/app/store/permission/permissionReducer';

interface IAction {
  type: string;
}

const PERMISSION = PERMISSION_TYPE.location;

function* checkLocationPermitSaga(_: IAction) {
  logline('[checkLocationPermitSaga]', '***');

  const setPermission = (permition: [boolean, Permit]) =>
    store.dispatch(setPermissionLocation(permition));

  try {
    AppPermission.checkPermission(PERMISSION).then(setPermission);
  } catch (e) {
    log('[checkLocationPermitSaga/error]', e);

    const errorMessage = 'Ошибка проверки прав';

    yield showAlert('Ошибка', errorMessage);
  }
}

export default function* listener() {
  yield takeEvery(CHECK_PERMISSION_LOCATION, checkLocationPermitSaga);
}
