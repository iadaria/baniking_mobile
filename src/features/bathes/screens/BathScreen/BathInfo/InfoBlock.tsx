import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AppText, Block, Divider } from '~/src/app/common/components/UI';
import { ListIcon } from '~/src/assets';
import { styles } from '../styles';

interface IProps {
  title: string;
  text: string;
}

export default function InfoBlock({ title, text }: IProps) {
  const [open, setOpen] = useState(false);
  return !open ? (
    <TouchableOpacity style={styles.infoRow} onPress={setOpen.bind(null, true)}>
      <AppText>{title}</AppText>
      <ListIcon />
    </TouchableOpacity>
  ) : (
    <Block style={styles.infoBlock}>
      <TouchableOpacity style={styles.infoBlockTitle} onPress={setOpen.bind(null, false)}>
        <AppText primary medium tag>
          {title}
        </AppText>
        <ListIcon style={{ transform: [{ rotate: '180deg' }] }} />
      </TouchableOpacity>
      <Divider style={{ width: '91%', margin: 0, opacity: 0.15}} color='#707070' height={0.3} />
      <AppText padding={[3, 4, 4.5]} primary light tag height={18}>
        {text}
      </AppText>
    </Block>
  );
}
