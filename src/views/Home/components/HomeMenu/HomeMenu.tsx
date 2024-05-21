import { Button, Grid, styled } from '@mui/material';
import { APP_URL } from '../../../../constants/domain.constant';
import { NavLink } from 'react-router-dom';
import SearchBar from '@mkyy/mui-search-bar';

interface IProps {
  searched: string;
  setSearched: React.Dispatch<React.SetStateAction<string>>;
  cancelSearch: () => void;
}

export const StyledSearchBar = styled(SearchBar)({
  boxShadow: 'none',
});

const HomeMenu: React.FC<IProps> = ({
  searched,
  setSearched,
  cancelSearch,
}) => {
  return (
    <Grid container mb={4}>
      <NavLink to={APP_URL.ACCOUNT.path}>
        <Button variant="outlined">Add new account</Button>
      </NavLink>
      <StyledSearchBar
        value={searched}
        onChange={(searchVal: string) => setSearched(searchVal)}
        onCancelResearch={() => cancelSearch()}
        placeholder="Filter accounts..."
      />
    </Grid>
  );
};

export default HomeMenu;
