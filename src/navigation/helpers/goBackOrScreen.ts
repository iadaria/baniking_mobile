import { ParamListBase } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export function goBackOrScreen(
  navigation: StackNavigationProp<ParamListBase>,
  name: string,
) {
  if (navigation.canGoBack()) {
    return navigation.goBack();
  }
  navigation.reset({ index: 0, routes: [{ name }] });
}