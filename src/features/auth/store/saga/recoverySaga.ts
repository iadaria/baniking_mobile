import { showMessage } from 'react-native-flash-message';
import { ICredential } from '~/src/app/models/user';
import { getErrorStrings } from '~/src/app/utils/error';

interface IAction {
  type: string;
  payload: ICredential;
}

interface IResult {
  token: string;
}

function* recoverySaga({ payload: { email } }: IAction) {}
  try {

  } catch(e) {
    console.log(JSON.stringify(e, null, 4));
    let [errors, message] = getErrorStrings(e);
    let errorMessage = errors.length ? `${message}` || errors[0] : 'Error connection';

    if (errorMessage.includes('The given data was invalid')) {
      errorMessage = 'Введены неверный логин и пароль';
    }

    // console.log(`error/[catch] message = ${message}\n`, JSON.stringify(errors, null, 4));
    // console.log(`error/[catch] message = ${message}\n`);
    // console.log(errorMessage);

    showMessage({
      message: `${errorMessage}`,
      type: 'warning',
    });
  }
}
