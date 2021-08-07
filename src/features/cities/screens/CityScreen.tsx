import React, { useState } from 'react';
import { TouchableOpacity, View, ViewStyle } from 'react-native';
import { useSelector } from 'react-redux';
import { AppButton, AppText, Block } from '~/src/app/common/components/UI';
import { BackButton } from '~/src/app/common/components/BackButton';
import { CitiesList } from './components/CitiesList';
import { IRootState } from '~/src/app/store/rootReducer';
import { MenuItem, PageIcon } from '~/src/assets';
import { styles as s } from './styles';

export function CityScreen() {
  const [showCities, setShowCities] = useState(false);

  const { selectedCity } = useSelector(({ city }: IRootState) => city);

  function handleOpenCities() {
    setShowCities(!showCities);
  }

  const deg = showCities ? 90 : 0;
  const formStyle: ViewStyle = showCities
    ? { ...s.form, height: '72%' }
    : s.form;

  return (
    <Block margin={6} full>
      <BackButton screen="BathesScreen" />

      <AppText margin={[4, 0]} h1>
        Город
      </AppText>
      {/* Form */}
      <View style={formStyle}>
        <AppText primary medium>
          Выберите город из списка
        </AppText>

        <TouchableOpacity style={s.item} onPress={handleOpenCities}>
          <AppText primary semibold size={4}>
            {selectedCity?.name}
          </AppText>
          <MenuItem style={{ transform: [{ rotate: `${deg}deg` }] }} />
        </TouchableOpacity>

        {showCities && <CitiesList closeList={() => setShowCities(false)} />}

        <AppButton margin={[2, 0, 0]}>
          <AppText medium center size={4}>
            Определить мое местоположение
          </AppText>
        </AppButton>
      </View>

      <TouchableOpacity style={s.nealy}>
        <AppText primary medium>
          Показать все бани рядом со мной
        </AppText>
        <PageIcon />
      </TouchableOpacity>
    </Block>
  );
}
