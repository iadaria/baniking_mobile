import { showAlert } from '~/src/app/common/components/showAlert';
import { call, put, takeLatest } from 'redux-saga/effects';
import { methods } from '~/src/app/api';
import { getErrorStrings } from '~/src/app/utils/error';
import { IBath, IBathAction } from '~/src/app/models/bath';
import { setBathes, bathesFail } from '../bathActions';
import { FETCH_BATHES } from '../bathConstants';

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
  if (countBathesRequests > 7) {
    console.log('[fetchBathesSaga] count > 3');
    setTimeout(function () {
      countBathesRequests = 0;
    }, 10000);
    return;
  }
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
    let [errors, message, allErrors] = getErrorStrings(e);
    const errorMessage = allErrors ? allErrors : message ? message : 'Ошибка при получении данных';

    console.log(JSON.stringify(e, null, 4));
    console.log('[getdProfileSettingsSaga]', [errors, message]);

    yield put(bathesFail(errors));
    yield showAlert('Ошибка', errorMessage);
  }
}

export default function* listener() {
  yield takeLatest(FETCH_BATHES, fetchBathesSaga);
}
