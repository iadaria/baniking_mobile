import React from 'react';
import {
  DrawerContentComponentProps,
  DrawerContentOptions,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import { AppLogoItem } from './AppLogoItem';
import { AppDrawerItem } from './AppDrawerItem';
import { Alert } from 'react-native';
import { closeDrawer } from '~/src/app/store/system/systemReducer';
import { useDispatch } from 'react-redux';
import { AppDrawerItemList } from './AppDrawerItemList';

/* interface IProps extends DrawerContentComponentProps<DrawerContentOptions> {
  close: () => void;
} */

export function AppDrawerContent(
  props: DrawerContentComponentProps<DrawerContentOptions>,
) {
  const dispatch = useDispatch();
  function pickCloseIcon() {
    dispatch(closeDrawer());
  }
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem
        label={() => <AppLogoItem />}
        onPress={() => Alert.alert('Link to help')}
      />
      {/* <DrawerItemList {...props} /> */}
      <AppDrawerItemList {...props} pickCloseIcon={pickCloseIcon} />
      <DrawerItem
        label={(props) => <AppDrawerItem text="Выйти" {...props} />}
        onPress={() => {
          Alert.alert('Link to help');
          // navigation.closeDrawer();
        }}
      />
    </DrawerContentScrollView>
  );
}
