import { IInput } from '~/src/app/models/validate';

export const defaultProfileInputs: IProfileInputs = {
  surname: {
    type: 'surname',
    value: '',
    require: false,
  },
  name: {
    type: 'name',
    value: '',
    require: false,
  },
  middle_name: {
    type: 'middle_name',
    value: '',
    require: false,
  },
  birth_date: {
    type: 'birth_date',
    value: '',
    require: false,
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
  sex: {
    type: 'sex',
    value: false,
    require: true,
  },
};

export interface IProfileInputs {
  surname: IInput;
  name: IInput;
  middle_name: IInput;
  birth_date: IInput;
  sex: IInput;
  phone: IInput;
  email: IInput;
  avatar: IInput;
  [key: string]: IInput;
}
