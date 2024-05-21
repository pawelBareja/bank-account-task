import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { ajaxService } from './ajaxService';
import { API_PATHS } from '../constants/domain.constant';

export interface ICurrency {
  value: string;
  label: string;
}

export const useCurencySymbol = (): UseQueryResult<ICurrency[]> => {
  return useQuery({
    queryKey: ['fetchCurrencySymbols'],
    queryFn: () => ajaxService('get', API_PATHS.currencySymbol),
  });
};
