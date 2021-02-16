/**
 * Action for login user
 *
 * @field message {string}
 * @field errors: { [key: string]: string[] }
 */
export interface IResponseError {
  message: string;
  errors: {
    [key: string]: string[];
  };
}

export const getErrorStrings = (error: IResponseError): [Array<string>, string] => {
  const errors: string[] = [];
  let firstErrorMsg = '';

  if (!error) {
    return [errors, firstErrorMsg];
  }

  // login
  /* const response = {
    message: 'The given data was invalid.',
    errors: {
      email: ['Введите email'],
      password: ['Неверный пароль'],
      device_name: ['Девайся обязатлеьное поле'],
    },
  }; */

  firstErrorMsg = error?.message;

  if (error?.errors) {
    const values = Object.values(error.errors);
    values.map((_error: string[]) => errors.push(..._error));
  }

  /* if (error.local) {
    return [[''], error.local];
  }
  if (!error.data) {
    return [errors, firstErrorMsg];
  }

  if (error.data.meta && !error.data.meta.success && error.data.meta.message) {
    errors.push(error.data.meta.message);
    return [errors, firstErrorMsg];
  }

  if (!error.data.data) {
    return [errors, firstErrorMsg];
  }
  if (typeof error.data.data !== 'object') {
    return [errors, firstErrorMsg];
  }
  if (!error.data.data.length) {
    return [errors, firstErrorMsg];
  }

  error.data.data.forEach((element) => {
    if (!firstErrorMsg && element.msg) {
      firstErrorMsg = element.msg;
    }
    if (element.param) {
      errors.push(element.param);
    }
  }); */

  return [errors, firstErrorMsg];
};
