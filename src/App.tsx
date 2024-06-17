import './App.css';
import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
  Outlet,
} from 'react-router-dom';

import Settings from './pages/settings';
import NotFound from './pages/404';
import Chat from './pages/chat';
import Login from './pages/authentication/login';
import SignUp from './pages/authentication/signup';

function App() {
  const ProtectedRoutes = () => {
    const localStorageToken = localStorage.getItem('token');
    return localStorageToken ? <Outlet /> : <Navigate to='/login' replace />;
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
      element: <ProtectedRoutes />,
      children: [
        {
          path: '/settings',
          element: <Settings />,
        },
        {
          path: '/chat',
          element: <Chat />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
