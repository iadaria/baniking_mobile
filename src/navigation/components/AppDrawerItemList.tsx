import * as React from 'react';
import {
  CommonActions,
  DrawerActions,
  DrawerNavigationState,
  ParamListBase,
  useLinkBuilder,
} from '@react-navigation/native';
import { DrawerContentOptions, DrawerItem } from '@react-navigation/drawer';
import {
  DrawerDescriptorMap,
  DrawerNavigationHelpers,
} from '@react-navigation/drawer/lib/typescript/src/types';

type Props = Omit<DrawerContentOptions, 'contentContainerStyle' | 'style'> & {
  state: DrawerNavigationState<ParamListBase>;
  navigation: DrawerNavigationHelpers;
  descriptors: DrawerDescriptorMap;
  pickCloseIcon: () => void;
};

export function AppDrawerItemList({
  state,
  navigation,
  descriptors,
  activeTintColor,
  inactiveTintColor,
  activeBackgroundColor,
  inactiveBackgroundColor,
  itemStyle,
  labelStyle,
  pickCloseIcon,
}: Props) {
  const buildLink = useLinkBuilder();

  return (state.routes.map((route, i) => {
    const focused = i === state.index;
    const { title, drawerLabel, drawerIcon } = descriptors[route.key].options;

    return (
      <DrawerItem
        key={route.key}
        label={
          drawerLabel !== undefined
            ? drawerLabel
            : title !== undefined
            ? title
            : route.name
        }
        icon={drawerIcon}
        focused={focused}
        activeTintColor={activeTintColor}
        inactiveTintColor={inactiveTintColor}
        activeBackgroundColor={activeBackgroundColor}
        inactiveBackgroundColor={inactiveBackgroundColor}
        labelStyle={labelStyle}
        style={itemStyle}
        to={buildLink(route.name, route.params)}
        onPress={() => {
          navigation.dispatch({
            ...(focused
              ? DrawerActions.closeDrawer()
              : CommonActions.navigate(route.name)),
            target: state.key,
          });
          pickCloseIcon();
        }}
      />
    );
  }) as React.ReactNode) as React.ReactElement;
}
