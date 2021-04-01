import { ParamListBase } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { ImageBackground, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch } from 'react-redux';
import { Stars } from '~/src/app/common/components/Stars';
import { AppText, Block } from '~/src/app/common/components/UI';
import { colors, sizes } from '~/src/app/common/constants';
import { nonTransparentHeader, transparentHeader } from '~/src/app/store/system/systemActions';
import { getRandomBathImage, isNonRating } from '~/src/app/utils/bathUtility';
import { AppHeader } from './AppHeader';
import { styles } from './styles';

interface IProps {
  distance?: number;
  navigation: StackNavigationProp<ParamListBase>;
}

export default function BathHeader({ distance, navigation }: IProps) {
  const dispatch = useDispatch();
  const [randomImg] = useState(getRandomBathImage());
  const kms = distance && distance > 0 ? (distance / 1000).toFixed(1) : null;

  // Прозрачный заголовок
  useEffect(() => {
    dispatch(transparentHeader());
    return () => {
      dispatch(nonTransparentHeader());
    };
  }, [dispatch]);

  return (
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
  );
}
