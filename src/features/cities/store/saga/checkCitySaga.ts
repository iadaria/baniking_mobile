import { call, put, select, takeLatest } from 'redux-saga/effects';
import { getErrorStrings } from '~/src/app/utils/error';
import { citiesFail, selectCity, setCities } from '../cityActions';
import { showAlert } from '~/src/app/common/components/showAlert';
import { IRootState } from '~/src/app/store/rootReducer';
import { CHECK_CITY } from '../cityConstants';
import { log, logline } from '~/src/app/utils/debug';
import { methods } from '~/src/app/api';
import { City } from '~/src/app/models/city';

interface IAction {
  type: string;
}

function* checkCitySaga(_: IAction) {
  //logline('\n\n[checkCitiesSaga]', ' *** CHECK CITIES YES *** ');
  try {
    const { selectedCityName } = yield select(
      ({ persist }: IRootState) => persist,
    );
    if (selectedCityName) {
      const result: unknown = yield call(methods.getCities, null, null);
      const cities = Object.values(result) as City[];
      yield put(setCities(cities));
      yield put(selectCity(selectedCityName));

      logline('\n[checkCitySaga]', { count: cities.length, selectedCityName });
    }
  } catch (e) {
    log('[checkCitiesSaga/error]', e);

    let [errors, message, allErrors] = getErrorStrings(e);
    yield put(citiesFail(errors));

    logline('[checkCitiesSaga/error]', [errors, message]);

    const errorMessage = allErrors
      ? allErrors
      : 'Ошибка при получении данных о городах';

    yield showAlert('Ошибка', errorMessage);
  }
}

export default function* listener() {
  yield takeLatest(CHECK_CITY, checkCitySaga);
}

/* const { selectedCityName, cities } = yield select(
  ({ persist, city }: IRootState) => ({
    selectedCityName: persist.selectedCityName?.toLocaleLowerCase(),
    cities: city.cities,
  }),
); */
