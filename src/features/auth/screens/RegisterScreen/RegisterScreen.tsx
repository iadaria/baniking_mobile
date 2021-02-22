import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { ParamListBase } from '@react-navigation/native';
import { ICredential } from '~/src/app/models/user';
import { connect } from 'react-redux';
import { socialLogin } from '~/src/features/auth/store/authActions';
import { AppText, Block } from '~/src/app/common/components/UI';
import { ScrollView, TouchableOpacity } from 'react-native';
import { AuthLogo } from '~/src/assets';
import { sizes } from '~/src/app/common/constants';
import RegisterForm from './RegisterForm';
import SoialLoginBlock from '../components/SoialLoginBlock';
import { styles } from './styles';
import { KeyboardWrapper } from '../components/KeyboardWrapper';

interface IProps {
  navigation: StackNavigationProp<ParamListBase>;
  socialLogin: ({ provider }: ICredential) => void;
}

function RegisterContainer({ navigation }: IProps) {
  const scrollViewRef = React.useRef<ScrollView>(null);

  function handleSubmit() {}

  return (
    <KeyboardWrapper>
      <ScrollView
        ref={scrollViewRef}
        style={styles.scrollView}
        scrollToOverflowEnabled
        // horizontal={false}
        // scrollEnabled={false}
        alwaysBounceHorizontal
        keyboardDismissMode="interactive"
        // scrollEnabled={true}
        // keyboardShouldPersistTaps="always"
        // contentInsetAdjustmentBehavior="always"
        contentContainerStyle={styles.scrollViewContainer}>
        <Block full bottom debug>
          <Block center margin={[10, 0, sizes.logo.bottom]}>
            <AuthLogo />
          </Block>
          <Block style={styles.list} full base white>
            <RegisterForm scrollViewRef={scrollViewRef} />
            {/* Social login block */}
            <SoialLoginBlock />
            {/* Sign in */}
            <Block row middle debug>
              <AppText primary center>
                Уже зарегистрированы?
              </AppText>
              <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
                <AppText secondary> Войдите</AppText>
              </TouchableOpacity>
            </Block>
          </Block>
        </Block>
      </ScrollView>
    </KeyboardWrapper>
  );
}

const RegisterConnected = connect(
  (/* state: IRootState */) => ({
    //
  }),
  {
    socialLogin: socialLogin,
  },
)(RegisterContainer);

export { RegisterConnected as RegisterScreen };
