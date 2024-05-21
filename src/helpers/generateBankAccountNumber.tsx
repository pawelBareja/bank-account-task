export function generateBankAccountNumber(): number {
  const timestamp = Date.now();
  const randomNum = Math.floor(Math.random() * 1e7);

  const accountNumberStr =
    timestamp.toString() + randomNum.toString().padStart(7, '0');

  const accountNumber = parseInt(accountNumberStr, 10);

  return accountNumber;
}
