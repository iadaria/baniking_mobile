import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { AppText } from '~/src/app/common/components/UI';
import RangeSlider from '~/src/app/common/components/UI/RangeSlider';
import { IRootState } from '~/src/app/store/rootReducer';

export function Pricer() {
  const { price_from = 1, price_to = 10000 } = useSelector(
    ({ bath }: IRootState) => bath.params,
  );
  const [lowPrice, setLowPrice] = useState(price_from);
  const [middleLowPrice, setMiddleLowPrice] = useState('1');

  const [highPrice, setHighPrice] = useState(price_to);
  const [middleHighPrice, setMiddleHighPrice] = useState('10000');

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
          const v = String(value);
          setLowPrice(value);
          v !== middleLowPrice && setMiddleLowPrice(v);
        }}
        setHigh={function (value: number) {
          const v = String(value);
          setHighPrice(value);
          v !== middleHighPrice && setMiddleHighPrice(v);
        }}
      />
    </>
  );
}
