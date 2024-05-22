import { useState, useEffect } from 'react';
import { IAccount } from '../api/useAccounts';

interface FundsInfo {
  funds: number;
  currSymbol: string;
}

const useFundsInfo = (
  accounts: IAccount[] | undefined,
  accountId: string
): FundsInfo | undefined => {
  const [fundsInfo, setFundsInfo] = useState<FundsInfo | undefined>(undefined);

  useEffect(() => {
    if (!accounts || !accountId) {
      return;
    }

    const account = accounts.find((account) => account.id === accountId);

    if (account) {
      setFundsInfo({
        funds: account.accountFunds,
        currSymbol: account.accountCurrency,
      });
    }
  }, [accounts, accountId]);

  return fundsInfo;
};
export default useFundsInfo;
