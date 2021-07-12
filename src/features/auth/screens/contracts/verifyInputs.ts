import { IInput } from '~/src/app/models/validate';

export const defaultVerifyInputs: IVerifyInputs = {
  phone: {
    type: 'phone',
    value: '',
    require: true,
  },
  action: {
    type: 'action',
    value: 0,
    require: true,
  },
  code: {
    type: 'code',
    value: '',
    require: true,
  },
};

export interface IVerifyInputs {
  phone: IInput;
  action: IInput;
  code: IInput;
  [key: string]: IInput;
}
