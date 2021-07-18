import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AppText } from '~/src/app/common/components/UI';

interface IProps {
  cancelQuery: () => void;
}

export default function CancelLink({ cancelQuery }: IProps) {
  return (
    <TouchableOpacity onPress={cancelQuery}>
      <AppText
        style={{ alignSelf: 'center' }}
        padding={[2, 5]}
        secondary
        medium
        center>
        Отмена
      </AppText>
    </TouchableOpacity>
  );
}
