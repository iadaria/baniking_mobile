import React from 'react';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { AppText, Block } from '~/src/app/common/components/UI';
import { TotalPointScores } from '~/src/assets';
import { sizes } from '~/src/app/common/constants/sizes';
import { multiplier } from '~/src/app/common/constants';
import { connect } from 'react-redux';
import { IRootState } from '~/src/app/store/rootReducer';

interface IProps {
  points: number;
}

const AppHeaderTitleContainer = ({ points }: IProps) => {
  return (
    <Block row center>
      <AppText header>{points || ''}</AppText>
      <Block margin={[0, sizes.offset.between]} />
      <TotalPointScores width={wp(10) * multiplier} />
      <Block margin={[0, sizes.offset.between]} />
    </Block>
  );
};

const AppHeaderTitleConnected = connect(
  ({ system }: IRootState) => ({
    points: system.header.points,
  }),
  {},
)(AppHeaderTitleContainer);

export { AppHeaderTitleConnected as AppHeaderTitle };