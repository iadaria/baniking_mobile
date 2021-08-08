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
import { CitySearcher } from './CitySearcher';
import { logline } from '~/src/app/utils/debug';

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

  //const [page, setPage] = useState(0);
  //const [showCities, setShowCities] = useState<City[]>([]);

  useEffect(() => {
    fetchCities();
  }, [fetchCities]);

  /*   useEffect(() => {
      setPage(0);
    }, [cities]);
  
    useEffect(() => {
      const moreCities = [...cities, ...cities.slice(page, 8)];
      setShowCities(moreCities);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); */

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
      <CitySearcher allCities={allCities} setCities={setCities} />
      <Block style={s.citiesList}>
        <FlatList
          data={cities}
          //data={showCities}
          showsVerticalScrollIndicator={true}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          //onEndReached={() => setPage((prev) => prev + 8)}
          onEndReachedThreshold={0.1}
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
