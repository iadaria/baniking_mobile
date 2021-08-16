import React from 'react';
import { AppButton, AppText, Block } from '~/src/app/common/components/UI';

interface IProps {
  title: string;
  handleLoadMore: () => void;
}

export default function UpdateRequestButton({ title, handleLoadMore }: IProps) {
  return (
    <Block margin={[3, 0]} middle center>
      <AppText margin={[2, 0]}>Ничего не найдено</AppText>
      <AppButton onPress={handleLoadMore}>
        <AppText center medium>
          {title}
        </AppText>
      </AppButton>
    </Block>
  );
}
