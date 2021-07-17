import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { ParamListBase, Route } from '@react-navigation/native';
import { AppText, Block } from '~/src/app/common/components/UI';
import { VerifyForm } from './VerifyForm';
import { routes } from '~/src/navigation/helpers/routes';
import { BackButton } from '~/src/app/common/components/BackButton';
import { Action } from '~/src/app/common/constants';
import { logline } from '~/src/app/utils/debug';

interface IProps {
  navigation: StackNavigationProp<ParamListBase>;
  route: Route<string, { action: Action } | undefined>;
}

export function VerifyScreen({ navigation, route }: IProps) {
  const action = route?.params?.action!;

  logline('VerifyScreen **', route);

  return (
    <Block full base>
      <BackButton screen={routes.authNavigator.RegisterScreen} />
      <AppText h1>Подтверждение</AppText>
      <VerifyForm navigation={navigation} action={action} />
    </Block>
  );
}
