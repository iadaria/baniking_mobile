import { put, select, takeEvery } from 'redux-saga/effects';
import { IRootState } from '~/src/app/store/rootReducer';
import { log, logline } from '~/src/app/utils/debug';
import { SELECT_CITY } from '../cityConstants';
import { persistCity } from '~/src/features/persist/store/appPersistActions';
import { City } from '~/src/app/models/city';
import {
  clearBathes,
  notNear,
  setBathParam,
} from '~/src/features/bathes/store/bathActions';

interface IAction {
  type: string;
  payload: string | number;
}

function isTheSame(one: string, two: string) {
  return one.toLowerCase() === two.toLowerCase();
}

function* selectCitySaga({ payload }: IAction) {
  const { persistCityName, cities } = yield select(
    ({ persist, city }: IRootState) => ({
      persistCityName: persist.selectedCityName,
      cities: city.cities,
    }),
  );

  const {
    id: selectedCityId,
    name: selectedCityName,
  }: City = cities.find(({ id, name }: City) =>
    [id, name.toLowerCase()].includes(payload),
  );

  log('[selectCitySaga]', {
    payload,
    persistCityName,
    selectedCityId,
    selectedCityName,
  });

  if (!isTheSame(selectedCityName, persistCityName)) {
    logline('[selectCitySaga]', 'UPDATE!!');
    yield put(persistCity(selectedCityName.toLowerCase()));
    yield put(clearBathes());
    yield put(notNear());
    yield put(setBathParam({ field: 'city_id', value: selectedCityId }));
  }

  logline('\n\n[selectCitySaga]', payload);
}

export default function* listener() {
  yield takeEvery(SELECT_CITY, selectCitySaga);
}
