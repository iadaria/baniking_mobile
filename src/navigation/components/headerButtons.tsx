import React from 'react';
import {
  StackHeaderLeftButtonProps,
  // StackNavigationOptions,
} from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { MenuHumberger, Notify } from '~/assets';
import { Block } from '~/app/common/components/ui/Block';
import { colors, sizes } from '~/app/common/constants';


/* export const HeaderLeftButton: StackNavigationOptions = {
  headerLeft: (props: StackHeaderLeftButtonProps) => (
    <TouchableOpacity onPress={() => console.log('menu button is clicked')}>
      <MenuHumberger />
    </TouchableOpacity>
  ),
}; */
export const HeaderLeftButton = (props: StackHeaderLeftButtonProps) => (
  <Block margin={[0, 0, 0, sizes.base]}>
    <TouchableOpacity onPress={() => console.log('menu button is clicked')}>
      <MenuHumberger />
    </TouchableOpacity>
  </Block>
);
export const HeaderRightButton = (props: StackHeaderLeftButtonProps) => (
  <Block margin={[0, sizes.base, 0, 0]}>
    <TouchableOpacity onPress={() => console.log('menu button is clicked')}>
      <Notify fill={colors.disable} opacity={0.25} />
    </TouchableOpacity>
  </Block>
);
