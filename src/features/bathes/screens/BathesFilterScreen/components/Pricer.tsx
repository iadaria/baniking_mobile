import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { AppInput, AppText, Block } from '~/src/app/common/components/UI';
import RangeSlider from '~/src/app/common/components/UI/RangeSlider';
import { IRootState } from '~/src/app/store/rootReducer';
import { useDebounced } from '../../../hooks/useDebounced';
import { RightButton } from '../RightButton';
import { styles as s } from '../styles';

export function Pricer() {
  const { price_from = 1, price_to = 10000 } = useSelector(
    ({ bath }: IRootState) => bath.paramsCheck,
  );
  const [lowPrice, setLowPrice] = useState(price_from);
  const [middleLowPrice, setMiddleLowPrice] = useState('1');

  const [highPrice, setHighPrice] = useState(price_to);
  const [middleHighPrice, setMiddleHighPrice] = useState('10000');

  useDebounced({
    param: { prop: 'paramsCheck', field: 'price_from', value: lowPrice },
    deps: [price_from, lowPrice],
    shouldExecute: price_from !== lowPrice,
    isDelete: lowPrice === 1,
  });

  useDebounced({
    param: { prop: 'paramsCheck', field: 'price_to', value: highPrice },
    deps: [price_to, highPrice],
    shouldExecute: price_to !== highPrice,
    isDelete: highPrice === 10000,
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
