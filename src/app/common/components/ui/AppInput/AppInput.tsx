import React, { useState } from 'react';
import {
  StyleProp,
  TextInput,
  TextStyle,
  TextInputProps,
  TextInputFocusEventData,
  NativeSyntheticEvent,
  Keyboard,
  ViewStyle,
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

// TextInput.defaultProps.selectionColor = colors.secondary;

export function AppInput<T>(props: IAppInputProps<T>): JSX.Element {
  const [toggleSecure, setToggleSecure] = useState(false);
  const [states, setStates] = useState<IAppInputStates>({
    isTouched: false,
    isFocused: false,
    isVirgin: true,
  });
  let borderColor = colors.input.borderEdit;
  const {
    // outlined,
    email,
    phone,
    number,
    placeholder,
    textFocus,
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
    rightButton,
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
    center && styles.center,
    style,
    //{ borderColor: 'yellow', borderWidth: 1 },
    // ecure && styles.secure,
  ];

  const setBorderColor = (_borderColor: string) => (borderColor = _borderColor);

  if (style?.borderColor) {
    setBorderColor(style.borderColor as string);
  }
  if (!!error && !states.isVirgin) {
    setBorderColor(colors.error);
  }
  if (states.isFocused) {
    setBorderColor(textFocus ? colors.text.base : colors.secondary);
  }

  const inputTextAlign = center ? 'center' : 'left';
  const inputType = email ? 'email-address' : number ? 'numeric' : phone ? 'phone-pad' : 'default';
  const blockStyle: ViewStyle = {};
  style?.backgroundColor && (blockStyle.backgroundColor = style?.backgroundColor);
  style?.height && (blockStyle.height = Number(style?.height) + 2);
  style?.borderRadius && (blockStyle.borderRadius = style?.borderRadius);

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
        color={style?.color as string}
        props={props}
        center={center}
        //borderColor={borderColor}>
        borderColor={borderColor}>
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
      props={props}
      center={center}
      borderColor={borderColor}
      blockStyle={blockStyle}
      rightButton={rightButton}>
      <TextInput
        ref={newRef}
        style={inputStyles}
        textAlign={inputTextAlign}
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
