import React from 'react';
import { ScrollView } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Input, AppText, Block } from '~/src/app/common/components/UI';
import { AppButton } from '~/src/app/common/components/UI/AppButton';
import { StackNavigationProp } from '@react-navigation/stack';
import { ParamListBase } from '@react-navigation/native';
import ValidatedElements from '~/src/app/common/components/ValidatedElements';
import { connect } from 'react-redux';
import { resetPassword as resetPasswordAction } from '~/src/features/auth/store/authActions';
import { ICredential } from '~/src/app/models/user';
import { sizes } from '~/src/app/common/constants';
import { AuthLogoLeft, AuthLogoRight } from '~/src/assets';
import { defaultRecoveryInputs } from '../contracts/recoveryInputs';

interface IProps {
  navigation: StackNavigationProp<ParamListBase>;
  scrollViewRef?: React.RefObject<ScrollView>;
  resetPassword: (email: string) => void;
}

const ResetPasswordFormContainer = ({ scrollViewRef, resetPassword }: IProps): JSX.Element => {
  // Use ref because don't need rendering component
  const valuesRef = React.useRef<Partial<ICredential>>({ email: '' });
  const [recreate, setRecreate] = React.useState<boolean>(true);

  const handleResetPassword = () => {
    if (valuesRef.current) {
      __DEV__ && console.log('values1', valuesRef.current);
      resetPassword(valuesRef?.current.email!);
      setRecreate(!recreate);
    }
  };

  return (
    <ValidatedElements
      key={Number(recreate)}
      defaultInputs={defaultRecoveryInputs}
      scrollView={scrollViewRef}
      valuesRef={valuesRef}>
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
      <Input
        style={{ borderRadius: 10 /* , paddingLeft: wp(29)  */ }}
        center
        id="email"
        placeholder="Введите e-mail "
      />
      {/* Button */}
      <AppButton margin={[2, 0, 1]} onPress={handleResetPassword}>
        <AppText center medium>
          Восстановить
        </AppText>
      </AppButton>
    </ValidatedElements>
  );
};

const ResetPasswordFormConnected = connect(
  (/* state: IRootState */) => ({
    //
  }),
  {
    resetPassword: resetPasswordAction,
  },
)(ResetPasswordFormContainer);

export { ResetPasswordFormConnected as ResetPasswordForm };
