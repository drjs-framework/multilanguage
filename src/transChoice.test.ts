import transChoice from './transChoice';

describe('transChoice function', () => {
  beforeEach(() => {
    Translate = {
      messages: {
        test: ']-Inf, -3[test-Inf|{-2}test %changeParameter%|{0}test0|{1}test1|]1, 10[test10|[11, Inf[testInf'
      },
      locale: 'en',
    };
  });

  it('Should return translation for the exact number', () => {
    expect(transChoice('test', 0)).toBe('test0');
    expect(transChoice('test', 1)).toBe('test1');
  });

  it('Should return translation for interval', () => {
    expect(transChoice('test', 5)).toBe('test10');
    expect(transChoice('test', 8)).toBe('test10');
  });

  it('Should not return translation for output interval', () => {
    expect(transChoice('test', 10)).toBe('test');
  });

  it('Should return a transaliton for include interval', () => {
    expect(transChoice('test', 11)).toBe('testInf');
  });

  it('Should return a translation for include intervar inf', () => {
    expect(transChoice('test', 555)).toBe('testInf');
  });

  it('Should return a translation for include itnerval -inf', () => {
    expect(transChoice('test', -555)).toBe('test-Inf');
  });

  it('Should return a translation with change parameters', () => {
    expect(transChoice('test', -2, { '%changeParameter%': 'testParameter' }))
      .toBe('test testParameter');
  })

  it('Should return a label when not exist translation', () => {
    expect(transChoice('test3', 3)).toBe('test3');
  });
});
