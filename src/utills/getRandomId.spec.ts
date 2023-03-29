import { getRandomId } from '@/utills/getRandomId';

describe('getRandomId', () => {
  it('returns a string', () => {
    expect(typeof getRandomId()).toBe('string');
  });

  it('returns a string with the default length of 10', () => {
    expect(getRandomId().length).toBe(10);
  });

  it('returns a string with the specified length', () => {
    expect(getRandomId(5).length).toBe(5);
  });

  it('returns a string with only alphanumeric characters', () => {
    const regex = /^[a-zA-Z0-9]+$/;
    expect(getRandomId()).toMatch(regex);
  });

  it('returns different ids for multiple calls', () => {
    const id1 = getRandomId();
    const id2 = getRandomId();
    expect(id1).not.toBe(id2);
  });
});
