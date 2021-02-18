import { IInput } from '~/src/app/models/validate';

export const defaultRecoveryInputs: IRecoveryInputs = {
  email: {
    type: 'email',
    value: '',
    require: true,
  },
};

export interface IRecoveryInputs {
  email: IInput;
  [key: string]: IInput;
}
