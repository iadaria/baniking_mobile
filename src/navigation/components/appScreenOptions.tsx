import {
  HeaderLeftClose,
  HeaderLeftOpen,
  HeaderRightButton,
  HeaderBackward,
} from '~/src/navigation/components/headerButtons';
import { StackNavigationProp } from '@react-navigation/stack';
import { ParamListBase, Route } from '@react-navigation/native';
import React from 'react';
import AppHeaderTitle from './AppHeaderTitle';
import { defaultScreenOptions } from './appDefaultTheme';

interface IAppScreenOptionsProps {
  isDrawerOpen: boolean;
  isBackward: boolean;
  navigation: StackNavigationProp<ParamListBase>;
  route: Route<string, object | undefined>;
  onCloseDrawer: (navigation: StackNavigationProp<ParamListBase>) => void;
  onOpenDrawer: (navigation: StackNavigationProp<ParamListBase>) => void;
}

export const appScreenOptions = ({
  isDrawerOpen,
  isBackward,
  navigation,
  // route,
  onCloseDrawer,
  onOpenDrawer,
}: IAppScreenOptionsProps) => {
  return {
    ...defaultScreenOptions,
    headerTitle: () => <AppHeaderTitle />,
    headerLeft: () => {
      if (isBackward) {
        return <HeaderBackward navigation={navigation} />;
      }

      return isDrawerOpen ? (
        <HeaderLeftClose onCloseDrawer={() => onCloseDrawer(navigation)} />
      ) : (
        <HeaderLeftOpen onOpenDrawer={() => onOpenDrawer(navigation)} />
      );
    },
    headerRight: () => <HeaderRightButton />,
  };
};
