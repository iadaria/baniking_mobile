import React from 'react';
import { ScrollView } from 'react-native';
import { AppInput, AppText, Block } from '~/src/app/common/components/UI';
import { AppButton } from '~/src/app/common/components/UI/AppButton';
import { StackNavigationProp } from '@react-navigation/stack';
import { ParamListBase } from '@react-navigation/native';
import ValidatedElements from '~/src/app/common/components/ValidatedElements';
import { connect } from 'react-redux';
import { recoveryPassword as recoveryPasswordAction } from '~/src/features/auth/store/authActions';
import { ICredential } from '~/src/app/models/user';
import { sizes } from '~/src/app/common/constants';
import { AuthLogoLeft, AuthLogoRight } from '~/src/assets';
import { defaultRecoveryInputs } from '../contracts/recoveryInputs';

interface IProps {
  navigation: StackNavigationProp<ParamListBase>;
  scrollViewRef?: React.RefObject<ScrollView>;
  recoveryPassword: ({ provider }: ICredential) => void;
}

const RecoveryFormContainer = ({ scrollViewRef, recoveryPassword }: IProps): JSX.Element => {
  // const [values, valuesRef, setValues] = useRefState<ICredential>({ login: '', password: '' });
  // Use ref because don't need rendering component
  const valuesRef = React.useRef<Partial<ICredential>>({ email: ''});

  const handleEmailLogin = () => {
    console.log('values1', valuesRef.current);
    recoveryPassword({ ...valuesRef.current });
  };

  return (
    <ValidatedElements defaultInputs={defaultRecoveryInputs} scrollView={scrollViewRef} valuesRef={valuesRef}>
      <Block margin={[0, 0, 3]} row middle center>
        <AuthLogoLeft />
        <AppText style={{ marginHorizontal: 15 }} h2 trajan primary>
          Восстановление пароля
        </AppText>
        <AuthLogoRight />
      </Block>
      {/* Email / Telephone Input */}
      <Block row middle center>
        <AppText primary semibold size={sizes.text.label}>
          Ваш email
        </AppText>
      </Block>
      <AppInput center id="email" placeholder="Введите e-mail" />
      {/* Button */}
      <AppButton onPress={handleEmailLogin}>
        <AppText center medium>
          Восстановить
        </AppText>
      </AppButton>
    </ValidatedElements>
  );
};

const RecoveryFormConnected = connect(
  (/* state: IRootState */) => ({
    //
  }),
  {
    recoveryPassword: recoveryPasswordAction,
  },
)(RecoveryFormContainer);

export { RecoveryFormConnected as RecoveryForm };