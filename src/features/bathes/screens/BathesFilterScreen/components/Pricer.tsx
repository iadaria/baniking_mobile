import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { AppText } from '~/src/app/common/components/UI';
import RangeSlider from '~/src/app/common/components/UI/RangeSlider';
import { IRootState } from '~/src/app/store/rootReducer';
import { useDebounced } from '../../../hooks/useDebounced';

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
    </>
  );
}
