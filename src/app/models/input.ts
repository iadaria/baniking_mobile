import { ReactNode } from 'react';

export interface IUiInput {
  label?: string;
  error?: boolean;
  secure?: boolean;
  rightLabel?: JSX.Element;
  rightStyle?: object;
  onRightPress?: Function;
  email?: boolean;
  phone?: boolean;
  number?: boolean;
  style?: object;
  placeholder?: string;
  children?: ReactNode;
  [key: string]: any;
}

export interface IInputStyleProps {
  input: object;
  toggle: object;
  label: object;
  labelWrapper: object;
}
