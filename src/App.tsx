import './App.css';
import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from 'react-router-dom';

import Settings from './pages/settings';
import NotFound from './pages/404';
import Dashboard from './pages/dashboard';
import Login from './pages/authentication/login';
import SignUp from './pages/authentication/signup';
import Dialog from './pages/dialog';
import MainPage from './MainPage';
import Scenario from './pages/scenario';

const App = () => {
  const ProtectedRoutes = () => {
    const localStorageToken = localStorage.getItem('token');
    return localStorageToken ? <MainPage /> : <Navigate to='/login' replace />;
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
          path: '/dashboard',
          element: <Dashboard />,
        },
        {
          path: '/scenario',
          element: <Scenario />,
        },
        {
          path: '/dialog/:id',
          element: <Dialog />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
