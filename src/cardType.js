export function detectCardType(cardNumber) {
  const digits = cardNumber.replace(/\D/g, '');

  const patterns = [
    { type: 'mir',        regex: /^220[0-4]/ },
    { type: 'visa',       regex: /^4/ },
    { type: 'mastercard', regex: /^5[1-5]|^2(2[2-9][1-9]|[3-6]\d{2}|7[01]\d|720)/ },
    { type: 'amex',       regex: /^3[47]/ },
    { type: 'discover',   regex: /^6(?:011|5)/ },
    { type: 'jcb',        regex: /^35(?:2[89]|[3-8]\d)/ },
    { type: 'diners',     regex: /^3(?:0[0-5]|[68])/ },
  ];

  const match = patterns.find(({ regex }) => regex.test(digits));
  return match ? match.type : null;
}
