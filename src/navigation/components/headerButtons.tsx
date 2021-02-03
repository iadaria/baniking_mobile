import React from 'react';
// import {
//   StackHeaderLeftButtonProps,
//   // StackNavigationOptions,
// } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Block } from '~/app/common/components/ui/Block';
// import * as RootNavigate from '~/navigation/helpers/RootNavigation';
import { MenuHumberger, Notify, CloseMenu } from '~/assets';
import { colors, sizes } from '~/app/common/constants';

// interface IProps {
//   navigation: StackNavigationProp<ParamListBase>;
// }

/* export const HeaderLeftButton: StackNavigationOptions = {
  headerLeft: (props: StackHeaderLeftButtonProps) => (
    <TouchableOpacity onPress={() => console.log('menu button is clicked')}>
      <MenuHumberger />
    </TouchableOpacity>
  ),
}; */
export const HeaderLeftOpen = ({
  onOpenDrawer,
}: {
  onOpenDrawer: () => void;
}) => {
  return (
    <Block margin={[0, 0, 0, sizes.base]}>
      <TouchableOpacity onPress={onOpenDrawer}>
        <MenuHumberger />
      </TouchableOpacity>
    </Block>
  );
};

export const HeaderLeftClose = ({
  onCloseDrawer,
}: {
  onCloseDrawer: () => void;
}) => {
  return (
    <Block margin={[0, 0, 0, sizes.base]}>
      <TouchableOpacity onPress={onCloseDrawer}>
        <CloseMenu />
      </TouchableOpacity>
    </Block>
  );
};

export const HeaderRightButton = (/* props: StackHeaderLeftButtonProps */) => (
  <Block margin={[0, sizes.base, 0, 0]}>
    <TouchableOpacity onPress={() => console.log('menu button is clicked')}>
      <Notify fill={colors.disable} opacity={0.25} />
    </TouchableOpacity>
  </Block>
);
