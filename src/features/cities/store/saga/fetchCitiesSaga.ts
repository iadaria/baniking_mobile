import { call, put, takeEvery } from 'redux-saga/effects';
import { showAlert } from '~/src/app/common/components/showAlert';
import { City } from '~/src/app/models/city';
import { log, logline } from '~/src/app/utils/debug';
import { getErrorStrings } from '~/src/app/utils/error';
import { citiesFail, setCities } from '../cityActions';
import { FETCH_CITIES } from '../cityConstants';
import { methods } from '~/src/app/api';

interface IAction {
  type: string;
}

function* fetchCitiesSagaTest(_: IAction) {
  logline('\n\n[fetchCitiesSaga]', ' *** FETCH CITIES YES *** ');

  try {
    const result: unknown = yield call(methods.getCities, null, null);
    const cities = Object.values(result) as City[];
    logline('[fetchCitiesSaga] result count', cities.length);
    //log('[sortedCities]', cities.slice(0, 8));
    yield put(setCities(cities));
  } catch (e) {
    log('\n[fetchCitiesSaga/error]', e);

    let [errors, message, allErrors] = getErrorStrings(e);
    yield put(citiesFail(errors));

    logline('[fetchCitiesSaga/error]', [errors, message]);

    const errorMessage = allErrors
      ? allErrors
      : 'Ошибка при получении данных о городах';

    yield showAlert('Ошибка', errorMessage);
  }
}

export default function* listener() {
  yield takeEvery(FETCH_CITIES, fetchCitiesSagaTest);
}
