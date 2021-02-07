import * as constants from './authConstants';
/* export const enterPin = (pincode: string, forBackupPhrase: boolean) => ({
  type: constants.ENTER_PIN,
  payload: { pincode, forBackupPhrase },
}); */

export interface ILogInAction {
  login: string;
  password: string;
}

export const logIn = ({ login, password }: ILogInAction) => ({
  type: constants.LOG_IN,
  payload: { login, password },
});

export const recoveryPassword = ({ email }: { email: string }) => ({
  type: constants.RECOVERY_PASSWORD,
  payload: { email },
});
