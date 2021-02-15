export const getErrorStrings = (error: any): [Array<string>, string] => {
  const errors: string[] = [];
  let firstErrorMsg = '';

  if (!error) {
    return [errors, firstErrorMsg];
  }
  if (error.local) {
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
  });

  return [errors, firstErrorMsg];
};
