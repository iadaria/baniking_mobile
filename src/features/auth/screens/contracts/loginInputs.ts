import { IInput } from '~/src/app/models/validate';

export const defaultLoginInputs: ILoginInputs = {
  phone: {
    type: 'phone',
    value: '',
    require: true,
  },
  password: {
    type: 'password',
    value: '',
    require: true,
  },
};

export interface ILoginInputs {
  phone: IInput;
  password: IInput;
  [key: string]: IInput;
}
