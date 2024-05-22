import { generateBankAccountNumber } from '../../helpers/generateBankAccountNumber';

describe('generateBankAccountNumber function', () => {
  it('generates a bank account number correctly', () => {
    const accountNumber = generateBankAccountNumber();

    expect(typeof accountNumber).toEqual('number');

    expect(accountNumber.toString().length).toEqual(20);
  });
});
