import { convertCurrency, IExchangeRate } from '../../helpers/convertCurrency';

describe('convertCurrency function', () => {
  const exchangeRates: IExchangeRate[] = [
    { code: 'EUR', exchangeRateToUSD: 1.1 },
    { code: 'GBP', exchangeRateToUSD: 0.72 },
  ];

  it('converts currency correctly from USD to EUR', () => {
    const amount = 100;
    const fromCurrency = 'EUR';
    const toCurrency = 'GBP';
    const expectedConvertedAmount = (100 * 1.1) / 0.72;

    const result = convertCurrency(
      amount,
      fromCurrency,
      toCurrency,
      exchangeRates
    );

    expect(result?.toFixed()).toEqual(expectedConvertedAmount.toFixed());
  });

  it('returns undefined when exchange rate for either currency is not found', () => {
    const amount = 100;
    const fromCurrency = 'USD';
    const toCurrency = 'XYZ';

    const result = convertCurrency(
      amount,
      fromCurrency,
      toCurrency,
      exchangeRates
    );

    expect(result).toBeUndefined();
  });
});
