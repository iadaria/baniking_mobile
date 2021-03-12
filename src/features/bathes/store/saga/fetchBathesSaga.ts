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

function* fetchBathesSaga({ payload }: IAction) {
  const { moreBathes, bathParams } = payload;
  console.log('[fetchBathesSaga]', payload.bathParams);
  console.log('[fetchBathesSaga]', payload);
  try {
    if (moreBathes) {
      const { baths, count }: IResult = yield call(methods.getBathes, null, bathParams);
      yield put(setBathes({ bathes: baths, count }));
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
