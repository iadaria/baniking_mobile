import { Bath, BathParams } from '~/src/app/models/bath';
import { call, put, takeEvery } from 'redux-saga/effects';
import { CHECK_FILTER } from '../bathConstants';
import { methods } from '~/src/app/api';
import { getErrorStrings } from '~/src/app/utils/error';
import { checkFilterFail, setCheckFilterResult } from '../bathActions';
import { showAlert } from '~/src/app/common/components/showAlert';
import { log, logline } from '~/src/app/utils/debug';

interface IAction {
  payload: { filterParams: BathParams };
  type: string;
}

interface IResult {
  count: number;
  baths: Bath[];
}

function* checkFilterSaga({ payload }: IAction) {
  logline('[CheckFilterSaga]', payload);
  try {
    const { filterParams } = payload;
    const { count: bathCount }: IResult = yield call(
      methods.getBathes,
      null,
      filterParams,
    );
    yield put(setCheckFilterResult({ bathCount }));
  } catch (e) {
    log('[checkFilterSaga/error]', e);

    let [errors, message, allErrors] = getErrorStrings(e);
    yield put(checkFilterFail(errors));

    logline('[checkFilterSaga/error]', [errors, message]);

    const errorMessage = allErrors
      ? allErrors
      : 'Ошибка при получении данных о банях';

    yield showAlert('Ошибка', errorMessage);
    /* const [errors, message, allErrors] = getErrorStrings(e);
    let errorMessage = allErrors ? allErrors : message; //? message : 'Ошибка при получении данных';
    log('[checkFilterSaga] error', e);
    logline('[checkFilterSaga]', [errors, message]);

    if (errorMessage) {
      yield put(checkFilterFail(errors));
      yield showAlert('Ошибка', errorMessage);
    }

    if (!errorMessage) {
      errorMessage = 'Ошибка при получении данных';
    }

    yield put(checkFilterFail(null));
    yield showAlert('Ошибка', errorMessage); */
  }
}

export default function* listener() {
  yield takeEvery(CHECK_FILTER, checkFilterSaga);
}
