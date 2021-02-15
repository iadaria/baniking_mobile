import { validationDictionary } from '~/src/app/utils/validationDictionary';

export interface IInput {
  type: keyof typeof validationDictionary;
  value: string | boolean;
  errorLabel?: string;
  optional?: boolean; // true - not validate, false/undefined - falidate
  yCoordinate?: number;
  touched?: boolean;
  require: boolean; // for disable button
}
