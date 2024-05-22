import { IAccount } from '../../../../api/useAccounts';

export const preparePayload = (
  accounts: IAccount[] | undefined,
  accountNumber: string,
  amount: number | null | undefined,
  isAdding: boolean
): IAccount | undefined => {
  const account = accounts?.find((a) => a.id === accountNumber);

  if (account && amount !== null && amount !== undefined) {
    return {
      ...account,
      accountFunds: isAdding
        ? account.accountFunds + amount
        : account.accountFunds - amount,
    };
  }
  return undefined;
};
