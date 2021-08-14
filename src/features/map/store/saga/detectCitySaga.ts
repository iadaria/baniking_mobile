import { put, select, takeEvery } from 'redux-saga/effects';
import { GOOGLE_API } from 'react-native-dotenv';
import { mapFail, setDetectedCity } from '../mapActions';
import { getErrorStrings } from '~/src/app/utils/error';
import { showAlert } from '~/src/app/common/components/showAlert';
import { methods } from '~/src/app/api';
import { IRootState } from '~/src/app/store/rootReducer';
import { IMapState } from '../mapReducer';
import { DETECT_CITY } from '../mapConstants';
import { log, logline } from '~/src/app/utils/debug';

export type DetectCityParams = {
  latlng: string;
  sensor: boolean;
  key: string;
  language: 'ru';
  result_type: 'locality';
};

interface IAction {
  type: string;
}

interface IResult {
  results: {
    address_components: { long_name: string; short_name: string }[];
  }[];
}

function* detectCitySaga(_: IAction) {
  logline('[detectCitySage]', '***');
  try {
    const { lat, lng }: IMapState = yield select(({ map }: IRootState) => map);
    const params: DetectCityParams = {
      latlng: `${lat}:${lng}`,
      sensor: false,
      key: GOOGLE_API,
      language: 'ru',
      result_type: 'locality',
    };
    const r: IResult = yield methods.detectCityByLocation(null, params);
    logline('[detectCitySaga] result', r);

    const city = r.results[0].address_components[0].short_name;

    const setCity = () => put(setDetectedCity(city));
    // ask user
    yield showAlert(
      'Определение местоположения',
      `Ваш город ${city}?`,
      'OK',
      setCity,
    );
  } catch (e) {
    log('[detectCitySaga/error]', e);

    let [errors, message, allErrors] = getErrorStrings(e);
    yield put(mapFail());

    logline('[detectCitySaga/error]', [errors, message]);

    const errorMessage = allErrors
      ? allErrors
      : 'Ошибка при определении города';

    yield showAlert('Ошибка', errorMessage);
  }
}

export default function* listener() {
  yield takeEvery(DETECT_CITY, detectCitySaga);
}
