import {
  useQuery,
  useMutation,
  UseQueryResult,
  useQueryClient,
} from '@tanstack/react-query';
import { ajaxService } from './ajaxService';
import { API_PATHS } from '../constants/domain.constant';

export interface IAccount {
  accountName: string;
  accountNumber: number;
  accountCurrency: string;
  accountFunds: number;
  ownerId: number;
  id: string;
}

export const useGetAccounts = (): UseQueryResult<IAccount[]> => {
  return useQuery({
    queryKey: ['fetchAccounts'],
    queryFn: () => ajaxService('get', API_PATHS.accounts),
  });
};

export const useGetSingleAccount = (
  id: string | null
): UseQueryResult<IAccount> => {
  return useQuery<IAccount, Error>({
    queryKey: ['fetchSingleAccount', id],
    queryFn: () => ajaxService('get', `${API_PATHS.accounts}/${id}`),
    enabled: !!id,
  });
};

export const useAddAccount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newAccount: IAccount) => {
      return ajaxService('post', `${API_PATHS.accounts}`, newAccount);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['fetchAccounts'] });
    },
  });
};

export const useEditAccount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (account: IAccount) => {
      return ajaxService('put', `${API_PATHS.accounts}/${account.id}`, account);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['fetchAccounts'] });
    },
  });
};

export const useDeleteAccount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => {
      return ajaxService('delete', `${API_PATHS.accounts}/${id}`);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['fetchAccounts'] });
    },
  });
};
