import React from 'react';
import { AppText, Block } from '~/app/common/components/ui';

interface ILabelProps {
  color?: string;
  focused: boolean;
  text?: string;
}

export function AppDrawerItem({ focused, text }: ILabelProps) {
  return focused ? (
    <Block style={{ alignSelf: 'flex-start' }}>
      <AppText header>{text}</AppText>
      <Block underline />
    </Block>
  ) : (
    <AppText header lightUltra>
      {text}
    </AppText>
  );
}