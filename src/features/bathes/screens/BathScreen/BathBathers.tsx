import React from 'react';
import { Image } from 'react-native';
import { AppText, Block } from '~/src/app/common/components/UI';
import { IBather } from '~/src/app/models/bath';
import { defaultUserMaleImg } from '~/src/assets';
import { styles } from './styles';

interface IProps {
  bathers: IBather[];
}

export default function BathBathers({ bathers }: IProps) {
  const avatar = null;
  return bathers.map((bather: IBather) => (
    <Block margin={[0, 0, 1.5]} row center>
      <Block style={styles.avatarBorder}>
        <Image style={styles.avatar} source={defaultUserMaleImg} />
      </Block>
      <Block margin={[0, 0, 0, 3.5]} column>
        <AppText trajan>{bather.name}</AppText>
        <AppText golder lightItalic>
          {bather.position}
        </AppText>
      </Block>
    </Block>
  ));
}
