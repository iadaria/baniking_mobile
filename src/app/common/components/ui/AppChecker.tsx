import React, { ReactNode } from 'react';
import { TouchableOpacity } from 'react-native';
import { SwitcherIcon } from '~/src/assets';
import { colors } from '../../constants';
import { Block } from './Block';
import { multiplier } from '~/src/app/common/constants';

export interface IAppCheckerProps<T> {
  id: keyof T;
  isAccept: boolean;
  onPress: () => void;
  text?: ReactNode | ReactNode[];
}

export function AppChecker<T>({ isAccept, onPress, text }: IAppCheckerProps<T>) {
  return (
    <Block margin={[3 * multiplier, 0, 5 * multiplier]} row center>
      <TouchableOpacity onPress={onPress}>
        <SwitcherIcon fill={isAccept ? colors.secondary : colors.disable} />
      </TouchableOpacity>
      {text}
    </Block>
  );
}
