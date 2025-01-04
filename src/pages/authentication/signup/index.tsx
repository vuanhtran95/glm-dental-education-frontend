import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import { useCallback } from "react";
import Input from "src/components/input";
import Button from "src/components/button";
import { APP_MESSAGES, APP_ROUTES } from "src/constants";
import {
  NotificationMessage,
  useNotification,
} from "src/hooks/useNotification";
import { signUp } from "src/store/user/actions";
import Select from "src/components/select";

import HadAccount from "./components/had-account";
import { SignUpPayload } from "./types";
import { roleOptions, signUpInitialValues } from "./constants";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { type, notification, notifyError, notifySuccess } = useNotification();

  const onSubmit = useCallback(
    (values: SignUpPayload) => {
      const successCallback = () => {
        notifySuccess(APP_MESSAGES.GENERAL_ERROR);
        setTimeout(() => {
          navigate(APP_ROUTES.LOGIN);
        }, 200);
      };

      const errorCallback = () => {
        notifyError(APP_MESSAGES.GENERAL_ERROR);
      };
      dispatch(signUp(values, successCallback, errorCallback));
    },
    [dispatch, navigate, notifyError, notifySuccess],
  );

  return (
    <div id="sign-up" className="flex flex-col justify-center px-6 py-16 lg:px-8 md:m-auto md:w-[30%]">
      <h2 className="text-center text-2xl font-bold text-gray-900">
        Sign up to your account
      </h2>
      <div className="mt-10">
        <Formik
          initialValues={signUpInitialValues}
          onSubmit={(values) => onSubmit(values)}
        >
          <Form className="flex flex-col gap-4">
            <Input id="username" label="User name" name="username" />
            <Input type="password" id="password" label="Password" />
            <Input id="fullName" label="Full name" />
            <Select options={roleOptions} label={"Role"} id="role" />
            <div className="flex justify-center mt-4">
              <Button type="submit" label="Sign up" onClick={() => {}} />
            </div>
          </Form>
        </Formik>
        <NotificationMessage notification={notification} type={type} />
        <HadAccount />
      </div>
    </div>
  );
};

export default SignUp;
