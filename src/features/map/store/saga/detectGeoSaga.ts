import { put, takeEvery } from 'redux-saga/effects';
import Geolocation from 'react-native-geolocation-service';
import { showAlert } from '~/src/app/common/components/showAlert';
import { getErrorStrings } from '~/src/app/utils/error';
import { mapFail, mapRequest, setGeoLocation } from '../mapActions';
import { DETECT_GEO_LOCATION } from '../mapConstants';
import { log, logline } from '~/src/app/utils/debug';

interface IAction {
  type: string;
}

type GeoPosition = Geolocation.GeoPosition;
function getCurrentPosition() {
  logline('\n!![detectGeoSaga] getCurrentPosition', '');
  return new Promise((resolve, error) => {
    Geolocation.getCurrentPosition(resolve, error, {
      enableHighAccuracy: true,
    });
  });
}

function* detectGeoSaga(_: IAction) {
  logline('\n\n[detectGeoSage]', '***');
  try {
    yield put(mapRequest());
    const position: GeoPosition = yield getCurrentPosition();
    logline('\n!![detectGeoSaga] position', position);

    if (position) {
      const { latitude: lat, longitude: lng } = position.coords;
      yield put(setGeoLocation({ lat, lng }));
    }
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
