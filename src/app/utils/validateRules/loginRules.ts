export const loginRules = {
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