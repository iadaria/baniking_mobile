import { call, put, select, takeLatest } from 'redux-saga/effects';
import { getErrorStrings } from '~/src/app/utils/error';
import { citiesFail, selectCity } from '../cityActions';
import { showAlert } from '~/src/app/common/components/showAlert';
import { IRootState } from '~/src/app/store/rootReducer';
import { CHECK_CITY } from '../cityConstants';
import { log, logline } from '~/src/app/utils/debug';
import { City } from '~/src/app/models/city';
import { fetchCitiesSaga } from './fetchCitiesSaga';

interface IAction {
  type: string;
}

const isFirstOrDifferent = (persistName: string | null, selected?: City) =>
  persistName !== selected?.name || !selected;

function* checkCitySaga(_: IAction) {
  //logline('\n\n[checkCitiesSaga]', ' *** CHECK CITIES YES *** ');
  try {
    yield call(fetchCitiesSaga, { type: '' });

    const state: IRootState = yield select((state) => state);
    const { selectedCityName: persistName } = state.persist;
    const { selectedCity, cities } = state.city;

    //logline('sldkjf', cities.length)

    if (persistName && isFirstOrDifferent(persistName, selectedCity)) {
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
