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


// const containerRef = useRef();

/* interface IMeasure {
  x: number;
  y: number;
  width: number;
  height: number;
}
 */

/* const Tab = React.forwardRef(({ item, isCurrentIndex }: ITab, ref: ForwardedRef<any>) => {
  const currentIndexStyle = { width: 40, backgroundColor: 'white' };
  return <View style={[styles.tab, isCurrentIndex && currentIndexStyle]} ref={ref} />;
}); */

// const [measures, setMeasures] = useState<IMeasure[]>([]);

/* {measures.length > 0 && (
  <Indicator data={data} measures={measures} scrollX={scrollX} currentIndex={currentIndex} />
)} */

/* interface IIndicatorProps {
  data: ICachedImage[];
  measures: IMeasure[];
  scrollX: any;
}

const Indicator = ({ data, measures, scrollX }: IIndicatorProps) => {
  const inputRange = data.map((_, index) => index * windowWidth);

  const indicatorWidth: number = scrollX.interpolate({
    inputRange,
    outputRange: measures.map((_measure) => _measure.width),
  });
  const translateX: number = scrollX.interpolate({
    inputRange,
    outputRange: measures.map((_measure) => _measure.x),
  });

  return <Animated.View style={[styles.indicator, { width: indicatorWidth, transform: [{ translateX }] }]} />;
}; */

/* useEffect(() => {
    let _measures: IMeasure[] = [];
    setTimeout(() => {
      data.forEach((item: ICachedImage, index: number) => {
        item?.ref?.current?.measureLayout(
          containerRef.current,
          (x: number, y: number, width: number, height: number) => {
            _measures.push({ x, y, width, height });
            if (_measures.length === data.length) {
              setMeasures(_measures);
            }
          },
        );
      });
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); */
