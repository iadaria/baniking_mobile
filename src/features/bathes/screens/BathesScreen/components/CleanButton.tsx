import React from 'react';
import { AppButton, AppText, Block } from '~/src/app/common/components/UI';

interface IProps {
  title: string;
  clean: () => void;
}

export function CleanButton({ title, clean }: IProps) {
  return (
    <Block margin={[4, 0]} middle center>
      <AppButton onPress={clean}>
        <AppText center medium>
          {title}
        </AppText>
      </AppButton>
    </Block>
  );
}
