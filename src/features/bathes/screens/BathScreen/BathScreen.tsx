import React, { useEffect, useState } from 'react';
import { ParamListBase, Route } from '@react-navigation/native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { IBath } from '~/src/app/models/bath';
import { AppText, Block } from '~/src/app/common/components/UI';
import BathDestinationMap from './BathDestinationMap';
import { styles } from './styles';
import { ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import routes from '~/src/navigation/helpers/routes';
import { getRandomBathImage } from '~/src/app/utils/bathUtility';
import { useDispatch } from 'react-redux';
import { nonTransparentHeader, transparentHeader } from '~/src/app/store/system/systemActions';
import { AppHeader } from './AppHeader';

export interface IProps {
  route: Route<string, object | undefined>;
  navigation: StackNavigationProp<ParamListBase>;
}

export function BathScreen({ route, navigation }: IProps) {
  const dispatch = useDispatch();
  const [randomImg] = useState(getRandomBathImage());
  const bath: IBath | undefined = route?.params as IBath;

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
    // <ImageBackground source={randomImg} style={{ flex: 1, resizeMode: 'cover' }}>
    <ScrollView style={styles.scrollView}>
      <ImageBackground source={randomImg} style={styles.bathBackground}>
        <AppHeader navigation={navigation} onPress={() => dispatch(nonTransparentHeader())} />
        <Block base>
          <AppText h1>Баня</AppText>
          <AppText>NORDIK SPA & LOUNGE</AppText>
          <AppText>Test</AppText>
          <AppText>Test</AppText>
          <AppText>Test</AppText>
          <AppText>Test</AppText>
        </Block>
      </ImageBackground>
      <Block base>
        <AppText margin={[10]}>Test</AppText>
        <AppText margin={[10]}>Test</AppText>
        <AppText margin={[10]}>Test</AppText>
        <AppText margin={[10]}>Test</AppText>
        <AppText margin={[10]}>Test</AppText>
      </Block>
    </ScrollView>
  );

  /* return (
    <Block full debug>
      {map}
    </Block>
  );
} */
}
