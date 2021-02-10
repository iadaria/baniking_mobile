import React, { useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { IInputStyleProps, IUiInput } from '~/src/app/models/input';
import { colors, sizes } from '~/src/app/common/constants';
import { Block } from '../Block';
import AppInputLabel from './AppInputLabel';

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
    style,
    ...otherProps
  } = props;

  // const isSecure = toggleSecure ? false : secure;

  const inputStyles = [
    styles.input,
    error && { borderColor: colors.accent },
    style,
    isFocused && { borderColor: colors.secondary },
  ];
  // const inputPaperStyles = [main && { selectionColor: colors.primary }, style];

  const inputType = email
    ? 'email-address'
    : number
    ? 'numeric'
    : phone
    ? 'phone-pad'
    : 'default';

  return (
    <Block margin={[sizes.input.between / 2, 0]}>
      <AppInputLabel {...props} isFocused={isFocused} />
      <TextInput
        style={inputStyles}
        // defaultValue="Сергеев"
        // secureTextEntry={isSecure}
        autoCompleteType="off"
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType={inputType}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={isFocused ? undefined : placeholder}
        placeholderTextColor="rgba(126, 126, 126, 0.3)"
        {...otherProps}
      />
      {/* {renderToggle()} */}
      {/* {renderRight()} */}
    </Block>
  );
}

const styles = StyleSheet.create<IInputStyleProps>({
  input: {
    borderWidth: 1, // StyleSheet.hairlineWidth,
    borderColor: colors.input.border,
    borderRadius: sizes.radius,
    fontSize: wp(sizes.font.base),
    color: colors.black,
    height: hp(sizes.input.hight),
    paddingHorizontal: wp(sizes.input.paddingHorizontal),
  },
  toggle: {
    position: 'absolute',
    alignItems: 'flex-end',
    width: sizes.base * 2,
    height: sizes.base * 2,
    top: sizes.base,
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
});

/*
function renderLabel(): JSX.Element {
  const { label, error } = props;

  return (
    <Block>
      {label ? (
        <AppText gray2={!error} accent={error}>
          {label}
        </AppText>
      ) : null}
    </Block>
  );
}

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
