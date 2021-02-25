import { IInput } from '~/src/app/models/validate';

export const defaultBaseSettingsInputs: IBaseSettingsInputs = {
  name: {
    type: 'name',
    value: '',
    require: true,
  },
  surname: {
    type: 'surname',
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
  /*   sex: {
    type: 'sex',
    value: '',
    require: true,
  }, */
  phone: {
    type: 'phone',
    value: '',
    require: true,
  },
};

export interface IBaseSettingsInputs {
  name: IInput;
  surname: IInput;
  middle_name: IInput;
  phone: IInput;
  birth_date: IInput;
  // full_name: IInput;
  // sex: IInput;
  [key: string]: IInput;
}
