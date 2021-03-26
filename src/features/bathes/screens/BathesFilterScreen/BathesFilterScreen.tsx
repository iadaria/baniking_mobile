import React, { useEffect, useState } from 'react';
import { AppInput, AppText, Block } from '~/src/app/common/components/UI';
import { styles } from './styles';
import { CloseFilerIcon } from '~/src/assets';
import { RightButton } from './RightButton';
import RangeSlider from '~/src/app/common/components/UI/RangeSlider';
import ScrollElements from '~/src/app/common/components/ScrollElements/ScrollElements';
import { defaultFilterInputs } from '../contracts/filterInputs';

export function BathesFilterScreen() {
  const [lowPrice, setLowPrice] = useState(90);
  const [highPrice, setHighPrice] = useState(300);
  const [lowRating, setLowRating] = useState(2);
  const [highRating, setHighRating] = useState(5);

  /* useEffect(() => {
    console.log('[BathesFilterScreen]', lowPrice, highPrice);
  }, [lowPrice, highPrice]); */

  return (
    <ScrollElements defaultInputs={defaultFilterInputs}>
      {/* Заголовок */}
      <Block style={{ justifyContent: 'space-between' }} center row>
        <AppText h1>Выбрано фильтров</AppText>
        <AppText margin={[0, 0, 0, 11]} style={styles.button} semibold h2>
          3
        </AppText>
        <Block style={[styles.element, styles.border]}>
          <CloseFilerIcon />
        </Block>
      </Block>
      {/* Стоимость */}
      <AppText margin={[4, 0, 0]}>
        <AppText secondary>Стоимость</AppText> в час
      </AppText>
      <RangeSlider
        min={10}
        max={300}
        low={lowPrice}
        high={highPrice}
        setLow={setLowPrice}
        setHigh={setHighPrice}
      />
      <Block margin={[1, 0, 0]} center row>
        <AppText margin={[0, 3, 0, 0]} tag>
          от
        </AppText>
        <AppInput
          style={styles.input}
          rightButton={<RightButton onPress={setLowPrice.bind(null, 0)} />}
          number
          value={String(lowPrice)}
          isScrollToFocused
        />
        <AppText margin={[0, 2.5]} tag>
          до
        </AppText>
        <AppInput
          style={styles.input}
          rightButton={<RightButton onPress={setHighPrice.bind(null, 300)} />}
          number
          value={String(highPrice)}
          isScrollToFocused
        />
        <AppText margin={[0, 3]} tag>
          руб/час
        </AppText>
      </Block>
      {/* Рейтинг */}
      <AppText margin={[4, 0, 0]} secondary>
        Рейтинг
      </AppText>
      <RangeSlider
        min={0}
        max={5}
        low={lowRating}
        high={highRating}
        setLow={setLowRating}
        setHigh={setHighRating}
      />

      <Block id="rating" margin={[1, 0, 0]} row>
        <AppText margin={[0, 3, 0, 0]} tag>
          от
        </AppText>
        <AppInput
          style={styles.input}
          rightButton={<RightButton onPress={setLowRating.bind(null, 0)} />}
          number
          value={String(lowRating)}
          isScrollToFocused
        />
        <AppText margin={[0, 2.5]} tag>
          до
        </AppText>
        <AppInput
          style={styles.input}
          rightButton={<RightButton onPress={setHighRating.bind(null, 5)} />}
          number
          value={String(highRating)}
          isScrollToFocused
        />
        <AppText margin={[0, 3]} tag>
          звезд
        </AppText>
      </Block>
      {/* Фильтр 1 */}
      <Block margin={[5, 0]}>
        <AppText style={[styles.element]} tag>
          Русская баня
        </AppText>
        <AppText>Альпийская краксен</AppText>
      </Block>
    </ScrollElements>
  );
}
