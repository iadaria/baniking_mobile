import React from 'react';
import { TextStyle } from 'react-native';
import { AppText, Block } from '~/src/app/common/components/UI';
import { colors } from '~/src/app/common/constants';
import { isExpired } from '~/src/app/utils/common';
import { ArrowRightIcon } from '~/src/assets';
import { styles as s } from './styles';

interface ITimer {
  seconds: number;
  isError: boolean;
}

export const Timer = ({ seconds, isError }: ITimer) => {
  //logline('[Timer] isError=', isError);

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
  );
};
