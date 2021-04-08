import React from 'react';
import { ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { ParamListBase } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { acceptFilter as acceptFilterAction } from '~/src/features/bathes/store/bathActions';
import { pullBackward as pullBackwardAction } from '~/src/app/store/system/systemActions';
import { AppButton, AppText, Block } from '~/src/app/common/components/UI';
import { IRootState } from '~/src/app/store/rootReducer';
import { styles } from './styles';
import { TPartBathParams } from '~/src/app/models/bath';

interface IProps {
  navigation: StackNavigationProp<ParamListBase>;
  filterParams: TPartBathParams;
  filterCount: number;

  filterLoading: boolean;
  totalFilteredBathes: number;
  backwardStack: string[];
  getBathParamsVariety: () => void;
  pullBackward: () => void;
  acceptFilter: ({ filterParams, filterCount }: { filterParams: TPartBathParams; filterCount: number }) => void;
}

function FilterAcceptButtonContainer({
  navigation,
  filterParams,
  filterCount,
  filterLoading,
  totalFilteredBathes,
  backwardStack,
  acceptFilter,
  pullBackward,
}: IProps) {
  function handleAcceptFilter() {
    const prevScreen = backwardStack[backwardStack.length - 1];
    acceptFilter({ filterParams, filterCount });
    navigation.navigate(prevScreen);
    pullBackward();
  }

  return (
    <AppButton style={[styles.filterButton]} margin={[3, 0, 8]} onPress={handleAcceptFilter}>
      <AppText padding={1.5} center semibold header>
        {'Показать '}
      </AppText>
      <Block middle center>
        {filterLoading ? (
          <ActivityIndicator size="small" color="white" />
        ) : (
          <AppText semibold header>
            {totalFilteredBathes}
          </AppText>
        )}
      </Block>
      <AppText padding={1.5} center semibold header>
        {' предложения'}
      </AppText>
    </AppButton>
  );
}

const FilterAcceptButtonConnected = connect(
  ({ bath, system }: IRootState) => ({
    totalFilteredBathes: bath.totalFilteredBathes,
    backwardStack: system.header.backwardStack,
  }),
  {
    acceptFilter: acceptFilterAction,
    pullBackward: pullBackwardAction,
  },
)(FilterAcceptButtonContainer);

export { FilterAcceptButtonConnected as FilterAcceptButton };
