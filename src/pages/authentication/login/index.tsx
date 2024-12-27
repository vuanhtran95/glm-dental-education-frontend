import { useDispatch } from "react-redux";
import { useCallback, useState } from "react";
import { Formik, Form } from "formik";

import { authenticate } from "src/store/user/actions";
import { useNavigate } from "react-router-dom";
import Button from "src/components/button";
import { APP_ROUTES, APP_MESSAGES } from "src/constants";
import { LoginPayload } from "./types";
import Input from "src/components/input";
import { loginInitialValues } from "./constants";
import {
  NotificationMessage,
  useNotification,
} from "src/hooks/useNotification";
import { SuccessCallback } from "src/types";

interface LoginProps {
  updateToken: (newToken: string | null) => void;
}

const Login: React.FC<LoginProps> = ({ updateToken }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { type, notification, notifyError } = useNotification();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = useCallback(
    (values: LoginPayload) => {
      setIsLoading(true);

      const successCallback = (token: string) => {
        setIsLoading(false);
        updateToken(token);
        navigate(APP_ROUTES.NEW_CHAT, { replace: true });
      };
      const errorCallback = () => {
        setIsLoading(false);
        notifyError(APP_MESSAGES.GENERAL_ERROR);
      };

      dispatch(
        authenticate(values, successCallback as SuccessCallback, errorCallback),
      );
    },
    [dispatch, notifyError],
  );

  return (
    <div className="flex flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <Formik
          initialValues={loginInitialValues}
          onSubmit={(values) => onSubmit(values)}
        >
          <Form className="flex flex-col gap-4">
            <Input id="username" label="User name" />
            <Input type="password" id="password" label="Password" />

            <div className="flex justify-center mt-4">
              <Button
                type="submit"
                loading={isLoading}
                label="Login"
                onClick={() => {}}
              />
            </div>
          </Form>
        </Formik>

        <NotificationMessage notification={notification} type={type} />

        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?
          <a
            onClick={() => navigate(APP_ROUTES.SIGN_UP)}
            href="#"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 ml-1"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
