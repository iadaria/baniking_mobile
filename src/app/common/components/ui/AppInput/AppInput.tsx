import React, { useState } from 'react';
import {
  StyleProp,
  TextInput,
  TextStyle,
  TextInputProps,
  TextInputFocusEventData,
  NativeSyntheticEvent,
} from 'react-native';
import TextInputMask from 'react-native-text-input-mask';
import { Block } from '~/src/app/common/components/UI/Block';
import { colors, sizes } from '~/src/app/common/constants';
import { IAppInputProps } from '~/src/app/models/ui';
import AppInputError from './AppInputError';
import AppInputLabel from './AppInputLabel';
import { AppSecure } from './AppSecure';
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
    //system
    onLayout,
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
    //native
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

  function handleBlur() {
    setStates({
      ...states,
      isTouched: !states.isTouched,
      isFocused: false,
    });
  }

  function handleFocus(e: NativeSyntheticEvent<TextInputFocusEventData>) {
    onFocus && onFocus(e);
    setStates({
      ...states,
      isTouched: false,
      isFocused: true,
    });
  }

  // https://semver.org
  if (mask) {
    console.log('****** mask');
    return (
      <Block margin={[sizes.input.top, 0]}>
        {props.label && <AppInputLabel label={props.label} isFocused={states.isFocused} />}
        <TextInputMask
          keyboardType="phone-pad"
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
          style={inputStyles}
        />
        <AppInputError
          error={props.error}
          isFocused={states.isFocused}
          isTouched={props.touched || states.isTouched}
          {...props}
        />
      </Block>
    );
  }

  return (
    <Block onLayout={onLayout} margin={[sizes.input.top / 2, 0, sizes.input.top]}>
      {props.label && <AppInputLabel label={props.label} isFocused={states.isFocused} />}
      {/* {renderLabel()} */}
      <TextInput
        ref={newRef}
        style={inputStyles}
        secureTextEntry={isSecure}
        // multiline={false}
        autoCompleteType="off"
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType={inputType}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={placeholder}
        placeholderTextColor="rgba(126, 126, 126, 0.3)"
        underlineColorAndroid="transparent"
        {...otherProps}
      />
      <AppSecure secure={!!secure} toggleSecure={toggleSecure} setToggleSecure={setToggleSecure} />
      <AppInputError
        error={props.error}
        isFocused={states.isFocused}
        isTouched={props.touched || states.isTouched}
        isVirgin={states.isVirgin}
        // isFirstTouched={!!props.touched && !isTouched}
        {...props}
      />
    </Block>
  );
}
