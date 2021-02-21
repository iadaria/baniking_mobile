import { IPersistUser } from '~/src/app/models/user';
import * as constants from './appPersistConstants';

export const setPersistAccountType = ({ accountType }: { accountType: string }) => ({
  type: constants.SET_ACCOUNT_TYPE,
  payload: { accountType },
});

export const setPersistLanguage = (language: string) => ({
  type: constants.SET_LANGUAGE,
  payload: language,
});

export const setPersistToken = (token: string) => ({
  type: constants.SET_TOKEN,
  payload: token,
});

/* export const setPersistUserEmail = ({ email }: { email: string }) => ({
  type: constants.SET_EMAIL,
  payload: { token },
});
 */
export const setPersistUserData = (data: Partial<IPersistUser>) => ({
  type: constants.SET_USER_DATA,
  payload: data,
});

export const askLogout = () => ({ type: constants.ASK_LOGOUT });
export const logout = () => ({ type: constants.LOGOUT });
