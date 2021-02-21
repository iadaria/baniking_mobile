import { select, takeLatest } from 'redux-saga/effects';
import * as RootNavigation from '~/src/navigation/helpers/RootNavigation';
import { tokenToHeaders } from '~/src/app/api';
import { IRootState } from '~/src/app/store/rootReducer';
import { CHECK_AUTH } from '../authConstants';
import routes from '~/src/navigation/helpers/routes';

function* checkAuthSaga() {
  const token = yield select((state: IRootState) => state.persist.token);

  if (token) {
    tokenToHeaders(token);
  }

  yield RootNavigation.navigate(routes.navigators.DrawerNavigator);
  // yield call(SplashScreen.hide);
}

export default function* listener() {
  yield takeLatest(CHECK_AUTH, checkAuthSaga);
}
