import { IInput } from '~/src/app/models/validate';

export const defaultSafeInputs: ILoginInputs = {
  current_password: {
    type: 'password',
    value: '',
    require: true,
  },
  new_password: {
    type: 'password',
    value: '',
    require: true,
  },
  new_password_confirmation: {
    type: 'password',
    value: '',
    require: true,
  },
};

export interface ILoginInputs {
  current_password: IInput;
  new_password: IInput;
  new_password_confirmation: IInput;
  [key: string]: IInput;
}