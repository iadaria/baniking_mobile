import { ICredential } from '~/src/app/models/user';
import { IUserAuth } from '~/src/app/models/user';
import * as constants from './authConstants';
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

export const setAuthUserData = (data: Partial<IUserAuth>) => ({
  type: constants.SET_USER_DATA,
  payload: data,
});

export const recoveryPassword = ({ email }: { email: string }) => ({
  type: constants.RECOVERY_PASSWORD,
  payload: { email },
});

/* export const changePassword = (payload: ChangePassword) => ({
  type: constants.CHANGE_PASSWORD, payload,
});

export const confirmPassword = (payload: ConfirmPassword) => ({
  type: constants.CONFIRM_PASSWORD, payload,
}); */
