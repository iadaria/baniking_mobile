import React, { useState } from 'react';
import { Platform, View, StyleSheet } from 'react-native';
import { IUiSwitch } from '~/src/app/models/ui';
import { colors } from '~/src/app/common/constants';
import { Switch } from 'react-native-switch';

const GRAY_COLOR = 'rgba(168, 182, 200, 0.30)';

// https://www.npmjs.com/package/react-native-switch

export function AppSwitch(props: IUiSwitch) {
  const [isEnabled, setIsEnabled] = useState(false);
  const { value, onPress, ...otherProps } = props;

  const toggleSwitch = () => {
    try {
      setIsEnabled((previousState: boolean) => {
        const newState = !previousState;

        newState && onPress && onPress();

        return newState;
      });
    } catch (e) {
      console.log('[AppSwitch/toggleSwitch]', e);
    }
  };

  return (
    <View style={{ justifyContent: 'center', alignSelf: 'flex-start' }}>
      <Switch
        // thumbColor={thumbColor}
        // ios_backgroundColor={GRAY_COLOR}
        barHeight={29}
        activeText=""
        inActiveText=""
        trackColor={{
          false: GRAY_COLOR,
          true: colors.secondary,
        }}
        changeValueImmediately={true}
        circleBorderWidth={0}
        circleSize={24}
        switchRightPx={4}
        switchBorderRadius={30}
        switchLeftPx={4}
        backgroundInactive={colors.text.base}
        backgroundActive={colors.secondary}
        circleActiveColor={'#FFFFFF'}
        circleInActiveColor={'#E5E5E5'}
        onValueChange={toggleSwitch}
        value={isEnabled}
        anim
        // value={value}
        // style={styles.switcher}
        {...otherProps}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  switcher: {
    borderColor: 'red',
    borderWidth: 1,
    // height: 30,
    alignSelf: 'flex-start',
    transform: [{ scaleX: 1 }, { scaleY: 1 }, { translateX: -10 }, { translateY: -10 }],
  },
});
