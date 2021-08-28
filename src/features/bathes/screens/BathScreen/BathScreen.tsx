import React, { useEffect } from 'react';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import {
  clearSelectedBath as clearSelectedBathAction,
  getBath as getBathAction,
} from '~/src/features/bathes/store/bathActions';
import { TouchableOpacity, ScrollView, Linking } from 'react-native';
import { connect } from 'react-redux';
import { AppText, Block, Divider } from '~/src/app/common/components/UI';
//import BathDestinationMap from './BathDestinationMap';
import { BathHeader } from './BathHeader';
import { IRootState } from '~/src/app/store/rootReducer';
import AppActivityIndicator from '~/src/app/common/components/AppActivityIndicator';
/* import {
  nonTransparentHeader as nonTransparentHeaderAction,
  transparentHeader as transparentHeaderAction,
} from '~/src/app/store/system/systemActions'; */
import {
  IModalState,
  openModal as openModalAction,
} from '~/src/app/common/modals/modalReducer';
import { Bath, IBathDetailed, IBather } from '~/src/app/models/bath';
import { IPersistImages } from '~/src/app/models/persist';
import BathSlider from './BathSlider';
import { formatPhoneNumber, numberWithSpaces } from '~/src/app/utils/system';
import BathBathers from './BathBathers';
import BathInfrastructure from './BathInfrastructure';
import BathInfo from './BathInfo';
import BathSchedule from './BathSchedule';
import { routes } from '~/src/navigation/helpers/routes';
import * as RNav from '~/src/navigation/helpers/RootNavigation';
import { OrderCallIcon } from '~/src/assets';
import { sizes } from '~/src/app/common/constants';
//import { MAX_DISTANCE } from '~/src/app/common/constants/common';
/* import {
  //calculateDistance,
  isLatitude,
  isLongitude,
} from '~/src/app/utils/bathUtility'; */
//import { logline } from '~/src/app/utils/debug';
import { styles } from './styles';

const BASE = sizes.offset.base;

const Phone: React.FC<{ phone: string | null }> = ({ phone }) => {
  if (!phone) return null;
  function callPhone(_phone: string) {
    Linking.openURL(`tel:${_phone}`);
  }
  return (
    <TouchableOpacity
      style={styles.goldBorder}
      onPress={callPhone.bind(null, phone)}>
      <AppText golder>Тест {formatPhoneNumber(phone)}</AppText>
    </TouchableOpacity>
  );
};

const Price: React.FC<{ price?: number | null }> = ({ price }) => {
  if (!price) return null;
  return (
    <Block style={styles.goldBorder} center row>
      <AppText medium>{`${numberWithSpaces(price || 0)} \u20BD`}</AppText>
      <AppText golder medium tag>
        {' / час'}
      </AppText>
    </Block>
  );
};

const Zones: React.FC<{ zones: string[] }> = ({ zones }) => {
  if (!zones || zones?.length <= 0) return null;
  return (
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
  );
};

const Services: React.FC<{ services: string[] }> = ({ services }) => {
  if (!services || services?.length <= 0) return null;
  return (
    <>
      <AppText margin={[1, 0]} golder>
        Зоны
      </AppText>
      <Block row wrap>
        {services?.map((service: string, index: number) => (
          <AppText key={`item-${index}`} style={styles.element} tag>
            {service}
          </AppText>
        ))}
      </Block>
    </>
  );
};

const Photos: React.FC<{ photos: string[] }> = ({ photos }) => {
  if (!photos || photos?.length <= 0) return null;
  return (
    <>
      <AppText margin={[0, BASE]} golder>
        Фото
      </AppText>
      <BathSlider photos={photos} />
    </>
  );
};

const Bathers: React.FC<{ bathers: IBather[] }> = ({ bathers }) => {
  if (!bathers || bathers?.length <= 0) return null;
  return (
    <Block margin={[0, BASE]}>
      <AppText margin={[1, 0]} golder>
        Банщики
      </AppText>
      <BathBathers bathers={bathers} persistImages={persistImages} />
    </Block>
  );
};

const OrderCall: React.FC<{ bath: IBathDetailed }> = ({ bath }) => {
  return (<TouchableOpacity
    style={styles.orderCall}
    onPress={() => {
      const orderCallProps = {
        bathId: bath.id,
        bathName: bath.name,
        short_description: bath.short_description,
        bathPhone: bath.phone,
      };
      RNav.navigate(
        routes.bathesTab.OrderCallScreen,
        orderCallProps,
      );
    }}>
    <AppText primary medium>
      Заказать звонок
    </AppText>
    <OrderCallIcon width={wp(10)} />
  </TouchableOpacity>)
}

interface IProps {
  loading: boolean;
  selectedBath: IBathDetailed | null;
  persistImages: IPersistImages;
  clearSelectedBath: () => void;
  openModal: (payload: IModalState) => void;
}

function BathScreenContainer({
  loading,
  selectedBath: bath,
  clearSelectedBath,
}: IProps) {
  useEffect(() => {
    return () => clearSelectedBath();
  }, [clearSelectedBath]);

  if (loading || !bath) {
    return <AppActivityIndicator />;
  }

  let map = null;

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
      <BathHeader distance={/* bathParams?.distance */ 0} />
      <Block margin={[3, BASE, 1.2]}>
        <Phone phone={bath.phone} />
        <Price price={bath.price} />
        <BathSchedule schedule={bath.schedule} />
        {/* Описание */}
        <Block margin={[2, 0, 0]}>
          <AppText height={18} tag light>
            {bath.description}
          </AppText>
        </Block>
        <Zones zones={bath.zones} />
        <Services services={bath.services} />
      </Block>

      <Photos photos={bath.photos} />
      <Bathers bathers={bath.bathers} />
      {/* Адрес и инфраструктура */}
      <AppText margin={[1, BASE]} golder>
        Адрес и инфраструктура
      </AppText>
      {map}
      <AppText style={styles.address} padding={[2.5, BASE * 1.3]} tag>
        <AppText golder tag>{`${bath.city_name}  `}</AppText>
        {bath.address}
      </AppText>
      <Block margin={[1, BASE, 10]}>
        <BathInfrastructure infastructureBath={?} />
        <Divider color="#242424" />
        <BathInfo infoBath={?} />
        <OrderCall bath={bath} />
      </Block>
    </ScrollView>
  );
}

const BathScreenConnected = connect(
  ({ bath, persist }: IRootState) => ({
    loading: bath.loadingSelectBath,
    selectedBath: bath.selectedBath,
    persistImages: persist.image,
  }),
  {
    getBath: getBathAction,
    clearSelectedBath: clearSelectedBathAction,
    //transparentHeader: transparentHeaderAction,
    //nonTransparentHeader: nonTransparentHeaderAction,
    openModal: openModalAction,
  },
)(BathScreenContainer);

export { BathScreenConnected as BathScreen };

/* if (
  bath.latitude &&
  bath.longitude &&
  isLatitude(bath.latitude) &&
  isLongitude(bath.longitude) &&
  bathParams.distance < MAX_DISTANCE
) {
  map = (
    <Block style={styles.bathMap}>
      <BathDestinationMap latitude={latitude} longitude={longitude} />
    </Block>
  );
}
*/

/* infastructureBath.has_hotel = true;
  infastructureBath.hotel_address = 'Metropliks, Chita address 25';
  infastructureBath.has_laundry = true;
  infastructureBath.laundry_address = 'Metropliks, Chita address 25';
  infastructureBath.has_parking = true;
  infastructureBath.parking_address = 'Metropliks, Chita address 25';

  infoBath.history = 'History test';
  infoBath.service = 'service History test';
  infoBath.traditions = 'trad History test';
  infoBath.steam_room = 'steam History test';

  schedule.is_round_the_clock = false;
  schedule.on_mo = 1;
  schedule.mo_hours_from = '10:00';
  schedule.mo_hours_to = '00:00';
  schedule.on_tu = 1;
  schedule.tu_hours_from = '10:00';
  schedule.tu_hours_to = '00:00'; */

/*   const {
    address,
    bathers,
    city_name,
    description,
    features,
    has_hotel,
    has_laundry,
    has_parking,
    history,
    hotel_address,
    id,
    image,
    latitude,
    laundry_address,
    longitude,
    name,
    parking_address,
    photos,
    price,
    rating,
    schedule,
    service,
    services,
    short_description,
    steam_room,
    traditions,
    zones,
  } = selectedBath || { zones: [], services: [], bathers: [], photos: [] };
  const headBath =
    { name, short_description, address, rating, image, latitude, longitude } ||
    {};
  const infastructureBath =
    {
      has_hotel,
      hotel_address,
      has_laundry,
      laundry_address,
      has_parking,
      parking_address,
    } || {};
  const infoBath =
    { description, history, features, service, traditions, steam_room } || {}; */
