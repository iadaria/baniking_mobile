import React from 'react';
import { Alert, Linking, TouchableOpacity } from 'react-native';
import { IUiText } from '~/src/app/models/text';
import { AppText } from './AppText';
import { Block } from './Block';

interface IProps extends IUiText {
  color?: string;
  url: string;
  title: string;
  // children: React.ReactNode;
}

export function AppOpenURL({ url, title, ...others }: IProps) {
  const handlePress = React.useCallback(async () => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, [url]);

  // return <Button title={children} onPress={handlePress} />;

  return (
    <TouchableOpacity onPress={handlePress}>
      <AppText {...others}>{title}</AppText>
    </TouchableOpacity>
  );
}

// const styles = StyleSheet.create({});
