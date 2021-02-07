import { IUser } from '~/app/models/user';
import * as constants from './authConstants';
/* export const enterPin = (pincode: string, forBackupPhrase: boolean) => ({
  type: constants.ENTER_PIN,
  payload: { pincode, forBackupPhrase },
}); */

export interface ILogInAction {
  login?: string;
  password?: string;
  provider?: string;
}

export const logIn = ({ login, password }: ILogInAction) => ({
  type: constants.LOG_IN_WITH_EMAIL,
  payload: { login, password },
});

export const setUserData = (data: IUser) => ({
  type: constants.SET_USER_DATA,
  payload: data,
});

export const recoveryPassword = ({ email }: { email: string }) => ({
  type: constants.RECOVERY_PASSWORD,
  payload: { email },
});
