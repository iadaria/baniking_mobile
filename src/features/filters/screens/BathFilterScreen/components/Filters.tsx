import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Text, TouchableOpacity } from 'react-native';
import { AppText, Block } from '~/src/app/common/components/UI';
import { useDebounced } from '../../../hooks/useDebounced';
import { compareObj } from '~/src/app/utils/common';
import { IBathParams } from '~/src/app/models/bath';
import { IBathExtraParams } from '~/src/app/models/filter';
import { IRootState } from '~/src/app/store/rootReducer';
import { styles as s } from '../styles';

interface IProps {
  title: string;
  field: keyof IBathParams;
  items?: string[];
  extraParams?: Partial<IBathExtraParams>;
}

function FiltersContainer({ title, items, field, extraParams }: IProps) {
  const [selected, setSelected] = useState<number[]>(extraParams[field]);
  useDebounced({
    prop: 'extraParams',
    params: { [field]: selected },
    deps: [selected],
    shouldExecute: !compareObj(extraParams[field], selected),
    isDelete: selected && selected?.length <= 0,
  });

  function handleSelect(id: number) {
    const ns = !isSelected(id)
      ? [...(selected || []), id]
      : selected?.filter((i) => i !== id);
    setSelected(ns);
  }

  const isSelected = (key: number) => selected?.includes(key);

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

  const elements = items?.map((service: string, index: number) =>
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

  return items?.length ? component : null;
}

const FiltersConnected = connect(
  ({ filter }: IRootState) => ({
    extraParams: filter.extraParams,
  }),
  {},
)(FiltersContainer);

export { FiltersConnected as Filters };
