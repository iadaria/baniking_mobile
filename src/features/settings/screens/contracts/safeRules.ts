import { IInput } from '~/src/app/models/validate';

export const defaultSafeInputs: ISafeInputs = {
  current_password: {
    type: 'new_password',
    value: '',
    require: true,
  },
  new_password: {
    type: 'new_password',
    value: '',
    require: true,
  },
  new_password_confirmation: {
    type: 'new_password',
    value: '',
    require: true,
  },
};

export interface ISafeInputs {
  current_password: IInput;
  new_password: IInput;
  new_password_confirmation: IInput;
  [key: string]: IInput;
}