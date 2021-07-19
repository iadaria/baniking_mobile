import React from 'react';
import { Header } from '~/src/app/common/components/Header';
import { AppText, Block } from '~/src/app/common/components/UI';
import { multiplier } from '~/src/app/common/constants';

export function RulesScreen() {
  return (
    <Block full base>
      <Header iconKind="backward" />
      <AppText h1>Правило приложения</AppText>
      <AppText margin={[6 * multiplier, 0, 0]}>Правила</AppText>
    </Block>
  );
}
