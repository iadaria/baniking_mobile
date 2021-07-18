import React from 'react';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Block } from '~/src/app/common/components/UI';
import { MenuHumberger, Notify, CloseMenu, BackwardIcon } from '~/src/assets';
import { colors, sizes, multiplier } from '~/src/app/common/constants';
import { StackNavigationProp } from '@react-navigation/stack';
import { ParamListBase } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native';

interface IProps {
  navigation: StackNavigationProp<ParamListBase>;
  backwardStack: string[];
  pullBackward: () => void;
  onPress?: () => void;
}

export const HeaderLeftOpen = ({
  onOpenDrawer,
}: {
  onOpenDrawer: () => void;
}) => {
  return (
    <TouchableOpacity style={styles.menu} onPress={onOpenDrawer}>
      <MenuHumberger />
    </TouchableOpacity>
  );
};

export const HeaderLeftClose = ({
  onCloseDrawer,
}: {
  onCloseDrawer: () => void;
}) => {
  return (
    <TouchableOpacity style={styles.menu} onPress={onCloseDrawer}>
      <CloseMenu />
    </TouchableOpacity>
  );
};

export const HeaderBackward = ({
  navigation,
  backwardStack,
  pullBackward,
  onPress,
}: IProps) => {
  const [screen, setScreen] = React.useState(
    backwardStack[backwardStack.length - 1],
  );
  React.useEffect(() => {
    setScreen(backwardStack[backwardStack.length - 1]);
  }, [backwardStack]);

  return (
    <TouchableOpacity
      style={styles.menu}
      onPress={() => {
        //navigation.goBack();
        navigation.navigate(screen);
        pullBackward();
        onPress && onPress();
      }}>
      <BackwardIcon width={wp(8) * multiplier} />
    </TouchableOpacity>
  );
};

export const HeaderRightButton = (/* props: StackHeaderLeftButtonProps */) => (
  <Block margin={[0, sizes.offset.base, 0, 0]}>
    <TouchableOpacity onPress={() => { }}>
      <Notify
        fill={colors.disable}
        opacity={0.25}
        width={wp(10) * multiplier}
      />
    </TouchableOpacity>
  </Block>
);

const styles = StyleSheet.create({
  menu: {
    padding: wp(sizes.offset.base * 0.5),
    paddingLeft: wp(sizes.offset.base),
  },
});
