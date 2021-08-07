import React, { useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { AppText } from '~/src/app/common/components/UI';
import {
  checkCity as checkCityAction,
  fetchCities as fetchCitiesAction,
} from '~/src/features/cities/store/cityActions';
import * as RootNavigation from '~/src/navigation/helpers/RootNavigation';
import { IRootState } from '~/src/app/store/rootReducer';
import { routes } from '~/src/navigation/helpers/routes';
import { LocationIcon } from '~/src/assets';
import { styles as s } from '../styles';
import { City } from '~/src/app/models/city';

interface IProps {
  loading: boolean;
  citiesCount: number;
  city: City;
  fetchCities: () => void;
  checkCity: () => void;
}

export function CityContainer(props: IProps) {
  const { loading, citiesCount, city, checkCity, fetchCities } = props;

  useEffect(() => {
    fetchCities();
  }, [fetchCities]);

  useEffect(() => {
    if (citiesCount > 0) {
      checkCity();
    }
  }, [checkCity, citiesCount]);

  if (loading) {
    return null;
  }

  return (
    <TouchableOpacity
      style={s.city}
      onPress={() => RootNavigation.navigate(routes.bathesTab.CitiesScreen)}>
      <LocationIcon />
      <AppText padding={[3]}>{city?.name}</AppText>
    </TouchableOpacity>
  );
}

const CityConnected = connect(
  ({ city }: IRootState) => ({
    loading: city.loading,
    citiesCount: city.count,
    city: city.selectedCity,
  }),
  {
    fetchCities: fetchCitiesAction,
    checkCity: checkCityAction,
  },
)(CityContainer);

export { CityConnected as City };
