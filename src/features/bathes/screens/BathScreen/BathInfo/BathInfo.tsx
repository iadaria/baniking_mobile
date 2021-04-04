import React from 'react';
import { AppText } from '~/src/app/common/components/UI';
import InfoBlock from './InfoBlock';

interface IInfoBath {
  description: string | null;
  history: string | null;
  features: string | null;
  service: string | null;
  traditions: string | null;
  steam_room: string | null;
}

interface IProps {
  infoBath: IInfoBath;
}

export default function BathInfo({
  infoBath: { description, history, features, service, traditions, steam_room },
}: IProps) {
  const isInfo: boolean = !!description || !!history;
  let desc;
  if (description) {
    desc = <InfoBlock title="Общее описание" text={description} />;
  }

  if (!isInfo) {
    return null;
  }

  return (
    <>
      <AppText margin={[1, 0]} golder>
        Дополнительная информация
      </AppText>
      {desc}
    </>
  );
}
