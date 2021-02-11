import React from 'react';
import { Switch, Platform, View } from 'react-native';
import { IUiSwitch } from '../../../models/switch';
import { colors } from '~/src/app/common/constants';

const GRAY_COLOR = 'rgba(168, 182, 200, 0.30)';

export function AppSwitch(props: IUiSwitch) {
  const { value, ...otherProps } = props;
  let thumbColor: undefined | string;

  if (Platform.OS === 'android') {
    thumbColor = GRAY_COLOR;
    if (value) {
      thumbColor = colors.secondary;
    }
  }

  return (
    <View style={{ justifyContent: 'center', alignSelf: 'flex-start'}}>
      <Switch
        thumbColor={thumbColor}
        ios_backgroundColor={GRAY_COLOR}
        trackColor={{
          false: GRAY_COLOR,
          true: colors.secondary,
        }}
        value={value}
        style={{
          alignSelf: 'flex-start',
          transform: [
            { scaleX: 0.8 },
            { scaleY: 0.8 },
            { translateX: -10 },
            { translateY: -10 },
          ],
        }}
        {...otherProps}
      />
    </View>
  );
}
