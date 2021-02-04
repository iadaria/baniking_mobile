import React from 'react';
import { AppText, Block } from '~/app/common/components/ui';
import { MenuLogo } from '~/assets';
import { colors } from '~/app/common/constants';

export function AppLogoItem() {
  return (
    <Block row debug>
      <MenuLogo />
      <Block>
        <AppText logo trajan capitalize>
          Banya king
        </AppText>
        <AppText color={colors.logo} size={3}>
          Клуб жарких привилегий
        </AppText>
      </Block>
    </Block>
  );
}
