import { getFocusedRouteNameFromRoute, ParamListBase, Route } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { disableBackward, enableBackward, pushBackward } from '~/src/app/store/system/systemActions';

interface IProps {
  route: Route<string, object | undefined>;
  navigation: StackNavigationProp<ParamListBase>;
  screens: string[];
  screen: string | null;
}

export function useBackward({ navigation, route, screens, screen }: IProps) {
  const dispatch = useDispatch();
  const name = getFocusedRouteNameFromRoute(route);
  __DEV__ && console.log('[useBakward/name screen]', name);
  const exceptsFrom = ['SettingsMenuScreen', 'CabinetScreen'];
  const exceptsTo = ['LoginScreen', 'RegisterScreen', 'ResetPasswordScreen'];

  useEffect(() => {
    // console.log('[useBackward/screen !!!!!!!]', name);
    if (name && screen && screens.includes(name) && !exceptsTo.includes(name)) {
      //dispatch(pushBackward('SettingsMenuScreen'));
      dispatch(pushBackward(screen));
    }
    if (name && navigation.canGoBack && !exceptsFrom.includes(name)) {
      dispatch(enableBackward());
      //dispatch(pushBackward(name));
    } else {
      dispatch(disableBackward());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, exceptsFrom, exceptsTo, name, navigation.canGoBack]);
}

/* const settingsScreens = [
    'SafeScreen',
    'ProfileScreen',
    'NotificationsScreen',
    'RulesScreen',
    'ContractScreen',
    'HelpScreen',
  ]; */
// const excepts = ['SettingsMenuScreen', 'LoginScreen', 'RegisterScreen', ''];
// const excepts = [''];

// console.log(name);
