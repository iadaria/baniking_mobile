import React from 'react';
import { StyleSheet, View } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Level } from '~/src/app/models/profile';
import { IStep, Step } from '~/src/app/utils/meetings';
import { generateSteps } from '~/src/app/utils/meetings';
import { colors } from '~/src/app/common/constants/colors';
import { AppText } from '../AppText';
import { Block } from '../Block';

interface ICaptionProps {
  level: Level;
  discaunt: number;
  color: string;
}

const Caption = ({ level, discaunt, color }: ICaptionProps) => {
  return (
    <Block style={styles.caption}>
      <AppText trajan center size={2.5} color={color} transform="uppercase">
        {level}
      </AppText>
      <AppText style={{ marginTop: 4 }} medium center size={3.5} color={color}>
        {discaunt}%
      </AppText>
      <AppText center size={3} color={color} transform="lowercase">
        Скидка
      </AppText>
    </Block>
  );
};

interface IProgressBarProps {
  completed: number;
}

export function AppProgress(props: IProgressBarProps) {
  const { completed } = props;

  // console.log('[AppProgress] steps', JSON.stringify(generateSteps(completed), null, 2));

  const steps: IStep[] = generateSteps(completed);

  /* const steps: IStep[] = [
    { progress: 0, discaunt: 5, step: Step.Achived, level: Level.Praetor },
    { progress: 33.3, discaunt: 10, step: Step.Current, level: Level.Magister },
    { progress: 66.66, discaunt: 25, step: Step.Disable, level: Level.Consul },
    { progress: 100, discaunt: 35, step: Step.Disable, level: Level.Emperor },
  ]; */

  const completedStyle = {
    width: `${completed}%`,
  };

  return (
    <View style={styles.containerStyles}>
      <View style={[styles.fillerStyles, completedStyle]}>
        {/* <Text style={styles.labelStyles}>{`${completed}%`}</Text> */}
      </View>
      <Block style={styles.steps} row>
        {steps.map(({ progress, discaunt, step, level }: IStep, index: number) => {
          const offer = index === 0 ? 0 : 70 / 3 - 4;
          const color = [Step.Achived, Step.Current].includes(step) ? colors.secondary : colors.progress.disable;
          const captionColor = step === Step.Current ? colors.progress.caption : colors.progress.disable;

          return (
            <Block key={`key-${progress}`} style={styles.step} margin={[0, 0, 0, offer]}>
              <Block style={[styles.achievedStep, { borderColor: color }]} />
              {step === Step.Current && <Block style={styles.currentStep} />}
              <Caption color={captionColor} level={level} discaunt={discaunt} />
            </Block>
          );
        })}
      </Block>
    </View>
  );
}

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
    textAlign: 'center',
    backgroundColor: colors.secondary,
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
