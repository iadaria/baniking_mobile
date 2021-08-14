import { ICredential, SocialProvider } from '~/src/app/models/user';
import { IUserAuth } from '~/src/app/models/user';
import * as constants from './authConstants';
import { IErrors } from '~/src/app/utils/error';
import { VerifyPayload } from './saga/verifySaga';
import { CompleteRegisterPayload } from './saga/registerCompleteSaga';
import { NotifyPayload } from './saga/notifySaga';
import { ResetPasswordPayload } from './saga/resetPasswordSaga';
import { RegisterPayload } from './saga/registerPhoneSaga';
import { RestorePasswordPayload } from './saga/restorePasswordSaga';
import { LoginPhonePayload } from '~/src/features/auth/store/saga/loginPhoneSaga';

// Begin work

export const checkAuth = () => ({
  type: constants.CHECK_AUTH,
});

// Register

export const emailRegister = (payload: Partial<ICredential>) => ({
  type: constants.EMAIL_REGISTER,
  payload: payload,
});

export const phoneRegister = (payload: RegisterPayload) => ({
  type: constants.PHONE_REGISTER,
  payload: payload,
});

export const verify = (payload: VerifyPayload) => ({
  type: constants.VERIFY,
  payload: payload,
});

export const notify = (payload: NotifyPayload) => ({
  type: constants.NOTIFY,
  payload: payload,
});

export const registerComplete = (payload: CompleteRegisterPayload) => ({
  type: constants.COMPLETE_REGISTER,
  payload: payload,
});

export const initVerifyInputs = (payload: VerifyPayload) => ({
  type: constants.INIT_VERIFY_INPUTS,
  payload: payload,
});

export const initRegisterCompleteInputs = (
  payload: CompleteRegisterPayload,
) => ({
  type: constants.INIT_REGISTER_COMPLETE_INPUTS,
  payload: payload,
});

// Login

export const loginPhone = (payload: LoginPhonePayload) => ({
  type: constants.LOGIN_PHONE,
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

export const resetPassword = (payload: ResetPasswordPayload) => ({
  type: constants.RESET_PASSWORD,
  payload: payload,
});

export const restorePassword = (payload: RestorePasswordPayload) => ({
  type: constants.RESTORE_PASSWORD,
  payload: payload,
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

export const requestAuth = () => ({
  type: constants.REQUEST_AUTH,
});

export const requestFail = (errors: IErrors | null) => ({
  type: constants.REQUEST_FAIL,
  payload: errors,
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
