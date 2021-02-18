import { showMessage } from 'react-native-flash-message';
import { call, put, takeLatest } from 'redux-saga/effects';
import { methods } from '~/src/app/api';
import { getErrorStrings } from '~/src/app/utils/error';
import { IProfile } from '~/src/app/models/profile';
import { setProfileData } from '../profileActions';
import { GET_PROFILE_DATA } from '../profileConstants';

function* getProfileDataSaga() {
  try {
    const profile: IProfile = yield call(methods.getProfile, null, null);
    yield put(setProfileData(profile));
  } catch (e) {
    console.log(JSON.stringify(e, null, 4));
    let [errors, message] = getErrorStrings(e);
    let errorMessage = errors.length ? `${message}` || errors[0] : 'Error connection';

    yield showMessage({
      message: `${errorMessage}`,
      type: 'warning',
    });
  }
}

export default function* listener() {
  yield takeLatest(GET_PROFILE_DATA, getProfileDataSaga);
}
