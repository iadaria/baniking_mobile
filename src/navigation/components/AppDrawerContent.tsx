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
import { Alert } from 'react-native';

export function AppDrawerContent(
  props: DrawerContentComponentProps<DrawerContentOptions>,
) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem
        label={() => <AppLogoItem />}
        onPress={() => Alert.alert('Link to help')}
      />
      <DrawerItemList {...props} />
      <DrawerItem
        label={(props) => <AppDrawerItem text="Выйти" {...props} />}
        onPress={() => Alert.alert('Link to help')}
      />
    </DrawerContentScrollView>
  );
}
