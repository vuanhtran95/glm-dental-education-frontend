import { useDispatch } from 'react-redux';
import { authenticate } from '../../../store/user/actions';
import { useNavigate } from 'react-router-dom';
import Input from '../../../components/input';
import Button from '../../../components/button';
import { Formik, Form } from 'formik';
import { LoginPayload } from './types';
import { ERROR } from '../../../constants';
import { useState } from 'react';

interface LoginFormValues {
  username: string;
  password: string;
}

const Login = () => {
  const initialValues: LoginFormValues = { username: '', password: '' };
  const navigate = useNavigate();

  const [notification, setNotification] = useState<string | null>(null);

  const dispatch = useDispatch();

  const onSubmit = (values: LoginPayload) => {
    dispatch(
      authenticate(
        values,
        () => navigate('/new-chat'),
        () => {
          setNotification(ERROR.GENERAL_ERROR);
        }
      )
    );
  };

  return (
    <div className='flex min-h-full flex-col justify-center px-6 py-12 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
        <img
          className='mx-auto h-10 w-auto'
          src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600'
          alt='Your Company'
        />
        <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
          Sign in
        </h2>
      </div>

      <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => onSubmit(values)}
        >
          <Form className='flex flex-col gap-4'>
            <Input id='username' label='User name' name='username' />
            <Input
              type='password'
              id='password'
              label='Password'
              name='password'
            />
            <div className='flex justify-center mt-4'>
              <Button
                label='Login'
                onClick={function (): void {
                  throw new Error('Function not implemented.');
                }}
              />
            </div>
          </Form>
        </Formik>

        {!!notification && (
          <p className='mt-4 text-center text-sm text-red-500'>
            {notification}
          </p>
        )}

        <p className='mt-10 text-center text-sm text-gray-500'>
          Not a member?
          <a
            onClick={() => navigate('/sign-up')}
            href='#'
            className='font-semibold leading-6 text-indigo-600 hover:text-indigo-500 ml-1'
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
