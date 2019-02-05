
import trans from './trans';

// console.log(Translate);
describe('test function', () => {
  beforeEach(() => {
    Translate = {
      messages: {},
      locale: 'en',
    };
  });

  it('Should return a string with value of translation', () => {
    Translate.messages = { 'test': 'test value' };

    expect(trans('test')).toBe('test value');
  });

  it('Should return a string with replace labels', () => {
    Translate.messages = { 'test': 'test %value%' };

    expect(trans('test', { '%value%': 'house'})).toBe('test house');
  });

  it('Should return the same label if translation not exist', () => {
    expect(trans('test')).toBe('test');
  });
});
