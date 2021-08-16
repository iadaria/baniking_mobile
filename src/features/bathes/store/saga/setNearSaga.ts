import { put, select, takeEvery } from 'redux-saga/effects';
import { showAlert } from '~/src/app/common/components/showAlert';
import { getErrorStrings } from '~/src/app/utils/error';
import { IRootState } from '~/src/app/store/rootReducer';
import { logline } from '~/src/app/utils/debug';
import { BathParams } from '~/src/app/models/bath';
import { setParams, clearBathes, bathesFail } from '../bathActions';
import { Location } from '~/src/app/models/map';
import { CHANGE_NEAR } from '../bathConstants';

interface IAction {
  type: string;
  payload: boolean;
}

interface IResult {
  id: string;
}

function* setNearSaga({ payload }: IAction) {
  logline('[setNearSaga]', payload);
  try {
    const needNear = payload;
    const { location, params, city_id } = yield select((state: IRootState) => ({
      location: state.map.location,
      params: state.bath.params,
      city_id: state.city.selectedCity.id,
    }));
    let newParams: BathParams = { ...params };
    // Detect location
    if (!location) {
      yield showAlert(
        '',
        'Нет данных о геологкации - определите местоположение',
      );
      return;
    }
    // Need near
    if (location && needNear) {
      const { lat, lng }: Location = location;
      newParams = {
        ...params,
        latitude: lat,
        longitude: lng,
      };
      delete newParams?.city_id;
    }
    // Don't need near
    if (!needNear) {
      newParams = {
        ...params,
        city_id,
      };
      delete newParams.latitude;
      delete newParams.longitude;
    }
    yield put(clearBathes());
    yield put(setParams(newParams));
  } catch (e) {
    let [errors, message, allErrors] = getErrorStrings(e);
    yield put(bathesFail(errors));

    //log('[setNearSaga/error]', e);
    logline('[setNearSaga/error]', [errors, message]);

    const errorMessage = allErrors ? allErrors : 'Ошибка ...';

    yield showAlert('Ошибка', errorMessage);
  }
}

export default function* listener() {
  yield takeEvery(CHANGE_NEAR, setNearSaga);
}
