import React from 'react';
import { store } from '~/src/app/store';
import {
  DrawerContentComponentProps,
  DrawerContentOptions,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import { AppLogoItem } from './AppLogoItem';
import { AppDrawerItem } from './AppDrawerItem';
import { Alert } from 'react-native';
import { closeDrawer } from '~/src/app/store/system/systemActions';
import { useDispatch } from 'react-redux';
import { AppDrawerItemList } from './AppDrawerItemList';
import { askLogout } from '~/src/features/persist/store/appPersistActions';

/* interface IProps extends DrawerContentComponentProps<DrawerContentOptions> {
  close: () => void;
} */

interface ILabelProps {
  focused: boolean;
  color: string;
}

export function AppDrawerContent(props: DrawerContentComponentProps<DrawerContentOptions>) {
  // console.log(props);
  const { navigation } = props;
  const dispatch = useDispatch();
  function pickCloseIcon() {
    dispatch(closeDrawer());
  }
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem label={() => <AppLogoItem />} onPress={() => Alert.alert('Link to help')} />
      {/* <DrawerItemList {...props} /> */}
      <AppDrawerItemList {...props} pickCloseIcon={pickCloseIcon} />
      <DrawerItem
        label={(labelProps: ILabelProps) => <AppDrawerItem text="Выйти" {...labelProps} />}
        onPress={() => {
          dispatch(closeDrawer());
          navigation.closeDrawer();
          store.dispatch(askLogout());
        }}
      />
    </DrawerContentScrollView>
  );
}
