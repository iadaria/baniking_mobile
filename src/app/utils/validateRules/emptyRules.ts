export const name = (field: string) => ({
  presence: {
    allowEmpty: false,
    message: '^Поле обязательно для заполнения',
  },
  format: {
    pattern: /^[A-Za-zА-Яа-я]+$/,
    message: `^${field} должно состоять только из букв`,
  },
  length: {
    minimum: 6,
    tooShort: `${field} должно быть длинной не менее %{count} символов`,
    maximum: 16,
    tooLong: `${field} должно быть длинной менее %{count} символов`,
  },
});
