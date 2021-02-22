export const registerRules = {
  name: {
    presence: {
      allowEmpty: false,
      message: '^This is required',
    },
    format: {
      pattern: /^[A-Za-zА-Яа-я]+$/,
      message: '^The name must have only symbols',
    },
    length: {
      minimum: 6,
      tooShort: 'Name must be at least %{count} characters long then',
      maximum: 16,
      tooLong: 'Name needs to have %{count} words or less',
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
  phone: {
    presence: {
      allowEmpty: false,
      message: '^This is required',
    },
    format: {
      pattern: /^[+][1-9]{1}[(]{1}[1-9]{1}[0-9]{2}[)]{1}[0-9]{3}-[0-9]{2}-[0-9]{2}$/,
      message: '^Phone number must be valid',
    },
  },
};
