import { IPersistUser, ISocialAccount } from '~/src/app/models/user';
import * as constants from './appPersistConstants';
import { IPersistImage } from '~/src/app/models/persist';

export const setPersistAccountType = ({
  accountType,
}: {
  accountType: string;
}) => ({
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

export const setPersistUserData = (data: Partial<IPersistUser>) => ({
  type: constants.SET_USER_DATA,
  payload: data,
});

export const addSocialAccount = (data: ISocialAccount) => ({
  type: constants.ADD_SOCIAL_ACCOUNT,
  payload: data,
});

export const askLogout = () => ({ type: constants.ASK_LOGOUT });
// Image
export const persistImage = (payload: IPersistImage) => ({
  type: constants.PERSIST_IMAGE,
  payload,
});

export const persistCity = (payload: number) => ({
  type: constants.SELECT_CITY,
  payload,
});
