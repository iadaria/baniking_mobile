import React, { useState } from 'react';
import {
  StyleProp,
  TextInput,
  TextStyle,
  TextInputProps,
  TextInputFocusEventData,
  NativeSyntheticEvent,
  Keyboard,
} from 'react-native';
import TextInputMask from 'react-native-text-input-mask';
import { colors, isAndroid } from '~/src/app/common/constants';
import { IAppInputProps } from '~/src/app/models/ui';
import { InputWrapper } from './InputWrapper';
import { styles as s } from './styles';

type InputKinds = {
  RegularInput: React.ReactNode;
  MaskInput: React.ReactNode;
};

const inputKinds: InputKinds = {
  RegularInput: TextInput,
  MaskInput: TextInputMask,
};

export interface IInputStates extends TextInputProps {
  isTouched: boolean;
  isFocused: boolean;
  isVirgin: boolean;
}

export function Input<T>(props: IAppInputProps<T>): JSX.Element {
  const [toggleSecure, setToggleSecure] = useState(false);
  const [states, setStates] = useState<IInputStates>({
    isTouched: false,
    isFocused: false,
    isVirgin: true,
  });

  const {
    center,
    error,
    isScrollToFocused,
    mask,
    newRef,
    onBlur,
    onFocus,
    onFocusedScroll,
    placeholder,
    rightButton,
    secure,
    style,
    focusBorderColor,
    ...otherProps
  } = props;

  React.useEffect(() => {
    // если уже был выходи из поля или проверялось кнопкой-все
    if (!!props.touched || states.isTouched) {
      setStates({
        ...states,
        isVirgin: false,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.touched, states.isTouched]);

  const kind: keyof typeof inputKinds = mask ? 'MaskInput' : 'RegularInput';
  const InputComponent = inputKinds[kind] as React.ElementType;

  const isSecure = toggleSecure ? false : secure;

  const inputStyles: StyleProp<TextStyle> = [
    s.input,
    style,
    !!error && !states.isVirgin && { borderColor: colors.error },
    states.isFocused && { borderColor: focusBorderColor || colors.secondary },
    //{ borderColor: 'purple', borderWidth: 1 },
  ];

  const inputTextAlign = center ? 'center' : undefined;

  function handleBlur(e: NativeSyntheticEvent<TextInputFocusEventData>) {
    onBlur && onBlur(e);
    setStates({
      ...states,
      isTouched: !states.isTouched,
      isFocused: false,
    });
  }

  function handleFocus(e: NativeSyntheticEvent<TextInputFocusEventData>) {
    onFocus && onFocus(e);
    if (isScrollToFocused && onFocusedScroll) {
      onFocusedScroll();
    }
    setStates({
      ...states,
      isTouched: false,
      isFocused: true,
    });
  }

  return (
    <InputWrapper
      secure={secure}
      states={states}
      setToggleSecure={setToggleSecure}
      toggleSecure={toggleSecure}
      props={props}
      center={center}
      rightButton={rightButton}>
      <InputComponent
        ref={newRef}
        style={inputStyles}
        mask={mask}
        textAlign={inputTextAlign}
        secureTextEntry={isSecure}
        multiline={isAndroid ? center : undefined}
        autoCompleteType="off"
        autoCapitalize="none"
        autoCorrect={false}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={placeholder}
        placeholderTextColor="rgba(126, 126, 126, 0.3)"
        underlineColorAndroid="transparent"
        scrollEnabled={true}
        onScroll={() => Keyboard.dismiss()}
        {...otherProps}
      />
    </InputWrapper>
  );
}

/* React.useEffect(() => {
  const cv = `[AppInput/useEffect] id=${props.id} error='${props.error}, isTouched=${states.isTouched}, props.touched=${props.touched}, focused=${states.isFocused}'`;
  logline(cv);
}, [props, props.touched, states]); */
