import React, { useRef } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { ParamListBase, Route } from '@react-navigation/native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { AppText, Block } from '~/src/app/common/components/UI';
import { ScrollView, TouchableOpacity } from 'react-native';
import { AuthLogo } from '~/src/assets';
import { RegisterCompleteForm } from './RegisterCompleteForm';
import { styles } from './styles';
import { KeyboardWrapper } from '~/src/app/common/components/KeyboardWrapper';
import { Action, multiplier } from '~/src/app/common/constants';
import { logline } from '~/src/app/utils/debug';

interface IProps {
  navigation: StackNavigationProp<ParamListBase>;
  route: Route<string, { action: Action } | undefined>;
}

export function RegisterCompleteScreen({ navigation, route }: IProps) {
  const scrollViewRef = useRef<ScrollView>(null);
  const action = route?.params?.action!;

  logline('RegisterCompleteScreen **', route);

  return (
    <KeyboardWrapper>
      <ScrollView
        ref={scrollViewRef}
        style={styles.scrollView}
        alwaysBounceHorizontal
        contentContainerStyle={styles.scrollViewContainer}>
        <Block full>
          <Block center margin={[5 * multiplier, 0, 3 * multiplier]}>
            <AuthLogo width={wp(11) * multiplier} />
          </Block>
          <Block style={styles.list} full base white>
            {/* Form */}
            <RegisterCompleteForm
              navigation={navigation}
              scrollViewRef={scrollViewRef}
              action={action}
            />
            {/* Sign in */}
            <Block row middle>
              <AppText primary center>
                Уже зарегистрированы?
              </AppText>
              <TouchableOpacity
                onPress={() => navigation.navigate('LoginScreen')}>
                <AppText secondary> Войдите</AppText>
              </TouchableOpacity>
            </Block>
          </Block>
        </Block>
      </ScrollView>
    </KeyboardWrapper>
  );
}
