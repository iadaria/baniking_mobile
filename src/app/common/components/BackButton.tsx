import React, { FC } from 'react';
import { TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { BackwardIcon } from '~/src/assets';
import * as RootNavigation from '~/src/navigation/helpers/RootNavigation';
import { multiplier } from '../constants';
import { routes } from '../../../navigation/helpers/routes';

interface IProps {
  screen?: string;
}

export const BackButton: FC<IProps> = ({
  screen = routes.navigators.DrawerNavigator,
}) => {
  return (
    <TouchableOpacity onPress={() => RootNavigation.goBackOrToScreen(screen)}>
      <BackwardIcon width={wp(8) * multiplier} />
    </TouchableOpacity>
  );
};
