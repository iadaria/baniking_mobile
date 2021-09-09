import React, { Dispatch, ReactNode, SetStateAction } from 'react';
import { Block } from '../Block';
import { AppSecure } from './AppSecure';
import AppInputLabel from './AppInputLabel';
import AppInputError from './AppInputError';
import { IAppInputProps } from '~/src/app/models/ui/input';
import { sizes } from '~/src/app/common/constants/sizes';
import { IAppInputStates } from './AppInput';
import { StyleProp, ViewStyle } from 'react-native';
import { styles } from './styles';
import AppPlaceholder from './AppPlaceholder';
import { isAndroid } from '~/src/app/utils/system';

interface IProps<T> {
  states: IAppInputStates;
  toggleSecure: boolean;
  setToggleSecure: Dispatch<SetStateAction<boolean>>;
  props: IAppInputProps<T>;
  secure?: boolean;
  children: JSX.Element;
  color?: string;
  borderColor: string;
  blockStyle: StyleProp<ViewStyle>;
  center?: boolean;
  rightButton?: ReactNode;
  showPlaceholder?: boolean;
  placeholder?: string;
}

export const AppInputWrapper = <T extends {}>({
  states,
  toggleSecure,
  setToggleSecure,
  props,
  secure,
  color,
  borderColor,
  blockStyle,
  center,
  children,
  rightButton,
  showPlaceholder,
  placeholder,
}: IProps<T>): JSX.Element => {
  const dynamicStyle: StyleProp<ViewStyle> = [
    (secure || !!rightButton) && {
      flexDirection: 'row',
      //alignItems: 'center',
    },
    center && secure && { justifyContent: 'center' },
  ];

  return (
    <>
      <Block
        style={[styles.block, blockStyle, { borderColor } /* , dynamicStyle */]}
        onLayout={props.onLayout}
        margin={[sizes.input.top, 0, !props.error ? sizes.input.top : 0]}>
        {props.label && (
          <AppInputLabel label={props.label} isFocused={states.isFocused} />
        )}
        {children}
        {rightButton}
        <AppSecure
          secure={!!secure}
          toggleSecure={toggleSecure}
          setToggleSecure={setToggleSecure}
        />
        {isAndroid && (
          <AppPlaceholder
            showPlaceholder={showPlaceholder}
            placeholder={placeholder}
          />
        )}
      </Block>
      <AppInputError
        margin={[0, 0, sizes.input.top, 0]}
        id={props?.id}
        error={props.error}
        color={color}
        isFocused={states.isFocused}
        isTouched={props.touched || states.isTouched}
        isVirgin={states.isVirgin}
      />
    </>
  );
};
