import React, { useState } from 'react';
import { AppText, Block } from '~/src/app/common/components/UI';
import RangeSlider from '~/src/app/common/components/UI/RangeSlider';

export function Ratinger() {
  const [lowRating, setLowRating] = useState(bathParams?.rating || 2);
  const [middleLowRating, setMiddleLowRating] = useState('2');

  const [highRating, setHighRating] = useState(5);
  const [middleHightRating, setMiddleHighRating] = useState('5');

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
    </>
  );
}

