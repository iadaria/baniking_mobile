import { IInput } from '~/src/app/models/validate';

export const defaultRecoveryInputs: IRecoveryInputs = {
  phone: {
    type: 'phone',
    value: '',
    require: true,
  },
};

export interface IRecoveryInputs {
  phone: IInput;
  [key: string]: IInput;
}
