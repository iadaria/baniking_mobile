import { showAlert } from '~/src/app/common/components/showAlert';
import { methods } from '~/src/app/api';
import { getErrorStrings } from '~/src/app/utils/error';
import { call, put, takeLatest } from 'redux-saga/effects';
import { GET_BATHES } from '../bathConstants';
import { IBath, TPartBathParameter } from '~/src/app/models/bath';
import { setBathes, bathesFail } from '../bathActions';

interface IResult {
  count: number;
  baths: IBath[];
}

function* getBathesSaga() {
  const bathParams: TPartBathParameter = {
    page: 0,
  };
  try {
    const { baths }: IResult = yield call(methods.getBathes, null, bathParams);
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

    yield put(setBathes(baths));
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
  yield takeLatest(GET_BATHES, getBathesSaga);
}
