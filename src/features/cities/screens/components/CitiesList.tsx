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
import { colors } from '~/src/app/common/constants';

interface IProps {
  closeList: () => void;
  // state
  allCities: City[];
  countAllCities: number;
  fetchCities: () => void;
  persistCity: (cityName: string) => void;
  selectCity: (cityId: number) => void;
}

const CitiesListContainer: FC<IProps> = ({
  closeList,
  // state
  allCities,
  countAllCities,
  fetchCities,
  persistCity,
  selectCity,
}) => {
  const [showCities, setShowCities] = useState<City[]>([]);

  // init all cities
  useEffect(() => {
    if (countAllCities <= 0) {
      fetchCities();
    } else {
      setShowCities(allCities);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countAllCities, fetchCities]);

  const keyExtractor = useCallback((city: City) => String(city.id), []);

  const renderItem = useCallback(
    ({ item: cityItem }: { item: City }) => {
      const { id, name } = cityItem;

      function handleSelectCity() {
        closeList();
        persistCity(name);
        selectCity(id);
      }

      return (
        <TouchableOpacity style={s.cityItem} onPress={() => handleSelectCity()}>
          <AppText primary size={4}>
            {name}
          </AppText>
        </TouchableOpacity>
      );
    },
    [closeList, persistCity, selectCity],
  );

  const emptyList = (
    <Block margin={[10, 0]} middle center>
      <AppText color={colors.caption}>Город не найден</AppText>
    </Block>
  );

  return (
    <>
      <CitySearcher allCities={allCities} setCities={setShowCities} />
      <Block style={s.citiesList}>
        <FlatList
          data={showCities}
          initialNumToRender={8}
          windowSize={5}
          maxToRenderPerBatch={5}
          updateCellsBatchingPeriod={30}
          getItemLayout={(data, index) => ({
            length: 45,
            offset: 45 * index,
            index,
          })}
          showsVerticalScrollIndicator={true}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
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
    s,
  }),
  {
    fetchCities: fetchCitiesAction,
    persistCity: persistCityAction,
    selectCity: selectCityAction,
  },
)(CitiesListContainer);

export { CitiesListConnected as CitiesList };
