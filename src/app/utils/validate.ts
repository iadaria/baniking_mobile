import validatejs from 'validate.js';
import { IInput } from '~/src/app/models/validate';
import { validationDictionary } from './validationDictionary';

export function validateInput({ type, value }: IInput) {
  const result = validatejs(
    {
      [type]: value,
    },
    {
      [type]: validationDictionary[type],
    },
  );

  if (result) {
    return result[type][0];
  }

  return null;
}

interface InputValidationStateProps {
  input: IInput;
  value: string;
  touched: boolean;
}

export function getValidatedInput({ input, value, touched }: InputValidationStateProps): IInput {
  // console.log(`[getValidatedInput] touched = ${touched} and input.touched = ${input.touched}`);
  return {
    ...input,
    value,
    errorLabel: input?.optional ? null : validateInput({ type: input.type, value }),
    touched: touched, //|| input.touched,
  };
}

export function initInputs<T extends { [key: string]: IInput }, V extends { [key: string]: any }>(
  defaultInit: T,
  values: V,
) {
  const newInput = defaultInit;
  for (const key of Object.keys(defaultInit)) {
    if (values.hasOwnProperty(key)) {
      newInput[key].value = values[key];
    }
  }
  return newInput;
}

export function setErrors<T extends { [key: string]: IInput }, V extends { [key: string]: any }>(
  defaultInit: T,
  values: V,
) {
  const newInput = defaultInit;
  for (const key of Object.keys(defaultInit)) {
    if (values.hasOwnProperty(key)) {
      newInput[key].errorLabel = values[key];
    }
  }
  return newInput;
}
