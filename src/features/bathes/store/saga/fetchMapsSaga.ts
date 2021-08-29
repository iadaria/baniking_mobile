import { IRootState } from './../../../../app/store/rootReducer';
import { GOOGLE_API } from 'react-native-dotenv';
import { put, select, takeEvery } from 'redux-saga/effects';
import { methods } from '~/src/app/api';
import {
  Bath,
  IDistanceResponse,
  IMap,
  TPartDistanceParams,
} from '~/src/app/models/bath';
import { isLatitude, isLongitude } from '~/src/app/utils/bathUtility';
import { log, logline } from '~/src/app/utils/debug';
import { IMapState } from '~/src/features/map/store/mapReducer';
import { setMaps } from '../bathActions';
import { FETCH_MAPS } from '../bathConstants';

interface IAction {
  payload: Bath[];
  type?: string;
}

export function* fetchMapsSaga({ payload: bathes }: IAction) {
  try {
    logline('', '\n****[fetchMapsSaga]');

    const { location: userLocation }: IMapState = yield select(
      ({ map }: IRootState) => map,
    );

    logline('n****[fetchMapsSaga]', userLocation);
    // logline('[fetchMapsSaga]', location);

    if (userLocation) {
      if (!isLatitude(userLocation.lat) || !isLongitude(userLocation.lng)) {
        logline('[fecthMapsSaga/not correct lat or long]', userLocation);
        return;
      }

      let maps: IMap[] = [];
      for (let i = 0; i < bathes.length; i++) {
        const { latitude, longitude } = bathes[i];

        if (!isLatitude(latitude) || !isLongitude(longitude)) {
          logline(
            '',
            `[fecthMapsSaga/not correct lat or long] ${{
              latitude,
              longitude,
            }}`,
          );
          return;
        }

        const placeParams: TPartDistanceParams = {
          origins: `${userLocation.lat},${userLocation.lng}`,
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
          logline('[fetchMapsSaga] status=', rows[0].elements[0].status);
        }
      }
      yield put(setMaps(maps));
    }
  } catch (e) {
    log('[fetchMapsSaga] error', e);
  }
}

export default function* listener() {
  yield takeEvery(FETCH_MAPS, fetchMapsSaga);
}
