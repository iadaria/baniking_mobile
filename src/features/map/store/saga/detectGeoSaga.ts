import { put, select, takeEvery } from 'redux-saga/effects';
import Geolocation from 'react-native-geolocation-service';

import { showAlert } from '~/src/app/common/components/showAlert';
import { getErrorStrings } from '~/src/app/utils/error';
import { mapFail, mapRequest, setGeoLocation } from '../mapActions';
import { store } from '~/src/app/store';
//import { IRootState } from '~/src/app/store/rootReducer';
//import { IPermissionState } from '~/src/app/store/permission/permissionReducer';
import { DETECT_GEO_LOCATION } from '../mapConstants';
import { log, logline } from '~/src/app/utils/debug';

interface IAction {
  type: string;
}

function* detectGeoSaga(_: IAction) {
  logline('\n\n[detectGeoSage]', '***');
  try {
    /* const { location }: IPermissionState = yield select(
      ({ permission }: IRootState) => permission,
    );
    const [granted] = location; */
    //if (granted) {
    yield put(mapRequest());
    yield Geolocation.getCurrentPosition(
      (position: Geolocation.GeoPosition) => {
        const { latitude: lat, longitude: lng } = position.coords;
        if (lat && lng) {
          logline('[detectGeoSage] setLocation', position.coords);
          store.dispatch(setGeoLocation({ lat, lng }));
        }
      },
      (error: Geolocation.GeoError) => {
        logline(
          '[detectGeoSaga/getCurrentPosition] ',
          `${error.code} ${error.message}`,
        );
      },
      { enableHighAccuracy: true },
    );
    //  }
  } catch (e) {
    log('[detectGeoSaga/error]', e);

    let [errors, message, allErrors] = getErrorStrings(e);
    yield put(mapFail());

    logline('[detectGeoSaga/error]', [errors, message]);

    const errorMessage = allErrors
      ? allErrors
      : 'Ошибка определения геологкации';

    yield showAlert('Ошибка', errorMessage);
  }
}

export default function* listener() {
  yield takeEvery(DETECT_GEO_LOCATION, detectGeoSaga);
}
