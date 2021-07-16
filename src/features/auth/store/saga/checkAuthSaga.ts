import { put, select, takeLatest } from 'redux-saga/effects';
import * as RootNavigation from '~/src/navigation/helpers/RootNavigation';
import { tokenToHeaders } from '~/src/app/api';
import { IRootState } from '~/src/app/store/rootReducer';
import { CHECK_AUTH } from '../authConstants';
import { routes } from '~/src/navigation/helpers/routes';
import { setAuthToken } from '../authActions';
import { logline } from '~/src/app/utils/debug';

function* checkAuthSaga() {
  const token: string | null = yield select(
    (state: IRootState) => state.persist.token,
  );
  logline('', `\n[checkAuthSaga] token = ${token}`);
  if (token) {
    yield tokenToHeaders(token);
    yield put(setAuthToken(token));
    yield RootNavigation.reset(routes.navigators.DrawerNavigator);
    // yield call(SplashScreen.hide);
  }
}

export default function* listener() {
  yield takeLatest(CHECK_AUTH, checkAuthSaga);
}
