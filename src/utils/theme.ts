import { createTheme, Theme } from '@mui/material/styles';

const themeOptions = {
  typography: {
    fontFamily: 'Lato, sans-serif',
  },
  palette: {
    primary: {
      main: '#a2bd30',
    },
    secondary: {
      main: '#3d3d3f',
    },
    text: {
      primary: '#3d3d3f',
    },
  },
};

const theme: Theme = createTheme(themeOptions);

export default theme;
