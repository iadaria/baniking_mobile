import React, { useEffect } from 'react';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { AppText, Block } from '~/src/app/common/components/UI';
import { TotalPointScores } from '~/src/assets';
import { sizes } from '~/src/app/common/constants/sizes';
import { multiplier } from '~/src/app/common/constants';
import { logline } from '~/src/app/utils/debug';

interface IProps {
  points: number;
}

export default function AppHeaderTitle({ points }: IProps) {

  useEffect(() => {
    if (!points) {
      logline(
        '[AppHeaderTitle/useEffect/AppHeaderTitle render] points = ',
        points,
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [points]);

  return (
    <Block row center>
      <AppText header>
        {points /* numberWithSpaces(points.toString()) */ || ''}
      </AppText>
      <Block margin={[0, sizes.offset.between]} />
      <TotalPointScores width={wp(10) * multiplier} />
      <Block margin={[0, sizes.offset.between]} />
    </Block>
  );
}
