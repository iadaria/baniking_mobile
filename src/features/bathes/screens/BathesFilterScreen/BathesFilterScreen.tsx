import React, { useEffect, useState } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { StackNavigationProp } from '@react-navigation/stack';
import { ParamListBase } from '@react-navigation/native';
import { IBathParamsVariety, bathType, TPartBathParams } from '~/src/app/models/bath';
import {
  getBathParamsVariety as getBathParamsVarietyAction,
  checkFilter as checkFilterAction,
} from '~/src/features/bathes/store/bathActions';
import { AppInput, AppText, Block } from '~/src/app/common/components/UI';
import { RightButton } from './RightButton';
import RangeSlider from '~/src/app/common/components/UI/RangeSlider';
import { IRootState } from '~/src/app/store/rootReducer';
import { CloseFilerIcon } from '~/src/assets';
import { useDebouncedCallback } from 'use-debounce/lib';
import FilterRooms from './FilterRooms';
import FilterServices from './FilterServices';
import FilterZones from './FilterZones';
import FilterTypes from './FilterTypes';
import { styles } from './styles';
import { FilterAcceptButton } from './FilterAcceptButton';
import { calculateFilterCount } from '~/src/app/utils/bathUtility';
import { initializeFilterParams } from '../../../../app/utils/bathUtility';

interface IProps {
  navigation: StackNavigationProp<ParamListBase>;
  paramsVariety: IBathParamsVariety | null;
  bathParams: TPartBathParams;
  getBathParamsVariety: () => void;
  checkFilter: ({ filterParams }: { filterParams: TPartBathParams }) => void;
}

const DEFAULT_PARAMS: TPartBathParams = {
  page: 0,
  steam_rooms_ids: [],
  services_ids: [],
  zones_ids: [],
  types: [],
};

function BathesFilterScreenContainer({
  navigation,
  paramsVariety,
  //filterCount,
  bathParams,
  getBathParamsVariety,
  checkFilter,
}: IProps) {
  //const [initialized, setInitialized] = useState(false);

  const [lowPrice, setLowPrice] = useState(bathParams?.price_from || 1);
  const [middleLowPrice, setMiddleLowPrice] = useState('1');

  const [highPrice, setHighPrice] = useState(bathParams?.price_to || 10000);
  const [middleHighPrice, setMiddleHighPrice] = useState('10000');

  const [lowRating, setLowRating] = useState(bathParams?.rating);
  const [middleLowRating, setMiddleLowRating] = useState('2');

  const [highRating, setHighRating] = useState(5);
  const [middleHightRating, setMiddleHighRating] = useState('5');

  const [thisFilterParams, setThisFilterParams] = useState<TPartBathParams>(initializeFilterParams(bathParams));

  const filterCount = calculateFilterCount(thisFilterParams);
  const [thisFilterCount, setThisFilterCount] = useState(filterCount);

  const { zones, services, steamRooms } = paramsVariety || {};

  // Получаем параметры для фильтрации
  useEffect(() => {
    if (!paramsVariety) {
      getBathParamsVariety();
    }
  }, [getBathParamsVariety, paramsVariety]);

  const debounced = useDebouncedCallback(
    (checkParams: TPartBathParams) => checkFilter({ filterParams: checkParams }),
    1000,
    {
      maxWait: 2000,
    },
  );
  const debouncedParams = useDebouncedCallback(
    (checkParams: TPartBathParams) => setThisFilterParams(checkParams),
    300,
    {
      maxWait: 600,
    },
  );

  // Инициализируем и вызываем фильтр сразу после создания страницы
  useEffect(() => {
    __DEV__ && console.log('\n[FilterScreen/handleCheckFilter] first handleCheckFilter', thisFilterParams);
    debounced(thisFilterParams);

    return () => {
      __DEV__ && console.log('[BathFilerScreen] unmount');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Вызываем запрос при изменении параметров
  useEffect(() => {
    __DEV__ && console.log('\n[FilterScreen/debounced] with filters', JSON.stringify(thisFilterParams, null, 4));
    debounced(thisFilterParams);
  }, [debounced, thisFilterParams]);

  useEffect(() => {
    __DEV__ && console.log('\nBath params', JSON.stringify(bathParams, null, 4));
  }, [bathParams]);

  // Вызываем запрос при изменении цены и рейтинга
  useEffect(() => {
    const newParams: TPartBathParams = {
      ...thisFilterParams,
      price_from: lowPrice,
      price_to: highPrice,
      rating: lowRating,
    };
    lowPrice === 1 && delete newParams.price_from;
    highPrice === 10000 && delete newParams.price_to;
    lowRating === 2 && delete newParams.rating;

    debouncedParams(newParams);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lowPrice, highPrice, lowRating, debouncedParams]);

  const changeText = (
    text: string,
    limit: number,
    setOrigin: (digit: number) => void,
    setMiddle: (text: string) => void,
  ) => {
    if (text === '') {
      setMiddle('');
      setOrigin(limit);
      return false;
    } else {
      const digit = parseInt(text);
      if (isNaN(digit)) {
        return;
      }
      if (!isNaN(digit) && typeof digit === 'number') {
        setMiddle(digit.toString());
        setOrigin(digit);
      }
    }
  };

  return (
    <>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentScrollStyle}>
        {/* Заголовок */}
        <Block style={{ justifyContent: 'space-between' }} center row>
          <AppText h1>Выбрано фильтров</AppText>
          <AppText margin={[0, 0, 0, 11]} style={styles.button} semibold h2>
            {thisFilterCount}
          </AppText>
          <TouchableOpacity
            style={[styles.closeIcon, styles.border, { marginBottom: 0 }]}
            onPress={() => {
              if (thisFilterCount > 0) {
                setThisFilterCount(0);
                setThisFilterParams({
                  search_query: bathParams.search_query ? bathParams.search_query : undefined,
                  ...DEFAULT_PARAMS,
                });
              }
              setLowPrice(1);
              setMiddleLowPrice('1');
              setHighPrice(10000);
              setMiddleHighPrice('10000');
              setLowRating(2);
              setMiddleLowRating('2');
              setHighRating(5);
              setMiddleHighRating('5');
              //}
            }}>
            <CloseFilerIcon />
          </TouchableOpacity>
        </Block>
        <AppText margin={[3, 0, 0]}>
          <AppText secondary>Стоимость</AppText> в час
        </AppText>
        <RangeSlider
          min={1}
          max={10000}
          low={lowPrice}
          high={highPrice}
          setLow={function (value: number) {
            setLowPrice(value);
            String(value) !== middleLowPrice && setMiddleLowPrice(String(value));
          }}
          setHigh={function (value: number) {
            setHighPrice(value);
            String(value) !== middleHighPrice && setMiddleHighPrice(String(value));
          }}
        />
        <Block margin={[1, 0, 0]} center row>
          {/* Минимальная стоимость */}
          <AppText margin={[0, 3, 0, 0]} tag>
            от
          </AppText>
          <AppInput
            style={{ ...styles.input, width: wp(18) }}
            value={middleLowPrice}
            onChangeText={(text: string) => changeText(text, 1, setLowPrice, setMiddleLowPrice)}
            rightButton={
              <RightButton
                onPress={() => {
                  setMiddleLowPrice('1');
                  setLowPrice(1);
                }}
              />
            }
            number
          />
          {/* Максимальная стоимость */}
          <AppText margin={[0, 2.5]} tag>
            до
          </AppText>
          <AppInput
            style={{ ...styles.input, width: wp(18) }}
            rightButton={
              <RightButton
                onPress={() => {
                  setMiddleHighPrice('10000');
                  setHighPrice(10000);
                }}
              />
            }
            number
            value={middleHighPrice}
            onChangeText={(text: string) => changeText(text, 10000, setHighPrice, setMiddleHighPrice)}
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
          min={1}
          max={5}
          low={lowRating}
          high={highRating}
          setLow={function (value: number) {
            setLowRating(value);
            String(value) !== middleLowRating && setMiddleLowRating(String(value));
          }}
          setHigh={function (value: number) {
            setHighRating(value);
            String(value) !== middleHightRating && setMiddleHighRating(String(value));
          }}
        />
        <Block id="rating" margin={[1, 0, 0]} center row>
          <AppText margin={[0, 3, 0, 0]} tag>
            от
          </AppText>
          <AppInput
            style={styles.input}
            rightButton={
              <RightButton
                onPress={() => {
                  setMiddleLowRating('2');
                  setLowRating(2);
                }}
              />
            }
            number
            value={middleLowRating}
            onChangeText={(text: string) => changeText(text, 2, setLowRating, setMiddleLowRating)}
          />
          <AppText margin={[0, 2.5]} tag>
            до
          </AppText>
          <AppInput
            style={styles.input}
            rightButton={
              <RightButton
                onPress={() => {
                  setMiddleHighRating('5');
                  setHighRating(5);
                }}
              />
            }
            number
            value={middleHightRating}
            onChangeText={(text: string) => changeText(text, 5, setHighRating, setMiddleHighPrice)}
          />
          <AppText margin={[0, 3]} tag>
            звезд
          </AppText>
        </Block>

        {/* Виды парной */}
        <FilterRooms
          steamRooms={steamRooms}
          filterParams={thisFilterParams}
          setFilterParams={setThisFilterParams}
          setFilterCount={setThisFilterCount}
        />
        {/* Сервис */}
        <FilterServices
          services={services}
          filterParams={thisFilterParams}
          setFilterParams={setThisFilterParams}
          setFilterCount={setThisFilterCount}
        />
        {/* Аквазоны */}
        <FilterZones
          zones={zones}
          filterParams={thisFilterParams}
          setFilterParams={setThisFilterParams}
          setFilterCount={setThisFilterCount}
        />
        {/* Типы */}
        <FilterTypes
          bathTypes={bathType}
          filterParams={thisFilterParams}
          setFilterParams={setThisFilterParams}
          setFilterCount={setThisFilterCount}
        />
        <Block margin={[10, 0]} />
      </ScrollView>
      <FilterAcceptButton navigation={navigation} filterParams={thisFilterParams} filterCount={thisFilterCount} />
    </>
  );
}

const BathesFilterScreenConnected = connect(
  ({ bath }: IRootState) => ({
    paramsVariety: bath.paramsVariety,
    bathParams: bath.params,
  }),
  {
    getBathParamsVariety: getBathParamsVarietyAction,
    checkFilter: checkFilterAction,
  },
)(BathesFilterScreenContainer);

export { BathesFilterScreenConnected as BathesFilterScreen };
