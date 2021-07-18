import React from 'react';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { AppText, Block } from '~/src/app/common/components/UI';
import { NotFountIcon } from '~/src/assets';
import { styles } from './styles';

export default function NotFound() {
  return (
    <Block margin={[20, 0, 0]} middle center>
      <NotFountIcon
        style={[styles.notFoundIcon, { marginTop: -wp(13) }]}
        width={wp(13)}
      />
      <AppText trajan>К сожалению результатов нет</AppText>
      <AppText size={3}>Попробуйте поменять текст запросов!</AppText>
    </Block>
  );
}
