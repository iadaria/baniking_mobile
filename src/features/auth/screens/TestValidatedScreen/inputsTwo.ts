import { IInput } from '~/src/app/models/validate';

export const defaultInputsTwo: IInputsTwo = {
  first_name: {
    type: 'generic',
    value: '',
  },
  last_name: {
    type: 'generic',
    value: '',
  },
  password: {
    type: 'password',
    value: '',
  },
};

export interface IInputsTwo {
  first_name: IInput;
  last_name: IInput;
  password: IInput;
  [key: string]: IInput;
}
