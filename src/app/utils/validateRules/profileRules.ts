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
      message: '^Поле обязательно для заполнения',
    },
    format: {
      pattern: /^([0-2][0-9]|3[0-1])\.(0[1-9]|1[0-2])\.(19[2-9][0-9]|2[0-9]{3})$/,
      message: '^Год должент быть не менее 1920. Введите дату в формате DD.MM.YYYY',
    },
  },
  /* sex: {
    inclusion: {
      within: [true, false],
      message: '^Поле обязательно для заполнения',
    },
  }, */
  /* avatar: {
    presence: {
      allowEmpty: true,
      message: '^Поле обязательно для заполнения',
    },
  }, */
};
