import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Block } from '~/src/app/common/components/UI';
import { MenuHumberger, Notify, CloseMenu, BackwardIcon } from '~/src/assets';
import { colors, sizes } from '~/src/app/common/constants';
import { StackNavigationProp } from '@react-navigation/stack';
import { ParamListBase } from '@react-navigation/native';

interface IProps {
  navigation: StackNavigationProp<ParamListBase>;
  backwardStack: string[];
  pullBackward: () => void;
}

export const HeaderLeftOpen = ({ onOpenDrawer }: { onOpenDrawer: () => void }) => {
  return (
    <Block margin={[0, 0, 0, sizes.offset.base]}>
      <TouchableOpacity onPress={onOpenDrawer}>
        <MenuHumberger />
      </TouchableOpacity>
    </Block>
  );
};

export const HeaderLeftClose = ({ onCloseDrawer }: { onCloseDrawer: () => void }) => {
  return (
    <Block margin={[0, 0, 0, sizes.offset.base]}>
      <TouchableOpacity onPress={onCloseDrawer}>
        <CloseMenu />
      </TouchableOpacity>
    </Block>
  );
};

export const HeaderBackward = ({ navigation, backwardStack, pullBackward }: IProps) => {
  const [screen, setScreen] = React.useState(backwardStack[backwardStack.length - 1]);
  React.useEffect(() => {
    setScreen(backwardStack[backwardStack.length - 1]);
  }, [backwardStack]);

  return (
    <Block margin={[0, 0, 0, sizes.offset.base]}>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
          navigation.navigate(screen);
          pullBackward();
        }}>
        <BackwardIcon />
      </TouchableOpacity>
    </Block>
  );
};

export const HeaderRightButton = (/* props: StackHeaderLeftButtonProps */) => (
  <Block margin={[0, sizes.offset.base, 0, 0]}>
    <TouchableOpacity onPress={() => console.log('menu button is clicked')}>
      <Notify fill={colors.disable} opacity={0.25} />
    </TouchableOpacity>
  </Block>
);
