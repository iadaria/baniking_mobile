import { IInput } from '~/src/app/models/validate';

export const loginInputs: ILoginInputs = {
  login: {
    type: 'generic',
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
