import React from 'react';
import { AppText, Block } from '~/app/common/components/ui';
import { TotalPointScores } from '~/assets';
import { sizes } from '~/app/common/constants/sizes';

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
