import React, { useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { AppText, Block } from '~/src/app/common/components/UI';
import { IRootState } from '~/src/app/store/rootReducer';
import { styles as s } from '../styles';
import { useDebounced } from '../../../hooks/useDebounced';
import { compareObj } from '~/src/app/utils/common';
import { IBathParams } from '~/src/app/models/bath';

interface IProps {
  title: string;
  items: string[];
  field: keyof IBathParams;
}

export function Filters({ title, items, field }: IProps) {
  const paramsCheck = useSelector(({ bath }: IRootState) => bath.paramsCheck);
  const [selected, setSelected] = useState<number[]>([]);

  useDebounced({
    param: { prop: 'paramsCheck', field, value: selected },
    deps: [selected],
    shouldExecute: !compareObj(paramsCheck[field], selected),
    isDelete: selected.length <= 0,
  });

  function handleSelect(id: number) {
    const ns = !isSelected(id)
      ? [...selected, id]
      : selected.filter((i) => i !== id);
    setSelected(ns);
  }

  const isSelected = (key: number) => selected.includes(key);

  const item = (id: number, name: string) => {
    const itemStyle = isSelected(id) ? s.elementSelected : s.element;
    return (
      <TouchableOpacity
        key={`${id}`}
        style={itemStyle}
        onPress={() => handleSelect(id)}>
        <Text>{name}</Text>
      </TouchableOpacity>
    );
  };

  const elements = items.map((service: string, index: number) =>
    item(index, service),
  );

  const component = (
    <>
      <AppText margin={[3, 0, 2]} secondary>
        {title}
      </AppText>
      <Block row wrap>
        {elements}
      </Block>
    </>
  );

  return items.length ? component : null;
}
