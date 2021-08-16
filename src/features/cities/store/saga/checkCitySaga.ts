import { FETCH_CITIES } from './../cityConstants';
import { fetchCities } from './../cityActions';
import { call, delay, fork, join, put, select, take, takeLatest } from 'redux-saga/effects';
import { getErrorStrings } from '~/src/app/utils/error';
import { citiesFail, selectCity, setCities } from '../cityActions';
import { showAlert } from '~/src/app/common/components/showAlert';
import { IRootState } from '~/src/app/store/rootReducer';
import { CHECK_CITY } from '../cityConstants';
import { log, logline } from '~/src/app/utils/debug';
import { methods } from '~/src/app/api';
import { City } from '~/src/app/models/city';
import store from '~/src/app/store';
import fetchCitiesSaga from './fetchCitiesSaga';

interface IAction {
  type: string;
}

const isNotEmpty = (value: string | null) => !!value;

const isFirstOrDifferent = (persistName: string | null, selected?: City) =>
  persistName !== selected?.name || !selected;


function* fetchCitisSync() {
  try {
    const result: unknown = yield call(methods.getCities, null, null);
    const cities = Object.values(result) as City[];
    yield put(setCities(cities));
  } catch (e) {
    logline('error', e);
  }
}

function* checkCitySaga(_: IAction) {
  //logline('\n\n[checkCitiesSaga]', ' *** CHECK CITIES YES *** ');
  try {
    yield call(fetchCitisSync)

    const state: IRootState = yield select((state) => state);
    const { selectedCityName: persistName } = state.persist;
    const { selectedCity } = state.city;

    if (
      isNotEmpty(persistName) &&
      isFirstOrDifferent(persistName, selectedCity)
    ) {
      // select city
      yield put(selectCity(persistName!));
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
