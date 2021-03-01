import { IInput } from '~/src/app/models/validate';

export const defaultProfileInputs: IProfileInputs = {
  surname: {
    type: 'surname',
    value: '',
    require: true,
  },
  name: {
    type: 'name',
    value: '',
    require: true,
  },
  middle_name: {
    type: 'middle_name',
    value: '',
    require: false,
  },
  birth_date: {
    type: 'birth_date',
    value: '',
    require: true,
  },
  /* email: {
    type: 'email',
    value: '',
    require: false,
  }, */
  phone: {
    type: 'phone',
    value: '',
    require: true,
  },
  /* sex: {
    type: 'sex',
    value: false,
    require: true,
  }, */
  /* avatar: {
    type: 'avatar',
    value: '',
    require: false,
  }, */
};

export interface IProfileInputs {
  surname: IInput;
  name: IInput;
  middle_name: IInput;
  birth_date: IInput;
  // sex: IInput;
  phone: IInput;
  // email: IInput;
  // avatar: IInput;
  [key: string]: IInput;
}
