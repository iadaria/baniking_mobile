import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { AppButton, AppInput, AppText, Block } from '~/src/app/common/components/UI';
import { RightButton } from './RightButton';
import RangeSlider from '~/src/app/common/components/UI/RangeSlider';
import { IBathParamsVariety, bathType, TPartBathParams } from '~/src/app/models/bath';
import {
  getBathParamsVariety as getBathParamsVarietyAction,
  checkFilter as checkFilterAction,
} from '~/src/features/bathes/store/bathActions';
import { IRootState } from '~/src/app/store/rootReducer';
import { CloseFilerIcon } from '~/src/assets';
import { styles } from './styles';
// import { ScrollView } from 'react-native-gesture-handler';
import { ActivityIndicator, ScrollView } from 'react-native';

interface IProps {
  paramsVariety: IBathParamsVariety | null;
  filterLoading: boolean;
  countFilters: number;
  totalFilteredBathes: number;
  getBathParamsVariety: () => void;
  checkFilter: (checkParams: TPartBathParams) => void;
}

function BathesFilterScreenContainer({
  paramsVariety,
  filterLoading,
  countFilters,
  totalFilteredBathes,
  getBathParamsVariety,
  checkFilter,
}: IProps) {
  const [lowPrice, setLowPrice] = useState(1);
  const [highPrice, setHighPrice] = useState(10000);
  const [lowRating, setLowRating] = useState(2);
  const [highRating, setHighRating] = useState(5);

  const { zones, services, steamRooms } = paramsVariety || {};

  useEffect(() => {
    if (!paramsVariety) {
      getBathParamsVariety();
    }
    //__DEV__ && console.log('FilterScreen', JSON.stringify(paramsVariety, null, 4));
  }, [getBathParamsVariety, paramsVariety]);

  return (
    <>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentScrollStyle}>
        {/* Заголовок */}
        <Block style={{ justifyContent: 'space-between' }} center row>
          <AppText h1>Выбрано фильтров</AppText>
          <AppText margin={[0, 0, 0, 11]} style={styles.button} semibold h2>
            {countFilters}
          </AppText>
          <Block style={[styles.closeIcon, styles.border, { marginBottom: 0 }]}>
            <CloseFilerIcon />
          </Block>
        </Block>
        {/* Стоимость */}
        <AppText margin={[3, 0, 0]}>
          <AppText secondary>Стоимость</AppText> в час
        </AppText>
        <RangeSlider
          min={1}
          max={10000}
          low={lowPrice}
          high={highPrice}
          setLow={setLowPrice}
          setHigh={setHighPrice}
        />
        <Block margin={[1, 0, 0]} center row>
          <AppText margin={[0, 3, 0, 0]} tag>
            от
          </AppText>
          <AppInput
            style={{ ...styles.input, width: wp(18) }}
            rightButton={<RightButton onPress={setLowPrice.bind(null, 0)} />}
            number
            value={String(lowPrice)}
            isScrollToFocused
          />
          <AppText margin={[0, 2.5]} tag>
            до
          </AppText>
          <AppInput
            style={{ ...styles.input, width: wp(18) }}
            rightButton={<RightButton onPress={setHighPrice.bind(null, 300)} />}
            number
            value={String(highPrice)}
            isScrollToFocused
          />
          <AppText margin={[0, 3]} tag>
            руб/час
          </AppText>
        </Block>
        {/* Рейтинг */}
        <AppText margin={[3, 0, 0]} secondary>
          Рейтинг
        </AppText>
        <RangeSlider
          min={2}
          max={5}
          low={lowRating}
          high={highRating}
          setLow={setLowRating}
          setHigh={setHighRating}
        />
        <Block id="rating" margin={[1, 0, 0]} center row>
          <AppText margin={[0, 3, 0, 0]} tag>
            от
          </AppText>
          <AppInput
            style={styles.input}
            rightButton={<RightButton onPress={setLowRating.bind(null, 0)} />}
            number
            value={String(lowRating)}
            isScrollToFocused
          />
          <AppText margin={[0, 2.5]} tag>
            до
          </AppText>
          <AppInput
            style={styles.input}
            rightButton={<RightButton onPress={setHighRating.bind(null, 5)} />}
            number
            value={String(highRating)}
            isScrollToFocused
          />
          <AppText margin={[0, 3]} tag>
            звезд
          </AppText>
        </Block>
        {/* Виды парной */}
        <AppText margin={[3, 0, 2]} secondary>
          Виды парной
        </AppText>
        <Block row wrap>
          {steamRooms &&
            Array.from(steamRooms, ([key, value]) => (
              <AppText key={`item-${key}`} style={[styles.element]} tag>
                {value}
              </AppText>
            ))}
        </Block>
        {/* Сервис */}
        <AppText margin={[3, 0, 2]} secondary>
          Сервис
        </AppText>
        <Block row wrap>
          {services &&
            Array.from(services, ([key, value]) => (
              <AppText key={`item-${key}`} style={[styles.element]} tag>
                {value}
              </AppText>
            ))}
        </Block>
        {/* Аквазоны */}
        <AppText margin={[3, 0, 2]} secondary>
          Аквазоны
        </AppText>
        <Block row wrap>
          {zones &&
            Array.from(zones, ([key, value]) => (
              <AppText key={`item-${key}`} style={[styles.element]} tag>
                {value}
              </AppText>
            ))}
        </Block>
        {/* Уровни */}
        <AppText margin={[3, 0, 2]} secondary>
          Уровни
        </AppText>
        <Block row wrap>
          {/* {bathType.forEach((value, key, map) => console.log(value, key))} */}
          {steamRooms &&
            Array.from(steamRooms, ([key, value]) => (
              <AppText key={`item-${key}`} style={[styles.element]} tag>
                {value}
              </AppText>
            ))}
          {Array.from(bathType, ([key, value]) => (
            <AppText key={`${key}`} style={[styles.element]} tag>
              {value}
            </AppText>
          ))}
        </Block>
        <Block margin={[10, 0]} />
      </ScrollView>
      <AppButton style={[styles.filterButton]} opacity={0.2} margin={[3, 0, 8]}>
        <AppText center semibold header>
          {'Показать  '}
          {filterLoading ? <ActivityIndicator size="small" /> : totalFilteredBathes}
          {' предложения'}
        </AppText>
      </AppButton>
    </>
  );
}

const BathesFilterScreenConnected = connect(
  ({ bath }: IRootState) => ({
    paramsVariety: bath.paramsVariety,
    filterLoading: bath.filterLoading,
    countFilters: bath.countFilters,
    totalFilteredBathes: bath.totalFilteredBathes,
  }),
  {
    getBathParamsVariety: getBathParamsVarietyAction,
    checkFilter: checkFilterAction,
  },
)(BathesFilterScreenContainer);

export { BathesFilterScreenConnected as BathesFilterScreen };
