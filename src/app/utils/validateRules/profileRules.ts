import { name } from './emptyRules';

export const profileRules = {
  surname: {
    ...name('Фамилия'),
    presence: {
      allowEmpty: true,
    },
    minimum: 2,
    maximum: 32,
  },
  middle_name: {
    ...name('Отчество'),
    presence: {
      allowEmpty: true,
    },
    minimum: 1,
    maximum: 32,
  },
  birth_date: {
    presence: {
      allowEmpty: true,
      message: '^This is required',
    },
    format: {
      pattern: /^\d{2}\.\d{2}\.\d{4}$/,
      message: '^The birthday must have only symbols',
    },
  },
  sex: {
    inclusion: {
      within: [true, false],
      message: '^This is required',
    },
  },
  avatar: {
    presence: {
      allowEmpty: true,
      message: '^This is required',
    },
  },
};
