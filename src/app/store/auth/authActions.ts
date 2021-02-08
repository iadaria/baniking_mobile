import { IUser } from '~/app/models/user';
import * as constants from './authConstants';
import { ICredential } from '~/app/models/user';
/* export const enterPin = (pincode: string, forBackupPhrase: boolean) => ({
  type: constants.ENTER_PIN,
  payload: { pincode, forBackupPhrase },
}); */

export const emailLogin = ({ login, password }: ICredential) => ({
  type: constants.EMAIL_LOGIN,
  payload: { login, password },
});

export const socialLogin = ({ provider }: ICredential) => ({
  type: constants.SOCIAL_LOGIN,
  payload: { provider },
});

export const setUserData = (data: IUser) => ({
  type: constants.SET_USER_DATA,
  payload: data,
});

export const recoveryPassword = ({ email }: { email: string }) => ({
  type: constants.RECOVERY_PASSWORD,
  payload: { email },
});
