import React from 'react';
import { AppButton, AppText, Block } from '~/src/app/common/components/UI';

interface IProps {
  setNeedCheck: (state: boolean) => void;
}

export default function NoPermissionPart({ setNeedCheck }: IProps) {
  return (
    <Block base>
      <AppText margin={[3, 0]} center>
        У приложения нет разрешение на использование геолокации
      </AppText>
      <AppButton onPress={() => setNeedCheck(true)}>
        <AppText center>Обновить страницу</AppText>
      </AppButton>
    </Block>
  );
}
