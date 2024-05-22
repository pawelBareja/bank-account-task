import { CardContent, Grid, Typography } from '@mui/material';
import { IAccount } from '../../../../../api/useAccounts';

const AccountInfo = ({ account }: { account: IAccount }) => {
  const { accountName, accountNumber, accountFunds, accountCurrency } = account;

  return (
    <CardContent>
      <Grid container wrap="nowrap" direction={{ xs: 'column', md: 'row' }}>
        <Grid container item direction="column" md={6}>
          <Typography variant="body2" color="primary">
            Name of the account
          </Typography>
          <Typography variant="h5" color="text.secondary">
            {accountName}
          </Typography>

          <Typography variant="body2" color="primary" marginTop={2}>
            Account number
          </Typography>
          <Typography variant="h5" color="text.secondary">
            {accountNumber}
          </Typography>
        </Grid>
        <Grid
          container
          item
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent={{ xs: 'flex-start', sm: 'flex-end' }}
          alignContent={{ xs: 'flex-start', sm: 'flex-end' }}
          alignItems="baseline"
          md={6}
          mt={{ xs: 2, sm: 0 }}
        >
          <Typography variant="body2" color="primary" mr={1}>
            Funds:
          </Typography>
          <Typography variant="h5" color="text.secondary">
            {accountFunds} {accountCurrency}
          </Typography>
        </Grid>
      </Grid>
    </CardContent>
  );
};

export default AccountInfo;
