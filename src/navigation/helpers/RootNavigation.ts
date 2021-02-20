import * as React from 'react';

export const navigationRef: React.RefObject<any> = React.createRef<any>();

export function navigate(name: string, params: any | undefined) {
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

/* export function toTop() {
  navigationRef.current?.popToTop();
} */
