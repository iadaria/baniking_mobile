import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { colors } from '../../constants';
import { AppText } from './AppText';
import { Block } from './Block';

enum Step {
  Achived,
  Current,
  Disable,
}

const Caption = (props) => {
  const { color } = props;
  return (
    <Block {...props} style={styles.caption} debug>
      <AppText trajan center size={2.5}>
        ПРЕТОР
      </AppText>
      <AppText center size={3.5}>
        5%
      </AppText>
      <AppText center size={3}>
        скидка
      </AppText>
    </Block>
  );
};

const ProgressBar = (props) => {
  const { bgcolor, completed } = props;

  const steps = [
    { completed: 0, step: Step.Achived },
    { completed: 33.3, step: Step.Current },
    { completed: 66.66, step: Step.Disable },
    { completed: 100, step: Step.Disable },
  ];

  const completedStyle = {
    width: `${completed}%`,
    backgroundColor: bgcolor,
  };

  return (
    <View style={styles.containerStyles}>
      <View style={[styles.fillerStyles, completedStyle]}>
        {/* <Text style={styles.labelStyles}>{`${completed}%`}</Text> */}
      </View>
      <Block style={styles.steps} row>
        {steps.map(({ completed, step }, index: number) => {
          const offer = index === 0 ? 0 : 70 / 3 - 4;
          const color = {
            borderColor: [Step.Achived, Step.Current].includes(step) ? colors.secondary : colors.progress.disable,
          };
          return (
            <Block key={`key-${completed}`} style={styles.step} margin={[0, 0, 0, offer]}>
              <Block style={[styles.achievedStep, color]} />
              {step === Step.Current && <Block style={styles.currentStep} />}
              <Caption style={{ color }} />
            </Block>
          );
        })}
      </Block>

      {/*
          <Block style={styles.step} debug>
            <Block style={styles.achievedStep} />
            <Block style={styles.currentStep} />
          </Block>
        */}
    </View>
  );
};

export default ProgressBar;

const styles = StyleSheet.create({
  containerStyles: {
    height: 2,
    width: wp(70),
    backgroundColor: colors.progress.base,
    margin: 10,
    alignSelf: 'center',
  },
  fillerStyles: {
    height: '100%',
    // borderRadius: 'inherit',
    textAlign: 'center',
  },
  steps: {
    position: 'absolute',
    bottom: -5.5,
  },
  step: {
    alignSelf: 'flex-start',
  },
  achievedStep: {
    width: 12,
    height: 12,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: colors.progress.disable,
    backgroundColor: colors.primary,
  },
  currentStep: {
    width: 4,
    height: 4,
    backgroundColor: colors.secondary,
    borderRadius: 50,
    position: 'absolute',
    bottom: 4,
    left: 4,
  },
  labelStyles: {
    padding: 5,
    color: 'white',
    fontWeight: 'bold',
  },
  caption: {
    position: 'absolute',
    width: wp(40),
    left: -wp(18.5),
    top: wp(4),
    textAlign: 'center',
  },
});
