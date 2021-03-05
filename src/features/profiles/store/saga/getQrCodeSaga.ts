import { call, put, takeLatest } from 'redux-saga/effects';
import { GET_QR_CODE } from '../profileConstants';
import { methods } from '~/src/app/api';
import { setQrCode, cabinetDataFail } from '../profileActions';
import { getErrorStrings } from '~/src/app/utils/error';
import { showAlert } from '~/src/app/common/components/showAlert';

interface IResult {
  qr: string;
}

function* getQrCode() {
  try {
    const { qr }: IResult = yield call(methods.getQr, null, null);
    yield put(setQrCode(qr));

    console.log(qr);
  } catch (error) {
    yield put(cabinetDataFail(null));
    console.log('getQrCodeSaga', JSON.stringify(error, null, 4));
    let [errors, message, allErrors] = getErrorStrings(error);

    console.log([errors, message, allErrors]);

    const errorMessage =
      allErrors || message ? allErrors || message : 'Ошибка при получении данных личного профиля';

    yield showAlert('Ошибка', errorMessage);
  }

}

export default function* listener() {
  yield takeLatest(GET_QR_CODE, getQrCode);
}