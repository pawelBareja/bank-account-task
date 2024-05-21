import { Outlet } from 'react-router-dom';
import { Grid } from '@mui/material';
import Navbar from '../components/molecules/Navbar/Navbar';
import { useMobileViewPort } from '../hooks/useMobileView';

const MainLayout = () => {
  const isMobileView = useMobileViewPort();

  return (
    <>
      <Navbar />
      <Grid
        container
        direction={'column'}
        height={'100%'}
        px={4}
        py={isMobileView ? 2 : 4}
        sx={{ alignItems: 'stretch' }} // how to mak this container grow verticallyy to fill all space?
      >
        <Outlet />
      </Grid>
    </>
  );
};

export default MainLayout;
