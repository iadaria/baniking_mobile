import { IUploadAvatar } from '~/src/app/models/profile';
import { takeLatest } from 'redux-saga/effects';
import { UPLOAD_AVATAR } from '../profileConstants';
import { showAlert } from '~/src/app/common/components/showAlert';
import { getErrorStrings } from '~/src/app/utils/error';
import { methods } from '~/src/app/api/index';

interface IAction {
  type: string;
  payload: IUploadAvatar;
}

function* uploadAvatarSaga({ payload }: IAction) {
  try {
    // const { file, ...otherData } = payload;
    const data = new FormData();
    data.append('file', {
      uri: payload.file,
      name: ''
    });
    data.append('width', payload.width);
    data.append('height', payload.height);
    data.append('top', payload.top);
    data.append('left', payload.left);

    const result = methods.uploadAvatar(data, null);
    console.log('[uploadAvatarSaga]/result = ', result);
  } catch (e) {
    console.log(JSON.stringify(e, null, 2));

    let [errors, message] = getErrorStrings(e);
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
