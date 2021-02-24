import { name } from './emptyRules';

export const profileRules = {
  surname: {
    ...name('Фамилия'),
    length: {
      minimum: 2,
      maximum: 32,
    },
  },
  middle_name: {
    ...name('Отчество'),
    presence: {
      allowEmpty: true,
    },
    length: {
      minimum: 1,
      maximum: 32,
    },
  },
  birth_date: {
    presence: {
      allowEmpty: true,
      message: '^This is required',
    },
    format: {
      pattern: /^([0-2][0-9]|3[0-1])\.(0[1-9]|1[0-2])\.(19[2-9][0-9]|2[0-9]{3})$/,
      message: '^The birth day must be more then 1920 and have format DD.MM.YYYY',
    },
  },
  /* sex: {
    inclusion: {
      within: [true, false],
      message: '^This is required',
    },
  }, */
  /* avatar: {
    presence: {
      allowEmpty: true,
      message: '^This is required',
    },
  }, */
};
