import { useTheme, useMediaQuery } from '@mui/material';

export const useMobileViewPort = () => {
  const theme = useTheme();
  const isMobileView = useMediaQuery(theme.breakpoints.down('md'));
  return isMobileView;
};
