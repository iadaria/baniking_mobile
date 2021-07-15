import { replaceAt } from '~/src/app/utils/common';
describe('hellow', () => {
  it('replaceAt("Dasha", 2, "O") => DOsha ', () => {
    const result = replaceAt('Dasha', 1, 'O');
    expect(result).toBe('DOsha');
  });
  it('replaceAt("Dasha", 2, "O") => DOsha ', () => {
    const result = replaceAt('Dasha', 4, 'O');
    expect(result).toBe('DashO');
  });
});
