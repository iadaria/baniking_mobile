import { showAlert } from '~/src/app/common/components/showAlert';
import { call, put, select, fork, takeEvery } from 'redux-saga/effects';
import { methods } from '~/src/app/api';
import { getErrorStrings } from '~/src/app/utils/error';
import { IBath, IBathAction, IDistanceResponse, IMap, TPartDistanceParams } from '~/src/app/models/bath';
import { setBathes, bathesFail, reuseBathes, setMaps } from '../bathActions';
import { FETCH_BATHES } from '../bathConstants';
import { IRootState } from '~/src/app/store/rootReducer';
import { GOOGLE_API } from '@env';
import { IAuthState } from '~/src/features/auth/store/authReducer';
import { isLatitude, isLongitude, calculateDistance } from '~/src/app/utils/bathUtility';

interface IAction {
  payload: IBathAction;
  type: string;
}

interface IResult {
  count: number;
  baths: IBath[];
}

function* fetchBathesSaga({ payload }: IAction) {
  const { moreBathes, bathParams } = payload;
  //__DEV__ && console.log('[fetchBathesSaga]', payload.bathParams);
  __DEV__ && console.log('***[fetchBathesSaga] params', bathParams);
  try {
    if (moreBathes) {
      const { baths, count }: IResult = yield call(methods.getBathes, null, bathParams);

      const bathes = [...baths];

      yield put(setBathes({ bathes, count, page: bathParams.page || 0 }));

      yield fork(fetchMapsSaga, bathes);
    }
  } catch (e) {
    const [errors, message, allErrors] = getErrorStrings(e);
    let errorMessage = allErrors ? allErrors : message; //? message : 'Ошибка при получении данных';
    __DEV__ && console.log(JSON.stringify(e, null, 4));
    __DEV__ && console.log('[fetchBathesSaga]', [errors, message]);

    if (errorMessage) {
      yield put(bathesFail(errors));
      yield showAlert('Ошибка', errorMessage);
    }

    if (!errorMessage) {
      const connection = select(({ system }: IRootState) => system.connection);
      if (!connection) {
        errorMessage = 'Ошибка запроса при отсутствии сети';
      }
      if (connection) {
        errorMessage = 'Ошибка при получении данных';
      }

      yield put(reuseBathes());
      yield put(bathesFail(null));
      yield showAlert('Ошибка', errorMessage);
    }
  }
}

function* fetchMapsSaga(bathes: IBath[]) {
  const { currentUser }: IAuthState = yield select(({ auth }: IRootState) => auth);
  const { location } = currentUser || {};

  //__DEV__ && console.log('[fetchMapsSaga]', location);

  if (location) {
    if (!isLatitude(location.latitude) || !isLongitude(location.longitude)) {
      __DEV__ && console.log('[fecthMapsSaga/not correct lat or long]', location);
      return;
    }

    let maps: IMap[] = [];
    for (let i = 0; i < bathes.length; i++) {
      const { latitude, longitude } = bathes[i];

      if (!isLatitude(latitude) || !isLongitude(longitude)) {
        __DEV__ && console.log('[fecthMapsSaga/not correct lat or long]', latitude, longitude);
        return;
      }

      const check_distance = calculateDistance({
        lant1: location.latitude,
        long1: location.longitude,
        lant2: latitude,
        long2: longitude,
      });

      //__DEV__ && console.log('JJJJJJJ', check_distance / 1000);
      if (check_distance / 1000 > 500) {
        return;
      }

      const placeParams: TPartDistanceParams = {
        origins: `${location.latitude},${location.longitude}`,
        destinations: `${latitude},${longitude}`,
        units: 'metric',
        key: GOOGLE_API,
      };
      const { status, rows }: IDistanceResponse = yield methods.getDistance(null, placeParams);
      if (status === 'OK' && rows[0].elements[0].status === 'OK') {
        const { distance } = rows[0].elements[0];
        const newMap: IMap = {
          bathId: bathes[i].id,
          distance: distance.value,
          lastUpdateDistance: new Date(),
        };
        maps.push(newMap);
      } else {
        __DEV__ && console.log('[fetchMapsSaga] status=', rows[0].elements[0].status);
      }
    }
    yield put(setMaps(maps));
  }
}

export default function* listener() {
  yield takeEvery(FETCH_BATHES, fetchBathesSaga);
}
