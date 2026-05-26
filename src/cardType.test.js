import { detectCardType } from './cardType';

describe('detectCardType', () => {
  test('Visa starts with 4', () => {
    expect(detectCardType('4111111111111111')).toBe('visa');
  });
  test('Mastercard starts with 51-55', () => {
    expect(detectCardType('5500005555555559')).toBe('mastercard');
  });
  test('Mastercard 2-series (2221)', () => {
    expect(detectCardType('2221000000000009')).toBe('mastercard');
  });
  test('Amex starts with 34', () => {
    expect(detectCardType('371449635398431')).toBe('amex');
  });
  test('Amex starts with 37', () => {
    expect(detectCardType('378282246310005')).toBe('amex');
  });
  test('Discover starts with 6011', () => {
    expect(detectCardType('6011111111111117')).toBe('discover');
  });
  test('JCB starts with 3530', () => {
    expect(detectCardType('3530111333300000')).toBe('jcb');
  });
  test('Diners starts with 300', () => {
    expect(detectCardType('30569309025904')).toBe('diners');
  });
  test('Mir starts with 2200-2204', () => {
    expect(detectCardType('2201382000000013')).toBe('mir');
  });
  test('Unknown returns null', () => {
    expect(detectCardType('9999999999999999')).toBeNull();
  });
  test('Empty string returns null', () => {
    expect(detectCardType('')).toBeNull();
  });
});
