import { ReactNode } from 'react';
import { LayoutChangeEvent, TextInput, TextInputProps, TextStyle } from 'react-native';

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
