import { IAccount } from '../../../../api/useAccounts';
import { OptionItem } from '../../../../components/molecules/SelectInput/SelectInput';

export function setFetchedAccounts(accounts: IAccount[]): OptionItem[] {
  const options = accounts.map(({ accountName, id, accountCurrency }) => ({
    label: `${accountName} (${accountCurrency})`,
    value: id,
  }));
  return options;
}
