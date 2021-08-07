import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TouchableOpacity } from 'react-native';
import { AppText } from '~/src/app/common/components/UI';
import {
  checkCity,
  fetchCities,
} from '~/src/features/cities/store/cityActions';
import { IRootState } from '~/src/app/store/rootReducer';
import * as RootNavigation from '~/src/navigation/helpers/RootNavigation';
import { LocationIcon } from '~/src/assets';
import { styles as s } from '../styles';
import { routes } from '~/src/navigation/helpers/routes';

export function City() {
  const dispatch = useDispatch();

  const { selectedCity, cities, loading } = useSelector(
    ({ city }: IRootState) => city,
  );

  useEffect(() => {
    dispatch(fetchCities());
  }, [dispatch]);

  useEffect(() => {
    if (cities.length > 0) {
      dispatch(checkCity());
    }
  }, [dispatch, cities]);

  if (loading) {
    return null;
  }

  return (
    <TouchableOpacity
      style={s.city}
      onPress={() => RootNavigation.navigate(routes.bathesTab.CityScreen)}>
      <LocationIcon />
      <AppText padding={[3]}>{selectedCity.name}</AppText>
    </TouchableOpacity>
  );
}
