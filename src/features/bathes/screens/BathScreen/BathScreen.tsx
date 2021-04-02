import React, { useEffect, useState } from 'react';
import { ParamListBase, Route } from '@react-navigation/native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import {
  clearSelectedBath as clearSelectedBathAction,
  getBath as getBathAction,
} from '~/src/features/bathes/store/bathActions';
import { TouchableOpacity, ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { connect, useDispatch } from 'react-redux';
import { AppText, Block } from '~/src/app/common/components/UI';
import BathDestinationMap from './BathDestinationMap';
import routes from '~/src/navigation/helpers/routes';
import { SchedulerIcon } from '~/src/assets';
import BathHeader from './BathHeader';
import { IRootState } from '~/src/app/store/rootReducer';
import AppActivityIndicator from '~/src/app/common/components/AppActivityIndicator';
import { IBathDetailed } from '~/src/app/models/bath';
import { sizes } from '~/src/app/common/constants';
import { styles } from './styles';
import { IPersistImages } from '~/src/app/models/persist';
import { getRandomBathImage, isCachedImage } from '~/src/app/utils/bathUtility';
import BathSlider from './BathSlider';

export interface IProps {
  route: Route<string, object | undefined>;
  navigation: StackNavigationProp<ParamListBase>;
  // state
  loading: boolean;
  selectedBath: IBathDetailed | null;
  persistImages: IPersistImages;
  getBath: (bathId: number) => void;
  clearSelectedBath: () => void;
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
}: IProps) {
  const [cachedMainImage, setCachedMainImage] = useState<object>(getRandomBathImage());
  const bathParams: IParams | undefined = (route?.params || {}) as IParams;
  const { name, short_description, address, rating, image, price, description } = selectedBath || {};
  const headBath = { name, short_description, address, rating, image };

  //__DEV__ && console.log('[BathScreen]', bathParams);

  useEffect(() => {
    // Проверяем если уже полученная ранее информация о бане
    if (!selectedBath) {
      getBath(1010); // delete
    }
    return function () {
      clearSelectedBath;
    };
    //getBath(bathParams.id); // delete
  }, [bathParams.id, clearSelectedBath, getBath, selectedBath]);

  useEffect(() => {
    if (!image) {
      return;
    }
    const [isCached, indexOf] = isCachedImage(image, persistImages.set);
    console.log('[BathScreen/cached]', image, indexOf);
    if (isCached) {
      setCachedMainImage({ uri: persistImages.images[indexOf].path });
    }
  }, [image, persistImages]);

  function handleOpenDestinationMap() {
    navigation.navigate(routes.bathesTab.DestinationMap, { ...bathParams });
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
        cachedMainImage={cachedMainImage}
      />
      <BathSlider />
      {/* Стоймость */}
      <Block style={styles.goldBorder} margin={[3, sizes.offset.base, 1.2]} center row>
        <AppText medium>{price}</AppText>
        <AppText secondary medium tag>
          {' / час'}
        </AppText>
      </Block>
      {/* Разсписание */}
      <Block style={styles.goldBorder} margin={[0, sizes.offset.base, 1.2]} center row>
        <SchedulerIcon />
        <AppText secondary medium tag>
          {'  круглосуточно'}
        </AppText>
      </Block>
      {/* Описание */}
      <Block margin={[0, sizes.offset.base]}>
        <AppText height={15} tag light>
          {description}
        </AppText>
      </Block>
      {/* Зоны */}
      {/* Сервис */}
      {/* Фото */}
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
    //persistImage: persistImageAction,
    //openModal: openModalAction,
  },
)(BathScreenContainer);

export { BathScreenConnected as BathScreen };
