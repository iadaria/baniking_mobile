export const baseSettingsRules = {
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