import React, { Dispatch, SetStateAction } from 'react';
import { Block } from '../Block';
import { AppSecure } from './AppSecure';
import AppInputLabel from './AppInputLabel';
import AppInputError from './AppInputError';
import { IAppInputProps } from '~/src/app/models/ui/input';
import { sizes } from '~/src/app/common/constants/sizes';
import { IAppInputStates } from './AppInput';

interface IProps<T> {
  states: IAppInputStates;
  toggleSecure: boolean;
  setToggleSecure: Dispatch<SetStateAction<boolean>>;
  props: IAppInputProps<T>;
  secure?: boolean;
  children: JSX.Element;
}

export const AppInputWrapper = <T extends {}>({
  states,
  toggleSecure,
  setToggleSecure,
  props,
  secure,
  children,
}: IProps<T>): JSX.Element => {
  return (
    <Block onLayout={props.onLayout} margin={[sizes.input.top / 2, 0, sizes.input.top]}>
      {props.label && <AppInputLabel label={props.label} isFocused={states.isFocused} />}
      {children}
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
};
