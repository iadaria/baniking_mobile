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
import { AppDrawerItemList } from './AppDrawerItemList';
import { askLogout } from '~/src/features/persist/store/appPersistActions';
import { Header } from '~/src/app/common/components/Header';
import { Block } from '~/src/app/common/components/UI';


interface ILabelProps {
  focused: boolean;
  color: string;
}

export function AppDrawerContent(
  props: DrawerContentComponentProps<DrawerContentOptions>,
) {
  const { navigation } = props;
  return (
    <DrawerContentScrollView {...props}>
      <Block margin={[0, 4]}>
        <Header iconKind="close" />
      </Block>
      <DrawerItem label={() => <AppLogoItem />} onPress={() => { }} />
      <AppDrawerItemList {...props} />
      <DrawerItem
        label={(labelProps: ILabelProps) => (
          <AppDrawerItem text="Выйти" {...labelProps} />
        )}
        onPress={() => {
          navigation.closeDrawer();
          store.dispatch(askLogout());
        }}
      />
    </DrawerContentScrollView>
  );
}
