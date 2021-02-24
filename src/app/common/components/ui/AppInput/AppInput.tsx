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
import { colors } from '~/src/app/common/constants';
import { IAppInputProps } from '~/src/app/models/ui';
import { AppInputWrapper } from './AppInputWrapper';
import { styles } from './styles';

export interface IAppInputStates extends TextInputProps {
  isTouched: boolean;
  isFocused: boolean;
  isVirgin: boolean;
}

export function AppInput<T>(props: IAppInputProps<T>): JSX.Element {
  const [toggleSecure, setToggleSecure] = useState(false);
  const [states, setStates] = useState<IAppInputStates>({
    isTouched: false,
    isFocused: false,
    isVirgin: true,
  });
  const {
    // outlined,
    email,
    phone,
    number,
    placeholder,
    // secure,
    error,
    // colors
    // styles
    mask,
    center,
    style,
    newRef,
    // custome
    isScrollToFocused,
    onFocusedScroll,
    //native
    // onLayout,
    onBlur,
    onFocus,
    secure,
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

  /*   React.useEffect(() => {
    console.log(
      `[AppInput/useEffect] id=${props.id} error='${props.error}, isTouched=${states.isTouched}, props.touched=${props.touched}, focused=${states.isFocused}'`,
    );
  }, [props, props.touched, states]); */

  const isSecure = toggleSecure ? false : secure;

  const inputStyles: StyleProp<TextStyle> = [
    styles.input,
    !!error && { borderColor: colors.error },
    center && styles.center,
    style,
    states.isFocused && { borderColor: colors.secondary },
  ];

  // const inputPaperStyles = [main && { selectionColor: colors.primary }, style];
  const inputType = email ? 'email-address' : number ? 'numeric' : phone ? 'phone-pad' : 'default';

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

  // https://semver.org
  if (mask) {
    return (
      <AppInputWrapper
        secure={secure}
        states={states}
        setToggleSecure={setToggleSecure}
        toggleSecure={toggleSecure}
        props={props}
        color={style?.color as string}>
        <TextInputMask
          ref={newRef}
          style={inputStyles}
          keyboardType={inputType}
          mask={mask}
          autoCompleteType="off"
          autoCapitalize="none"
          autoCorrect={false}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          placeholderTextColor="rgba(126, 126, 126, 0.3)"
          //underlineColorAndroid="transparent"
          {...otherProps}
        />
      </AppInputWrapper>
    );
  }

  return (
    <AppInputWrapper
      secure={secure}
      states={states}
      setToggleSecure={setToggleSecure}
      toggleSecure={toggleSecure}
      color={style?.color as string}
      props={props}>
      <TextInput
        ref={newRef}
        style={inputStyles}
        secureTextEntry={isSecure}
        // multiline
        autoCompleteType="off"
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType={inputType}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={placeholder}
        placeholderTextColor="rgba(126, 126, 126, 0.3)"
        underlineColorAndroid="transparent"
        scrollEnabled={true}
        onScroll={() => Keyboard.dismiss()}
        {...otherProps}
      />
    </AppInputWrapper>
  );
}
