import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { useCallback } from 'react';
import Input from 'src/components/input';
import Button from 'src/components/button';
import { APP_MESSAGES, APP_ROUTES, logoUri } from 'src/constants';
import {
  NotificationMessage,
  useNotification,
} from 'src/hooks/useNotification';
import { signUp } from 'src/store/user/actions';
import Select from 'src/components/select';

import HadAccount from './components/had-account';
import { SignUpPayload } from './types';
import { roleOptions, signUpInitialValues } from './constants';

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
    [dispatch, navigate, notifyError, notifySuccess]
  );

  return (
    <div className='flex min-h-full flex-col justify-center px-6 py-12 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
        <img className='mx-auto h-10 w-auto' src={logoUri} alt='Your Company' />
        <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
          Sign up to your account
        </h2>
      </div>
      <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
        <Formik
          initialValues={signUpInitialValues}
          onSubmit={(values) => onSubmit(values)}
        >
          <Form className='flex flex-col gap-4'>
            <Input id='username' label='User name' name='username' />
            <Input type='password' id='password' label='Password' />
            <Input id='fullName' label='Full name' />
            <Select options={roleOptions} label={'Role'} id='role' />
            <div className='flex justify-center mt-4'>
              <Button label='Sign up' onClick={() => {}} />
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
