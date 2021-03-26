import { IInput } from '~/src/app/models/validate';

export const defaultFilterInputs: IFilterInputs = {
  priceLow: {
    type: 'common',
    value: '',
    require: false,
  },
  priceHigh: {
    type: 'common',
    value: '',
    require: false,
  },
  rating: {
    type: 'common',
    value: '',
    require: false,
  },
  ratingLow: {
    type: 'common',
    value: '',
    require: false,
  },
  ratingHigh: {
    type: 'common',
    value: '',
    require: false,
  },
};

export interface IFilterInputs {
  price: IInput;
  rating: IInput;
  [key: string]: IInput;
}
