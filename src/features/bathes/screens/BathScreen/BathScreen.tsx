import React, { useEffect, useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { ParamListBase, Route } from '@react-navigation/native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useDispatch } from 'react-redux';
import { AppText, Block } from '~/src/app/common/components/UI';
import BathDestinationMap from './BathDestinationMap';
import routes from '~/src/navigation/helpers/routes';
import { getRandomBathImage, isNonRating } from '~/src/app/utils/bathUtility';
import { nonTransparentHeader, transparentHeader } from '~/src/app/store/system/systemActions';
import { AppHeader } from './AppHeader';
import { Stars } from '~/src/app/common/components/Stars';
import { SchedulerIcon } from '~/src/assets';
import { colors, sizes } from '~/src/app/common/constants';
import { styles } from './styles';

export interface IProps {
  route: Route<string, object | undefined>;
  navigation: StackNavigationProp<ParamListBase>;
}

interface IParams {
  id: number;
  latitude: number;
  longitude: number;
  distance: number;
}

export function BathScreen({ route, navigation }: IProps) {
  const dispatch = useDispatch();
  const [randomImg] = useState(getRandomBathImage());
  const bath: IParams | undefined = (route?.params || {}) as IParams;
  const kms = bath.distance > 0 ? (bath.distance / 1000).toFixed(1) : null;

  __DEV__ && console.log('[BathScreen]', bath);

  useEffect(() => {
    dispatch(transparentHeader());
    return () => {
      dispatch(nonTransparentHeader());
    };
  }, [dispatch]);

  function handleOpenDestinationMap() {
    navigation.navigate(routes.bathesTab.DestinationMap, { ...bath });
  }

  let map = null;
  const { latitude = null, longitude = null } = bath || {};
  if (latitude && longitude) {
    map = (
      <TouchableOpacity style={styles.bathMap} onPress={handleOpenDestinationMap}>
        <BathDestinationMap latitude={latitude} longitude={longitude} />
      </TouchableOpacity>
    );
  }
  return (
    // Заголовок
    <ScrollView style={styles.scrollView}>
      <ImageBackground source={randomImg} style={styles.bathBackground}>
        <LinearGradient
          colors={[colors.primary, 'rgba(23,23,25, 0.1)']}
          start={{ x: 0.1, y: 0 }}
          end={{ x: 0.7, y: 0 }}
          style={styles.gradient}>
          <AppHeader navigation={navigation} onPress={() => dispatch(nonTransparentHeader())} />
          <Block padding={[sizes.offset.base, sizes.offset.base, 0]}>
            <AppText h1>Баня</AppText>
            <AppText margin={[8, 0, 0]} trajan h1>
              NORDIK SPA & LOUNGE
            </AppText>
            <AppText margin={[1, 0, 0]} secondary>
              Нордская баня
            </AppText>
            {!isNonRating(5) ? <Stars rating={5} /> : <Block style={{ height: wp(5) }} />}
          </Block>
          <Block margin={[0, 0, 3, 0]} padding={[0, sizes.offset.base]} center row>
            <AppText tag>г.Москва ул.Византийская, д.5</AppText>
            <TouchableOpacity style={styles.route}>
              <AppText medium secondary>
                {kms && `${kms} км `}
              </AppText>
              <AppText primary tag>
                маршрут
              </AppText>
            </TouchableOpacity>
          </Block>
        </LinearGradient>
      </ImageBackground>
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

  /* return (
    <Block full debug>
      {map}
    </Block>
  );
} */
}
