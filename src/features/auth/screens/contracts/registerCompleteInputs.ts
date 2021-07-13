import { IInput } from '~/src/app/models/validate';

export const defaultRegisterCompleteInputs: IRegisterCompleteInputs = {
  phone: {
    type: 'phone',
    value: '+7(799)999-99-99',
    require: true,
  },
  password: {
    type: 'new_password',
    value: '',
    require: true,
  },
  password_confirmation: {
    type: 'new_password',
    value: '',
    require: true,
  },
};

export interface IRegisterCompleteInputs {
  phone: IInput;
  password: IInput;
  password_confirmation: IInput;
  [key: string]: IInput;
}
