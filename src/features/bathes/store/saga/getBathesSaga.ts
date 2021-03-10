import { showAlert } from '~/src/app/common/components/showAlert';
import { methods } from '~/src/app/api';
import { getErrorStrings } from '~/src/app/utils/error';
import { call, put, takeLatest } from 'redux-saga/effects';
import { GET_BATHES } from '../bathConstants';
import { IBath } from '~/src/app/models/bath';
import { setBathes, bathesFail } from '../bathActions';

function* getBathesSaga() {
  try {
    const bathes: IBath[] = yield call(methods.getBathes, null, null);
    yield put(setBathes(bathes));
  } catch (e) {
    let [errors, message, allErrors] = getErrorStrings(e);
    let errorMessage = allErrors ? allErrors : 'Ошибка при получении данных';

    console.log(JSON.stringify(e, null, 4));
    console.log('[getdProfileSettingsSaga]', [errors, message]);

    yield put(bathesFail(errors));
    yield showAlert('Ошибка', errorMessage);
  }
}

export default function* listener() {
  yield takeLatest(GET_BATHES, getBathesSaga);
}
