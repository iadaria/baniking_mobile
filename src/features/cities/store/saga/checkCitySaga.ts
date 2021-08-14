import { put, select, takeLatest } from 'redux-saga/effects';
import { getErrorStrings } from '~/src/app/utils/error';
import { citiesFail, selectCity } from '../cityActions';
import { showAlert } from '~/src/app/common/components/showAlert';
import { City } from '~/src/app/models/city';
import { IRootState } from '~/src/app/store/rootReducer';
import { CHECK_CITY } from '../cityConstants';
import { log, logline } from '~/src/app/utils/debug';

function* checkCitySaga() {
  try {
    // Detect selected city
    const { selectedCityName, cities } = yield select(
      ({ persist, city }: IRootState) => ({
        selectedName: persist.selectedCityName,
        cities: city.cities,
      }),
    );
    logline('\n[checkCitySaga]', { count: cities.length, selectedCityName });
    if (selectedCityName) {
      yield put(selectCity(selectedCityName));
    }
  } catch (e) {
    log('\n[checkCitiesSaga/error]', e);

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
