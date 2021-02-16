import { IUserPersist } from '~/src/app/models/user';
import * as constants from './persistConstants';

export const setAccountType = ({ accountType }: { accountType: string }) => ({
  type: constants.SET_ACCOUNT_TYPE,
  payload: { accountType },
});

export const setLanguage = ({ language }: { language: string }) => ({
  type: constants.SET_LANGUAGE,
  payload: { language },
});

export const setPersistUserData = (data: Partial<IUserPersist>) => ({
  type: constants.SET_USER_DATA,
  payload: data,
});

export const askLogout = () => ({ type: constants.ASK_LOGOUT });
export const logout = () => ({ type: constants.LOGOUT });
