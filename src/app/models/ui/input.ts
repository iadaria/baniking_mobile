import { ReactNode } from 'react';
import { LayoutChangeEvent, StyleProp, TextInput, TextInputProps, TextStyle, ViewProps } from 'react-native';

export interface IAppInputProps<T> extends IUiInput {
  id?: keyof T; // id: keyof typeof defaultInputs;
  equalTo?: string;
  errorMessage?: string;
  error?: string;
  label?: string;
  touched?: boolean;
  isScrollToFocused?: boolean;
  onFocusedScroll?: () => void;
  onLayout?: (props: LayoutChangeEvent) => void;
  newRef?: React.RefObject<TextInput>;
}

export interface IUiInput extends TextInputProps {
  label?: string;
  error?: string;
  secure?: boolean;
  /* rightStyle?: object;
  onRightPress?: Function; */
  rightButton?: ReactNode;
  email?: boolean;
  phone?: boolean;
  number?: boolean;
  placeholder?: string;
  // styles
  center?: boolean;
  style?: TextStyle & ViewProps;
  mask?: string;
  textFocus?: boolean;
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
  secure: object;
  block: object;
}
