import React from 'react';
import { AppText } from '~/src/app/common/components/UI';
import { IBathDetailed } from '~/src/app/models/bath';
import InfoBlock from './InfoBlock';

interface IProps {
  bath: IBathDetailed;
}

export function BathInfo({ bath: b }: IProps) {
  const isInfo =
    !!b.description ||
    !!b.history ||
    !!b.service ||
    !!b.traditions ||
    !!b.steam_room;

  if (!isInfo) return null;

  return (
    <>
      <AppText margin={[0.5, 0, 2]} golder>
        Дополнительная информация
      </AppText>
      <InfoBlock title="Общее описание" text={b.description} />
      <InfoBlock title="История" text={b.history} />
      <InfoBlock title="Особенности" text={b.features} />
      <InfoBlock title="Услуги" text={b.service} />
      <InfoBlock title="Традиции" text={b.traditions} />
      <InfoBlock title="Парная" text={b.steam_room} />
    </>
  );
}
