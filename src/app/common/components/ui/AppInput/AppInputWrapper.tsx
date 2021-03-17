import React, { Dispatch, SetStateAction } from 'react';
import { Block } from '../Block';
import { AppSecure } from './AppSecure';
import AppInputLabel from './AppInputLabel';
import AppInputError from './AppInputError';
import { IAppInputProps } from '~/src/app/models/ui/input';
import { sizes } from '~/src/app/common/constants/sizes';
import { IAppInputStates } from './AppInput';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '~/src/app/common/constants/colors';

interface IProps<T> {
  states: IAppInputStates;
  toggleSecure: boolean;
  setToggleSecure: Dispatch<SetStateAction<boolean>>;
  props: IAppInputProps<T>;
  secure?: boolean;
  children: JSX.Element;
  color?: string;
  borderColor: string;
  center?: boolean;
}

export const AppInputWrapper = <T extends {}>({
  states,
  toggleSecure,
  setToggleSecure,
  props,
  secure,
  color,
  borderColor,
  center,
  // inputStyle,
  children,
}: IProps<T>): JSX.Element => {
  const dynamicStyle: StyleProp<ViewStyle> = [
    secure && { flexDirection: 'row' },
    center && { justifyContent: 'center' },
  ];
  // console.log('[AppInputWrapper] inputStyle', inputStyle);

  return (
    <>
      <Block
        style={[styles.block, { borderColor }, dynamicStyle]}
        onLayout={props.onLayout}
        margin={[sizes.input.top, 0, !props.error ? sizes.input.top : 0]}>
        {props.label && <AppInputLabel label={props.label} isFocused={states.isFocused} />}
        {children}
        <AppSecure secure={!!secure} toggleSecure={toggleSecure} setToggleSecure={setToggleSecure} />
      </Block>
      <AppInputError
        margin={[0, 0, sizes.input.top, 0]}
        id={props?.id}
        error={props.error}
        color={color}
        isFocused={states.isFocused}
        isTouched={props.touched || states.isTouched}
        isVirgin={states.isVirgin}
        // isFirstTouched={!!props.touched && !isTouched}
        // {...props}
      />
    </>
  );
};

const styles = StyleSheet.create({
  block: {
    borderWidth: 0.8,
    borderRadius: sizes.input.big.radius,
    borderColor: colors.input.border,
  },
});
