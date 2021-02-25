import { IUploadAvatar } from '~/src/app/models/profile';
import { put, takeLatest } from 'redux-saga/effects';
import { UPLOAD_AVATAR } from '../profileConstants';
import { showAlert } from '~/src/app/common/components/showAlert';
import { getErrorStrings } from '~/src/app/utils/error';
import { methods } from '~/src/app/api/index';
import { appPatterns } from '~/src/app/common/constants/common';
import { uploadAvatarFail } from '../profileActions';

interface IAction {
  type: string;
  payload: IUploadAvatar;
}

function* uploadAvatarSaga({ payload }: IAction) {
  try {
    const formData = new FormData();
    formData.append('file', {
      uri: payload.file,
      name: payload.file.replace(appPatterns.filename, ''),
      type: payload.mime,
    });
    formData.append('width', payload.width);
    formData.append('height', payload.height);
    formData.append('top', payload.left);
    formData.append('left', payload.top);

    const result = yield methods.uploadAvatar(formData, null, {
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    console.log(result);
  } catch (e) {
    console.log(JSON.stringify(e, null, 2));

    let [errors, message] = getErrorStrings(e);

    yield put(uploadAvatarFail(errors));

    console.log([errors, message]);
    let errorMessage = errors.length ? `${message}` || errors[0] : 'Error connection';

    if (errorMessage.includes('The given data was invalid')) {
      errorMessage = 'Введен неверный логин или пароль';
    }

    yield showAlert('Ошибка', errorMessage);
  }
}

export default function* listener() {
  yield takeLatest(UPLOAD_AVATAR, uploadAvatarSaga);
}
