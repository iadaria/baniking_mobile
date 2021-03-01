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
  backwardStack: string[];
  navigation: StackNavigationProp<ParamListBase>;
  route: Route<string, object | undefined>;
  onCloseDrawer: (navigation: StackNavigationProp<ParamListBase>) => void;
  onOpenDrawer: (navigation: StackNavigationProp<ParamListBase>) => void;
  pullBackward: () => void;
}

export const appScreenOptions = ({
  isDrawerOpen,
  isBackward,
  backwardStack,
  navigation,
  // route,
  onCloseDrawer,
  onOpenDrawer,
  pullBackward,
}: IAppScreenOptionsProps) => {
  return {
    ...defaultScreenOptions,
    headerTitle: () => <AppHeaderTitle />,
    headerLeft: () => {
      if (isBackward && backwardStack.length > 0) {
        return (
          <HeaderBackward navigation={navigation} backwardStack={backwardStack} pullBackward={pullBackward} />
        );
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
