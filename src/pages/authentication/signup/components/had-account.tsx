import { useNavigate } from 'react-router-dom';
import { APP_ROUTES } from 'src/constants';

const HadAccount = () => {
  const navigate = useNavigate();

  return (
    <p className='mt-10 text-center text-sm text-gray-500'>
      Have an account?
      <a
        href='#'
        onClick={() => navigate(APP_ROUTES.LOGIN)}
        className='font-semibold leading-6 text-indigo-600 hover:text-indigo-500 ml-1'
      >
        Sign in
      </a>
    </p>
  );
};

export default HadAccount;
