import { useState, useMemo } from 'react';
import { Grid } from '@mui/material';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { AccountCard } from './components/AccountCard/AccountCard';
import HomeMenu from './components/HomeMenu/HomeMenu';
import { useGetAccounts } from '../../api/useAccounts';
import Loader from '../../components/atoms/Loader/Loader';
import ErrorBox from '../../components/atoms/ErrorBox/ErrorBox';
import { isAxiosError } from 'axios';

const Home = () => {
  const [searched, setSearched] = useState<string>('');
  const { isPending, error, data: accounts } = useGetAccounts();

  const cancelSearch = () => {
    setSearched('');
  };

  const filteredAccounts = useMemo(() => {
    return accounts?.filter((account) => {
      const searchLower = searched.toLowerCase();
      return (
        account.accountName.toLowerCase().includes(searchLower) ||
        account.accountCurrency.toLowerCase().includes(searchLower) ||
        account.accountNumber.toString().includes(searchLower)
      );
    });
  }, [accounts, searched]);

  if (isPending) {
    return <Loader />;
  }

  if (isAxiosError(error)) {
    return <ErrorBox error={error} />;
  }

  return (
    <Grid container>
      <Grid item xs={12} md={6} mb={4}>
        <Typography variant="h5">Your available accounts</Typography>
      </Grid>
      <HomeMenu
        searched={searched}
        setSearched={setSearched}
        cancelSearch={cancelSearch}
      />
      <Grid item xs={12} md={6} mb={4}></Grid>
      <Grid item xs={12}>
        <Stack spacing={2} sx={{ width: '100%' }}>
          {filteredAccounts?.map((account) => {
            return (
              <AccountCard key={account.accountNumber} account={account} />
            );
          })}
        </Stack>
        {!filteredAccounts?.length && (
          <Typography>Sorry could not find any accounts.</Typography>
        )}
      </Grid>
    </Grid>
  );
};

export default Home;
