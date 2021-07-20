import React, { useCallback, useEffect, useState } from 'react';
import { TextStyle, TouchableOpacity } from 'react-native';
import { AppText, Block } from '~/src/app/common/components/UI';
import { colors, SMS_SECONDS } from '~/src/app/common/constants';
import { isExpired } from '~/src/app/utils/common';
import { ArrowRightIcon } from '~/src/assets';
import { styles as s } from './styles';

interface ITimer {
  isError: boolean;
  sendNotify: () => void;
}

export const Timer = ({ isError, sendNotify }: ITimer) => {
  const [timer, setTimer] = useState<NodeJS.Timeout>();
  const [seconds, setSeconds] = useState(SMS_SECONDS);

  const launchTick = useCallback(() => {
    setSeconds(SMS_SECONDS);
    const interval = setInterval(() => tick(), 1000);
    setTimer(interval);
  }, []);

  const clearTimer = useCallback(() => {
    if (timer) {
      clearInterval(timer);
      setTimer(undefined);
    }
  }, [timer]);

  /** Init and Clear timer */
  useEffect(() => {
    launchTick();
    return () => clearTimer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** Stop timer */
  useEffect(() => {
    if (seconds < 1) {
      clearTimer();
    }
  }, [clearTimer, seconds]);

  /** Step timer */
  function tick() {
    setSeconds((prev) => (prev > 0 ? prev - 1 : 0));
  }

  function format(num: number) {
    const result = String(num);
    return result.length < 2 ? '0' + result : result;
  }

  const colorText = isExpired(seconds) && !isError ? 'black' : 'white';
  const colorBack =
    isExpired(seconds) && !isError
      ? 'white'
      : isError
        ? colors.errorDigit
        : 'black';
  const expiredBack: TextStyle = { backgroundColor: colorBack };
  const expiredText: TextStyle = { color: colorText };

  return (
    <TouchableOpacity
      disabled={!isExpired(seconds)}
      onPress={() => {
        sendNotify();
        launchTick();
      }}>
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
          <ArrowRightIcon fill={colorText} />
        </Block>
        <AppText style={expiredText} semibold>
          00:{format(seconds)}
        </AppText>
      </Block>
    </TouchableOpacity>
  );
};
