import { call, put, select, takeLatest } from 'redux-saga/effects';
import { getErrorStrings } from '~/src/app/utils/error';
import { citiesFail, selectCity } from '../cityActions';
import { showAlert } from '~/src/app/common/components/showAlert';
import { IRootState } from '~/src/app/store/rootReducer';
import { CHECK_CITY } from '../cityConstants';
import { log, logline } from '~/src/app/utils/debug';
import { fetchCitiesSaga } from './fetchCitiesSaga';

interface IAction {
  type: string;
}

function* checkCitySaga(_: IAction) {
  logline('[checkCitySaga]', '***');
  try {
    const { city, persist }: IRootState = yield select((state) => state);
    const { selectedCity, count } = city;

    if (count <= 0) {
      yield call(fetchCitiesSaga, { type: '' });
    }

    const { selectedCityName: persistName } = persist;

    if (persistName && !selectedCity) {
      yield put(selectCity(persistName!));
    }
  } catch (e) {
    log('[checkCitiesSaga/error]', e);

    let [errors, message, allErrors] = getErrorStrings(e);
    yield put(citiesFail(errors));

    logline('[checkCitiesSaga/error]', [errors, message]);

    const errorMessage = allErrors ? allErrors : 'Ошибка при выборе города';

    yield showAlert('Ошибка', errorMessage);
  }
}

export default function* listener() {
  yield takeLatest(CHECK_CITY, checkCitySaga);
}
