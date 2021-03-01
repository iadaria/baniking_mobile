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
    presence: false,
    format: {
      pattern: /^[A-Za-zА-Яа-я]*$/,
      message: '^Отчество должно состоять только из букв',
    },
    length: function (value: string) {
      if (value) {
        return {
          minimum: 6,
          tooShort: '^Отчество должно быть длинной не менее %{count} символов',
          maximum: 16,
          tooLong: '^Отчество должно быть длинной менее %{count} символов',
        };
      }
      return false;
    },
  },
  birth_date: {
    presence: {
      allowEmpty: false,
      message: '^Поле обязательно для заполнения',
    },
    format: {
      pattern: /^([0-2][0-9]|3[0-1])\.(0[1-9]|1[0-2])\.(19[2-9][0-9]|2[0-9]{3})$/,
      message: '^Год должент быть не менее 1920. Введите дату в формате DD.MM.YYYY',
    },
  },
  sex: {
    presence: true,
    inclusion: {
      within: [false, true],
      message: '^Поле обязательно для выбора',
    },
  },
  /* avatar: {
    presence: {
      allowEmpty: true,
      message: '^Поле обязательно для заполнения',
    },
  }, */
};
