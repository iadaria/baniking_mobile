import { ReactNode } from 'react';
import { TextInputProps, TextStyle } from 'react-native';

export interface IUiInput extends TextInputProps {
  label?: string;
  error?: string;
  secure?: boolean;
  rightLabel?: JSX.Element;
  rightStyle?: object;
  onRightPress?: Function;
  email?: boolean;
  phone?: boolean;
  number?: boolean;
  placeholder?: string;
  // styles
  center?: boolean;
  style?: TextStyle;
  mask?: string;
  // others
  children?: ReactNode;
  // [key: string]: any;
}

export interface IInputStyleProps {
  input: object;
  toggle: object;
  label: object;
  labelWrapper: object;
  // styles
  center: object;
}
