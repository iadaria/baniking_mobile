import { formateText, unformateText } from '../bathUtility';
import { logline } from '../debug';
describe('formate "search search" -> "%search%search%" ', () => {
  it('formate from  ', () => {
    const formated = formateText('search search search');
    expect(formated).toBe('%search%search%search%');
  });
  it('formate to  ', () => {
    const formated = unformateText('%search%search%search%');
    logline('', formated);
    expect(formated).toBe('search search search');
  });
});
