import React, { useCallback, useEffect, useState } from 'react';
import { ParamListBase, Route, useFocusEffect } from '@react-navigation/native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import {
  clearSelectedBath as clearSelectedBathAction,
  getBath as getBathAction,
} from '~/src/features/bathes/store/bathActions';
import { TouchableOpacity, ScrollView, Linking } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { connect } from 'react-redux';
import { AppText, Block } from '~/src/app/common/components/UI';
import BathDestinationMap from './BathDestinationMap';
import routes from '~/src/navigation/helpers/routes';
import { SchedulerIcon } from '~/src/assets';
import BathHeader from './BathHeader';
import { IRootState } from '~/src/app/store/rootReducer';
import AppActivityIndicator from '~/src/app/common/components/AppActivityIndicator';
import {
  nonTransparentHeader as nonTransparentHeaderAction,
  transparentHeader as transparentHeaderAction,
} from '~/src/app/store/system/systemActions';
import { IBathDetailed } from '~/src/app/models/bath';
import { sizes } from '~/src/app/common/constants';
import { styles } from './styles';
import { IPersistImages } from '~/src/app/models/persist';
import BathSlider from './BathSlider';
import { formatPhoneNumber, numberWithSpaces } from '~/src/app/utils/system';
import BathBathers from './BathBathers';
import BathInfrastructure from './BathInfrastructure';

interface IProps {
  route: Route<string, object | undefined>;
  navigation: StackNavigationProp<ParamListBase>;
  // state
  loading: boolean;
  selectedBath: IBathDetailed | null;
  persistImages: IPersistImages;
  getBath: (bathId: number) => void;
  clearSelectedBath: () => void;
  transparentHeader: () => void;
  nonTransparentHeader: () => void;
}

interface IParams {
  id: number;
  latitude: number;
  longitude: number;
  distance: number;
}

function BathScreenContainer({
  loading,
  selectedBath,
  persistImages,
  getBath,
  clearSelectedBath,
  route,
  navigation,
  transparentHeader,
  nonTransparentHeader,
}: IProps) {
  const bathParams: IParams | undefined = (route?.params || {}) as IParams;
  const {
    name,
    short_description,
    address,
    rating,
    image,
    price,
    description,
    photos,
    zones,
    services,
    bathers,
    has_hotel,
    hotel_address,
    has_laundry,
    laundry_address,
    has_parking,
    parking_address,
  } = selectedBath || {};
  const headBath = { name, short_description, address, rating, image };
  const infastructureBath = {
    has_hotel,
    hotel_address,
    has_laundry,
    laundry_address,
    has_parking,
    parking_address,
  };

  infastructureBath.has_hotel = true;
  infastructureBath.hotel_address = 'Metropliks, Chita address 25';
  infastructureBath.has_laundry = true;
  infastructureBath.laundry_address = 'Metropliks, Chita address 25';
  infastructureBath.has_parking = true;
  infastructureBath.parking_address = 'Metropliks, Chita address 25';

  //__DEV__ && console.log('[BathScreen]', bathParams);

  useFocusEffect(() => {
    transparentHeader();
  });

  // Выбираем баню, проверяем если уже полученная ранее информация о бане
  useEffect(() => {
    if (!selectedBath) {
      console.log('[BathScreen/useEffect] getBath(1010)');
      getBath(1010); // delete
    }
    //getBath(bathParams.id); // delete
  }, [bathParams.id, getBath, selectedBath]);

  // Снять выделения бани
  useEffect(() => {
    return function cleanup() {
      console.log('[BathScreen]/ clearSelectedBath');
      //clearSelectedBath(); // delete comment
    };
  }, [clearSelectedBath]);

  function handleOpenDestinationMap() {
    navigation.navigate(routes.bathesTab.DestinationMap, { ...bathParams });
  }

  function callPhone(_phone: string) {
    Linking.openURL(`tel:${_phone}`);
  }

  let map = null;
  const { latitude = null, longitude = null } = bathParams || {};

  if (latitude && longitude) {
    map = (
      <TouchableOpacity style={styles.bathMap} onPress={handleOpenDestinationMap}>
        <BathDestinationMap latitude={latitude} longitude={longitude} />
      </TouchableOpacity>
    );
  }

  if (loading || !selectedBath) {
    return <AppActivityIndicator />;
  }

  return (
    <ScrollView style={styles.scrollView}>
      {/* Заголовок */}
      <BathHeader
        distance={bathParams?.distance}
        navigation={navigation}
        headBath={headBath}
        persistImages={persistImages}
      />
      <Block margin={[3, sizes.offset.base, 1.2]}>
        {/* Инфраструктура */}
        <BathInfrastructure infastructureBath={infastructureBath} />
        {/* Стоймость */}
        <Block style={styles.goldBorder} center row>
          <AppText medium>{numberWithSpaces(price || 0)}</AppText>
          <AppText golder medium tag>
            {' / час'}
          </AppText>
        </Block>
        {/* Телефон */}
        <TouchableOpacity style={styles.goldBorder} onPress={callPhone.bind(null, '89143528288')}>
          <AppText golder>{formatPhoneNumber('79143528288')}</AppText>
        </TouchableOpacity>
        {/* Разсписание */}
        <Block style={styles.goldBorder} center row>
          <SchedulerIcon />
          <AppText golder medium tag>
            {'  круглосуточно'}
          </AppText>
        </Block>
        {/* Описание */}
        <Block margin={[1, 0, 0]}>
          <AppText height={18} tag light>
            {description}
          </AppText>
        </Block>
        {/* Зоны */}
        <AppText margin={[1, 0]} golder>
          Зоны
        </AppText>
        <Block row wrap>
          {zones?.map((zone: string, index: number) => (
            <AppText key={`item-${index}`} style={styles.element} tag>
              {zone}
            </AppText>
          ))}
        </Block>
        {/* Сервис */}
        <AppText margin={[1, 0]} golder>
          Сервис
        </AppText>
        <Block row wrap>
          {services?.map((zone: string, index: number) => (
            <AppText key={`item-${index}`} style={styles.element} tag>
              {zone}
            </AppText>
          ))}
        </Block>
      </Block>
      {/* Фото */}
      {photos && photos?.length > 0 && (
        <>
          <AppText margin={[0, sizes.offset.base]} golder>
            Фото
          </AppText>
          <BathSlider navigation={navigation} photos={photos} persistImages={persistImages} />
        </>
      )}
      {/* Банщики */}
      <Block margin={[0, sizes.offset.base]}>
        {bathers && bathers.length && (
          <>
            <AppText margin={[1, 0]} golder>
              Банщики
            </AppText>
            <BathBathers bathers={bathers} persistImages={persistImages} />
          </>
        )}
      </Block>
    </ScrollView>
  );
}

const BathScreenConnected = connect(
  ({ bath, system, persist }: IRootState) => ({
    connection: system.connection,
    loading: bath.loadingSelectBath,
    selectedBath: bath.selectedBath,
    persistImages: persist.image,
  }),
  {
    getBath: getBathAction,
    clearSelectedBath: clearSelectedBathAction,
    transparentHeader: transparentHeaderAction,
    nonTransparentHeader: nonTransparentHeaderAction,
    //openModal: openModalAction,
  },
)(BathScreenContainer);

export { BathScreenConnected as BathScreen };
