import React, { useEffect, useState } from 'react';
import { ParamListBase, Route } from '@react-navigation/native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { getBath as getBathAction } from '~/src/features/bathes/store/bathActions';
import { TouchableOpacity, ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { connect, useDispatch } from 'react-redux';
import { AppText, Block } from '~/src/app/common/components/UI';
import BathDestinationMap from './BathDestinationMap';
import routes from '~/src/navigation/helpers/routes';
import { SchedulerIcon } from '~/src/assets';
import { sizes } from '~/src/app/common/constants';
import { styles } from './styles';
import BathHeader from './BathHeader';
import { IRootState } from '~/src/app/store/rootReducer';

export interface IProps {
  route: Route<string, object | undefined>;
  navigation: StackNavigationProp<ParamListBase>;
  getBath: (bathId: number) => void;
}

interface IParams {
  id: number;
  latitude: number;
  longitude: number;
  distance: number;
}

function BathScreenContainer({ getBath, route, navigation }: IProps) {
  const dispatch = useDispatch();
  const bathParams: IParams | undefined = (route?.params || {}) as IParams;

  //__DEV__ && console.log('[BathScreen]', bathParams);

  useEffect(() => {
    // Проверяем если уже полученная ранее информация о бане
    //const oldBathDetailed =
    getBath(1010); // delete
    //getBath(bathParams.id); // delete
  }, [bathParams.id, getBath]);

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
  return (
    <ScrollView style={styles.scrollView}>
      {/* Заголовок */}
      <BathHeader distance={bathParams?.distance} navigation={navigation} />
      {/* Стоймость */}
      <Block style={styles.goldBorder} margin={[3, sizes.offset.base, 1.2]} center row>
        <AppText medium>8 000</AppText>
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
        <AppText height={15} tag>
          Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical
          Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at
          Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a
          Lorem Ipsum passage, and going through the cites of the word in classical literature.
        </AppText>
      </Block>
      {/* Зоны */}
      {/* Сервис */}
      {/* Фото */}
    </ScrollView>
  );
}

const BathScreenConnected = connect(
  ({ bath, system }: IRootState) => ({
    connection: system.connection,
    loading: bath.loading,
  }),
  {
    getBath: getBathAction,
    //persistImage: persistImageAction,
    //openModal: openModalAction,
  },
)(BathScreenContainer);

export { BathScreenConnected as BathScreen };
