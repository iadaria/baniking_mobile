import { call, put, takeLatest } from 'redux-saga/effects';
import { setProfileData } from '../profileActions';
import { getErrorStrings } from '~/src/app/utils/error';
import { showAlert } from '~/src/app/common/components/showAlert';
import { methods } from '~/src/app/api';
import { GET_PROFILE_DATA } from '../profileConstants';
import { IProfile } from '~/src/app/models/profile';

function* getProfileDataSaga() {
  try {
    const profile: IProfile = yield call(methods.getProfile, null, null);
    yield put(setProfileData(profile));
  } catch (e) {
    console.log(JSON.stringify(e, null, 4));
    let [errors, message] = getErrorStrings(e);
    let errorMessage = errors.length ? `${message}` || errors[0] : 'Error connection';

    yield showAlert('Ошибка', errorMessage);
  }
}

export default function* listener() {
  yield takeLatest(GET_PROFILE_DATA, getProfileDataSaga);
}
