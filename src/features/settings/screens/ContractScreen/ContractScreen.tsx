import React from 'react';
import { AppText, Block } from '~/src/app/common/components/UI';
import { multiplier, sizes } from '~/src/app/common/constants';

export function ContractScreen() {
  return (
    <Block padding={[sizes.offset.base * multiplier, sizes.offset.base, 0]}>
      <AppText h1>Пользовательско соглашение</AppText>
      <AppText margin={[6 * multiplier, 0, 0]}>Соглашение</AppText>
    </Block>
  );
}

// const styles = StyleSheet.create({});
