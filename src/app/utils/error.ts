/**
 * Action for login user
 *
 * @field message {string}
 * @field errors: { [key: string]: string[] }
 */
export interface IResponseError {
  data: {
    message: string;
    errors: {
      [key: string]: string[];
    };
  };
}

export interface IErrors {
  [key: string]: string;
}

export const getErrorStrings = (error: IResponseError): [IErrors | null, string, string?] => {
  //const errors: string[] = [];
  let errors: IErrors | null = {};
  let allErrors: string = '';

  let firstErrorMsg = '';

  if (!error || !error.data?.errors) {
    errors.message = error.data?.message;
    return [null, error.data?.message];
  }

  firstErrorMsg = error.data?.message;

  if (error.data?.errors) {
    // values.map((_error: string[]) => errors.push(..._error));
    for (const [key, value] of Object.entries(error.data.errors)) {
      let _errors = '';
      value.forEach((_error: string) => (_errors = _errors.concat(_error)));
      errors[key] = _errors;
      allErrors = allErrors.concat('\n' + _errors);
    }
    // values.map((_error: string[]) => errors[](..._error));
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

  return [errors, firstErrorMsg, allErrors];
};
