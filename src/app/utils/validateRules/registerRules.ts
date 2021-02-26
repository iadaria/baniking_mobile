export const registerRules = {
  name: {
    presence: {
      allowEmpty: false,
      message: '^Поле обязательно для заполнения',
    },
    format: {
      pattern: /^[A-Za-zА-Яа-я]+$/,
      message: '^The name must have only symbols',
    },
    length: {
      minimum: 6,
      tooShort: 'Имя должно быть длинной не менее 8 символов',
      maximum: 16,
      tooLong: 'Имя должно быть длинной не больее 17 символов',
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
      message: '^Поле обязательно для заполнения',
    },
    format: {
      pattern: /^[+][1-9]{1}[(]{1}[1-9]{1}[0-9]{2}[)]{1}[0-9]{3}-[0-9]{2}-[0-9]{2}$/,
      message: '^Введите корректное значение',
    },
  },
};
