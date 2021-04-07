import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { AppButton, AppInput, AppText, Block } from '~/src/app/common/components/UI';
import { RightButton } from './RightButton';
import RangeSlider from '~/src/app/common/components/UI/RangeSlider';
import { IBathParamsVariety, bathType, TPartBathParams } from '~/src/app/models/bath';
import {
  getBathParamsVariety as getBathParamsVarietyAction,
  checkFilter as checkFilterAction,
  acceptFilter as acceptFilterAction,
} from '~/src/features/bathes/store/bathActions';
import { IRootState } from '~/src/app/store/rootReducer';
import { CloseFilerIcon } from '~/src/assets';
import { useDebouncedCallback } from 'use-debounce/lib';
import FilterRooms from './FilterRooms';
import FilterServices from './FilterServices';
import FilterZones from './FilterZones';
import FilterTypes from './FilterTypes';
import { styles } from './styles';

interface IProps {
  paramsVariety: IBathParamsVariety | null;
  filterLoading: boolean;
  filterCount: number;
  totalFilteredBathes: number;
  bathParams: TPartBathParams;
  filterParams: TPartBathParams;
  getBathParamsVariety: () => void;
  checkFilter: ({ params, countFilters }: { params: TPartBathParams; countFilters: number }) => void;
  acceptFilter: ({ params, count }: { params: TPartBathParams; count: number }) => void;
}

const DEFAULT_PARAMS: TPartBathParams = {
  page: 0,
  steam_rooms_ids: [],
  services_ids: [],
  zones_ids: [],
  types: [],
};

function BathesFilterScreenContainer({
  paramsVariety,
  filterLoading,
  filterCount,
  totalFilteredBathes,
  bathParams,
  filterParams,
  getBathParamsVariety,
  checkFilter,
  acceptFilter,
}: IProps) {
  const [lowPrice, setLowPrice] = useState(1);
  const [middleLowPrice, setMiddleLowPrice] = useState('1');

  const [highPrice, setHighPrice] = useState(10000);
  const [middleHighPrice, setMiddleHighPrice] = useState('10000');

  const [lowRating, setLowRating] = useState(2);
  const [middleLowRating, setMiddleLowRating] = useState('2');

  const [highRating, setHighRating] = useState(5);
  const [middleHightRating, setMiddleHighRating] = useState('5');

  const [params, setParams] = useState<TPartBathParams>({
    search_query: bathParams.search_query ? bathParams.search_query : '',
    ...DEFAULT_PARAMS,
    ...filterParams,
  });
  const [count, setCount] = useState(filterCount);

  const { zones, services, steamRooms } = paramsVariety || {};

  // Получаем параметры для фильтрации
  useEffect(() => {
    if (!paramsVariety) {
      getBathParamsVariety();
    }
  }, [getBathParamsVariety, paramsVariety]);

  // Вызываем фильтр сразу после создания
  useEffect(() => {
    __DEV__ && console.log('\n[FilterScreen/handleCheckFilter] first handleCheckFilter');
    debounced(params, filterCount);
    // сбрасываем все
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* useEffect(() => {
    __DEV__ && console.log('[FilterScreen/change] fparams=', params);
  }, [params]); */

  const debounced = useDebouncedCallback(
    (checkParams: TPartBathParams, count: number) => checkFilter({ params: checkParams, countFilters: count }),
    2000,
    {
      maxWait: 3000,
    },
  );
  const debouncedParams = useDebouncedCallback((checkParams: TPartBathParams) => setParams(checkParams), 500, {
    maxWait: 1000,
  });

  // Вызываем запрос при изменении параметров
  useEffect(() => {
    __DEV__ && console.log('\n[FilterScreen/debounced] with filters', JSON.stringify(params, null, 4));
    debounced(params, count);
    // Пусть зависит только от параметров - нет от количества параметров
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounced, params]);

  // Вызываем запрос при изменении цены и рейтинга
  useEffect(() => {
    const newParams: TPartBathParams = { ...params, price_from: lowPrice, price_to: highPrice, rating: lowRating };
    lowPrice === 1 && delete newParams.price_from;
    highPrice === 10000 && delete newParams.price_to;
    lowRating === 2 && delete newParams.rating;

    debouncedParams(newParams);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lowPrice, highPrice, lowRating, debouncedParams]);

  function handleAcceptFilter() {
    acceptFilter({ params, count });
  }

  const changeText = (
    text: string,
    limit: number,
    setOrigin: (digit: number) => void,
    setMiddle: (text: string) => void,
  ) => {
    if (text === '') {
      //e.preventDefault();
      setMiddle('');
      setOrigin(limit);
      return false;
    } else {
      const digit = parseInt(text);
      // __DEV__ && console.log(digit);
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
            {count}
          </AppText>
          <TouchableOpacity
            style={[styles.closeIcon, styles.border, { marginBottom: 0 }]}
            onPress={() => {
              if (count > 0) {
                setCount(0);
                setParams({
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
          filterParams={params}
          setFilterParams={setParams}
          setFilterCount={setCount}
        />
        {/* Сервис */}
        <FilterServices
          services={services}
          filterParams={params}
          setFilterParams={setParams}
          setFilterCount={setCount}
        />
        {/* Аквазоны */}
        <FilterZones zones={zones} filterParams={params} setFilterParams={setParams} setFilterCount={setCount} />
        {/* Типы */}
        <FilterTypes
          bathTypes={bathType}
          filterParams={params}
          setFilterParams={setParams}
          setFilterCount={setCount}
        />
        <Block margin={[10, 0]} />
      </ScrollView>
      <AppButton style={[styles.filterButton]} opacity={0.2} margin={[3, 0, 8]} onPress={handleAcceptFilter}>
        <AppText padding={1.5} center semibold header>
          {'Показать '}
          {/* {filterLoading ?  <ActivityIndicator size="small" color="white" /> : totalFilteredBathes}
          {'  предложения'} */}
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
    </>
  );
}

const BathesFilterScreenConnected = connect(
  ({ bath }: IRootState) => ({
    paramsVariety: bath.paramsVariety,
    filterLoading: bath.filterLoading,
    filterCount: bath.filterCount,
    totalFilteredBathes: bath.totalFilteredBathes,
    //filterParams: bath.filterParams,
    bathParams: bath.params,
  }),
  {
    getBathParamsVariety: getBathParamsVarietyAction,
    checkFilter: checkFilterAction,
    acceptFilter: acceptFilterAction,
  },
)(BathesFilterScreenContainer);

export { BathesFilterScreenConnected as BathesFilterScreen };

// // Филльтр
// const handleCheckFilter = useCallback(() => {
//   __DEV__ && console.log(`[FilterScreen/handleCheckFilter] fparams=${params}`);
//   //checkFilter(filterParams);
//   //debounced(filterParams);
// }, [debounced, params]);

/* const DEFAULT_PRICE_AND_RATING: TPartBathParams = {
  price_from: 1,
  price_to: 10000,
  rating: 2,
}; */
