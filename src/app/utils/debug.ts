export const log = (title = '', toShow: any) =>
  __DEV__ && console.log(title, JSON.stringify(toShow, null, 4));
export const logline = (title = '', toShow: any) =>
  __DEV__ && console.log(title, toShow);
