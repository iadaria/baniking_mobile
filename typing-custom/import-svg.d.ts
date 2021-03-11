declare module '*.svg' {
  import { SvgProps } from 'react-native-svg';
  const content: React.FC<
    SvgProps & {
      fillSecondary?: string;
      offset?: number;
      // margin?: number | number[];
    }
  >;
  export default content;
}
