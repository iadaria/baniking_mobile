import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { AppText, Block } from '~/src/app/common/components/UI';
import { IRootState } from '~/src/app/store/rootReducer';
import { logline } from '~/src/app/utils/debug';
import { styles as s } from '../styles';
import { useDebounced } from '../../../hooks/useDebounced';
import { compareObj } from '~/src/app/utils/common';

export function FilterServices() {
  const { services } = useSelector(({ bath }: IRootState) => bath.paramsFilter);
  const { services_ids } = useSelector(
    ({ bath }: IRootState) => bath.paramsCheck,
  );
  const [selected, setSelected] = useState<number[]>([]);

  useDebounced({
    param: { prop: 'paramsCheck', field: 'services_ids', value: selected },
    deps: [selected],
    shouldExecute: !compareObj(services_ids, selected),
    isDelete: selected.length <= 0,
  });

  function handleSelect(id: number) {
    const ns = !isSelected(id)
      ? [...selected, id]
      : selected.filter((i) => i !== id);
    setSelected(ns);
  }

  const isSelected = (key: number) => selected.includes(key);

  const item = (id: number, title: string) => {
    const itemStyle = isSelected(id) ? s.elementSelected : s.element;
    return (
      <TouchableOpacity
        key={`${id}`}
        style={itemStyle}
        onPress={() => handleSelect(id)}>
        <Text>{title}</Text>
      </TouchableOpacity>
    );
  };

  const elements = services.map((service: string, index: number) =>
    item(index, service),
  );

  const component = (
    <>
      <AppText margin={[3, 0, 2]} secondary>
        Сервис
      </AppText>
      <Block row wrap>
        {elements}
      </Block>
    </>
  );

  return services.length ? component : null;
}
