import React from 'react';
import { Header } from '~/src/app/common/components/Header';
import { Block, AppText } from '~/src/app/common/components/UI';

export default function TestTwoScreen() {
  return (
    <Block full base>
      <Header />
      <Block middle center full>
        <AppText>Empty screen</AppText>
      </Block>
    </Block>
  );
}
