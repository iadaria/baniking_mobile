import React from 'react';
import { TouchableOpacity } from 'react-native';
import { AppText, Block } from '~/src/app/common/components/UI';
import { routes } from '~/src/navigation/helpers/routes';
import { FilterIcon } from '~/src/assets';
import { useSelector } from 'react-redux';
import * as RNav from '~/src/navigation/helpers/RootNavigation';
import { IRootState } from '~/src/app/store/rootReducer';
import { styles as s } from '../styles';

export function FilterButton() {
  const { paramsTouchCount } = useSelector((state: IRootState) => state.filter);

  const isFiltered = paramsTouchCount > 0;

  return (
    <TouchableOpacity
      style={[s.filter, isFiltered && { backgroundColor: 'white' }]}
      onPress={() => RNav.navigate(routes.bathesTab.BathesFilterScreen)}>
      <FilterIcon />
      {isFiltered && (
        <Block style={s.badge} middle center>
          <AppText bold center size={2.8}>
            {paramsTouchCount}
          </AppText>
        </Block>
      )}
    </TouchableOpacity>
  );
}
