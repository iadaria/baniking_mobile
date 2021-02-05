import React from 'react';
import { AppText, Block } from '~/app/common/components/ui';
import { MenuLogo } from '~/assets';
import { colors, sizes } from '~/app/common/constants';

export function AppLogoItem() {
  return (
    <Block row center>
      <MenuLogo />
      <Block margin={[0, sizes.between]} />
      <Block>
        <AppText style={{ bottom: -3 }} logo trajan transform="uppercase">
          Banya king
        </AppText>
        <AppText
          style={{ bottom: 3 }}
          color={colors.logo}
          caption
          transform="lowercase">
          Клуб жарких привилегий
        </AppText>
      </Block>
    </Block>
  );
}
