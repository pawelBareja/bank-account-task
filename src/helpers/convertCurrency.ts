export interface IExchangeRate {
  code: string;
  exchangeRateToUSD: number;
}

export function convertCurrency(
  amount: number,
  fromCurrency: string,
  toCurrency: string,
  exchangeRates: IExchangeRate[]
): number | undefined {
  const fromRate = exchangeRates.find((rate) => rate.code === fromCurrency);
  const toRate = exchangeRates.find((rate) => rate.code === toCurrency);

  if (!fromRate || !toRate) {
    return undefined;
  }

  const amountInUSD = amount * fromRate.exchangeRateToUSD;

  const convertedAmount = amountInUSD / toRate.exchangeRateToUSD;

  return parseFloat(convertedAmount.toFixed(2));
}
