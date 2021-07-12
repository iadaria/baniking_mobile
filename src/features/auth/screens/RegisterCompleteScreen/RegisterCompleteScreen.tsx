import React, { useRef } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { ParamListBase } from '@react-navigation/native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { AppText, Block } from '~/src/app/common/components/UI';
import { ScrollView, TouchableOpacity } from 'react-native';
import { AuthLogo } from '~/src/assets';
import { RegisterCompleteForm } from './RegisterCompleteForm';
import { styles } from './styles';
import { KeyboardWrapper } from '~/src/app/common/components/KeyboardWrapper';
import { multiplier } from '~/src/app/common/constants';

interface IProps {
  navigation: StackNavigationProp<ParamListBase>;
}

export function RegisterCompleteScreen({ navigation }: IProps) {
  const scrollViewRef = useRef<ScrollView>(null);

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
