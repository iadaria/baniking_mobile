import { IInput } from '~/src/app/models/validate';

export const defaultRegisterInputs: IRegisterInputs = {
  name: {
    type: 'name',
    value: '',
    require: true,
  },
  email: {
    type: 'email',
    value: '',
    require: true,
  },
  phone: {
    type: 'phone',
    value: '',
    require: true,
  },
  agreement: {
    type: 'bool',
    value: true,
    require: true,
  },
};

export interface IRegisterInputs {
  name: IInput;
  email: IInput;
  phone: IInput;
  [key: string]: IInput;
}
