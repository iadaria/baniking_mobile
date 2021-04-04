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
  infoBath: Partial<IInfoBath>;
}

export default function BathInfo({
  infoBath: { description, history, features, service, traditions, steam_room },
}: IProps) {
  const isInfo: boolean = !!description || !!history || !!service || !!traditions || !!steam_room;
  let descriptionItem;
  let historyItem;
  let featuresItem;
  let serviceItem;
  let traditionsItem;
  let steamRoomItem;

  if (description) {
    descriptionItem = <InfoBlock title="Общее описание" text={description} />;
  }
  if (history) {
    historyItem = <InfoBlock title="История" text={history} />;
  }
  if (features) {
    featuresItem = <InfoBlock title="Особенности" text={features} />;
  }
  if (service) {
    serviceItem = <InfoBlock title="Услуги" text={service} />;
  }
  if (traditions) {
    traditionsItem = <InfoBlock title="Традиции" text={traditions} />;
  }
  if (steam_room) {
    steamRoomItem = <InfoBlock title="Парная" text={steam_room} />;
  }

  return isInfo ? (
    <>
      <AppText margin={[0.5, 0, 2]} golder>
        Дополнительная информация
      </AppText>
      {descriptionItem}
      {historyItem}
      {featuresItem}
      {serviceItem}
      {traditionsItem}
      {steamRoomItem}
    </>
  ) : null;
}
