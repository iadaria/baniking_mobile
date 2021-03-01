import React, { ReactNode } from 'react';
import { TouchableOpacity } from 'react-native';
import { SwitcherIcon } from '~/src/assets';
import { colors } from '../../constants';
import { Block } from './Block';

export interface IAppCheckerProps<T> {
  id: keyof T;
  isAccept: boolean;
  onPress: () => void;
  text?: ReactNode | ReactNode[];
}

export function AppChecker<T>({ isAccept, onPress, text }: IAppCheckerProps<T>) {
  return (
    <Block margin={[3, 0, 5]} row center debug>
      <TouchableOpacity onPress={onPress}>
        <SwitcherIcon fill={isAccept ? colors.secondary : colors.disable} />
      </TouchableOpacity>
      {text}
    </Block>
  );
}
