import React from 'react';
import { ScrollView } from 'react-native';
import { Input, AppText, Block } from '~/src/app/common/components/UI';
import { AppButton } from '~/src/app/common/components/UI/AppButton';
import { StackNavigationProp } from '@react-navigation/stack';
import { ParamListBase } from '@react-navigation/native';
import ValidatedElements from '~/src/app/common/components/ValidatedElements';
import { connect } from 'react-redux';
import { resetPassword as resetPasswordAction } from '~/src/features/auth/store/authActions';
import { sizes } from '~/src/app/common/constants';
import { AuthLogoLeft, AuthLogoRight } from '~/src/assets';
import { defaultRecoveryInputs } from '../contracts/recoveryInputs';
import { ResetPasswordPayload } from '../../store/saga/resetPasswordSaga';

interface IProps {
  navigation: StackNavigationProp<ParamListBase>;
  scrollViewRef?: React.RefObject<ScrollView>;
  resetPassword: (payload: ResetPasswordPayload) => void;
}

const ResetPasswordFormContainer = ({
  scrollViewRef,
  resetPassword,
}: IProps): JSX.Element => {
  // Use ref because don't need rendering component
  const valuesRef = React.useRef<ResetPasswordPayload>();
  const [recreate, setRecreate] = React.useState<boolean>(true);

  const handleResetPassword = () => {
    if (valuesRef.current) {
      resetPassword(valuesRef.current);
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
          Телеофон
        </AppText>
      </Block>
      <Input
        style={{ borderRadius: 10 }}
        id="phone"
        placeholder="+7(___)___-__-__   "
        mask="+7([000])[000]-[00]-[00]"
        keyboardType="numeric"
        center
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
