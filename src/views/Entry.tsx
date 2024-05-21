import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './Home/Home';
import Account from './Account/Account';
import Transfer from './Transfer/Transfer';
import { APP_URL } from '../constants/domain.constant';
import MainLayout from '../layouts/MainLayout';

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: APP_URL.HOME.path,
        element: <Home />,
      },
      {
        path: APP_URL.ACCOUNT.path,
        element: <Account />,
      },
      {
        path: APP_URL.TRANSFER.path,
        element: <Transfer />,
      },
    ],
  },
]);

export const Entry = () => {
  return <RouterProvider router={router} />;
};
