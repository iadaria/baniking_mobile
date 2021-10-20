export const log = (title = '', toShow: any) =>
  console.log(title, JSON.stringify(toShow, null, 4));
export const logline = (title = '', toShow: any, ...others: any[]) =>
  console.log(title, toShow, others.join(','));
