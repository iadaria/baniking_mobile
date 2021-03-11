import { showAlert } from '~/src/app/common/components/showAlert';
import { call, put, takeLatest } from 'redux-saga/effects';
import { methods } from '~/src/app/api';
import { getErrorStrings } from '~/src/app/utils/error';
import { IBath, TPartBathParameter } from '~/src/app/models/bath';
import { setBathes, bathesFail } from '../bathActions';
import { IBathAction } from '~/src/app/models/bath';
import { FETCH_BATHES } from '../bathConstants';

interface IResult {
  count: number;
  baths: IBath[];
}

function* fetchBathesSaga(payload: IBathAction) {
  console.log('[fetchBathesSaga]', payload);
  try {
    const { baths, count }: IResult = yield call(methods.getBathes, null, payload.bathParams);
    // const cachedImagesBathes: IBath[] = yield withCachedImage(baths);

    /* const cachedImagesBathes: IBath[] = yield all(
      baths.map(async (bath: IBath) => {
        const response: Response = await cacheImage(bath.image);
        return {
          ...bath,
          cachedImage: response.uri,
        };
      }),
    ); */

    yield put(setBathes({ bathes: baths, count }));
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
