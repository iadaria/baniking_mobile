import React from 'react';
import { TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { AppText } from '~/src/app/common/components/UI';
import * as RootNavigation from '~/src/navigation/helpers/RootNavigation';
import { PageIcon } from '~/src/assets';
import { styles as s } from '../styles';
import { routes } from '~/src/navigation/helpers/routes';
import { changeNear as changeNearAction } from '~/src/features/bathes/store/bathActions';

interface IProps {
  changeNear: (isNeedNear: boolean) => void;
}

function NearestContainer({ changeNear }: IProps) {
  function handleSetNear() {
    changeNear(true);
    RootNavigation.goBackOrToScreen(routes.bathesTab.BathesScreen);
  }

  return (
    <TouchableOpacity style={s.nealy} onPress={handleSetNear}>
      <AppText primary medium>
        Показать все бани рядом со мной
      </AppText>
      <PageIcon />
    </TouchableOpacity>
  );
}
export const NearestConnected = connect(() => ({}), {
  changeNear: changeNearAction,
})(NearestContainer);

export { NearestConnected as Nearest };
