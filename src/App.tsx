import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Settings from './pages/settings';
import NotFound from './pages/404';
import Chat from './pages/chat';
import Login from './pages/authentication/login';
import SignUp from './pages/authentication/signup';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Login />,
      // loader: rootLoader,
      // children: [
      //   {
      //     path: 'team',
      //     element: <Team />,
      //     loader: teamLoader,
      //   },
      // ],
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
      path: '/settings',
      element: <Settings />,
    },
    {
      path: '/chat',
      element: <Chat />,
    },
    {
      path: '*',
      element: <NotFound />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
