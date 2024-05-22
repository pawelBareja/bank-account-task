import { Grid, Typography } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import AccountForm from './components/Form/Form';

const Account = () => {
  const [searchParams] = useSearchParams();
  const fetchedAccountNumber = searchParams.get('id');

  return (
    <>
      <Grid item>
        <Typography variant="h5" mb={4}>
          {fetchedAccountNumber
            ? `Edit account number: ${fetchedAccountNumber}`
            : 'Add new Account'}
        </Typography>
      </Grid>

      <AccountForm fetchedAccountNumber={fetchedAccountNumber} />
    </>
  );
};

export default Account;
