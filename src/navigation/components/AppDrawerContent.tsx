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
import { closeDrawer } from '~/src/app/store/system/systemActions';
import { useDispatch } from 'react-redux';
import { AppDrawerItemList } from './AppDrawerItemList';
import { askLogout } from '~/src/features/persist/store/appPersistActions';
import { clearBackward } from '../../app/store/system/systemActions';
import { Header } from '~/src/app/common/components/Header';
import { Block } from '~/src/app/common/components/UI';

/* interface IProps extends DrawerContentComponentProps<DrawerContentOptions> {
  close: () => void;
} */

interface ILabelProps {
  focused: boolean;
  color: string;
}

export function AppDrawerContent(
  props: DrawerContentComponentProps<DrawerContentOptions>,
) {
  // __DEV__ && console.log(props);
  const { navigation } = props;
  const dispatch = useDispatch();
  function pickCloseIcon() {
    dispatch(closeDrawer());
    dispatch(clearBackward());
  }
  return (
    <DrawerContentScrollView {...props}>
      <Block margin={[0, 4]}>
        <Header iconKind="close" />
      </Block>
      <DrawerItem label={() => <AppLogoItem />} onPress={() => { }} />
      <AppDrawerItemList {...props} pickCloseIcon={pickCloseIcon} />
      <DrawerItem
        label={(labelProps: ILabelProps) => (
          <AppDrawerItem text="Выйти" {...labelProps} />
        )}
        onPress={() => {
          dispatch(closeDrawer());
          navigation.closeDrawer();
          store.dispatch(askLogout());
        }}
      />
    </DrawerContentScrollView>
  );
}
