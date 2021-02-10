import React from 'react';
import { Block, AppText } from '~/src/app/common/components/ui';

export default function TestTwoScreen({ navigation }: any) {
  return (
    <Block center middle full>
      <AppText>Screen two</AppText>
    </Block>
  );
}

/* const isDrawerOpen = useIsDrawerOpen();

  React.useLayoutEffect(() => {
    if (!isDrawerOpen) {
      navigation.setOptions({
        headerLeft: () => {
          <HeaderLeftOpen onOpenDrawer={() => navigation.toggleDrawer()} />;
        },
      });
    }
  }, [navigation, isDrawerOpen]); */
