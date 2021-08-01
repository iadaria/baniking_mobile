import { compareObj } from '../common';
describe('compare', () => {
  it('arrays are equal', () => {
    const obj1 = [1, 2, 4];
    const obj2 = [4, 2, 1];
    const result = compareObj(obj1, obj2);
    expect(result).toBe(true);
  });
  it('arrays are not equal`', () => {
    const obj1 = [1, 2, 4];
    const obj2 = [4, 2, 2];
    const result = compareObj(obj1, obj2);
    expect(result).toBe(false);
  });
});
