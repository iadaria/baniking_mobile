import { ICredential } from '~/src/app/models/user';
import { IUserAuth } from '~/src/app/models/user';
import * as constants from './authConstants';
/* export const enterPin = (pincode: string, forBackupPhrase: boolean) => ({
  type: constants.ENTER_PIN,
  payload: { pincode, forBackupPhrase },
}); */

export const checkAuth = () => ({
  type: constants.CHECK_AUTH,
});

export const emailLogin = (payload: Partial<ICredential>) => ({
  type: constants.EMAIL_LOGIN,
  payload: payload,
});

export const socialLogin = ({ provider }: ICredential) => ({
  type: constants.SOCIAL_LOGIN,
  payload: { provider },
});

export const setAuthUserData = (data: Partial<IUserAuth>) => ({
  type: constants.SET_USER_DATA,
  payload: data,
});

export const setAuthToken = (token: string) => ({
  type: constants.SET_TOKEN,
  payload: token,
});

export const recoveryPassword = (email: string) => ({
  type: constants.RECOVERY_PASSWORD,
  payload: email,
});

export const authFail = <I extends {}>(errors: Array<I> = []) => ({
  type: constants.AUTH_FAIL,
  payload: { errors },
});

/* export const changePassword = (payload: ChangePassword) => ({
  type: constants.CHANGE_PASSWORD, payload,
});

export const confirmPassword = (payload: ConfirmPassword) => ({
  type: constants.CONFIRM_PASSWORD, payload,
}); */
