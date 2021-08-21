import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { TouchableOpacity, View, ViewStyle } from 'react-native';
import { AppText, Block } from '~/src/app/common/components/UI';
import { BackButton } from '~/src/app/common/components/BackButton';
import { CitiesList } from './components/CitiesList';
import { IRootState } from '~/src/app/store/rootReducer';
import { MenuItem } from '~/src/assets';
//import { Nearest } from './components/Nearest';
import { City } from '~/src/app/models/city';
import { styles as s } from './styles';
import { capitalizeFirstLetter } from '~/src/app/utils/string';
import { DetectLocation } from './components/DetectLocation';

interface IProps {
  persistCityName: string | null;
  selectedCity?: City;
}

function SelectCityScreenContainer({ persistCityName, selectedCity }: IProps) {
  const [showCities, setShowCities] = useState(false);

  const checkCity = useCallback(() => {
    if (persistCityName) {

    }
  }, []);

  useEffect(() => {

  }, []);

  const deg = showCities ? 90 : 0;
  const formStyle: ViewStyle = showCities
    ? { ...s.form, height: '78%' }
    : s.form;

  const showSelectedCity = selectedCity
    ? capitalizeFirstLetter(selectedCity.name)
    : '';

  return (
    <Block margin={6} full>
      <BackButton screen="BathesScreen" />

      <AppText margin={[4, 0]} h1>
        Город
      </AppText>

      {/* Title */}
      <View style={formStyle}>
        <AppText primary medium>
          Выберите город из списка
        </AppText>

        {/* Selected city name */}
        <TouchableOpacity
          style={s.item}
          onPress={() => setShowCities(!showCities)}>
          <AppText primary semibold size={4}>
            {showSelectedCity}
          </AppText>
          <MenuItem style={{ transform: [{ rotate: `${deg}deg` }] }} />
        </TouchableOpacity>

        {/* Cities list */}
        {showCities && <CitiesList closeList={() => setShowCities(false)} />}

        <DetectLocation />
      </View>

      {/* <Nearest /> */}
    </Block>
  );
}

const SelectCityScreenConnected = connect(
  ({ city, persist }: IRootState) => ({
    persistCityName: persist.selectedCityName,
    selectedCity: city.selectedCity,
  }),
  {
  },
)(SelectCityScreenContainer);

export { SelectCityScreenConnected as SelectCityScreen };
