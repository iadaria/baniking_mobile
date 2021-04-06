import React, { useRef } from 'react';
import { View } from 'react-native';
import { Block } from '~/src/app/common/components/UI';
import { ICachedImage } from '~/src/app/models/persist';
import { styles } from './styles';

interface ITab {
  isCurrentIndex: boolean;
}

const Tab = ({ isCurrentIndex }: ITab) => {
  const currentIndexStyle = { width: 40, backgroundColor: 'white' };
  return <View style={[styles.tab, isCurrentIndex && currentIndexStyle]} />;
};

interface IProps {
  data: ICachedImage[];
  scrollX: any;
  currentIndex: number;
  onItemPress?: (index: number) => void;
}

export default function Tabs({ data, scrollX, currentIndex }: IProps) {
  return (
    <Block style={styles.tabsContainer}>
      <View style={styles.tabs}>
        {data.map((item: ICachedImage, index: number) => (
          <Tab key={`tab-${index}`} isCurrentIndex={index === currentIndex} />
        ))}
      </View>
    </Block>
  );
}
