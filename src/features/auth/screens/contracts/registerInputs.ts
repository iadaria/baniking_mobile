import { IInput } from '~/src/app/models/validate';

export const defaultRegisterInputs: IRegisterInputs = {
  first_name: {
    type: 'generic',
    value: '',
    require: true,
  },
  email: {
    type: 'email',
    value: '',
    require: true,
  },
  phone: {
    // type: 'phone',
    type: 'generic',
    value: '',
    require: true,
  },
};

export interface IRegisterInputs {
  first_name: IInput;
  email: IInput;
  phone: IInput;
  [key: string]: IInput;
}
