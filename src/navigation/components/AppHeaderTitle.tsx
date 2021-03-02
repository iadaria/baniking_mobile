import React from 'react';
import { AppText, Block } from '~/src/app/common/components/UI';
import { TotalPointScores } from '~/src/assets';
import { sizes } from '~/src/app/common/constants/sizes';
import { numberWithSpaces } from '../../app/utils/system';

interface IProps {
  points: number;
}

export default function AppHeaderTitle({ points }: IProps) {
  return (
    <Block row center right>
      <AppText header>{numberWithSpaces(points)}</AppText>
      <Block margin={[0, sizes.offset.between]} />
      <TotalPointScores />
      <Block margin={[0, sizes.offset.between]} />
    </Block>
  );
}
