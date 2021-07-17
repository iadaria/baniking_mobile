import React from 'react';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { StackNavigationProp } from '@react-navigation/stack';
import { ParamListBase } from '@react-navigation/native';
import { AppText, Block } from '~/src/app/common/components/UI';
import { VerifyForm } from './VerifyForm';
import { routes } from '~/src/navigation/helpers/routes';
import { BackButton } from '~/src/app/common/components/BackButton';

interface IProps {
  navigation: StackNavigationProp<ParamListBase>;
}

export function VerifyScreen({ navigation }: IProps) {
  return (
    <Block full base>
      <BackButton screen={routes.authNavigator.RegisterScreen} />
      <AppText h1>Подтверждение</AppText>
      <VerifyForm navigation={navigation} />
    </Block>
  );
}
