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
  birth_data: {
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
