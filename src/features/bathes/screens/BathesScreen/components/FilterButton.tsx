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
  const { filterCount } = useSelector(({ bath }: IRootState) => bath);

  const isFiltered = filterCount > 0;

  return (
    <TouchableOpacity
      style={[s.filter, isFiltered && { backgroundColor: 'white' }]}
      onPress={() => RNav.navigate(routes.bathesTab.BathesFilterScreen)}>
      <FilterIcon />
      {isFiltered && (
        <Block style={s.badge} middle center>
          <AppText bold center size={2.8}>
            {filterCount}
          </AppText>
        </Block>
      )}
    </TouchableOpacity>
  );
}
