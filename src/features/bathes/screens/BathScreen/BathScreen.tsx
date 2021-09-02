import React, { useEffect } from 'react';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import {
  clearSelectedBath as clearSelectedBathAction,
  getBath as getBathAction,
} from '~/src/features/bathes/store/bathActions';
import { TouchableOpacity, ScrollView, Linking } from 'react-native';
import { connect } from 'react-redux';
import { AppText, Block, Divider } from '~/src/app/common/components/UI';
import { BathHeader } from './BathHeader';
import { IRootState } from '~/src/app/store/rootReducer';
import AppActivityIndicator from '~/src/app/common/components/AppActivityIndicator';
import {
  IModalState,
  openModal as openModalAction,
} from '~/src/app/common/modals/modalReducer';
import { IBathDetailed, IBather, IMap } from '~/src/app/models/bath';
import { IPersistImages } from '~/src/app/models/persist';
import BathSlider from './BathSlider';
import { formatPhoneNumber, numberWithSpaces } from '~/src/app/utils/system';
import BathBathers from './BathBathers';
import BathSchedule from './BathSchedule';
import { routes } from '~/src/navigation/helpers/routes';
import * as RNav from '~/src/navigation/helpers/RootNavigation';
import { OrderCallIcon } from '~/src/assets';
import { MAX_DISTANCE, sizes } from '~/src/app/common/constants';
//import { MAX_DISTANCE } from '~/src/app/common/constants/common';
/* import {
  //calculateDistance,
  isLatitude,
  isLongitude,
} from '~/src/app/utils/bathUtility'; */
import { styles } from './styles';
import { BathInfrastructure } from './BathInfrastructure';
import { BathInfo } from './BathInfo';
import BathDestinationMap from './BathDestinationMap';
import { Location } from '~/src/app/models/map';
import { isLatitude, isLongitude } from '~/src/app/utils/bathUtility';

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
      <BathBathers bathers={bathers} />
    </Block>
  );
};

const OrderCall: React.FC<{ bath: IBathDetailed }> = ({ bath }) => {
  return (
    <TouchableOpacity
      style={styles.orderCall}
      onPress={() => {
        const orderCallProps = {
          bathId: bath.id,
          bathName: bath.name,
          short_description: bath.short_description,
          bathPhone: bath.phone,
        };
        RNav.navigate(routes.bathesTab.OrderCall, orderCallProps);
      }}>
      <AppText primary medium>
        Заказать звонок
      </AppText>
      <OrderCallIcon width={wp(10)} />
    </TouchableOpacity>
  );
};

const Map: React.FC<{
  location: Location | null;
  bath: IBathDetailed;
  distance: number;
}> = ({ location, bath, distance }) => {
  if (
    location?.lng &&
    bath.latitude &&
    bath.longitude &&
    isLatitude(bath.latitude) &&
    isLongitude(bath.longitude) &&
    distance < MAX_DISTANCE
  ) {
    return (
      <Block style={styles.bathMap}>
        <BathDestinationMap latitude={location.lat} longitude={location.lng} />
      </Block>
    );
  }
  return null;
};

interface IProps {
  loading: boolean;
  selectedBath: IBathDetailed | null;
  persistImages: IPersistImages;
  clearSelectedBath: () => void;
  openModal: (payload: IModalState) => void;
  maps: IMap[];
  location: Location | null;
}

function BathScreenContainer({
  loading,
  selectedBath: bath,
  clearSelectedBath,
  maps,
  location,
}: IProps) {
  useEffect(() => {
    return () => clearSelectedBath();
  }, [clearSelectedBath]);

  if (loading || !bath) {
    return <AppActivityIndicator />;
  }

  const map = maps.find((m) => m.bathId === bath.id);

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
      <BathHeader bath={bath} distance={map?.distance || 0} />
      <Block margin={[3, BASE, 1.2]}>
        <Phone phone={bath.phone} />
        <Price price={bath.price} />
        <BathSchedule schedule={bath.schedule} />
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
      <AppText margin={[1, BASE]} golder>
        Адрес и инфраструктура
      </AppText>
      <Map bath={bath} distance={map?.distance || 0} location={location} />
      <AppText style={styles.address} padding={[2.5, BASE * 1.3]} tag>
        <AppText golder tag>{`${bath.city_name}  `}</AppText>
        {bath.address}
      </AppText>
      <Block margin={[1, BASE, 10]}>
        <BathInfrastructure bath={bath} />
        <Divider color="#242424" />
        <BathInfo bath={bath} />
        <OrderCall bath={bath} />
      </Block>
    </ScrollView>
  );
}

const BathScreenConnected = connect(
  ({ bath, persist, map }: IRootState) => ({
    loading: bath.loadingSelectBath,
    selectedBath: bath.selectedBath,
    persistImages: persist.image,
    maps: bath.maps,
    location: map.location,
  }),
  {
    getBath: getBathAction,
    clearSelectedBath: clearSelectedBathAction,
    openModal: openModalAction,
  },
)(BathScreenContainer);

export { BathScreenConnected as BathScreen };
