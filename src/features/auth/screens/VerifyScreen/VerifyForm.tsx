import React from 'react';
import { ScrollView } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { AppInput, AppText, Block } from '~/src/app/common/components/UI';
import { AppButton } from '~/src/app/common/components/UI/AppButton';
import { StackNavigationProp } from '@react-navigation/stack';
import { ParamListBase } from '@react-navigation/native';
import ValidatedElements from '~/src/app/common/components/ValidatedElements';
import { connect } from 'react-redux';
import { verify as verifyAction } from '~/src/features/auth/store/authActions';
import { VerifyPayload } from '~/src/app/models/user';
import { sizes } from '~/src/app/common/constants';
import { AuthLogoLeft, AuthLogoRight } from '~/src/assets';
import { defaultVerifyInputs } from '../contracts/verifyInputs';
import { log } from '~/src/app/utils/debug';

interface IProps {
  navigation: StackNavigationProp<ParamListBase>;
  scrollViewRef?: React.RefObject<ScrollView>;
  verify: (payload: VerifyPayload) => void;
}

const VerifyFormContainer = ({
  scrollViewRef,
  verify,
}: IProps): JSX.Element => {
  // Use ref because don't need rendering component
  const valuesRef = React.useRef<VerifyPayload>({
    phone: '',
    action: 0,
    code: '',
  });
  const [recreate, setRecreate] = React.useState<boolean>(true);

  const handleResetPassword = () => {
    if (valuesRef.current) {
      log('values1', valuesRef.current);
      verify(valuesRef?.current);
      //resetPassword(valuesRef?.current.email!);
      setRecreate(!recreate);
    }
  };

  return (
    <ValidatedElements
      key={Number(recreate)}
      defaultInputs={defaultVerifyInputs}
      scrollView={scrollViewRef}
      valuesRef={valuesRef}>
      <Block margin={[0, 0, 3]} row middle center>
        <AuthLogoLeft />
        <AppText style={{ marginHorizontal: 15 }} h2 trajan primary>
          Verification Code
        </AppText>
        <AuthLogoRight />
      </Block>
      <Block row middle center>
        <AppText primary semibold size={sizes.text.label}>
          Code
        </AppText>
      </Block>
      <AppInput
        style={{ borderRadius: 10 /* , paddingLeft: wp(29)  */ }}
        center
        id="code"
        placeholder="Enter code"
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

const VerifyFormConnected = connect(
  (/* state: IRootState */) => ({
    //
  }),
  {
    verify: verifyAction,
  },
)(VerifyFormContainer);

export { VerifyFormConnected as VerifyForm };
