import { GOOGLE_API } from 'react-native-dotenv';
import { put, select, takeEvery } from 'redux-saga/effects';
import { methods } from '~/src/app/api';
import {
  IBath,
  IDistanceResponse,
  IMap,
  TPartDistanceParams,
} from '~/src/app/models/bath';
import { IRootState } from '~/src/app/store/rootReducer';
import { isLatitude, isLongitude } from '~/src/app/utils/bathUtility';
import { IAuthState } from '~/src/features/auth/store/authReducer';
import { setMaps } from '../bathActions';
import { FETCH_MAPS } from '../bathConstants';

interface IAction {
  payload: IBath[];
  type?: string;
}

export function* fetchMapsSaga({ payload: bathes }: IAction) {
  __DEV__ && console.log('\n****[fetchMapsSaga]');

  const { currentUser }: IAuthState = yield select(
    ({ auth }: IRootState) => auth,
  );
  const { location } = currentUser || {};

  //__DEV__ && console.log('[fetchMapsSaga]', location);

  if (location) {
    if (!isLatitude(location.latitude) || !isLongitude(location.longitude)) {
      __DEV__ &&
        console.log('[fecthMapsSaga/not correct lat or long]', location);
      return;
    }

    let maps: IMap[] = [];
    for (let i = 0; i < bathes.length; i++) {
      const { latitude, longitude } = bathes[i];

      if (!isLatitude(latitude) || !isLongitude(longitude)) {
        __DEV__ &&
          console.log(
            '[fecthMapsSaga/not correct lat or long]',
            latitude,
            longitude,
          );
        return;
      }

      const placeParams: TPartDistanceParams = {
        origins: `${location.latitude},${location.longitude}`,
        destinations: `${latitude},${longitude}`,
        units: 'metric',
        key: GOOGLE_API,
      };
      const { status, rows }: IDistanceResponse = yield methods.getDistance(
        null,
        placeParams,
      );
      if (status === 'OK' && rows[0].elements[0].status === 'OK') {
        const { distance } = rows[0].elements[0];
        const newMap: IMap = {
          bathId: bathes[i].id,
          distance: distance.value,
          lastUpdateDistance: new Date(),
        };
        maps.push(newMap);
      } else {
        __DEV__ &&
          console.log('[fetchMapsSaga] status=', rows[0].elements[0].status);
      }
    }
    yield put(setMaps(maps));
  }
}

export default function* listener() {
  yield takeEvery(FETCH_MAPS, fetchMapsSaga);
}
