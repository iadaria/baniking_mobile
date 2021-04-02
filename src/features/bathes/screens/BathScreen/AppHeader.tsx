import React from 'react';
import { connect } from 'react-redux';
import { ParamListBase } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Block } from '~/src/app/common/components/UI';
import { appBarHeight } from '~/src/app/common/constants/platform';
import { IRootState } from '~/src/app/store/rootReducer';
import { pullBackward as pullBackwardAction } from '~/src/app/store/system/systemActions';
import { getCabinetData as getCabinetDataAction } from '~/src/features/profiles/store/profileActions';
import AppHeaderTitle from '~/src/navigation/components/AppHeaderTitle';
import { HeaderBackward, HeaderRightButton } from '~/src/navigation/components/headerButtons';

interface IAppScreenOptionsProps {
  isBackward: boolean;
  backwardStack: string[];
  points: number;
  isTransparent: boolean;
  navigation: StackNavigationProp<ParamListBase>;
  onCloseDrawer: (navigation: StackNavigationProp<ParamListBase>) => void;
  onOpenDrawer: (navigation: StackNavigationProp<ParamListBase>) => void;
  pullBackward: () => void;
  onPress: () => void;
}

const AppHeaderContainer: React.FC<IAppScreenOptionsProps> = ({
  isBackward,
  backwardStack,
  points,
  navigation,
  // route,
  //isTransparent,
  pullBackward,
  onPress,
}: IAppScreenOptionsProps) => {
  let headerLeft;
  if (isBackward && backwardStack.length > 0) {
    headerLeft = (
      <HeaderBackward
        navigation={navigation}
        backwardStack={backwardStack}
        pullBackward={pullBackward}
        onPress={onPress}
      />
    );
  }

  return (
    <Block style={{ paddingTop: appBarHeight, justifyContent: 'space-between' }} row>
      {headerLeft}
      <Block style={{ justifyContent: 'space-between' }} flex={0.44} row>
        <AppHeaderTitle points={points} />
        <HeaderRightButton />
      </Block>
    </Block>
  );
};

const AppHeaderConnected = connect(
  ({ system, auth }: IRootState) => ({
    authenticated: auth.authenticated,
    isDrawerOpen: system.header.isDrawerOpen,
    isBackward: system.header.isBackward,
    backwardStack: system.header.backwardStack,
    points: system.header.points,
    // currentScreen: system.header.currentScreen,
    isTransparent: system.header.isTransparent,
  }),
  {
    pullBackward: pullBackwardAction,
    getCabinetData: getCabinetDataAction,
  },
)(AppHeaderContainer);

export { AppHeaderConnected as AppHeader };
