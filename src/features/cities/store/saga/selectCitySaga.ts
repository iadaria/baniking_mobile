import { put, select, takeEvery } from 'redux-saga/effects';
import { IRootState } from '~/src/app/store/rootReducer';
import { log, logline } from '~/src/app/utils/debug';
import { SELECT_CITY } from '../cityConstants';
import { persistCity } from '~/src/features/persist/store/appPersistActions';
import { City } from '~/src/app/models/city';
import { clearBathes } from '~/src/features/bathes/store/bathActions';
import { setSelectedCity } from '../cityActions';
import {
  notNear,
  setBathParam,
} from '~/src/features/filters/store/filterActions';

interface IAction {
  type: string;
  payload: string | number;
}

function* selectCitySaga({ payload }: IAction) {
  const state: IRootState = yield select((state) => state);
  const { selectedCityName: persistName } = state.persist;
  const { cities } = state.city;

  const finedCity: City | undefined = cities.find(({ id, name }: City) =>
    [id, name].includes(payload),
  );

  log('[selectCitySaga]', {
    payload,
    persistName,
    finedCity,
  });

  if (finedCity && finedCity.name !== persistCity.name) {
    logline('[selectCitySaga]', 'UPDATE!!');
    yield put(persistCity(finedCity.name));
    yield put(clearBathes());
    yield put(notNear());
    yield put(setSelectedCity(finedCity));
    yield put(setBathParam({ field: 'city_id', value: finedCity.id }));
  }
}

export default function* listener() {
  yield takeEvery(SELECT_CITY, selectCitySaga);
}
