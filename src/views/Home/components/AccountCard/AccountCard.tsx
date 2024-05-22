import { useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import {
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
  Avatar,
  IconButton,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Delete, Settings } from '@mui/icons-material';
import { NavLink } from 'react-router-dom';
import { APP_URL } from '../../../../constants/domain.constant';
import {
  IAccount,
  useDeleteAccount,
  useGetAccounts,
} from '../../../../api/useAccounts';
import DeleteDialog from './DeleteDialog';
import stringToColor from 'string-to-color';
import AccountInfo from './components/AccountInfo';

export function AccountCard({ account }: { account: IAccount }) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const { data: accounts } = useGetAccounts();
  const { mutate: deleteAccount } = useDeleteAccount();

  const { accountNumber, accountCurrency, ownerId, id } = account;

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    setDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    deleteAccount(id);
    setDialogOpen(false);
  };

  const handleCancelDelete = () => {
    setDialogOpen(false);
  };

  return (
    <>
      <Card
        sx={{ maxWidth: 900 }}
        id={`${ownerId}-${accountNumber}`}
        elevation={7}
      >
        <CardHeader
          avatar={
            <Avatar
              sx={{
                bgcolor: stringToColor(account.accountCurrency),
                fontSize: '14px',
              }}
              aria-label="account info"
            >
              {accountCurrency}
            </Avatar>
          }
          action={
            <>
              <Tooltip title="Manage account">
                <IconButton
                  onClick={handleClick}
                  size="small"
                  sx={{ ml: 2 }}
                  aria-controls={open ? 'account-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                >
                  <MoreVertIcon />
                </IconButton>
              </Tooltip>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleCloseMenu}
                onClick={handleCloseMenu}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    '&::before': {
                      content: '""',
                      display: 'block',
                      position: 'absolute',
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: 'background.paper',
                      transform: 'translateY(-50%) rotate(45deg)',
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <NavLink
                  to={`${APP_URL.ACCOUNT.path}?id=${id}`}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <MenuItem onClick={handleCloseMenu}>
                    <ListItemIcon>
                      <Settings fontSize="small" />
                    </ListItemIcon>
                    Edit Account
                  </MenuItem>
                </NavLink>

                {accounts && accounts?.length > 1 && (
                  <MenuItem onClick={handleDelete}>
                    <ListItemIcon>
                      <Delete fontSize="small" />
                    </ListItemIcon>
                    Delete Account
                  </MenuItem>
                )}
              </Menu>
            </>
          }
        />
        <AccountInfo account={account} />
      </Card>

      <DeleteDialog
        open={isDialogOpen}
        title="Delete Account"
        description="Are you sure you want to delete this account?"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </>
  );
}
