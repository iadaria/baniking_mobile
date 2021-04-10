import { IBath, TPartBathParams } from '~/src/app/models/bath';
import { call, put, takeEvery } from 'redux-saga/effects';
import { CHECK_FILTER } from '../bathConstants';
import { methods } from '~/src/app/api';
import { getErrorStrings } from '~/src/app/utils/error';
import { checkFilterFail, setCheckFilterResult } from '../bathActions';
import { showAlert } from '~/src/app/common/components/showAlert';
import { objToUrl } from '~/src/app/api/index';

interface IAction {
  payload: { filterParams: TPartBathParams };
  type: string;
}

interface IResult {
  count: number;
  baths: IBath[];
}

function* checkFilterSaga({ payload }: IAction) {
  __DEV__ && console.log('[CheckFilterSaga]', payload);
  try {
    const { filterParams } = payload;
    /* const requestParams: TPartBathParams = { ...filterParams };
    const requestBody: TPartBathParams = {};
    if (filterParams.hasOwnProperty('search_query')) {
      requestBody.search_query = filterParams.search_query;
      delete requestParams.search_query;
    } */
    //__DEV__ && console.log('[checkFilterSaga]', objToUrl(payload));
    const { count: bathCount }: IResult = yield call(methods.getBathes, filterParams, filterParams);
    yield put(setCheckFilterResult({ bathCount /* , params  */ }));
    //__DEV__ && console.log('[checkFilterSaga / bathCount]', bathCount);
  } catch (e) {
    const [errors, message, allErrors] = getErrorStrings(e);
    let errorMessage = allErrors ? allErrors : message; //? message : 'Ошибка при получении данных';
    __DEV__ && console.log(JSON.stringify(e, null, 4));
    __DEV__ && console.log('[checkFilterSaga]', [errors, message]);

    if (errorMessage) {
      yield put(checkFilterFail(errors));
      yield showAlert('Ошибка', errorMessage);
    }

    if (!errorMessage) {
      errorMessage = 'Ошибка при получении данных';
    }

    yield put(checkFilterFail(null));
    yield showAlert('Ошибка', errorMessage);
  }
}

export default function* listener() {
  yield takeEvery(CHECK_FILTER, checkFilterSaga);
}
