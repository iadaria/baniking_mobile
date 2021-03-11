import { showAlert } from '~/src/app/common/components/showAlert';
import { methods } from '~/src/app/api';
import { getErrorStrings } from '~/src/app/utils/error';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { GET_BATHES } from '../bathConstants';
import { IBath } from '~/src/app/models/bath';
import { setBathes, bathesFail } from '../bathActions';
import { cacheImage } from '~/src/app/utils/bathUtility';
import { Response } from 'react-native-image-resizer';

interface IResult {
  count: number;
  baths: IBath[];
}

function* getBathesSaga() {
  try {
    const { baths }: IResult = yield call(methods.getBathes, null, null);
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
