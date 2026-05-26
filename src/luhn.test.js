import { luhnCheck } from './luhn';

describe('luhnCheck — valid cards', () => {
  test('Visa: 4111111111111111', () => {
    expect(luhnCheck('4111111111111111')).toBe(true);
  });
  test('Mastercard: 5500005555555559', () => {
    expect(luhnCheck('5500005555555559')).toBe(true);
  });
  test('Amex: 371449635398431', () => {
    expect(luhnCheck('371449635398431')).toBe(true);
  });
  test('Discover: 6011111111111117', () => {
    expect(luhnCheck('6011111111111117')).toBe(true);
  });
  test('JCB: 3530111333300000', () => {
    expect(luhnCheck('3530111333300000')).toBe(true);
  });
  test('Mir: 2201382000000013', () => {
    expect(luhnCheck('2201382000000013')).toBe(true);
  });
});

describe('luhnCheck — invalid cards', () => {
  test('Wrong checksum: 4111111111111112', () => {
    expect(luhnCheck('4111111111111112')).toBe(false);
  });
  test('Too short: 123', () => {
    expect(luhnCheck('123')).toBe(false);
  });
  test('Empty string', () => {
    expect(luhnCheck('')).toBe(false);
  });
  test('All zeros: 0000000000000000', () => {
    expect(luhnCheck('0000000000000000')).toBe(false);
  });
  test('Letters only', () => {
    expect(luhnCheck('abcdefgh')).toBe(false);
  });
});
