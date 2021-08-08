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

function* fetchCitiesSaga(_: IAction) {
  //logline('[fetchCitiesSaga]', ' *** YES *** ');

  const sortAsc = (a: City, b: City) =>
    a.name < b.name ? -1 : Number(a.name > b.name);

  try {
    const result: unknown = yield call(methods.getCities, null, null);
    const cities = Object.values(result) as City[];
    const sortedCities = cities.sort(sortAsc);
    log('[sortedCities]', sortedCities.slice(0, 8));
    yield put(setCities(sortedCities));
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
  yield takeEvery(FETCH_CITIES, fetchCitiesSaga);
}
