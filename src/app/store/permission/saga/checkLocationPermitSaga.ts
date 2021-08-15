import { select, takeEvery } from 'redux-saga/effects';
import { RESULTS } from 'react-native-permissions';
import { store } from '~/src/app/store';
import {
  AppPermission,
  PERMISSION_TYPE,
} from '~/src/app/common/components/AppPersmission';
import {
  Permit,
  IPermissionState,
} from '~/src/app/store/permission/permissionReducer';
import { setPermissionLocation } from '../permissionActions';
import { showAlert } from '~/src/app/common/components/showAlert';
import { CHECK_PERMISSION_LOCATION } from '../permissionConstants';
import { log, logline } from '~/src/app/utils/debug';
import { IRootState } from '~/src/app/store/rootReducer';

interface IAction {
  type: string;
}

const PERMISSION = PERMISSION_TYPE.location;

const setPermission = (permition: [boolean, Permit]) =>
  store.dispatch(setPermissionLocation(permition));

function* checkLocationPermitSaga(_: IAction) {
  logline('\n\n[checkLocationPermitSaga]', '***');

  try {
    const { location }: IPermissionState = yield select(
      ({ permission }: IRootState) => permission,
    );
    const [granted, permit] = location;

    if (!granted && permit === RESULTS.BLOCKED) {
      showAlert(
        'Местоположение',
        'Вы заблокировали возможность определения местоположения',
      );
    }
    if (!granted) {
      yield AppPermission.checkPermission(PERMISSION).then(setPermission);
    }
  } catch (e) {
    log('[checkLocationPermitSaga/error]', e);

    const errorMessage = 'Ошибка проверки прав';

    yield showAlert('Ошибка', errorMessage);
  }
}

export default function* listener() {
  yield takeEvery(CHECK_PERMISSION_LOCATION, checkLocationPermitSaga);
}
