import React, { useState } from 'react';
import { AppText } from '~/src/app/common/components/UI';
import RangeSlider from '~/src/app/common/components/UI/RangeSlider';

export function Pricer() {
  const [lowPrice, setLowPrice] = useState(bathParams?.price_from || 1);
  const [middleLowPrice, setMiddleLowPrice] = useState('1');

  const [highPrice, setHighPrice] = useState(bathParams?.price_to || 10000);
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
          setLowPrice(value);
          String(value) !== middleLowPrice && setMiddleLowPrice(String(value));
        }}
        setHigh={function (value: number) {
          setHighPrice(value);
          String(value) !== middleHighPrice &&
            setMiddleHighPrice(String(value));
        }}
      />
    </>
  );
}
