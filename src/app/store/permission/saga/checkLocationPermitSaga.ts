import { put, select, takeEvery } from 'redux-saga/effects';
import { Linking } from 'react-native';
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
import {
  setPermissionLocation,
  clearPermissionLocation,
} from '../permissionActions';
import { showAlert } from '~/src/app/common/components/showAlert';
import { CHECK_PERMISSION_LOCATION } from '../permissionConstants';
import { log, logline } from '~/src/app/utils/debug';
import { IRootState } from '~/src/app/store/rootReducer';

interface IAction {
  type: string;
}

const PERMISSION = PERMISSION_TYPE.location;

/* const changePermission = async () => {
  store.dispatch(clearPermissionLocation());
  await Linking.openSettings();
};
 */
function* checkLocationPermitSaga(_: IAction) {
  //logline('\n\n[checkLocationPermitSaga]', '***');

  try {
    const { location }: IPermissionState = yield select(
      ({ permission }: IRootState) => permission,
    );
    const [granted, permit] = location;

    if (!granted && permit === RESULTS.BLOCKED) {
      logline('showAlert', '+++');
      showAlert(
        'Местоположение',
        'Вы заблокировали возможность определения местоположения',
        'Изменить доступ',
        //async () => await changePermission(),
        //() => { },
      );
    } else if (!granted) {
      logline('checkPermission again', '');
      const result: [boolean, Permit] = yield AppPermission.checkPermission(
        PERMISSION,
      );
      yield put(setPermissionLocation(result));
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
