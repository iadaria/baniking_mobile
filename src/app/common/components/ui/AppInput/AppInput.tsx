import React from 'react';
import * as ReactNative from 'react-native';
import { StyleProp, TextInput, TextStyle } from 'react-native';
import TextInputMask from 'react-native-text-input-mask';
import { Block } from '~/src/app/common/components/UI/Block';
import { colors, sizes } from '~/src/app/common/constants';
import { IAppInputProps } from '~/src/app/models/input';
import AppInputError from './AppInputError';
import AppInputLabel from './AppInputLabel';
import { styles } from './styles';

export function AppInput<T>(props: IAppInputProps<T>): JSX.Element {
  const [isTouched, setIsTouched] = React.useState(false);
  const [isFocused, setIsFocused] = React.useState(false);
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
    ...otherProps
  } = props;

  React.useEffect(() => {
    console.log(
      `[TestInput/useEffect] id=${props.id} error='${props.error}, isTouched=${isTouched}, props.touched=${props.touched}, focused=${isFocused}'`,
    );
  }, [props, isTouched, props.touched, isFocused]);

  const inputStyles: StyleProp<TextStyle> | null | undefined = [
    styles.input,
    !!error && { borderColor: colors.error },
    center && styles.center,
    style,
    isFocused && { borderColor: colors.secondary },
  ];

  // const inputPaperStyles = [main && { selectionColor: colors.primary }, style];
  const inputType = email ? 'email-address' : number ? 'numeric' : phone ? 'phone-pad' : 'default';

  function handleBlur() {
    setIsTouched(!isTouched);
    setIsFocused(false);
  }

  function handleFocus() {
    setIsTouched(false);
    setIsFocused(true);
  }

  let inputStylesMask: ReactNative.StyleProp<ReactNative.TextStyle> = inputStyles;

  if (mask) {
    return (
      <Block margin={[sizes.input.top, 0]}>
        <AppInputLabel {...props} isFocused={isFocused} />
        <TextInputMask
          style={inputStylesMask}
          keyboardType="phone-pad"
          mask={mask} //{'+7 ([000] [0000] [00] [00]'} //{'[999999].[99]'}
          autoCompleteType="off"
          autoCapitalize="none"
          autoCorrect={false}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          // placeholderTextColor="rgba(126,126,126, 0.3)"
          //underlineColorAndroid="transparent"
          {...otherProps}
        />
        <AppInputError {...props} isFocused={isFocused} isTouched={isTouched || props.touched!} />
        {/* {renderToggle()} */}
        {/* {renderRight()} */}
      </Block>
    );
  }

  return (
    <Block onLayout={onLayout} margin={[sizes.input.top, 0]}>
      <AppInputLabel {...props} isFocused={isFocused} />
      {/* {renderLabel()} */}
      <TextInput
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
      <AppInputError {...props} isFocused={isFocused} isTouched={props.touched || isTouched} />
    </Block>
  );
}
