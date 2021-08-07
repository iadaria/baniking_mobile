import React, { useCallback, useEffect, FC } from 'react';
import { connect } from 'react-redux';
import { FlatList, TouchableOpacity } from 'react-native';
import { AppText, Block } from '~/src/app/common/components/UI';
import { City } from '~/src/app/models/city';
import {
  fetchCities as fetchCitiesAction,
  selectCity as selectCityAction,
} from '~/src/features/cities/store/cityActions';
import { IRootState } from '~/src/app/store/rootReducer';
import { styles as s } from '../styles';
import { persistCity as persistCityAction } from '~/src/features/persist/store/appPersistActions';

interface IProps {
  closeList: () => void;
  // state
  cities: City[];
  fetchCities: () => void;
  persistCity: (cityId: number) => void;
  selectCity: (cityId: number) => void;
}

const CitiesListContainer: FC<IProps> = ({
  closeList,
  cities,
  fetchCities,
  persistCity,
  selectCity,
}) => {
  useEffect(() => {
    fetchCities();
  }, [fetchCities]);

  function handleSelectCity(id: number) {
    closeList();
    persistCity(id);
    selectCity(id);
  }

  const keyExtractor = useCallback((city: City) => String(city.id), []);

  const renderItem = ({ item: cityItem }: { item: City }) => {
    const { id, name } = cityItem;
    return (
      <TouchableOpacity style={s.cityItem} onPress={() => handleSelectCity(id)}>
        <AppText primary medium size={4}>
          {name}
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
    persistCity: persistCityAction,
    selectCity: selectCityAction,
  },
)(CitiesListContainer);

export { CitiesListConnected as CitiesList };
