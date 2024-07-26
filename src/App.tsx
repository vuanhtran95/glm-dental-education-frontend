import './App.css';
import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from 'react-router-dom';

import NotFound from './pages/404';
import Login from './pages/authentication/login';
import SignUp from './pages/authentication/signup';
import CreateChat from './pages/chat/create';
import ChatDetail from './pages/chat/detail';
import PageContainer from './components/page-container';
import Evaluate from './pages/evaluate';

const App = () => {
  const localStorageToken = localStorage.getItem('token');
  const userInfo = localStorage.getItem('userInfo');

  const ProtectedRoutes = () => {
    return localStorageToken && userInfo ? (
      <PageContainer />
    ) : (
      <Navigate to='/login' replace />
    );
  };

  const router = createBrowserRouter([
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
          path: '/',
          element: <Login />,
        },
        {
          path: '/new-chat',
          element: <CreateChat />,
        },
        {
          path: '/dialog/:id',
          element: <ChatDetail />,
        },
        {
          path: '/Evaluate',
          element: <Evaluate />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
