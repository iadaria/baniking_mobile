import React from 'react';
import { TouchableOpacity } from 'react-native';
import { ParamListBase } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AppText, Block } from '~/src/app/common/components/UI';
import { routes } from '~/src/navigation/helpers/routes';
import { FilterIcon } from '~/src/assets';
import { styles } from './styles';

interface IProps {
  navigation: StackNavigationProp<ParamListBase>;
  filterCount: number;
}

export default function FilterButton({ navigation, filterCount }: IProps) {
  const isFiltered = filterCount > 0;

  return (
    <TouchableOpacity
      style={[styles.filter, isFiltered && { backgroundColor: 'white' }]}
      onPress={() => navigation.navigate(routes.bathesTab.BathesFilterScreen)}>
      <FilterIcon />
      {isFiltered && (
        <Block style={styles.badge} middle center>
          <AppText bold center size={2.8}>
            {filterCount}
          </AppText>
        </Block>
      )}
    </TouchableOpacity>
  );
}
