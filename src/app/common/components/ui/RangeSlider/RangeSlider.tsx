import React, { useCallback, useState } from 'react';
import Slider from 'rn-range-slider';
import Label from './Label';
import Rail from './Rail';
import RailSelected from './RailSelected';
import Thumb from './Thumb';

interface IProps {
  min: number;
  max: number;
  low: number;
  high: number;
  setLow: (_low: number) => void;
  setHigh: (_high: number) => void;
}

export default function RangeSlider({ min: _min, max: _max, low, high, setLow, setHigh }: IProps) {
  const [rangeDisabled] = useState(false);
  /* const [low, setLow] = useState(90);
  const [high, setHigh] = useState(200); */
  const [min] = useState(_min);
  const [max] = useState(_max);

  const renderThumb = useCallback(() => <Thumb />, []);
  const renderRail = useCallback(() => <Rail />, []);
  const renderRailSelected = useCallback(() => <RailSelected />, []);
  const renderLabel = useCallback((value) => <Label text={value} />, []);
  const handleValueChange = useCallback((_low, _high) => {
    // console.log('_low _high', _low, _high);
    setLow(_low);
    setHigh(_high);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Slider
      // style={styles.slider}
      min={min}
      max={max}
      step={1}
      disableRange={rangeDisabled}
      renderThumb={renderThumb}
      renderRail={renderRail}
      renderRailSelected={renderRailSelected}
      renderLabel={renderLabel}
      onValueChanged={handleValueChange}
      allowLabelOverflow={true}
      low={low}
      high={high}
    />
  );
}
