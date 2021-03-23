import { showAlert } from '~/src/app/common/components/showAlert';
import { call, put, takeLatest, select, fork, take } from 'redux-saga/effects';
import { methods } from '~/src/app/api';
import { getErrorStrings } from '~/src/app/utils/error';
import { IBath, IBathAction, IDistanceResponse, IMap, TPartDistanceParams } from '~/src/app/models/bath';
import { setBathes, bathesFail, reuseBathes, setMaps } from '../bathActions';
import { FETCH_BATHES } from '../bathConstants';
import { IRootState } from '~/src/app/store/rootReducer';
import { IUserAuth } from '~/src/app/models/user';
import { GOOGLE_API } from '@env';
import { IAuthState } from '~/src/features/auth/store/authReducer';

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
  console.log('[fetchBathesSaga]', payload.bathParams);
  console.log('[fetchBathesSaga]', payload);
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
    console.log(JSON.stringify(e, null, 4));
    console.log('[getdProfileSettingsSaga]', [errors, message]);

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
  console.log('[fetchBathesSaga]', { currentUser });
  const { location } = currentUser || {};
  //const bathes: IBath[] = yield select(({ bath }: IRootState) => bath.bathes);
  if (location) {
    let maps: IMap[] = [];
    for (let i = 0; i < bathes.length; i++) {
      const { latitude, longitude } = bathes[i];
      const placeParams: TPartDistanceParams = {
        origins: `${location.latitude},${location.longitude}`,
        destinations: `${latitude},${longitude}`,
        units: 'metric',
        key: GOOGLE_API,
      };
      const { status, rows }: IDistanceResponse = yield methods.getDistance(null, placeParams);
      console.log('[fetchBathesSaga/result]', rows);
      if (status === 'OK' && rows[0].elements[0].status === 'OK') {
        const { distance } = rows[0].elements[0];
        const newMap: IMap = {
          bathId: bathes[i].id,
          distance: distance.value,
          lastUpdateDistance: new Date(),
        };
        maps.push(newMap);
      }
    }

    console.log('[fetchMaps]', maps);

    yield put(setMaps(maps));
  }
}

export default function* listener() {
  yield takeLatest(FETCH_BATHES, fetchBathesSaga);
}

/* for (let i = 0; i < baths.length; i++) {
  const { name, latitude, longitude } = bathes[i];
  const placeParams: IGooglePlaceParams = {
    key: GOOGLE_API,
    input: name,
    inputtype: 'textquery',
    fields: 'place_id,name',
    locationbieas: `point:${latitude},${longitude}`,
  };
  const result: IGooglePlaceResponse = yield methods.getPlaceId(null, placeParams);
  console.log('[fetchBathesSaga/result]', result);
  if (result.status === 'OK') {
    bathes[i].placeId = result.candidates[0].place_id;
  }
} */
