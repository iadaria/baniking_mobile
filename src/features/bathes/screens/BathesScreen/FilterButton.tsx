import { ParamListBase } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import routes from '~/src/navigation/helpers/routes';
import { FilterIcon } from '~/src/assets';
import { styles } from './styles';
import { calculateFilterCount } from '~/src/app/utils/bathUtility';
import { TPartBathParams } from '~/src/app/models/bath';
import { colors } from '~/src/app/common/constants';
import { AppText, Block } from '~/src/app/common/components/UI';

interface IProps {
  navigation: StackNavigationProp<ParamListBase>;

  params: TPartBathParams;
}

export default function FilterButton({ navigation, params }: IProps) {
  const initialFilterCount = calculateFilterCount(params);
  const [filterCount, setFilterCount] = useState(initialFilterCount);

  useEffect(() => {
    setFilterCount(calculateFilterCount(params));
  }, [params]);

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
