import { useDispatch } from 'react-redux';
import { signUp } from '../../../store/user/actions';
import { useNavigate } from 'react-router-dom';
import Input from '../../../components/input';
import Button from '../../../components/button';
import { Formik, Form } from 'formik';
import { UserRole } from '../../../store/user/types';
import { SignUpPayload } from './types';
import { ERROR } from '../../../constants';
import { useState } from 'react';

interface SignUpFormValues {
  username: string;
  password: string;
  role: UserRole;
  fullName: '';
}

const SignUp = () => {
  const initialValues: SignUpFormValues = {
    username: '',
    password: '',
    role: UserRole.STUDENT,
    fullName: '',
  };
  const navigate = useNavigate();

  const [notification, setNotification] = useState<string | null>(null);

  const dispatch = useDispatch();

  const onSubmit = (values: SignUpPayload) => {
    console.log(values, 'values');

    dispatch(
      signUp(values, () => navigate('/login')),
      () => {
        setNotification(ERROR.GENERAL_ERROR);
      }
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
          Sign up to your account
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
            <Input id='fullName' label='Full name' name='fullName' />
            <div className='flex justify-center mt-4'>
              <Button label='Sign up' onClick={() => {}} />
            </div>
          </Form>
        </Formik>

        {!!notification && (
          <p className='mt-4 text-center text-sm text-red-500'>
            {notification}
          </p>
        )}

        <p className='mt-10 text-center text-sm text-gray-500'>
          Have an account?
          <a
            href='#'
            onClick={() => navigate('/login')}
            className='font-semibold leading-6 text-indigo-600 hover:text-indigo-500 ml-1'
          >
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
