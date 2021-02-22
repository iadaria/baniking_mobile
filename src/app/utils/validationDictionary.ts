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
