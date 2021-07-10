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

export const getErrorStrings = (
  error: IResponseError,
): [IErrors | null, string, string?] => {
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

  return [errors, firstErrorMsg, allErrors];
};
