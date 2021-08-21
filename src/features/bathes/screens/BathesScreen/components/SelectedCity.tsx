import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { TouchableOpacity } from 'react-native';
import { AppText } from '~/src/app/common/components/UI';
import { routes } from '~/src/navigation/helpers/routes';
import * as RootNavigation from '~/src/navigation/helpers/RootNavigation';
import { capitalizeFirstLetter } from '~/src/app/utils/string';
import { LocationIcon } from '~/src/assets';
import { City } from '~/src/app/models/city';
import { IRootState } from '~/src/app/store/rootReducer';
import { styles as s } from '../styles';
import { checkCity as checkCityAction } from '~/src/features/cities/store/cityActions';

interface IProps {
  loading: boolean;
  city?: City;
  checkCity: () => void;
}

function SelectedCityContainer({ loading, city, checkCity }: IProps) {
  useEffect(() => {
    checkCity();
  }, [checkCity]);

  if (loading) {
    return null;
  }

  const showName = city ? capitalizeFirstLetter(city?.name) : 'Выберите город';

  return (
    <TouchableOpacity
      style={s.city}
      onPress={() => RootNavigation.navigate(routes.bathesTab.CitiesScreen)}>
      <LocationIcon />
      <AppText padding={[3]}>{showName}</AppText>
    </TouchableOpacity>
  );
}

const SelectedCityConnected = connect(
  ({ city }: IRootState) => ({
    loading: city.loading,
    city: city.selectedCity,
  }),
  {
    checkCity: checkCityAction,
  },
)(SelectedCityContainer);

export { SelectedCityConnected as SelectedCity };
