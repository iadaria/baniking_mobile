import { registerRules } from './validateRules/registerRules';
import { loginRules } from './validateRules/loginRules';
import { profileRules } from './validateRules/profileRules';
// https://regex101.com/r/cU5lC2/1

export const validationDictionary = {
  ...registerRules,
  ...loginRules,
  ...profileRules,
  bool: {
    inclusion: {
      within: [true],
      message: '^Поле обязательно для выбора',
    },
  },

  day: {
    presence: {
      allowEmpty: false,
      message: '^Поле обязательно для заполнения',
    },
    numericality: {
      greaterThan: 0,
      lessThanOrEqualTo: 31,
      message: '^Внесено некорректное значение',
    },
  },

  email: {
    presence: {
      allowEmpty: false,
      message: '^Поле обязательно для заполнения',
    },
    email: {
      message: '^Ввудите корректный email адрес',
    },
    length: {
      minimum: 8,
      message: '^Email должен быть длинной не менее 8 символов',
    },
  },

  generic: {
    presence: {
      allowEmpty: false,
      message: '^Поле обязательно для заполнения',
    },
  },

  integer: {
    presence: {
      allowEmpty: false,
      message: '^Поле обязательно для заполнения',
    },
    numericality: {
      greaterThan: 0,
      onlyInteger: true,
      message: '^Внесено некорректное значение',
    },
  },

  month: {
    presence: {
      allowEmpty: false,
      message: '^Поле обязательно для заполнения',
    },
    numericality: {
      greaterThan: 0,
      lessThanOrEqualTo: 12,
      message: '^Внесено некорректное значение',
    },
  },

  year: {
    presence: {
      allowEmpty: false,
      message: '^Поле обязательно для заполнения',
    },
    numericality: {
      greaterThan: 1900,
      lessThanOrEqualTo: new Date().getFullYear(),
      message: '^Внесено некорректное значение',
    },
  },
};
