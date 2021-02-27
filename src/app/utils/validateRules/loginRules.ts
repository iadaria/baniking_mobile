export const loginRules = {
  login: {
    presence: {
      allowEmpty: false,
      message: '^Поле обязательно для заполнения',
    },
    length: {
      minimum: 8,
      tooShort: '^Логин должен быть длинной не менее 8 символов',
      maximum: 50,
      tooLong: '^Login needs to have %{count} words or less',
    },
  },
  password: {
    presence: {
      allowEmpty: false,
      message: '^Поле обязательно для заполнения',
    },
    length: {
      minimum: 6,
      tooShort: '^Пароль должен быть длинной не менее 6 символов',
      // message: '^Password must be at least 6 characters long',
      maximum: 16,
      tooLong: '^Password needs to have %{count} words or less',
      /* tokenizer: function (value) {
        return value.split(/\s+/g);
      }, */
    },
  },
};