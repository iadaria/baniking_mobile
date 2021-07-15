import React, { FC, useEffect } from 'react';
import { ScrollView, TextStyle, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { ParamListBase } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AppText, Block } from '~/src/app/common/components/UI';
import { verify as verifyAction } from '~/src/features/auth/store/authActions';
import { IRootState } from '~/src/app/store/rootReducer';
import { IUserAuth } from '~/src/app/models/user';

import { VerifyPayload } from '../../store/saga/verifySaga';
import { useState } from 'react';
import { ArrowRightIcon, VerifyCodeIcon } from '~/src/assets';
import { styles as s } from './styles';
import { logline } from '~/src/app/utils/debug';
import { Code } from './Code';
import { SMS_SECONDS } from '~/src/app/common/constants';

interface IProps {
  navigation: StackNavigationProp<ParamListBase>;
  scrollViewRef?: React.RefObject<ScrollView>;
  currentUser: Partial<IUserAuth> | null;
  verify: (payload: VerifyPayload) => void;
}

const Timer = ({ seconds }: { seconds: number }) => {
  function format(num: number) {
    const result = String(num);
    return result.length < 2 ? '0' + result : result;
  }

  const isExpired = seconds <= 0;
  const expiredBack: TextStyle = isExpired ? { backgroundColor: 'white' } : {};
  const expiredText: TextStyle = isExpired ? { color: 'black' } : {};
  const expiredIcon = isExpired ? 'black' : 'white';
  return (
    <Block
      style={[s.repeat, expiredBack]}
      margin={[2, 0]}
      padding={[3, 4]}
      row
      space="between">
      <Block row center>
        <AppText style={expiredText} margin={[0, 5, 0, 0]}>
          Отправить код заново
        </AppText>
        <ArrowRightIcon fill={expiredIcon} />
      </Block>
      <AppText style={expiredText} semibold>
        00:{format(seconds)}
      </AppText>
    </Block>
  );
};

const VerifyFormContainer = ({ currentUser, verify }: IProps): JSX.Element => {
  const [code, setCode] = useState(['', '', '', '']);
  const [seconds, setSeconds] = useState(SMS_SECONDS);
  const [recreate, setRecreate] = useState<boolean>(true);
  const [timer, setTimer] = useState<NodeJS.Timeout>();

  // for test
  currentUser = currentUser || { phone: '+7(914)352-82-88' }

  useEffect(() => {
    logline('[VarifyForm] code = ', code);
    logline('[VarifyForm] code joined ', code.join(''));
    logline('[VarifyForm] is full code = ', isFullDigits);
    if (isFullDigits) {
      handleVerifyCode();
    }
  }, [code]);

  useEffect(() => {
    launchTick();
    return () => timer && clearInterval(timer);
  }, []);

  useEffect(() => {
    if (timer && seconds < 1) {
      clearInterval(timer);
    }
  }, [seconds]);


  function launchTick() {
    setSeconds(SMS_SECONDS);
    const interval = setInterval(() => tick(), 1000);
    setTimer(interval);
  }

  function tick() {
    setSeconds((prev) => (prev > 0 ? prev - 1 : 0));
  }

  const isFullDigits = code.join('').length === 4;

  const handleVerifyCode = () => {
    if (currentUser) {
      verify({
        phone: currentUser.phone!,
        code: code.join(''),
        action: 0,
      });
    }
  };

  return (
    <>
      <Block margin={[2, 0]} flex={0.25} row>
        <VerifyCodeIcon />
        <AppText margin={[0, 0, 0, 2]} header>
          Му отправили проверочный код на номер {currentUser?.phone}
        </AppText>
      </Block>
      <Code code={code} setCode={setCode} />
      <TouchableOpacity onPress={launchTick}>
        <Timer seconds={seconds} />
      </TouchableOpacity>
    </>
  );
};

const VerifyFormConnected = connect(
  ({ auth }: IRootState) => ({
    currentUser: auth.currentUser,
  }),
  {
    verify: verifyAction,
  },
)(VerifyFormContainer);

export { VerifyFormConnected as VerifyForm };
