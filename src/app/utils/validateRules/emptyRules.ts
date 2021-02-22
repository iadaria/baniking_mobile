export const name = (field: string) => ({
  presence: {
    allowEmpty: false,
    message: '^This is required',
  },
  format: {
    pattern: /^[A-Za-zА-Яа-я]+$/,
    message: `^The ${field} must have only symbols`,
  },
  length: {
    minimum: 6,
    tooShort: `${field} must be at least %{count} characters long then`,
    maximum: 16,
    tooLong: `^The ${field} needs to have %{count} words or less`,
  },
});
