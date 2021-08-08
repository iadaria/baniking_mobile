import React, { useCallback, useEffect, FC, useState } from 'react';
import { connect } from 'react-redux';
import { FlatList, TouchableOpacity } from 'react-native';
import { AppText, Block } from '~/src/app/common/components/UI';
import {
  fetchCities as fetchCitiesAction,
  selectCity as selectCityAction,
} from '~/src/features/cities/store/cityActions';
import { persistCity as persistCityAction } from '~/src/features/persist/store/appPersistActions';
import { IRootState } from '~/src/app/store/rootReducer';
import { City } from '~/src/app/models/city';
import { styles as s } from '../styles';
import { useDebouncedCallback } from 'use-debounce/lib';
import { CitySearcher } from './CitySearcher';

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
  cities: allCities,
  fetchCities,
  persistCity,
  selectCity,
}) => {
  const [cities, setCities] = useState(allCities);
  const [searched, setSearched] = useState<string | undefined>();

  useEffect(() => {
    fetchCities();
  }, [fetchCities]);

  const debouncedFilter = useDebouncedCallback(
    (what?: string) => {
      if (what) {
        const filteredCities = allCities.filter((c) => compare(c.name, what));
        setCities(filteredCities);
      } else {
        setCities(allCities);
      }
    },
    1000,
    { maxWait: 2000 },
  );

  useEffect(() => {
    debouncedFilter(searched);
  }, [debouncedFilter, searched]);

  function compare(where: string, what: string) {
    return where.toLowerCase().includes(what.toLowerCase());
  }

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
        <AppText primary size={4}>
          {name}
        </AppText>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <CitySearcher searched={searched} setSearched={setSearched} />
      <Block style={s.citiesList}>
        <FlatList
          data={cities}
          showsVerticalScrollIndicator={true}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
        />
      </Block>
    </>
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
