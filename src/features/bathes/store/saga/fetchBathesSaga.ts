import { showAlert } from '~/src/app/common/components/showAlert';
import { call, put, select, fork, takeEvery } from 'redux-saga/effects';
import { methods } from '~/src/app/api';
import { getErrorStrings } from '~/src/app/utils/error';
import { IBath, IBathAction, TPartBathParams } from '~/src/app/models/bath';
import { setBathes, bathesFail, reuseBathes } from '../bathActions';
import { FETCH_BATHES } from '../bathConstants';
import { IRootState } from '~/src/app/store/rootReducer';
import { fetchMapsSaga } from './fetchMapsSaga';

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
  __DEV__ && console.log('***[fetchBathesSaga] params', bathParams, '\n');
  try {
    if (moreBathes) {

      const { baths, count }: IResult = yield call(methods.getBathes, bathParams, bathParams);

      const bathes = [...baths];

      yield put(setBathes({ bathes, count, page: bathParams.page || 0 }));

      yield fork(fetchMapsSaga, { payload: bathes });
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

export default function* listener() {
  yield takeEvery(FETCH_BATHES, fetchBathesSaga);
}

/* const check_distance = calculateDistance({
        lant1: location.latitude,
        long1: location.longitude,
        lant2: latitude,
        long2: longitude,
      }); */

//__DEV__ && console.log('JJJJJJJ', check_distance / 1000);
/* if (check_distance / 1000 > 500) {
        return;
      } */
