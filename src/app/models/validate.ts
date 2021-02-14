import { validationDictionary } from '~/src/app/utils/validationDictionary';

export interface IInput {
  type: keyof typeof validationDictionary;
  value: string | boolean;
  errorLabel?: string;
  optional?: boolean;
  yCoordinate?: number;
  touched?: boolean;
}
