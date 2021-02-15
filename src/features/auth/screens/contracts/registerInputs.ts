import { IInput } from '~/src/app/models/validate';

export const defaultRegisterInputs: IRegisterInputs = {
  first_name: {
    type: 'generic',
    value: '',
  },
  email: {
    type: 'email',
    value: '',
  },
  phone: {
    type: 'phone',
    value: '',
  },
};

export interface IRegisterInputs {
  first_name: IInput;
  email: IInput;
  phone: IInput;
  [key: string]: IInput;
}
