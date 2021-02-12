import React, { useState } from 'react';
import { StyleProp, StyleSheet, TextInput, TextStyle } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import TextInputMask from 'react-native-text-input-mask';
import { IInputStyleProps, IUiInput } from '~/src/app/models/input';
import { colors, sizes } from '~/src/app/common/constants';
import { Block } from '../Block';
import AppInputLabel from './AppInputLabel';
import AppInputError from './AppInputError';

// TODO separate properties for label and error components don't pass all props

export function AppInput(props: IUiInput) {
  // const [toggleSecure, setToggleSecure] = useState(false);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  function handleFocus() {
    setIsFocused(true);
  }

  function handleBlur() {
    setIsFocused(false);
  }

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
    ...otherProps
  } = props;

  // const isSecure = toggleSecure ? false : secure;

  const inputStyles: StyleProp<TextStyle> = [
    styles.input,
    !!error && { borderColor: colors.error },
    center && styles.center,
    style,
    isFocused && { borderColor: colors.secondary },
  ];
  // const inputPaperStyles = [main && { selectionColor: colors.primary }, style];

  const inputType = email ? 'email-address' : number ? 'numeric' : phone ? 'phone-pad' : 'default';

  if (mask) {
    return (<Block margin={[sizes.input.top, 0]}>
        <AppInputLabel {...props} isFocused={isFocused} />
        <TextInputMask
          style={inputStyles}
          keyboardType="phone-pad"
          mask={mask} //{'+7 ([000] [0000] [00] [00]'} //{'[999999].[99]'}
          selectTextOnFocus={true}
          // value={props.values.VALORFRETE}
          // onChangeText={(val) => props.setValue({ VALORFRETE: val })}
          // onBlur={() => props.setValue({ VALORFRETE: parseFloat(props.values.VALORFRETE).toFixed(2) })}

        />
        <AppInputError {...props} isFocused={isFocused} />
        {/* {renderToggle()} */}
        {/* {renderRight()} */}
      </Block>
    );
  }

  return (
    <Block margin={[sizes.input.top, 0]}>
      <AppInputLabel {...props} isFocused={isFocused} />
      <TextInput
        style={inputStyles}
        // secureTextEntry={isSecure}
        autoCompleteType="off"
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType={inputType}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={isFocused ? undefined : placeholder}
        placeholderTextColor="rgba(126, 126, 126, 0.3)"
        underlineColorAndroid="transparent"
        {...otherProps}
      />
      <AppInputError {...props} isFocused={isFocused} />
      {/* {renderToggle()} */}
      {/* {renderRight()} */}
    </Block>
  );
}

const styles = StyleSheet.create<IInputStyleProps>({
  input: {
    borderWidth: 1, // StyleSheet.hairlineWidth,
    borderColor: colors.input.border,
    borderRadius: sizes.input.big.radius, // sizes.radius,
    fontSize: wp(sizes.font.base),
    color: colors.input.text,
    height: hp(sizes.input.big.height),
    paddingHorizontal: wp(sizes.input.paddingHorizontal),
  },
  toggle: {
    position: 'absolute',
    alignItems: 'flex-end',
    width: sizes.offset.base * 2,
    height: sizes.offset.base * 2,
    top: sizes.offset.base,
    right: 0,
  },
  labelWrapper: {
    position: 'absolute',
    left: 0,
    alignSelf: 'flex-start',
    backgroundColor: colors.white,
    borderWidth: 0.5,
    borderColor: 'red',
    paddingHorizontal: wp(1),
  },
  label: {},
  center: { textAlign: 'center' },
});

/*
function renderToggle(): JSX.Element | null {
  const { secure, rightLabel } = props;

  if (!secure) {
    return null;
  }

return (
    <AppButton
      style={styles.toggle}
      onPress={() => setToggleSecure(!toggleSecure)}>
      {rightLabel ? (
        rightLabel
      ) : (
        <Icon
          color={colors.gray}
          size={sizes.font * 1.35}
          name={!toggleSecure ? 'md-eye' : 'md-eye-off'}
        />
      )}
    </AppButton>
  );
}

function renderRight(): JSX.Element | null {
  const { rightLabel, rightStyle, onRightPress } = props;

  if (!rightLabel) {
    return null;
  }

  return (
    <AppButton
      style={[styles.toggle, rightStyle]}
      onPress={() => onRightPress && onRightPress()}>
      {rightLabel}
    </AppButton>
  );
} */
