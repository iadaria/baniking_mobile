import { call, put, takeLatest } from 'redux-saga/effects';
import { setProfileSettings } from '../profileActions';
import { getErrorStrings } from '~/src/app/utils/error';
import { showAlert } from '~/src/app/common/components/showAlert';
import { methods } from '~/src/app/api';
import { GET_PROFILE_SETTINGS } from '../profileConstants';
import { IProfile } from '~/src/app/models/profile';
import {
  requestFail,
  setAuthUserData,
} from '~/src/features/auth/store/authActions';
import { log, logline } from '~/src/app/utils/debug';

function* getProfileSettingsSaga() {
  try {
    const profile: IProfile = yield call(methods.getProfile, null, null);
    yield put(setProfileSettings(profile));
    yield put(
      setAuthUserData({
        name: profile.name || '',
        email: profile.email,
      }),
    );
  } catch (e) {
    log('[getProfileSettingsSaga] error', e);
    let [errors, message, allErrors] = getErrorStrings(e);
    logline('[getdProfileSettingsSaga]', [errors, message]);

    let errorMessage = allErrors ? allErrors : 'Ошибка при получении данных';

    yield showAlert('Ошибка', errorMessage);

    put(requestFail(errors));
  }
}

export default function* listener() {
  yield takeLatest(GET_PROFILE_SETTINGS, getProfileSettingsSaga);
}
