import React, { useEffect, useRef, useState } from 'react';
import { LayoutChangeEvent, ScrollView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { StackNavigationProp } from '@react-navigation/stack';
import { ParamListBase } from '@react-navigation/native';
import {
  BathFilterParams,
  bathType,
  BathParams,
} from '~/src/app/models/bath';
import {
  getBathFilterParams as getBathFilterParamsAction,
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
import {
  initializeFilterParams,
  cleanFilterParams,
} from '../../../../app/utils/bathUtility';
import { KeyboardWrapper } from '~/src/app/common/components/KeyboardWrapper';
import { log, logline } from '~/src/app/utils/debug';
import { BackButton } from '~/src/app/common/components/BackButton';

interface IProps {
  navigation: StackNavigationProp<ParamListBase>;
  paramsFilter: BathFilterParams | null;
  bathParams: BathParams;
  getBathFilterParams: () => void;
  checkFilter: ({ filterParams }: { filterParams: BathParams }) => void;
}

const DEFAULT_PARAMS: BathParams = {
  page: 0,
  steam_rooms_ids: [],
  services_ids: [],
  zones_ids: [],
  types: [],
};

function BathesFilterScreenContainer({
  navigation,
  paramsFilter,
  //filterCount,
  bathParams,
  getBathFilterParams,
  checkFilter,
}: IProps) {
  const scrollViewRef = useRef<ScrollView>(null);
  const [blockPosition, setBlockPosition] = useState<number>(0);

  const [lowPrice, setLowPrice] = useState(bathParams?.price_from || 1);
  const [middleLowPrice, setMiddleLowPrice] = useState('1');

  const [highPrice, setHighPrice] = useState(bathParams?.price_to || 10000);
  const [middleHighPrice, setMiddleHighPrice] = useState('10000');

  const [lowRating, setLowRating] = useState(bathParams?.rating || 2);
  const [middleLowRating, setMiddleLowRating] = useState('2');

  const [highRating, setHighRating] = useState(5);
  const [middleHightRating, setMiddleHighRating] = useState('5');

  const [thisFilterParams, setThisFilterParams] = useState<BathParams>(
    initializeFilterParams(bathParams),
  );

  const filterCount = calculateFilterCount(thisFilterParams);
  const [thisFilterCount, setThisFilterCount] = useState(filterCount);

  const { zones, services, steamRooms } = paramsFilter || {};
  const timeIds: NodeJS.Timeout[] = [];

  // Получаем параметры для фильтрации
  useEffect(() => {
    if (!paramsFilter) {
      getBathFilterParams();
    }
  }, [getBathFilterParams, paramsFilter]);

  const debounced = useDebouncedCallback(
    (checkParams: BathParams) =>
      checkFilter({ filterParams: checkParams }),
    1000,
    {
      maxWait: 2000,
    },
  );
  const debouncedParams = useDebouncedCallback(
    (checkParams: BathParams) => setThisFilterParams({ ...checkParams }),
    300,
    {
      maxWait: 600,
    },
  );

  // Инициализируем и вызываем фильтр сразу после создания страницы
  useEffect(() => {
    logline(
      '\n[FilterScreen/handleCheckFilter] first handleCheckFilter',
      thisFilterParams,
    );
    debounced(thisFilterParams);

    return () => {
      //logline('[BathFilerScreen] unmount');
      timeIds.forEach((timeId: NodeJS.Timeout) => clearTimeout(timeId));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Вызываем запрос при изменении параметров
  useEffect(() => {
    log('\n[FilterScreen/debounced] with filters', thisFilterParams);
    debounced(thisFilterParams);
  }, [debounced, thisFilterParams]);

  useEffect(() => {
    log('[FilterScreen] Bath params', bathParams);
  }, [bathParams]);

  // Вызываем запрос при изменении цены и рейтинга
  useEffect(() => {
    const newParams: BathParams = {
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

  const scrollToBlock = (plus: number) => {
    logline('to', blockPosition);
    const timeId = setTimeout(() => {
      scrollViewRef?.current?.scrollTo({
        x: 0,
        y: blockPosition + plus,
        animated: true,
      });
    }, 500);
    logline('[OrderCallForm/timeId]', timeId);
    timeIds.push(timeId);
  };

  return (
    <>
      {/* <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentScrollStyle}> */}
      <KeyboardWrapper>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.contentScrollStyle}
          alwaysBounceVertical
          ref={scrollViewRef}>
          <Block margin={[4, 0]}>
            <BackButton />
          </Block>
          {/* Заголовок */}
          <Block style={{ justifyContent: 'space-between' }} center row>
            <AppText h1>Выбрано фильтров</AppText>
            <AppText margin={[0, 0, 0, 11]} style={styles.button} semibold h2>
              {thisFilterCount}
            </AppText>
            <TouchableOpacity
              style={[styles.closeIcon, styles.border, { marginBottom: 0 }]}
              onPress={() => {
                setThisFilterCount(0);
                const cleanedFilterParams: BathParams = cleanFilterParams(
                  bathParams,
                );
                logline('[BathesFilter] cleaned', cleanFilterParams);

                //debouncedParams(cleanedFilterParams);
                setThisFilterParams({ ...cleanedFilterParams });

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
              String(value) !== middleLowPrice &&
                setMiddleLowPrice(String(value));
            }}
            setHigh={function (value: number) {
              setHighPrice(value);
              String(value) !== middleHighPrice &&
                setMiddleHighPrice(String(value));
            }}
          />
          <Block margin={[1, 0, 0]} center row>
            {/* Минимальная стоимость */}
            <AppText margin={[0, 3, 0, 0]} tag>
              от
            </AppText>
            <AppInput
              style={{ ...styles.input, width: wp(25) }}
              value={middleLowPrice}
              onChangeText={(text: string) =>
                changeText(text, 1, setLowPrice, setMiddleLowPrice)
              }
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
              style={{ ...styles.input, width: wp(25) }}
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
              onChangeText={(text: string) =>
                changeText(text, 10000, setHighPrice, setMiddleHighPrice)
              }
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
              String(value) !== middleLowRating &&
                setMiddleLowRating(String(value));
            }}
            setHigh={function (value: number) {
              setHighRating(value);
              String(value) !== middleHightRating &&
                setMiddleHighRating(String(value));
            }}
          />
          <Block
            onLayout={({ nativeEvent }: LayoutChangeEvent) =>
              setBlockPosition(nativeEvent.layout.y)
            }
            id="rating"
            margin={[1, 0, 0]}
            center
            row>
            <AppText margin={[0, 3, 0, 0]} tag>
              от
            </AppText>
            <AppInput
              style={{ ...styles.input, width: wp(25) }}
              onFocus={scrollToBlock.bind(null, -60)}
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
              onChangeText={(text: string) =>
                changeText(text, 2, setLowRating, setMiddleLowRating)
              }
            />
            <AppText margin={[0, 2.5]} tag>
              до
            </AppText>
            <AppInput
              style={{ ...styles.input, width: wp(25) }}
              onFocus={scrollToBlock.bind(null, -60)}
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
              onChangeText={(text: string) =>
                changeText(text, 5, setHighRating, setMiddleHighPrice)
              }
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
      </KeyboardWrapper>
      <FilterAcceptButton
        navigation={navigation}
        filterParams={thisFilterParams}
        filterCount={thisFilterCount}
      />
    </>
  );
}

const BathesFilterScreenConnected = connect(
  ({ bath }: IRootState) => ({
    paramsFilter: bath.paramsFilter,
    bathParams: bath.params,
  }),
  {
    getBathFilterParams: getBathFilterParamsAction,
    checkFilter: checkFilterAction,
  },
)(BathesFilterScreenContainer);

export { BathesFilterScreenConnected as BathesFilterScreen };
