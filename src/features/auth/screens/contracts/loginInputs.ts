import { IInput } from '~/src/app/models/validate';

export const defaultLoginInputs: ILoginInputs = {
  login: {
    type: 'login',
    value: '',
  },
  password: {
    type: 'password',
    value: '',
  },
};

export interface ILoginInputs {
  login: IInput;
  password: IInput;
  [key: string]: IInput;
}
