import React from 'react';
import {
  DrawerContentComponentProps,
  DrawerContentOptions,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import { AppLogoItem } from './AppLogoItem';
import { AppDrawerItem } from './AppDrawerItem';

export function AppDrawerContent(
  props: DrawerContentComponentProps<DrawerContentOptions>,
) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem
        label={() => <AppLogoItem />}
        onPress={() => alert('Link to help')}
      />
      <DrawerItemList {...props} />
      <DrawerItem
        label={(props) => <AppDrawerItem text="Выйти" {...props} />}
        onPress={() => alert('Link to help')}
      />
    </DrawerContentScrollView>
  );
}
