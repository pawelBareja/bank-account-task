import { Theme, Typography } from '@mui/material';
import { styled } from '@mui/system';

export const FormInputError = styled(Typography)(
  ({ theme }: { theme: Theme }) => ({
    paddingLeft: theme.spacing(3),
    width: '100%',
    maxWidth: 290,
    textAlign: 'left',
    color: theme.palette.error.main,
    fontSize: '12px',
  })
);
