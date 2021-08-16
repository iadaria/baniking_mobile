export function capitalizeFirstLetter(what?: string) {
  if (!what) return;
  return what.charAt(0).toUpperCase() + what.slice(1);
}
