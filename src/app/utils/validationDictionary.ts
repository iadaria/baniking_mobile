// import validatejs from 'validate.js';

import { baseSettingsRules } from './validateRules/baseSettingsRules';

const registerForm = {
  name: {
    presence: {
      allowEmpty: false,
      message: '^This is required',
    },
    format: {
      pattern: /^[A-Z][a-z][А-Я][а-я]*$/,
    },
    length: {
      minimum: 6,
      tooShort: 'Password must be at least %{count} characters long then',
      maximum: 16,
      tooLong: 'Password needs to have %{count} words or less',
    },
    /* length: {
      minimum: 2,
      message: function (value: any, attribute, validatorOptions, attributes, globalOptions) {
        return validatejs.format('^%{name} must be at least 2 characters long', {
          name: value,
        });
      },
    }, */
  },
};

const loginForm = {
  login: {
    presence: {
      allowEmpty: false,
      message: '^This is required',
    },
    length: {
      minimum: 8,
      tooShort: 'Login must be at least %{count} characters long then',
      maximum: 50,
      tooLong: 'Login needs to have %{count} words or less',
    },
  },
  password: {
    presence: {
      allowEmpty: false,
      message: '^This is required',
    },
    length: {
      minimum: 6,
      tooShort: 'must be at least %{count} characters long then',
      // message: '^Password must be at least 6 characters long',
      maximum: 16,
      tooLong: 'Password needs to have %{count} words or less',
      /* tokenizer: function (value) {
        return value.split(/\s+/g);
      }, */
    },
  },

};

export const validationDictionary = {
  ...registerForm,
  ...loginForm,
  ...baseSettingsRules,
  bool: {
    inclusion: {
      within: [true],
      message: '^This is required',
    },
  },

  day: {
    presence: {
      allowEmpty: false,
      message: '^This is required',
    },
    numericality: {
      greaterThan: 0,
      lessThanOrEqualTo: 31,
      message: '^Must be valid',
    },
  },

  email: {
    presence: {
      allowEmpty: false,
      message: '^This is required',
    },
    email: {
      message: '^Email address must be valid',
    },
    length: {
      minimum: 8,
      message: '^Email must be at least 8 characters long',
    },
  },

  generic: {
    presence: {
      allowEmpty: false,
      message: '^This is required',
    },
  },

  integer: {
    presence: {
      allowEmpty: false,
      message: '^This is required',
    },
    numericality: {
      greaterThan: 0,
      onlyInteger: true,
      message: '^Must be valid',
    },
  },

  month: {
    presence: {
      allowEmpty: false,
      message: '^This is required',
    },
    numericality: {
      greaterThan: 0,
      lessThanOrEqualTo: 12,
      message: '^Must be valid',
    },
  },

  phone: {
    presence: {
      allowEmpty: false,
      message: '^This is required',
    },
    format: {
      pattern: /^[2-9]\d{2}-\d{3}-\d{4}$/,
      message: '^Phone number must be valid',
    },
  },

  year: {
    presence: {
      allowEmpty: false,
      message: '^This is required',
    },
    numericality: {
      greaterThan: 1900,
      lessThanOrEqualTo: new Date().getFullYear(),
      message: '^Must be valid',
    },
  },
};
