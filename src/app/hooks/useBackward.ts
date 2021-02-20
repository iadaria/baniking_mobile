import { getFocusedRouteNameFromRoute, ParamListBase, Route } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { disableBackward, enableBackward } from '~/src/app/store/system/systemReducer';

interface IProps {
  route: Route<string, object | undefined>;
  navigation: StackNavigationProp<ParamListBase>;
}

export function useBackward({ navigation, route }: IProps) {
  const dispatch = useDispatch();
  const name = getFocusedRouteNameFromRoute(route);
  const excepts = ['SettingsMenuScreen'];

  // console.log(name);

  useEffect(() => {
    if (name && navigation.canGoBack && !excepts.includes(name)) {
      dispatch(enableBackward());
    } else {
      dispatch(disableBackward());
    }
  }, [dispatch, excepts, name, navigation.canGoBack]);
}