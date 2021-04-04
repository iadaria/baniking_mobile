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
import { AppText, Block, Divider } from '~/src/app/common/components/UI';
import BathDestinationMap from './BathDestinationMap';
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
import BathInfo from './BathInfo';

const BASE = sizes.offset.base;

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
    city_name,
    address,
    rating,
    image,
    latitude,
    longitude,
    price,
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
    description,
    history,
    features,
    service,
    traditions,
    steam_room,
    schedule,
  } = selectedBath || {};
  const headBath = { name, short_description, address, rating, image, latitude, longitude };
  const infastructureBath = {
    has_hotel,
    hotel_address,
    has_laundry,
    laundry_address,
    has_parking,
    parking_address,
  };
  const infoBath = { description, history, features, service, traditions, steam_room };

  infastructureBath.has_hotel = true;
  infastructureBath.hotel_address = 'Metropliks, Chita address 25';
  infastructureBath.has_laundry = true;
  infastructureBath.laundry_address = 'Metropliks, Chita address 25';
  infastructureBath.has_parking = true;
  infastructureBath.parking_address = 'Metropliks, Chita address 25';

  infoBath.history = 'History test';
  infoBath.service = 'service History test';
  infoBath.traditions = 'trad History test';
  infoBath.steam_room = 'steam History test';

  // schedule.is_round_the_clock = false;

  //__DEV__ && console.log('[BathScreen]', bathParams);

  useFocusEffect(() => {
    transparentHeader();
    return () => nonTransparentHeader();
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

  function callPhone(_phone: string) {
    Linking.openURL(`tel:${_phone}`);
  }

  let map = null;
  //const { latitude = null, longitude = null } = bathParams || {};

  if (latitude && longitude) {
    map = (
      <Block style={styles.bathMap}>
        <BathDestinationMap latitude={latitude} longitude={longitude} />
      </Block>
    );
  }

  if (loading || !selectedBath) {
    return <AppActivityIndicator />;
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
      {/* Заголовок */}
      <BathHeader
        distance={bathParams?.distance}
        navigation={navigation}
        headBath={headBath}
        persistImages={persistImages}
      />
      <Block margin={[3, BASE, 1.2]}>
        {/* Стоймость */}
        <Block style={styles.goldBorder} center row>
          <AppText medium>{`${numberWithSpaces(price || 0)} \u20BD`}</AppText>
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
          {schedule?.is_round_the_clock && (
            <AppText golder medium tag>
              {'  круглосуточно'}
            </AppText>
          )}
        </Block>
        {/* Описание */}
        <Block margin={[1, 0, 0]}>
          <AppText height={18} tag light>
            {description}
          </AppText>
        </Block>
        {/* Зоны */}
        {zones && zones.length && (
          <>
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
          </>
        )}
        {/* Сервис */}
        {services && services.length && (
          <>
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
          </>
        )}
      </Block>
      {/* Фото */}
      {photos && photos?.length > 0 && (
        <>
          <AppText margin={[0, BASE]} golder>
            Фото
          </AppText>
          <BathSlider navigation={navigation} photos={photos} persistImages={persistImages} />
        </>
      )}
      {/* Банщики */}
      <Block margin={[0, BASE]}>
        {bathers && bathers.length && (
          <>
            <AppText margin={[1, 0]} golder>
              Банщики
            </AppText>
            <BathBathers bathers={bathers} persistImages={persistImages} />
          </>
        )}
      </Block>
      {/* Адрес и инфраструктура */}
      <AppText margin={[1, BASE]} golder>
        Адрес и инфраструктура
      </AppText>
      {map}
      <AppText style={styles.address} padding={[2.5, BASE * 1.3]} tag>
        <AppText golder tag>{`${city_name}  `}</AppText>
        {address}
      </AppText>
      <Block margin={[1, BASE]}>
        <BathInfrastructure infastructureBath={infastructureBath} />
        <Divider color="#242424" />
        {/* Дополнительная информация */}
        <BathInfo infoBath={infoBath} />
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
