import "./App.css";
import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from "react-router-dom";

import NotFound from "./pages/404";
import Login from "./pages/authentication/login";
import SignUp from "./pages/authentication/signup";
import CreateChat from "./pages/chat/create";
import ChatDetail from "./pages/chat/detail";
import PageContainer from "./components/page-container";
import EvaluateList from "./pages/evaluate/list";
import EvaluateDetail from "./pages/evaluate/detail";
import { useToken } from "./hooks/useToken";

interface ProtectedRoutesProps {
  token: string | null;
}

const ProtectedRoutes: React.FC<ProtectedRoutesProps> = ({ token }) => {
  return token ? <PageContainer /> : <Navigate to="/login" replace />;
};

const App = () => {
  const { token, updateToken } = useToken();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login updateToken={updateToken} />,
    },
    {
      path: "/login",
      element: <Login updateToken={updateToken} />,
    },
    {
      path: "/sign-up",
      element: <SignUp />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
    {
      element: <ProtectedRoutes token={token} />,
      children: [
        {
          path: "/new-chat",
          element: <CreateChat />,
        },
        {
          path: "/dialog/:id",
          element: <ChatDetail />,
        },
        {
          path: "/evaluate",
          element: <EvaluateList />,
        },
        {
          path: "/evaluate/:id",
          element: <EvaluateDetail />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
