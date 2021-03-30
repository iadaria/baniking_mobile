import React, { useState } from 'react';
import { ParamListBase, Route } from '@react-navigation/native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { IBath } from '~/src/app/models/bath';
import { AppText, Block } from '~/src/app/common/components/UI';
import BathDestinationMap from './BathDestinationMap';
import { styles } from './styles';
import { ImageBackground, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import routes from '~/src/navigation/helpers/routes';
import { getRandomBathImage } from '~/src/app/utils/bathUtility';

export interface IProps {
  route: Route<string, object | undefined>;
  navigation: StackNavigationProp<ParamListBase>;
}

export function BathScreen({ route, navigation }: IProps) {
  const [randomImg] = useState(getRandomBathImage());
  const bath: IBath | undefined = route?.params as IBath;

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
    <Block full debug>
      <ImageBackground source={randomImg} style={{ flex: 0.5, resizeMode: 'contain' }}>
        <AppText>Test</AppText>
        <AppText>Test</AppText>
        <AppText>Test</AppText>
        <AppText>Test</AppText>
        <AppText>Test</AppText>
        <AppText>Test</AppText>
      </ImageBackground>
    </Block>
  );

  /* return (
    <Block full debug>
      {map}
    </Block>
  );
} */
}
