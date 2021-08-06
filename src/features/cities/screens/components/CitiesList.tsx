import React, { useCallback, useEffect, FC } from 'react';
import { connect } from 'react-redux';
import { FlatList, TouchableOpacity } from 'react-native';
import { AppText, Block } from '~/src/app/common/components/UI';
import { City } from '~/src/app/models/city';
import { fetchCities as fetchCitiesAction } from '~/src/features/cities/store/cityActions';
import { IRootState } from '~/src/app/store/rootReducer';
import { styles as s } from '../styles';

interface IProps {
  cities: City[];
  fetchCities: () => void;
}

const CitiesListContainer: FC<IProps> = ({ cities, fetchCities }) => {
  useEffect(() => {
    fetchCities();
  }, [fetchCities]);

  const keyExtractor = useCallback((city: City) => String(city.id), []);

  const renderItem = ({ item }: { item: City }) => {
    return (
      <TouchableOpacity style={s.cityItem}>
        <AppText primary medium size={4}>
          {item.name}
        </AppText>
      </TouchableOpacity>
    );
  };

  return (
    <Block style={s.citiesList}>
      <FlatList
        data={cities}
        showsVerticalScrollIndicator={true}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />
    </Block>
  );
};

const CitiesListConnected = connect(
  ({ city }: IRootState) => ({ cities: city.cities }),
  {
    fetchCities: fetchCitiesAction,
  },
)(CitiesListContainer);

export { CitiesListConnected as CitiesList };
