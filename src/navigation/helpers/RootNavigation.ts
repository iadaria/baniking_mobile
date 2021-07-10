import * as React from 'react';
import { StackActions } from '@react-navigation/native';

export const navigationRef: React.RefObject<any> = React.createRef<any>();

export function navigate(name: string, params?: any) {
  navigationRef.current?.navigate(name, params);
}

export function openDrawer() {
  navigationRef.current?.openDrawer();
}

export function resetRoot(name: string) {
  navigationRef.current?.resetRoot({
    index: 0,
    routes: [{ name: name }],
  });
}

export const reset = (name: string, index = 0): void => {
  navigationRef.current?.reset({
    index,
    routes: [{ name }],
  });
};

export function goBack() {
  navigationRef.current?.goBack();
}

export function getCurrentRoute() {
  let route = navigationRef.current?.getRootState();
  while (route && route.routes) {
    route = route.routes[route.index];
  }
  route = route?.state?.routes[route?.state.index]?.name ?? 'Empty Screen';
  return route;
}

export const goBackOrToScreen = (screenName: string): void =>
  navigationRef.current?.canGoBack()
    ? navigationRef.current?.goBack()
    : navigationRef.current?.navigate(screenName, null);

export const popToTop = (): void => {
  navigationRef.current?.dispatch(StackActions.popToTop());
};
