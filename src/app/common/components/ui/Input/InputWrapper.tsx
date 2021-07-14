import React, { Dispatch, ReactNode, SetStateAction } from 'react';
import { Block } from '../Block';
import { InputSecure } from './InputSecure';
import { IAppInputProps } from '~/src/app/models/ui/input';
import { sizes } from '~/src/app/common/constants/sizes';
import { IInputStates } from './Input';
import InputLabel from './InputLabel';
import InputError from './InputError';

interface IProps<T> {
  states: IInputStates;
  toggleSecure: boolean;
  setToggleSecure: Dispatch<SetStateAction<boolean>>;
  props: IAppInputProps<T>;
  secure?: boolean;
  children: JSX.Element;
  center?: boolean;
  rightButton?: ReactNode;
}

export const InputWrapper = <T extends {}>({
  states,
  toggleSecure,
  setToggleSecure,
  props,
  secure,
  children,
  rightButton,
}: IProps<T>): JSX.Element => {
  return (
    <>
      <Block
        onLayout={props.onLayout}
        margin={[sizes.input.top, 0, !props.error ? sizes.input.top : 0]}>
        {props.label && (
          <InputLabel label={props.label} isFocused={states.isFocused} />
        )}
        {children}
        {rightButton}
        <InputSecure
          secure={!!secure}
          toggleSecure={toggleSecure}
          setToggleSecure={setToggleSecure}
        />
        <InputError
          margin={[0, 0, sizes.input.top, 0]}
          id={props?.id}
          error={props.error}
          isFocused={states.isFocused}
          isTouched={props.touched || states.isTouched}
          isVirgin={states.isVirgin}
        />
      </Block>
    </>
  );
};
