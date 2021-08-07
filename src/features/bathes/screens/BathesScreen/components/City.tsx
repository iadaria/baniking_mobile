import React, { useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AppText } from '~/src/app/common/components/UI';
import {
  checkCity,
  fetchCities,
} from '~/src/features/cities/store/cityActions';
import * as RootNavigation from '~/src/navigation/helpers/RootNavigation';
import { IRootState } from '~/src/app/store/rootReducer';
import { routes } from '~/src/navigation/helpers/routes';
import { LocationIcon } from '~/src/assets';
import { styles as s } from '../styles';

interface IProps {
  loading: boolean;
  //city: City;
  fetchCities: () => void;
  checkCity: () => void;
}

//export function CityContainer(props: IProps) {
//const { loading, city, checkCity, fetchCities } = props;
export function City() {
  const { loading, selectedCity } = useSelector(({ city }: IRootState) => city);

  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchCitiesAsync() {
      dispatch(fetchCities());
    }
    fetchCitiesAsync().then(() => {
      dispatch(checkCity());
    });
  }, [dispatch]);

  if (loading) {
    return null;
  }

  return (
    <TouchableOpacity
      style={s.city}
      onPress={() => RootNavigation.navigate(routes.bathesTab.CityScreen)}>
      <LocationIcon />
      <AppText padding={[3]}>{selectedCity?.name}</AppText>
    </TouchableOpacity>
  );
}

/* const CityConnected = connect(
  ({ city }: IRootState) => ({
    loading: city.loading,
    city: city.selectedCity,
  }),
  {
    fetchCities: fetchCitiesAction,
    checkCity: checkCityAction,
  },
)(CityContainer);

export { CityConnected as City };
 */
