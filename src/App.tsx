import './App.css';
import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from 'react-router-dom';

import Settings from './pages/settings';
import NotFound from './pages/404';
import Login from './pages/authentication/login';
import SignUp from './pages/authentication/signup';
import DialogList from './pages/dialog/list';
import DialogDetail from './pages/dialog/detail';
import Scenario from './pages/scenario';
import PageContainer from './components/page-container';
import NewChat from './pages/dashboard';

const App = () => {
  const ProtectedRoutes = () => {
    const localStorageToken = localStorage.getItem('token');
    return localStorageToken ? (
      <PageContainer />
    ) : (
      <Navigate to='/login' replace />
    );
  };

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Login />,
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/sign-up',
      element: <SignUp />,
    },
    {
      path: '*',
      element: <NotFound />,
    },
    {
      element: <ProtectedRoutes></ProtectedRoutes>,
      children: [
        {
          path: '/settings',
          element: <Settings />,
        },
        {
          path: '/new-chat',
          element: <NewChat />,
        },
        {
          path: '/dialog',
          element: <DialogList />,
        },
        {
          path: '/dialog/:id',
          element: <DialogDetail />,
        },
        {
          path: '/scenario',
          element: <Scenario />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
