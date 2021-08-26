import React, { useEffect, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { AppInput, AppText, Block } from '~/src/app/common/components/UI';
import RangeSlider from '~/src/app/common/components/UI/RangeSlider';
import { IRootState } from '~/src/app/store/rootReducer';
import { useDebounced } from '../../../hooks/useDebounced';
import { RightButton } from './RightButton';
import { styles as s } from '../styles';
import { logline } from '~/src/app/utils/debug';

const MIN_PRICE = 1;
const MAX_PRICE = 10000;

interface IProps {
  price_from?: number;
  price_to?: number;
}

function PricerContainer({ price_from, price_to }: IProps) {
  /*   const { price_from = pfrom || 1, price_to = pto || 10000 } =
      useSelector((state: IRootState) => state.filter.extraParams) || {}; */
  const [lowPrice, setLowPrice] = useState(price_from || MIN_PRICE);
  const [middleLowPrice, setMiddleLowPrice] = useState(MIN_PRICE.toString());

  const [highPrice, setHighPrice] = useState(price_to || MAX_PRICE);
  const [middleHighPrice, setMiddleHighPrice] = useState(MAX_PRICE.toString());

  const isInitFrom = lowPrice === MIN_PRICE && !price_from;
  const isInitTo = highPrice === MAX_PRICE && !price_to;

  useEffect(() => {
    logline('***[Pricer]', { price_from });
  }, [price_from]);

  useDebounced({
    prop: 'extraParams',
    params: { price_from: lowPrice },
    deps: [price_from, lowPrice],
    shouldExecute: price_from !== lowPrice && !isInitFrom,
    isDelete: lowPrice === MIN_PRICE,
  });

  useDebounced({
    prop: 'extraParams',
    params: { price_to: highPrice },
    deps: [price_to, highPrice],
    shouldExecute: price_to !== highPrice && !isInitTo,
    isDelete: highPrice === MAX_PRICE,
  });

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
          const v = String(value);
          v !== middleLowPrice && setMiddleLowPrice(v);
        }}
        setHigh={function (value: number) {
          setHighPrice(value);
          const v = String(value);
          v !== middleHighPrice && setMiddleHighPrice(v);
        }}
      />
      <Block margin={[1, 0, 0]} center row>
        {/* Минимальная стоимость */}
        <AppText margin={[0, 3, 0, 0]} tag>
          от
        </AppText>
        <AppInput
          style={{ ...s.input, width: wp(25) }}
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
          style={{ ...s.input, width: wp(25) }}
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
    </>
  );
}

const PricerConnected = connect(
  ({ filter }: IRootState) => ({
    price_from: filter.extraParams?.price_from,
    price_to: filter.extraParams?.price_to,
  }),
  {},
)(PricerContainer);

export { PricerConnected as Pricer };