import React from 'react';
import * as ReactNative from 'react-native';
import { StyleProp, TextInput, TextStyle } from 'react-native';
import TextInputMask from 'react-native-text-input-mask';
import { Block } from '~/src/app/common/components/UI/Block';
import { colors, sizes } from '~/src/app/common/constants';
import { IAppInputProps } from '~/src/app/models/ui';
import AppInputError from './AppInputError';
import AppInputLabel from './AppInputLabel';
import { styles } from './styles';

export interface IAppInputStates {
  isTouched: boolean;
  isFocused: boolean;
  isVirgin: boolean;
}

export function AppInput<T>(props: IAppInputProps<T>): JSX.Element {
  const [states, setStates] = React.useState<IAppInputStates>({
    isTouched: false,
    isFocused: false,
    isVirgin: true,
  });
  /* const [isTouched, setIsTouched] = React.useState(false);
    const [isFocused, setIsFocused] = React.useState(false); */
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
    ...otherProps
  } = props;

  React.useEffect(() => {
    // если уже был выходи из поля или проверялось кнопкой-все
    console.log('[AppInput/useEffect/virgin]***');
    if (!!props.touched || states.isTouched) {
      setStates({
        ...states,
        isVirgin: false,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.touched, states.isTouched]);

  React.useEffect(() => {
    console.log(
      `[TestInput/useEffect] id=${props.id} error='${props.error}, isTouched=${states.isTouched}, props.touched=${props.touched}, focused=${states.isFocused}'`,
    );
  }, [props, props.touched, states]);

  const inputStyles: StyleProp<TextStyle> | null | undefined = [
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

  function handleFocus() {
    setStates({
      ...states,
      isTouched: false,
      isFocused: true,
    });
  }

  let inputStylesMask: ReactNative.StyleProp<ReactNative.TextStyle> = inputStyles;

  if (mask) {
    return (
      <Block margin={[sizes.input.top, 0]}>
        {props.label && <AppInputLabel label={props.label} isFocused={states.isFocused} />}
        <TextInputMask
          style={inputStylesMask}
          keyboardType="phone-pad"
          mask={mask}
          autoCompleteType="off"
          autoCapitalize="none"
          autoCorrect={false}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          //underlineColorAndroid="transparent"
          {...otherProps}
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
    <Block onLayout={onLayout} margin={[sizes.input.top, 0]}>
      {props.label && <AppInputLabel label={props.label} isFocused={states.isFocused} />}
      {/* {renderLabel()} */}
      <TextInput
        ref={newRef}
        style={inputStyles}
        // secureTextEntry={isSecure}
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
