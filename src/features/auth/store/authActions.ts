import {
  ICredential,
  SocialProvider,
  VerifyPayload,
} from '~/src/app/models/user';
import { IUserAuth } from '~/src/app/models/user';
import * as constants from './authConstants';
import { IErrors } from '~/src/app/utils/error';

// Begin work

export const checkAuth = () => ({
  type: constants.CHECK_AUTH,
});

// Register

export const emailRegister = (payload: Partial<ICredential>) => ({
  type: constants.EMAIL_REGISTER,
  payload: payload,
});

export const verify = (payload: VerifyPayload) => ({
  type: constants.VERIFY,
  payload: payload,
});

// Login

export const emailLogin = (payload: Partial<ICredential>) => ({
  type: constants.EMAIL_LOGIN,
  payload: payload,
});

export const socialLogin = (provider: SocialProvider) => ({
  type: constants.SOCIAL_LOGIN,
  payload: provider,
});

export const googleLogIn = () => ({
  type: constants.SOCIAL_LOGIN,
});

export const socialLoginCanceled = () => ({
  type: constants.SOCIAL_LOGIN_CANCELED,
});

// Set was got data

export const setAuthUserData = (data: Partial<IUserAuth>) => ({
  type: constants.SET_USER_DATA,
  payload: data,
});

export const setAuthToken = (token: string) => ({
  type: constants.SET_TOKEN,
  payload: token,
});

export const resetPassword = (email: string) => ({
  type: constants.RESET_PASSWORD,
  payload: email,
});

// Results: SUCCESS & FAIL

export const authFail = (errors: IErrors | null) => ({
  type: constants.AUTH_FAIL,
  payload: errors,
});

export const authSuccess = () => ({
  type: constants.AUTH_SUCCESS,
});
export const requestSuccess = () => ({
  type: constants.REQUEST_SUCCESS,
});

export const authLogout = () => ({
  type: constants.LOG_OUT,
});

/* export const changePassword = (payload: ChangePassword) => ({
  type: constants.CHANGE_PASSWORD, payload,
});

export const confirmPassword = (payload: ConfirmPassword) => ({
  type: constants.CONFIRM_PASSWORD, payload,
}); */
