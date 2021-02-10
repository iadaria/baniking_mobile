import React from 'react';
import { AppText, Block } from '~/src/app/common/components/ui';
import { TotalPointScores } from '~/src/assets';
import { sizes } from '~/src/app/common/constants/sizes';

export default function AppHeaderTitle() {
  return (
    <Block row center right>
      <AppText header>35 752</AppText>
      <Block margin={[0, sizes.between]} />
      <TotalPointScores />
      <Block margin={[0, sizes.between]} />
    </Block>
  );
}
