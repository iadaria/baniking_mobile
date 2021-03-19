import React, { useRef, useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { ParamListBase } from '@react-navigation/native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { ICredential } from '~/src/app/models/user';
import { connect } from 'react-redux';
import { socialLogin, emailRegister as emailRegisterAction } from '~/src/features/auth/store/authActions';
import { AppText, Block } from '~/src/app/common/components/UI';
import { NativeScrollEvent, NativeSyntheticEvent, ScrollView, TouchableOpacity } from 'react-native';
import { AuthLogo } from '~/src/assets';
import RegisterForm from './RegisterForm';
import SoialLoginBlock from '../components/SocialLoginBlock';
import { styles } from './styles';
import { KeyboardWrapper } from '~/src/app/common/components/KeyboardWrapper';
import { IRootState } from '~/src/app/store/rootReducer';
import { IErrors } from '~/src/app/utils/error';
import { multiplier } from '~/src/app/common/constants';

interface IProps {
  navigation: StackNavigationProp<ParamListBase>;
  emailRegister: (props: Partial<ICredential>) => void;
  errors: IErrors | null;
}

function RegisterContainer({ navigation, emailRegister, errors }: IProps) {
  const scrollViewRef = useRef<ScrollView>(null);
  const [scrollPosition, setScrollPosition] = useState<number | undefined>();

  return (
    <KeyboardWrapper>
      <ScrollView
        ref={scrollViewRef}
        style={styles.scrollView}
        scrollToOverflowEnabled
        onScroll={(event: NativeSyntheticEvent<NativeScrollEvent>) =>
          setScrollPosition(event.nativeEvent.contentOffset.y)
        }
        scrollEventThrottle={16}
        alwaysBounceHorizontal
        keyboardDismissMode="interactive"
        contentContainerStyle={styles.scrollViewContainer}>
        <Block full>
          <Block center margin={[5 * multiplier, 0, 3 * multiplier]}>
            <AuthLogo width={wp(13) * multiplier} />
          </Block>
          <Block style={styles.list} full base white>
            <RegisterForm
              scrollViewRef={scrollViewRef}
              emailRegister={emailRegister}
              scrollPosition={scrollPosition}
              errors={errors}
            />
            {/* Social login block */}
            <SoialLoginBlock />
            {/* Sign in */}
            <Block row middle>
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
  ({ auth }: IRootState) => ({
    errors: auth.errors,
  }),
  {
    emailRegister: emailRegisterAction,
  },
)(RegisterContainer);

export { RegisterConnected as RegisterScreen };
