import React from 'react';
import { Header } from '~/src/app/common/components/Header';
import { AppText, Block } from '~/src/app/common/components/UI';
import { multiplier } from '~/src/app/common/constants';

export function ContractScreen() {
  return (
    <Block full base>
      <Header iconKind="backward" />
      <AppText h1>Пользовательско соглашение</AppText>
      <AppText margin={[6 * multiplier, 0, 0]}>Соглашение</AppText>
    </Block>
  );
}
