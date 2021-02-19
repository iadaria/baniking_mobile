import { IInput } from '~/src/app/models/validate';

export const defaultLoginInputs: ILoginInputs = {
  login: {
    type: 'login',
    value: '',
    require: true,
    virgin: true,
  },
  password: {
    type: 'password',
    value: '',
    require: true,
    virgin: true,
  },
};

export interface ILoginInputs {
  login: IInput;
  password: IInput;
  [key: string]: IInput;
}
