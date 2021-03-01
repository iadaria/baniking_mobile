import { getFocusedRouteNameFromRoute, ParamListBase, Route } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { disableBackward, enableBackward, pushBackward } from '~/src/app/store/system/systemReducer';

interface IProps {
  route: Route<string, object | undefined>;
  navigation: StackNavigationProp<ParamListBase>;
}

export function useBackward({ navigation, route }: IProps) {
  const dispatch = useDispatch();
  const name = getFocusedRouteNameFromRoute(route);
  const excepts = ['SettingsMenuScreen', 'CabinetScreen'];
  const settingsScreens = [
    'SafeScreen',
    'ProfileScreen',
    'NotificationsScreen',
    'RulesScreen',
    'ContractScreen',
    'HelpScreen',
  ];
  // const excepts = ['SettingsMenuScreen', 'LoginScreen', 'RegisterScreen', ''];
  // const excepts = [''];

  // console.log(name);

  useEffect(() => {
    console.log('[useBackward !!!!!!!]', name);
    if (name && settingsScreens.includes(name)) {
      dispatch(pushBackward('SettingsMenuScreen'));
    }
    if (name && navigation.canGoBack && !excepts.includes(name)) {
      dispatch(enableBackward());
      //dispatch(pushBackward(name));
    } else {
      dispatch(disableBackward());
    }
  }, [dispatch, excepts, name, navigation.canGoBack]);
}
