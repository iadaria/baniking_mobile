import { name } from './emptyRules';

export const registerRules = {
  surname: {
    ...name('Фамилия'),
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
      allowEmpty: false,
      message: '^This is required',
    },
    format: {
      pattern: /^\d{2}\/\d{2}\/\d{4}$/,
      message: '^The birthday must have only symbols',
    },
  },

};
