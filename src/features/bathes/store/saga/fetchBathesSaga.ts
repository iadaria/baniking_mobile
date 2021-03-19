import { showAlert } from '~/src/app/common/components/showAlert';
import { call, put, takeLatest, select } from 'redux-saga/effects';
import { methods } from '~/src/app/api';
import { getErrorStrings } from '~/src/app/utils/error';
import { IBath, IBathAction } from '~/src/app/models/bath';
import { setBathes, bathesFail, reuseBathes } from '../bathActions';
import { FETCH_BATHES } from '../bathConstants';
import { IRootState } from '~/src/app/store/rootReducer';

interface IAction {
  payload: IBathAction;
  type: string;
}

interface IResult {
  count: number;
  baths: IBath[];
}

var countBathesRequests = 0;

function* fetchBathesSaga({ payload }: IAction) {
  countBathesRequests++;
  if (countBathesRequests > 20) {
    console.log('[fetchBathesSaga] count > 20');
    return;
  }
  setTimeout(function () {
    countBathesRequests = 0;
  }, 10000);

  const { moreBathes, bathParams } = payload;
  console.log('[fetchBathesSaga]', payload.bathParams);
  console.log('[fetchBathesSaga]', payload);
  try {
    if (moreBathes) {
      const { baths, count }: IResult = yield call(methods.getBathes, null, bathParams);

      let cachedImagesBathes: IBath[] = [...baths];

      yield put(setBathes({ bathes: cachedImagesBathes, count, page: bathParams.page || 0 }));
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

export default function* listener() {
  yield takeLatest(FETCH_BATHES, fetchBathesSaga);
}
