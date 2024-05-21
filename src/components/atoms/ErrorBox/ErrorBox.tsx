import { Grid, Typography } from '@mui/material';
import { AxiosError } from 'axios';

const ErrorBox = ({ error }: { error: AxiosError }) => {
  return (
    <Grid direction="column">
      <Typography color="primary">{error.message}</Typography>
      <Typography>
        Try to refresh the page or check you internet connection
      </Typography>
    </Grid>
  );
};

export default ErrorBox;
