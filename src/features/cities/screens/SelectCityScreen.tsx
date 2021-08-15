import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { TouchableOpacity, View, ViewStyle } from 'react-native';
import { AppText, Block } from '~/src/app/common/components/UI';
import { BackButton } from '~/src/app/common/components/BackButton';
import { CitiesList } from './components/CitiesList';
import { IRootState } from '~/src/app/store/rootReducer';
import { checkCity as checkCityAction } from '../store/cityActions';
import { DetectLocation } from './components/DetectLocation';
import { MenuItem } from '~/src/assets';
import { Nearest } from './components/Nearest';
import { City } from '~/src/app/models/city';
import { styles as s } from './styles';

interface IProps {
  selectedCity: City;
  checkCity: () => void;
}

function SelectCityScreenContainer({ selectedCity, checkCity }: IProps) {
  const [showCities, setShowCities] = useState(false);

  useEffect(() => {
    checkCity();
  }, [checkCity]);

  const deg = showCities ? 90 : 0;
  const formStyle: ViewStyle = showCities
    ? { ...s.form, height: '78%' }
    : s.form;

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
            {selectedCity?.name}
          </AppText>
          <MenuItem style={{ transform: [{ rotate: `${deg}deg` }] }} />
        </TouchableOpacity>

        {/* Cities list */}
        {showCities && <CitiesList closeList={() => setShowCities(false)} />}

        <DetectLocation />
      </View>

      <Nearest />
    </Block>
  );
}

const SelectCityScreenConnected = connect(
  ({ city }: IRootState) => ({
    selectedCity: city.selectedCity,
  }),
  {
    checkCity: checkCityAction,
  },
)(SelectCityScreenContainer);

export { SelectCityScreenConnected as SelectCityScreen };
