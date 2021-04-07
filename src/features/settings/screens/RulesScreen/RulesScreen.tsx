import React from 'react';
import { AppText, Block } from '~/src/app/common/components/UI';
import { multiplier, sizes } from '~/src/app/common/constants';

export function RulesScreen() {
  return (
    <Block padding={[sizes.offset.base * multiplier, sizes.offset.base, 0]}>
      <AppText h1>Правило приложения</AppText>
      <AppText margin={[6 * multiplier, 0, 0]}>Правила</AppText>
    </Block>
  );
}

// const styles = StyleSheet.create({});
