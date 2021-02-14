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
