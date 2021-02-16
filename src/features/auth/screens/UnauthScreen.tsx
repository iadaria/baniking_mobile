import React from 'react';
import { ParamListBase } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { IAuthState } from '~/src/features/auth/store/authReducer';
import { useSelector } from 'react-redux';
import routes from '~/src/navigation/helpers/routes';

interface IProps {
  navigation: StackNavigationProp<ParamListBase>;
}

export const UnauthScreen: React.FC<IProps> = ({ navigation }) => {
  const authenticated = useSelector((state: IAuthState) => state.authenticated);
  if (authenticated) {
    navigation.navigate(routes.navigators.AuthNavigator);
  } else {
    navigation.navigate(routes.drawerNavigator.ProfileTab);
  }

  return <>You are not authorized</>;
};
