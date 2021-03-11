import React from 'react';
import Svg, { Defs, LinearGradient, Path, Stop } from 'react-native-svg';
import { colors } from '../../constants';

interface IProps {
  id: string;
  active: number;
  deactive?: number;
}

export default function Star({id, active, deactive }: IProps) {
  // console.log('[Star] active, deactive', active, deactive);
  return (
    <Svg id={id} width="16" height="15.313">
      <Defs>
        <LinearGradient id="half_grad" x1="0" y1="0" x2="1" y2="0">
          <Stop offset={active} stopColor={colors.secondary} />
          <Stop offset={active} stopColor="#707070" stopOpacity={1} />
        </LinearGradient>
      </Defs>
      <Path
        id="Path_43885"
        data-name="Path 43885"
        d="M149.988,134.309a.984.984,0,0,0-.74-.66l-4.231-.86-2.125-3.758a.984.984,0,0,0-1.713,0l-2.125,3.758-4.231.86a.984.984,0,0,0-.529,1.629l2.917,3.182-.49,4.289a.984.984,0,0,0,1.386,1.007l3.928-1.791,3.928,1.791a.984.984,0,0,0,1.386-1.007l-.49-4.289,2.917-3.182A.984.984,0,0,0,149.988,134.309Zm-4.882,3.152a.984.984,0,0,0-.252.777l.343,3.006-2.753-1.255a.984.984,0,0,0-.816,0l-2.753,1.255.343-3.006a.984.984,0,0,0-.252-.777l-2.045-2.23,2.965-.6a.984.984,0,0,0,.66-.48l1.49-2.634,1.489,2.634a.985.985,0,0,0,.661.48l2.965.6Zm0,0"
        transform="translate(-134.036 -128.531)"
        fill="url(#half_grad)"
      />
    </Svg>
  );
}
