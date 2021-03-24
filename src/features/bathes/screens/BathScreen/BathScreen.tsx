import React, { useEffect } from 'react';
import { ParamListBase, Route } from '@react-navigation/native';
import { IBath } from '~/src/app/models/bath';
import { Block } from '~/src/app/common/components/UI';
import BathDestinationMap from './BathDestinationMap';
import { styles } from './styles';
import { TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import routes from '~/src/navigation/helpers/routes';

export interface IProps {
  route: Route<string, object | undefined>;
  navigation: StackNavigationProp<ParamListBase>;
}

export function BathScreen({ route, navigation }: IProps) {
  const bath: IBath | undefined = route?.params as IBath;

  function handleOpenDestinationMap() {
    navigation.navigate(routes.bathesTab.DestinationMap, { ...bath });
  }

  let map = null;
  const { latitude = null, longitude = null } = bath;
  if (latitude && longitude) {
    map = (
      <TouchableOpacity style={styles.bathMap} onPress={handleOpenDestinationMap}>
        <BathDestinationMap latitude={latitude} longitude={longitude} />
      </TouchableOpacity>
    );
  }

  return (
    <Block full debug>
      {map}
    </Block>
  );
}
