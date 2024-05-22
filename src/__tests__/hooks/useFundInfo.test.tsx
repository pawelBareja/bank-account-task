import { renderHook } from '@testing-library/react-hooks';
import useFundsInfo from '../../hooks/useFundsInfo';
import { IAccount } from '../../api/useAccounts';

describe('useFundsInfo', () => {
  it('returns undefined when accounts or accountId are not provided', () => {
    const { result } = renderHook(() => useFundsInfo(undefined, '123'));

    expect(result.current).toBeUndefined();
  });

  it('returns funds info when account is found', () => {
    const accounts: IAccount[] = [
      {
        id: '123',
        accountName: 'Account 1',
        accountNumber: 123456789,
        accountCurrency: 'USD',
        accountFunds: 100,
        ownerId: 1,
      },
      {
        id: '456',
        accountName: 'Account 2',
        accountNumber: 987654321,
        accountCurrency: 'EUR',
        accountFunds: 200,
        ownerId: 2,
      },
    ];

    const { result } = renderHook(() => useFundsInfo(accounts, '123'));

    expect(result.current).toEqual({ funds: 100, currSymbol: 'USD' });
  });
});
