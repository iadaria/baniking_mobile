import React, { useCallback, useEffect, FC } from 'react';
import { connect } from 'react-redux';
import { FlatList, TouchableOpacity } from 'react-native';
import { AppText, Block } from '~/src/app/common/components/UI';
import {
  fetchCities as fetchCitiesAction,
  initFilteredCities as initFilteredCitiesAction,
  nextPage as nextPageAction,
  selectCity as selectCityAction,
  setFilteredCities as setFilteredCitiesAction,
} from '~/src/features/cities/store/cityActions';
import { persistCity as persistCityAction } from '~/src/features/persist/store/appPersistActions';
import { IRootState } from '~/src/app/store/rootReducer';
import { City } from '~/src/app/models/city';
import { styles as s } from '../styles';
import { CitySearcher } from './CitySearcher';
import { colors } from '~/src/app/common/constants';

interface IProps {
  closeList: () => void;
  // state
  allCities: City[];
  countAllCities: number;
  filteredCities: City[];
  fetchCities: () => void;
  persistCity: (cityId: number) => void;
  selectCity: (cityId: number) => void;
  // FlatList
  start: number;
  showCities: City[];
  initFilteredCities: () => void;
  setFilteredCities: (payload: City[]) => void;
  nextPage: () => void;
}

//const COUNT_CITIES = 10;

const CitiesListContainer: FC<IProps> = ({
  closeList,
  // state
  allCities,
  countAllCities,
  filteredCities,
  fetchCities,
  persistCity,
  selectCity,
  // FlatList
  start,
  showCities,
  initFilteredCities,
  setFilteredCities,
  nextPage,
}) => {

  // init all cities
  useEffect(() => {
    if (countAllCities <= 0) {
      fetchCities();
    }
  }, [countAllCities, fetchCities]);

  // init filtered cities
  useEffect(() => {
    if (countAllCities > 0) {
      initFilteredCities();
    }
  }, [countAllCities, initFilteredCities]);

  // init first 10 cities
  useEffect(() => {
    if (filteredCities.length > 0 && start === 0) {
      nextPage();
    }
  }, [filteredCities, nextPage, start]);

  function handleSetCities(newFilteredCities: City[]) {
    setFilteredCities(newFilteredCities);
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

  const emptyList = (
    <Block margin={[10, 0]} middle center>
      <AppText color={colors.caption}>Город не найден</AppText>
    </Block>
  );

  return (
    <>
      <CitySearcher allCities={allCities} setCities={handleSetCities} />
      <Block style={s.citiesList}>
        <FlatList
          data={showCities}
          showsVerticalScrollIndicator={true}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          onEndReached={nextPage}
          onEndReachedThreshold={0.1}
          ListEmptyComponent={emptyList}
        />
      </Block>
    </>
  );
};

const CitiesListConnected = connect(
  ({ city }: IRootState) => ({
    allCities: city.cities,
    countAllCities: city.count,
    start: city.start,
    filteredCities: city.filteredCities,
    showCities: city.showCities,
  }),
  {
    fetchCities: fetchCitiesAction,
    persistCity: persistCityAction,
    selectCity: selectCityAction,
    // FlatList
    nextPage: nextPageAction,
    initFilteredCities: initFilteredCitiesAction,
    setFilteredCities: setFilteredCitiesAction,
  },
)(CitiesListContainer);

export { CitiesListConnected as CitiesList };
