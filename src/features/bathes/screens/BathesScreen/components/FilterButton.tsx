import React from 'react';
import { TouchableOpacity } from 'react-native';
import { AppText, Block } from '~/src/app/common/components/UI';
import { routes } from '~/src/navigation/helpers/routes';
import { FilterIcon } from '~/src/assets';
import * as RNav from '~/src/navigation/helpers/RootNavigation';
import { useSelector } from 'react-redux';
import { IRootState } from '~/src/app/store/rootReducer';
import { styles as s } from '../styles';

export function FilterButton() {
  const { filterCount } = useSelector((state: IRootState) => state.filter);
  return (
    <TouchableOpacity
      style={[s.filter, !!filterCount && { backgroundColor: 'white' }]}
      onPress={() => RNav.navigate(routes.bathesTab.BathesFilter)}>
      <FilterIcon />
      {!!filterCount && (
        <Block style={s.badge} middle center>
          <AppText bold center size={2.8}>
            {filterCount}
          </AppText>
        </Block>
      )}
    </TouchableOpacity>
  );
}
