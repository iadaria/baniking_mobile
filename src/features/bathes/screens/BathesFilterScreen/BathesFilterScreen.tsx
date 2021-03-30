import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { AppButton, AppInput, AppText, Block } from '~/src/app/common/components/UI';
import { RightButton } from './RightButton';
import RangeSlider from '~/src/app/common/components/UI/RangeSlider';
import ScrollElements from '~/src/app/common/components/ScrollElements/ScrollElements';
import { defaultFilterInputs } from '../contracts/filterInputs';
import { IBathParamsVariety, bathType } from '~/src/app/models/bath';
import { getBathParamsVariety as getBathParamsVarietyAction } from '../../store/bathActions';
import { IRootState } from '~/src/app/store/rootReducer';
import { CloseFilerIcon } from '~/src/assets';
import { styles } from './styles';

interface IProps {
  paramsVariety: IBathParamsVariety | null;
  getBathParamsVariety: () => void;
}

function BathesFilterScreenContainer({ paramsVariety, getBathParamsVariety }: IProps) {
  const [lowPrice, setLowPrice] = useState(90);
  const [highPrice, setHighPrice] = useState(300);
  const [lowRating, setLowRating] = useState(2);
  const [highRating, setHighRating] = useState(5);

  const { zones, services, steamRooms } = paramsVariety || {};

  useEffect(() => {
    if (!paramsVariety) {
      getBathParamsVariety();
    }
    console.log(JSON.stringify(paramsVariety, null, 4));
  }, [getBathParamsVariety, paramsVariety]);

  return (
    <ScrollElements defaultInputs={defaultFilterInputs}>
      {/* Заголовок */}
      <Block style={{ justifyContent: 'space-between' }} center row>
        <AppText h1>Выбрано фильтров</AppText>
        <AppText margin={[0, 0, 0, 11]} style={styles.button} semibold h2>
          3
        </AppText>
        <Block style={[styles.element, styles.border, { marginBottom: 0 }]}>
          <CloseFilerIcon />
        </Block>
      </Block>
      {/* Стоимость */}
      <AppText margin={[3, 0, 0]}>
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
      <AppText margin={[3, 0, 0]} secondary>
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
      <Block id="rating" margin={[1, 0, 0]} center row>
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
      {/* Виды парной */}
      <AppText margin={[3, 0, 2]} secondary>
        Виды парной
      </AppText>
      <Block row wrap>
        {steamRooms &&
          Array.from(steamRooms, ([key, value]) => (
            <AppText key={`item-${key}`} style={[styles.element]} tag>
              {value}
            </AppText>
          ))}
      </Block>
      {/* Сервис */}
      <AppText margin={[3, 0, 2]} secondary>
        Сервис
      </AppText>
      <Block row wrap>
        {services &&
          Array.from(services, ([key, value]) => (
            <AppText key={`item-${key}`} style={[styles.element]} tag>
              {value}
            </AppText>
          ))}
      </Block>
      {/* Аквазоны */}
      <AppText margin={[3, 0, 2]} secondary>
        Аквазоны
      </AppText>
      <Block row wrap>
        {zones &&
          Array.from(zones, ([key, value]) => (
            <AppText key={`item-${key}`} style={[styles.element]} tag>
              {value}
            </AppText>
          ))}
      </Block>
      {/* Уровни */}
      <AppText margin={[3, 0, 2]} secondary>
        Уровни
      </AppText>
      <Block row wrap>
        {/* {bathType.forEach((value, key, map) => console.log(value, key))} */}
        {steamRooms &&
          Array.from(steamRooms, ([key, value]) => (
            <AppText key={`item-${key}`} style={[styles.element]} tag>
              {value}
            </AppText>
          ))}
        {Array.from(bathType, ([key, value]) => (
          <AppText key={`${key}`} style={[styles.element]} tag>
            {value}
          </AppText>
        ))}
      </Block>
      <AppButton margin={[3, 0, 8]}>
        <AppText center semibold header>
          Показать ? предложения
        </AppText>
      </AppButton>
    </ScrollElements>
  );
}

const BathesFilterScreenConnected = connect(
  ({ bath }: IRootState) => ({
    paramsVariety: bath.paramsVariety,
  }),
  {
    getBathParamsVariety: getBathParamsVarietyAction,
  },
)(BathesFilterScreenContainer);

export { BathesFilterScreenConnected as BathesFilterScreen };
