const loginForm = {
  login: {
    presence: {
      allowEmpty: false,
      message: '^This is required',
    },
    length: {
      minimum: 6,
      message: '^Login must be at least 8 characters long',
    },
  },
};

export const validationDictionary = {
  ...loginForm,
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

  password: {
    presence: {
      allowEmpty: false,
      message: '^This is required',
    },
    length: {
      minimum: 6,
      message: '^Password must be at least 6 characters long',
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
