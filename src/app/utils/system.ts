export function getCircularReplacer() {
  const seen = new WeakSet();
  return (key: any, value: any) => {
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  };
}

export function getImageExtension(file: string): string | null {
  const found = file.match(/^.*\.(jpg|JPG|gif|GIF|png|PNG|JPEG|jpeg)$/);
  if (found && found.length > 1) {
    return found[1];
  } else {
    return null;
  }
}

export function isAllowedImageType(type: string) {
  const types = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'];
  return types.includes(type);
}

export const getSex = (_sex: number) => (_sex === Sex.Male ? Sex.Male : Sex.Female);
