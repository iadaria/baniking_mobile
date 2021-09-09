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
  TextInputChangeEventData,
} from 'react-native';
import TextInputMask from 'react-native-text-input-mask';
import { colors, isAndroid } from '~/src/app/common/constants';
import { IAppInputProps } from '~/src/app/models/ui';
import { AppInputWrapper } from './AppInputWrapper';
import { styles } from './styles';

type InputKinds = {
  RegularInput: React.ReactNode;
  MaskInput: React.ReactNode;
};

const inputKinds: InputKinds = {
  RegularInput: TextInput,
  MaskInput: TextInputMask,
};

export interface IAppInputStates extends TextInputProps {
  isTouched: boolean;
  isFocused: boolean;
  isVirgin: boolean;
}

// TextInput.defaultProps.selectionColor = colors.secondary;

export function AppInput<T>(props: IAppInputProps<T>): JSX.Element {
  const [showPlaceholder, setShowPlaceholder] = useState(props.center);
  const [toggleSecure, setToggleSecure] = useState(false);
  const [states, setStates] = useState<IAppInputStates>({
    isTouched: false,
    isFocused: false,
    isVirgin: true,
  });
  let borderColor = colors.input.border;
  const {
    email,
    phone,
    number,
    placeholder,
    textFocus,
    error,
    mask,
    center,
    style,
    newRef,
    isScrollToFocused,
    onFocusedScroll,
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

  React.useEffect(() => {
    //const cv = `[AppInput/useEffect] id=${props.id} error='${props.error}, isTouched=${states.isTouched}, props.touched=${props.touched}, focused=${states.isFocused}'`;
    //logline('', cv);
  }, [props, props.touched, states]);

  const kind: keyof typeof inputKinds = mask ? 'MaskInput' : 'RegularInput';
  const InputComponent = inputKinds[kind] as React.ElementType;

  const isSecure = toggleSecure ? false : secure;

  const inputStyles: StyleProp<TextStyle> = [
    styles.input,
    showPlaceholder && { zIndex: 1 },
    style,
    //{ borderColor: 'purple', borderWidth: 1 },
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

  const inputTextAlign = center || (center && isSecure) ? 'center' : undefined;
  const inputType = email
    ? 'email-address'
    : number
    ? 'numeric'
    : phone
    ? 'phone-pad'
    : 'default';
  const blockStyle: ViewStyle = {};
  style?.backgroundColor &&
    (blockStyle.backgroundColor = style?.backgroundColor);
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

  function handleChange(e: NativeSyntheticEvent<TextInputChangeEventData>) {
    const { text } = e.nativeEvent;
    if (text && text.length > 0) {
      setShowPlaceholder(false);
    } else {
      setShowPlaceholder(true);
    }
  }

  // https://semver.org
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
      rightButton={rightButton}
      showPlaceholder={showPlaceholder}
      placeholder={placeholder}>
      <InputComponent
        ref={newRef}
        style={inputStyles}
        mask={mask}
        textAlign={inputTextAlign}
        secureTextEntry={isSecure}
        // multiline
        autoCompleteType="off"
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType={inputType}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={center ? handleChange : undefined}
        placeholder={center && isAndroid ? undefined : placeholder}
        placeholderTextColor="rgba(126, 126, 126, 0.3)"
        underlineColorAndroid="transparent"
        scrollEnabled={true}
        onScroll={() => Keyboard.dismiss()}
        {...otherProps}
      />
    </AppInputWrapper>
  );
}
